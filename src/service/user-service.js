/*
* @Author: yw850
* @Date:   2017-07-16 14:46:53
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-19 13:34:39
*/

'use strict';
var _mm = require('util/mm.js');

// 通常用下划线表示自己写的或者工具类的东西
var _user = {
	login : function(userInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/login.do'),
			data 	: userInfo,
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	checkUsername : function(username, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/check_valid.do'),
			data 	: {
				type : 'username',
				str  : username
			},
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	register : function(userInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/register.do'),
			data 	: userInfo,
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	//在user-center页面，这一接口返回username为null
	//可能是因为自动logout，需要重新登录
	checkLogin : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/get_user_info.do'),
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	checkAnswer : function(userInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/forget_check_answer.do'),
			data 	: userInfo,
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	//获取用户密码提示问题
	getQuestion : function(username, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/forget_get_question.do'),
			data 	: {
				username : username
			},
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	resetPassword : function(userInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/forget_reset_password.do'),
			data 	: userInfo,
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	getUserInfo : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/get_information.do'),
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	updateUserInfo : function(userInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/update_information.do'),
			data 	: userInfo,
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	updatePassword : function(userInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/reset_password.do'),
			data 	: userInfo,
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	},
	logout : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/logout.do'),
			method 	: 'POST',
			success	: resolve, 
			error	: reject
		});
	}
}
module.exports=_user;