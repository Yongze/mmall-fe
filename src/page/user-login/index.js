/*
* @Author: yw850
* @Date:   2017-07-12 23:10:07
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 14:41:47
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');
var _user = require('service/user-service.js');

//表单里的错误提示
var formError = {
	show : function(errMsg){
		$('.error-item').show().find('.err-msg').text(errMsg);
	},
	hide : function(errMsg){
		$('.error-item').hide().find('.err-msg').text('');
	}
};
// page逻辑部分
var page = {
	init : function(){
		this.bindEvent();
	},
	bindEvent: function(){
		var _this = this;
		//登录按钮的点击
		$('#submit').click(function(){
			_this.submit();
		});
		//按下回车，提交
		$('.user-content').keyup(function(e){
			if (e.keyCode === 13) {
				_this.submit();
			}
		});
	},
	submit : function(){
		var formData = {
				username : $.trim($('#username').val()),
				password : $.trim($('#password').val()),
			},
			//表单验证结果
			validateResult = this.formValidate(formData);
		//验证成功
		if (validateResult.status) {
			//提交
			_user.login(formData, function(res){
				window.location.href = _mm.getUrlParam('redirect') || './index.html';
			}, function(errMsg){
				formError.show(errMsg);
			});
		}
		//验证失败
		else{
			//错误提示
			formError.show(validateResult.msg);
		}
	},
	//表单字段验证
	formValidate : function(formData){
		var result = {
			status 	: false,
			msg		: '',
		};
		if (!_mm.validate(formData.username, 'require')) {
			result.msg = 'Username cannot be empty';
			return result;
		}
		if (!_mm.validate(formData.password, 'require')) {
			result.msg = 'Password cannot be empty';
			return result;
		}
		//通过验证，返回正确提示
		result.status 	= true;
		result.msg 		= 'Validate';
		return result;
	}
};
$(function(){
	page.init();
})