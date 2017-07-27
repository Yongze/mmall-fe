/*
* @Author: yw850
* @Date:   2017-07-17 20:14:50
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 15:05:44
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
		//验证username
		$('#username').blur(function(){
			var username = $.trim($(this).val());
			//如username为空不做验证
			if (!username) {
				return;
			}
			//异步验证用户名是否存在
			_user.checkUsername(username, function(res){
				formError.hide();
			}, function(errMsg){
				formError.show(errMsg);
			});
		});

		//注册按钮的点击
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
				username 		: $.trim($('#username').val()),
				password 		: $.trim($('#password').val()),
				passwordConfirm : $.trim($('#password-confirm').val()),
				phone 			: $.trim($('#phone').val()),
				email 			: $.trim($('#email').val()),
				question 		: $.trim($('#question').val()),
				answer 			: $.trim($('#answer').val()),
			},
			//表单验证结果
			validateResult = this.formValidate(formData);
		//验证成功
		if (validateResult.status) {
			//提交
			_user.register(formData, function(res){
				window.location.href = './result.html?type=register';
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
		if (formData.password.length < 6) {
			result.msg = 'Password cannot less than 6 letters or numbers';
			return result;
		}

		if (formData.password !== formData.passwordConfirm) {
			result.msg = 'Password confirm is not correct';
			return result;
		}
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = 'Phone number is not correct';
			return result;
		}
		if (!_mm.validate(formData.email, 'email')) {
			result.msg = 'Email format is not correct';
			return result;
		}
		if (!_mm.validate(formData.question, 'require')) {
			result.msg = 'Security question cannot be empty';
			return result;
		}
		if (!_mm.validate(formData.answer, 'require')) {
			result.msg = 'The answer to security question cannot be empty';
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