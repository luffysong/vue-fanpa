var config = require('./webpack.config.base.js');
var webpack = require('webpack');
var OpenBrowserPlugin = require('open-browser-webpack-plugin');

const publicPath = 'http://localhost:8080/';

config.devtool = 'eval-source-map';
config.output.publicPath = publicPath;

config.module.loaders = (config.module.loaders || []).concat([
    // 编译css并自动添加css前缀
    {
        test: /\.css$/,
        loader: 'style-loader!css-loader?sourceMap'
    },
    //.scss 文件想要编译，scss就需要这些东西！来编译处理
    {
        test: /\.scss$/,
        loader: 'style-loader!css-loader?sourceMap!sass-loader'
    }
]);

config.vue = {
    loaders: {
        css: 'vue-style-loader!css-loader?sourceMap',
        scss: 'vue-style-loader!css-loader?sourceMap!sass-loader'
    }
};

config.plugins = (config.plugins || []).concat([
    new OpenBrowserPlugin({
        url: 'http://fy.yinyuetai.com:8080' + '?jump'
    })
]);

module.exports = config;
