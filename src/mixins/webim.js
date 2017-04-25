import IMSERVER from '../utils/webIm/imServer'
import store from '../vuex/store'
import {
    getUserSig
}
from '../vuex/actions/user'
import {
    addWebImData, setWebImObj, setWebImPackMsg, setWebImData, setWebImJoinStatus, setWebImBlockState, setWebImIsStopCmtUser, setWebImIsForbidUser,getWebImIsStopCmtUser, getRoomImMsgList, getMessageList,
    setGroupInfo, setIsLoginIm
}
from '../vuex/actions/webim'
import parseMsg from '../utils/webIm/parse-msg'
import PackSendMsg from '../utils/webIm/pack-send-msg'

var webimMixins = {
    created: function() {
        this.initIm(); //初始化IM
        this.showRoomImMsgList(); //获取历史消息
        this.initPackData(); //创建包装数据对象
    },
    methods: {
        initIm: function() {
            var vm = this;

            if(!vm.imServer) {
                var imServer = new IMSERVER();
                this.setWebImObj(imServer); //将实例化的imServer存入store
            }

            this.getUserSig(); //获取签名

            this.getWebImIsStopCmtUserHandler(); //获取是否被禁言

            this.forbidUserHandler(); //重置被踢参数

            this.toLoginJoinHandler(); //登录进群

            this.$watch('roomId', function() {
                if (vm.webImData.length > 0) {
                    vm.setWebImData([]);
                }
            });

        },
        toLoginJoinHandler: function () {
            var vm = this;

            if(!this.isLoginIm) {
                this.$watch('userSig', function() {
                    vm.imServer.login(vm.userSig, vm.onMsgNotify).then(response => {
                        console.info('登录成功');
                        this.setIsLoginIm(true);
                        joinGroupHandler();
                    });
                });
            } else {
                this.$watch('userSig', joinGroupHandler);
            }

            function joinGroupHandler() { //进群相关操作
                vm.joinGroup().then(response => {
                    vm.$watch('roomDetail', function() {
                        console.warn('切换群');
                        vm.joinGroup();
                    });
                });
            }
        },
        forbidUserHandler: function () {
            this.setWebImIsForbidUser(false);
        },
        joinGroup: function() {
            var vm = this;

            vm.setWebImJoinStatus('ing'); //正在加入聊天室

            return vm.imServer.quitAllGroup().then(() => {

                console.info('所有群退出成功');
                return vm.imServer.applyJoinGroup(vm.imGroupid);

            }).then(() => {

                console.info('进群成功');
                return vm.imServer.getGroupInfo(['Introduction', 'Notification']);

            }).then((response) => {

                console.info('获取群信息成功');

                vm.setWebImJoinStatus('success'); //成功加入聊天室

                vm.setGroupInfo(response); //设置群信息
            }).catch(function(err) {
                console.error(err);
                if (err.ErrorCode === 10015) {
                    console.info('没有建立群');
                    vm.setWebImJoinStatus('notGroup');
                } else {
                    console.info('加入聊天室失败了');
                    vm.setWebImJoinStatus('error');
                }

            });

        },
        //监听新消息(私聊(包括普通消息、全员推送消息)，普通群(非直播聊天室)消息)事件
        //newMsgList 为新消息数组，结构为[Msg]
        onMsgNotify: function(newMsgList) {
            console.info(newMsgList);
            var newMsg, selSess, oNewMsg
                //获取所有聊天会话
            var sessMap = webim.MsgStore.sessMap();
            for (var j in newMsgList) { //遍历新消息
                newMsg = newMsgList[j];

                if (!newMsg.isSend) { //过滤用户自身的消息
                    selSess = newMsg.getSession();
                    //获取解析后的数据
                    oNewMsg = parseMsg(newMsg);

                    //添加到state
                    this.addWebImData(oNewMsg);
                }
            }
            //消息已读上报，以及设置会话自动已读标记
            webim.setAutoRead(selSess, true, true);
        },
        getWebImIsStopCmtUserHandler: function() {
            this.$watch('roomId', function() {
                this.getWebImIsStopCmtUser();
            });
        },
        showRoomImMsgList: function() { //获取历史消息
            this.$watch('roomId', this.getRoomImMsgList);
        },
        initPackData: function() {
            this.$watch('userSig', function() {
                var packMsg = new PackSendMsg();

                packMsg.init(Object.assign(this.userSig, {
                    roomId: this.roomId,
                    userId: this.userId,
                    source: this.source
                }));

                this.setWebImPackMsg(packMsg);

                //切换房间后更换包装数据的roomId
                this.$watch('roomDetail', function() {
                    this.packMsg.info.roomId = this.roomId
                });
            });
        }
    },
    store,
    vuex: {
        getters: {
            isLoginIm: state => state.webim.isLoginIm,
            userSig: state => state.user.sig,
            userInfo: state => state.user.info,
            userId: state => state.user.info.userId,
            roomId: state => state.room.roomId,
            imGroupid: state => state.webim.imGroupid,
            webImData: state => state.webim.data,
            imServer: state => state.webim.imServer,
            groupId: state => state.webim.imServer.groupId,
            packMsg: state => state.webim.packMsg,
            roomDetail: state => state.room.roomDetail,
            roomName: state => state.room.roomDetail.roomName,
            joinStatus: state => state.webim.joinStatus,
            isForbidUser: state => state.webim.isForbidUser
        },
        actions: {
            getUserSig,
            addWebImData,
            setWebImObj,
            setWebImPackMsg,
            setWebImData,
            setWebImJoinStatus,
            setWebImBlockState,
            getWebImIsStopCmtUser,
            getRoomImMsgList,
            getMessageList,
            setWebImIsForbidUser,
            setGroupInfo,
            setIsLoginIm
        }
    }
}

export default webimMixins;
