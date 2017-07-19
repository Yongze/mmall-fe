/*
* @Author: yw850
* @Date:   2017-07-19 00:48:10
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-19 11:53:30
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');
var templateIndex 	= require('./index.string');

// page逻辑部分
var page = {
	init : function(){
		this.onLoad();
	},
	onLoad: function(){
		navSide.init({
			name: 'user-center'
		});
		this.loadUserInfo();
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errTips(errMsg);
		});
	}
};
$(function(){
	page.init();
});