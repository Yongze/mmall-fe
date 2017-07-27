/*
* @Author: yw850
* @Date:   2017-07-19 01:11:51
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 14:35:04
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
		this.bindEvent();
	},
	onLoad: function(){
		navSide.init({
			name: 'user-center'
		});
		this.loadUserInfo();
	},
	bindEvent : function(){
		var _this = this;
		//事件冒泡原理
		//on --> 事件代理
		$(document).on('click', '.btn-submit', function(){
			var userInfo = {
				phone 		: $.trim($('#phone').val()),
				email 		: $.trim($('#email').val()),
				question 	: $.trim($('#question').val()),
				answer 		: $.trim($('#answer').val())
			};
			var validateResult = _this.validateForm(userInfo);
			if (validateResult.status) {
				//
				_user.updateUserInfo(userInfo, function(date, res){
					_mm.successTips(res);
					window.location.href = './user-center.html';
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips(validateResult.msg);
			}
		});
	},
	loadUserInfo : function(){
		var userHtml = '';
		_user.getUserInfo(function(res){
			userHtml = _mm.renderHtml(templateIndex, res);
			$('.panel-body').html(userHtml);
		},function(errMsg){
			_mm.errTips(errMsg);
		});
	},
	validateForm : function(formData){
		var result = {
			status 	: false,
			msg		: '',
		};
		
		if (!_mm.validate(formData.phone, 'phone')) {
			result.msg = 'Phone number is not correct';
			return result;
		}
		if (!_mm.validate(formData.email, 'email')) {
			result.msg = 'email is not correct';
			return result;
		}
		if (!_mm.validate(formData.question, 'require')) {
			result.msg = 'Security question cannot be empty';
			return result;
		}
		if (!_mm.validate(formData.answer, 'require')) {
			result.msg = 'The answer of security question cannot be empty';
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
});