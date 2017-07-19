/*
* @Author: yw850
* @Date:   2017-07-12 22:48:22
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-19 13:07:11
*/
var webpack                 = require('webpack');
var ExtractTextPlugin       = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin       = require('html-webpack-plugin');
var WEBPACK_ENV             = process.env.WEBPACK_ENV || 'dev';
console.log(WEBPACK_ENV);

//获取html plugin参数的方法
var getHTMLConfig = function(name,title){
    return{
        template    :'./src/view/' + name + '.html',
        filename    :'view/' + name + '.html',
        inject      :true,
        hash        :true,
        chunks      :['common',name],
        title       :title
    };
}
//webpack config
var config = {
     entry: {
     	'index'                 :['./src/page/index/index.js'],
        'user-login'            :['./src/page/user-login/index.js'],
        'user-register'         :['./src/page/user-register/index.js'],
        'user-pass-reset'       :['./src/page/user-pass-reset/index.js'],
        'user-center'           :['./src/page/user-center/index.js'],
        'user-center-update'    :['./src/page/user-center-update/index.js'],
        'user-pass-update'      :['./src/page/user-pass-update/index.js'],
 		'result'                :['./src/page/result/index.js'],
 		'common'                :['./src/page/common/index.js'],
     },
     output: {
         path           : './dist',
         publicPath     : '/dist',
         filename       : 'js/[name].js'
     },
     externals: {
     	'jquery': 'window.jQuery'
     },
     module: {
        loaders: [
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias: {
            util        : __dirname + '/src/util',
            page        : __dirname + '/src/page',
            service     : __dirname + '/src/service',
            image       : __dirname + '/src/image',
            node_modules: __dirname + '/node_modules'
        }
    },
     plugins: [
     //独立通用模块
     	new webpack.optimize.CommonsChunkPlugin({
     		name: 'common',
     		filename : 'js/base.js'
     	}),
        //吧css单独打包到文件
        new ExtractTextPlugin("css/[name].css"),
        //html模板的处理
        new HtmlWebpackPlugin(getHTMLConfig('index','首页')),
        new HtmlWebpackPlugin(getHTMLConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHTMLConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHTMLConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHTMLConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHTMLConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHTMLConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHTMLConfig('result', '操作结果'))
     ]
 };

 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }
 module.exports = config;