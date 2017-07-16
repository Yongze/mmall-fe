/*
* @Author: yw850
* @Date:   2017-07-16 14:46:53
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-16 15:02:47
*/

'use strict';
var _mm = require('util/mm.js');

// 通常用下划线表示自己写的或者工具类的东西
var _user = {
	checkLogin : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/user/get_user_info.do'),
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