/*
* @Author: yw850
* @Date:   2017-07-15 14:17:54
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 15:07:34
*/

'use strict';
var Hogan		= require('hogan');
var conf = {
	serverHost	: ''
};
var _mm = {
	//网络请求
	request : function(param){
		var _this = this;
		$.ajax({
			type		: param.method 	|| 'get',
			url			: param.url		|| '',
			dataType	: param.type    || 'json',
			data		: param.data    || '',
			success		: function(res){
				//request success
				if (0 === res.status) {
					typeof param.success === 'function' && param.success(res.data, res.msg);
				}
				//no login status, enforce to login
				else if (10 === res.status) {
					_this.doLogin();
				}
				//请求数据错误
				else if (1 === res.status) {
					typeof param.error === 'function' && param.error(res.msg);	
				}
			},
			error		:function(err){
				typeof param.success === 'function' && param.success(err.statusText);
			}
		});
	},
	//
	getServerUrl : function(path){
		return conf.serverHost + path;
	},
	getUrlParam	: function(name){
		//happymmall.com/product/list?keyword=xxx&page=1
		var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
		var result = window.location.search.substr(1).match(reg);
		return result ? decodeURIComponent(result[2]) : null;
	},
	//渲染html模板
	renderHtml	: function(htmlTemplate, data){
		var template = Hogan.compile(htmlTemplate),
			result = template.render(data);
			return result;
	},
	successTips	: function(msg){
		alert(msg || "Operation success");
	},
	errorTips	: function(msg){
		alert(msg || "Something wrong:(");
	},
	validate : function(value, type){
		var value = $.trim(value);
		//非空验证
		if ('require' === type) {
			return !!value;//强转成boolean
		}
		// for mobile like 04 1234 5678
		if ("phone" === type) {
			return /^1\d{9}$/.test(value);
		}
		if ("email" === type) {
			return /^(\w)+(\.\w+)*@(\w)+((\.\w{2,3}){1,3})$/.test(value);
		}
	},
	//统一登录处理
	doLogin	: function(){
		window.location.href = './user-login.html?redirect=' + encodeURIComponent(window.location.href);
	},
	goHome : function(){
		window.location.href = "./index.html"
	}
};
module.exports = _mm;