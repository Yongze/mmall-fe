/*
* @Author: yw850
* @Date:   2017-07-12 22:48:22
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-24 20:52:40
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
        favicon     :'./favicon.ico',
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
        'list'                  :['./src/page/list/index.js'],
        'detail'                :['./src/page/detail/index.js'],
        'cart'                  :['./src/page/cart/index.js'],
        'order-confirm'         :['./src/page/order-confirm/index.js'],
        'order-list'            :['./src/page/order-list/index.js'],
        'order-detail'          :['./src/page/order-detail/index.js'],
     	'payment'               :['./src/page/payment/index.js'],
        'user-login'            :['./src/page/user-login/index.js'],
        'user-register'         :['./src/page/user-register/index.js'],
        'user-pass-reset'       :['./src/page/user-pass-reset/index.js'],
        'user-center'           :['./src/page/user-center/index.js'],
        'user-center-update'    :['./src/page/user-center-update/index.js'],
        'user-pass-update'      :['./src/page/user-pass-update/index.js'],
        'result'                :['./src/page/result/index.js'],
 		'about'                 :['./src/page/result/index.js'],
 		'common'                :['./src/page/about/index.js'],
     },
     output: {
         path           : __dirname + '/dist',
         publicPath     : 'dev' === WEBPACK_ENV ? '/dist/' : '//s.yw850.com/mmall-fe/dist/',
         filename       : 'js/[name].js'
     },
     externals: {
     	'jquery': 'window.jQuery'
     },
     module: {
        loaders: [
            { test: /\.css$/, loader:  ExtractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { 
                test: /\.string$/, 
                loader: 'html-loader',
                // removeAttributeQuotes这个属性决定要不要删除压缩过的HTML文件中的双引号
                query : {
                    minimized : true,
                    removeAttributeQuotes : false
                }
            }
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
        new HtmlWebpackPlugin(getHTMLConfig('list','商品列表')),
        new HtmlWebpackPlugin(getHTMLConfig('detail','商品详情')),
        new HtmlWebpackPlugin(getHTMLConfig('cart','购物车')),
        new HtmlWebpackPlugin(getHTMLConfig('order-confirm','订单确认')),
        new HtmlWebpackPlugin(getHTMLConfig('order-list','订单列表')),
        new HtmlWebpackPlugin(getHTMLConfig('order-detail','订单详情')),
        new HtmlWebpackPlugin(getHTMLConfig('payment','订单支付')),
        new HtmlWebpackPlugin(getHTMLConfig('user-login', '用户登录')),
        new HtmlWebpackPlugin(getHTMLConfig('user-register', '用户注册')),
        new HtmlWebpackPlugin(getHTMLConfig('user-pass-reset', '找回密码')),
        new HtmlWebpackPlugin(getHTMLConfig('user-center', '个人中心')),
        new HtmlWebpackPlugin(getHTMLConfig('user-center-update', '修改个人信息')),
        new HtmlWebpackPlugin(getHTMLConfig('user-pass-update', '修改密码')),
        new HtmlWebpackPlugin(getHTMLConfig('about', '关于Mall')),
        new HtmlWebpackPlugin(getHTMLConfig('result', '操作结果'))
     ]
 };

 if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
 }
 module.exports = config;