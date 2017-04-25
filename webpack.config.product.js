var config = require('./webpack.config.base.js');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var CleanWebpackPlugin = require('clean-webpack-plugin');

config.module.loaders = (config.module.loaders || []).concat([
    // 编译css并自动添加css前缀
    {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader?sourceMap!autoprefixer-loader')
    },
    //.scss 文件想要编译，scss就需要这些东西！来编译处理
    {
        test: /\.scss$/,
        loader: ExtractTextPlugin.extract('style-loader','css-loader?sourceMap!autoprefixer-loader!sass-loader')
    }
]);

config.vue = {
    loaders: {
        css: ExtractTextPlugin.extract("vue-style-loader", "css-loader?sourceMap!autoprefixer-loader"),
        scss: ExtractTextPlugin.extract("vue-style-loader", "css-loader?sourceMap!autoprefixer-loader!sass-loader")
    }
};


config.plugins = (config.plugins || []).concat([
    new ExtractTextPlugin('css/[name].[contenthash:9].css', {
        allChunks: true
    }),
    //清理
    new CleanWebpackPlugin(['build'], {
        root: '', //绝对路径
        verbose: true, //写日志到console
        dry: false //不删除任何东西，好进行测试
    }),
    new webpack.DefinePlugin({
        'process.env': {
            'NODE_ENV': JSON.stringify('production')
        }
    }),
    new webpack.optimize.UglifyJsPlugin({
        compress: {
            warnings: false
        }
    })
]);

module.exports = config;



