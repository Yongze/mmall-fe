/*
* @Author: yw850
* @Date:   2017-07-12 22:28:36
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-16 23:48:35
*/
'use strict';
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
navSide.init({
	name: 'pass-update'
});


// _mm.request({
// 	url	: '/product/list.do?keyword=1',
// 	success	:function(res){
// 		console.log(res);
// 	},
// 	error	:function(errMsg){
// 		console.log(errMsg);
// 	}
// });
// console.log(_mm.getUrlParam("test"));
// var html = "<div>{{data}}</div>";
// var data = {
// 	data : 123
// }
// console.log(_mm.renderHtml(html, data));