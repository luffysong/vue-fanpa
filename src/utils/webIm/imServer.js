/*
 *饭趴wap-腾讯webim封装
 *
 */
export default function IMSERVER() {
    this.groupId = null;
    this.im = null;
}

IMSERVER.prototype = {
    construct: IMSERVER,
    /**
     * 登录
     * @param options
     * imSig  初始化签名
     * onMsgNotify 监听新消息
     * cbOk 成功回调
     */
    login: function(imSig, onMsgNotify) {
        var self = this;

        this.im = imSig;

        this.loginInfo = {
            sdkAppID: imSig.imAppid, //用户标识接入SDK的应用ID，必填
            appIDAt3rd: imSig.imAppid, //App用户使用OAuth授权体系分配的Appid，和sdkAppID一样，必填 
            accountType: imSig.imAccountType, //账号类型，必填
            identifier: imSig.imIdentifier, //用户帐号，选填
            identifierNick: imSig.nickName, //用户昵称，选填
            userSig: imSig.userSig //鉴权Token，identifier不为空时，userSig必填
        }

        this.listeners = {
            "onConnNotify": null, //选填
            "onBigGroupMsgNotify": null, //监听新消息(大群)事件，必填
            "onMsgNotify": onMsgNotify, //监听新消息(私聊(包括普通消息和全员推送消息)，普通群(非直播聊天室)消息)事件，必填
            "onGroupSystemNotifys": null, //监听（多终端同步）群系统消息事件，必填
            "onGroupInfoChangeNotify": null //监听群资料变化事件，选填
        }

        this.options = {
            isAccessFormalEnv: true, //是否访问正式环境下的后台接口
            isLogOn: false //是否开启控制台打印日志
        }


        return new Promise(function(reslove, reject) {
            //web sdk 登录
            webim.login(self.loginInfo, self.listeners, self.options,
                function(response) {
                    self.loginInfo.identifierNick = response.identifierNick; //设置当前用户昵称
                    webim.Log.info('webim登录成功');
                    reslove(response);
                },
                function(err) {
                    webim.Log.info(err.ErrorInfo);
                    reject(err);
                }
            );
        });

    },
    /**
     * 加入群组
     * @param  {[type]} GroupId [description]
     * @return {[type]}         [description]
     */
    applyJoinGroup: function(GroupId) {
        this.groupId = GroupId;

        var options = {
            GroupId: this.groupId
        }

        return new Promise(function(reslove, reject) {
            webim.applyJoinGroup(options, reslove, function(err) {
                if (err.ErrorCode !== 10013) {
                    reject(err);
                } else {
                    reslove();
                }
            });
        });
    },
    /**
     * 发送消息
     * @return {[type]} [description]
     */
    sendMsg: function(msg) {
        var currentSession = webim.MsgStore.sessByTypeId('GROUP', this.groupId);
        var random = Math.floor(Math.random() * 10000);
        var sendMsg;
        if (!currentSession) {
            currentSession = new webim.Session('GROUP', this.groupId, this.groupId, '', random);
        }

        if (currentSession) {
            sendMsg = new webim.Msg(currentSession, true);
            msg = new webim.Msg.Elem('TIMCustomElem', {
                data: JSON.stringify(msg)
            });
            sendMsg.elems.push(msg);
            sendMsg.fromAccount = this.im.imIdentifier;

            return new Promise(function(reslove, reject) {
                webim.sendMsg(sendMsg, function(resp) {
                    reslove(resp);
                }, function(err) {
                    reject(err);
                });
            });
        }
    },
    /*
     *退出群组
     */
    quitGroup: function(chatroomId, cb) {
        return new Promise(function(reslove, reject) {
            webim.quitGroup({
                'GroupId': chatroomId
            }, function(res) {
                console.info(res, '退群消息');
                reslove(res);
            }, function(res) {
                reject(res)
            });
        });
    },
    /**
     * 退出所有群
     * @return {[type]} [description]
     */
    quitAllGroup: function() {
        var self = this;

        return new Promise(function(reslove, reject) {
            self.getJoinedGroupListHigh().then(callback).catch(callback);

            function callback(res) {
                var iComputed = 0,
                    listLength = res.GroupIdList.length < 5 ? res.GroupIdList.length : 5; //限制一次最多退5个群
                self.groupIdList = res.GroupIdList;

                if (!self.groupIdList || 　listLength === 0) {
                    self.canJoin = true;
                    reslove();
                    return;
                }
                for (var i = 0; i < listLength; i++) {
                    self.quitGroup(self.groupIdList[i].GroupId).then(canJoinHandler).catch(canJoinHandler);
                }

                function canJoinHandler() {
                    iComputed++;
                    if (iComputed === listLength) {
                        self.canJoin = true;
                        reslove();
                    }
                }

            }
        });
    },
    /**
     * 获取群组列表
     * @param  {Function}   cbOk
     * @return [Function]   cbFail
     */
    getJoinedGroupListHigh: function() {
        var self = this;
        var options = {
            'Member_Account': self.im.imIdentifier,
            'Limit': 100,
            'Offset': 0
        };
        return new Promise(function(reslove, reject) {
            webim.getJoinedGroupListHigh(options, function(res) {
                reslove(res)
            }, function(res) {
                reject(res);
            });
        });
    },

    //读取群组基本资料-高级接口
    getGroupInfo: function(GroupBaseInfoFilter, MemberInfoFilter) {
        var options = {
            'GroupIdList': [
                this.groupId
            ],
            'GroupBaseInfoFilter': /*[
                'Type',
                'Name',
                'Introduction',
                'Notification',
                'FaceUrl',
                'CreateTime',
                'Owner_Account',
                'LastInfoTime',
                'LastMsgTime',
                'NextMsgSeq',
                'MemberNum',
                'MaxMemberNum',
                'ApplyJoinOption'
            ]*/ GroupBaseInfoFilter,
            'MemberInfoFilter': /*[
                'Account',
                'Role',
                'JoinTime',
                'LastSendMsgTime',
                'ShutUpUntil'
            ]*/ MemberInfoFilter
        };
        return new Promise(function(reslove, reject) {
            webim.getGroupInfo(
                options,
                function(resp) {
                    reslove(resp);
                },
                function(err) {
                    reject(err);
                }
            );
        });
    },
    //获取锁屏状态
    getBlockState: function () {
        var self = this;

        return new Promise(function (reslove, reject) {
            self.getGroupInfo(['Introduction', 'Notification']).then(function (response) {
                console.log(response);
                var Introduction = response.GroupInfo[0].Introduction;
                if(Introduction) {
                    reslove(JSON.parse(Introduction).blockState);
                } else {
                    reslove(false);
                }
               
            }).catch(function (err) {
                reject(err);
            });
        });
    }
};
