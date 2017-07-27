/*
* @Author: yw850
* @Date:   2017-07-17 22:35:35
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 14:48:41
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
	data : {
		username 	: '',
		question 	: '',
		answer 		: '',
		token 		: ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadStepUsername();
	},
	bindEvent: function(){
		var _this = this;
		//step one
		$('#submit-username').click(function(){
			var username = $.trim($('#username').val());
			//不为空
			if (username) {
				_user.getQuestion(username, function(data, res){
					_this.data.username = username;
					_this.data.question = res;
					_this.loadStepQuestion();
				}, function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('Please enter username');
			}
		});
		//按下回车，提交
		// $('#submit-username').keyup(function(e){
		// 	if (e.keyCode === 13) {
		// 		_this.submit();
		// 	}
		// });

		//step two
		$('#submit-question').click(function(){
			var answer = $.trim($('#answer').val());
			//不为空
			if (answer) {
				_user.checkAnswer({
					username : _this.data.username,
					question : _this.data.question,
					answer   : answer
				}, function(data, res){
					_this.data.answer = answer;
					_this.data.token = data;
					_this.loadStepPassword();
				}, function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('Please enter the answer of your security question');
			}
		});

		//step three
		$('#submit-password').click(function(){
			var password = $.trim($('#password').val());
			//不为空
			if (password && password.length >= 6) {
				_user.resetPassword({
					username 		: _this.data.username,
					passwordNew 	: password,
					forgetToken   	: _this.data.token
				}, function(data, res){
					window.location.href = './result.html?type=pass-reset';
				}, function(errMsg){
					formError.show(errMsg);
				});
			}else{
				formError.show('Please set a password more than 6 letters/numbers');
			}
		});
	},
	loadStepUsername : function(){
		$('.step-username').show();
	},
	loadStepQuestion : function(){
		//清除错误提示
		formError.hide();
		//做容器的切换
		$('.step-username').hide()
			.siblings('.step-question').show()
			.find('.question').text(this.data.question);
	},
	loadStepPassword : function(){
		//清除错误提示
		formError.hide();
		//做容器的切换
		$('.step-question').hide()
			.siblings('.step-password').show();
	}
};
$(function(){
	page.init();
})