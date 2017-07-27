/*
* @Author: yw850
* @Date:   2017-07-19 12:52:48
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 14:57:09
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide = require('page/common/nav-side/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

// page逻辑部分
var page = {
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad: function(){
		navSide.init({
			name: 'user-pass-update'
		});
	},
	bindEvent : function(){
		var _this = this;
		//事件冒泡原理
		//on --> 事件代理
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				password 			: $.trim($('#password').val()),
				passwordNew 		: $.trim($('#password-new').val()),
				passwordConfirm 	: $.trim($('#password-confirm').val())
			};
			var validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				//
				_user.updatePassword({
					passwordOld : userInfo.password,
					passwordNew : userInfo.passwordNew
				}, function(date, msg){
					_mm.successTips(msg);
					window.location.href = './user-center.html';
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	validateForm : function(formData){
		var result = {
			status 	: false,
			msg		: '',
		};
		
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = 'Old password cannot be empty';
			return result;
		}
		if (!formData.passwordNew || formData.passwordNew.length < 6) {
			result.msg = 'Password cannot less than 6 letters or numbers';
			return result;
		}
		if (formData.passwordNew !== formData.passwordConfirm) {
			result.msg = 'Password confirm is not corrent';
			return result;
		}
		//通过验证，返回正确提示
		result.status 	= true;
		result.msg 		= 'validate';
		return result;
	}
};
$(function(){
	page.init();
});