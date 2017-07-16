/*
* @Author: yw850
* @Date:   2017-07-16 15:47:43
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-16 16:18:56
*/

'use strict';
require('./index.css');
var _mm 	= require('util/mm.js');
//通用页面头部
var header = {
	init			: function(){
		this.bindEvent();
	},
	onLoad			: function(){
		var keyword = _mm.getUrlParam('keyword');
		//keyword 存在回填输入框
		if (keyword) {
			$('#search-input').val(keyword);
		}
	},
	bindEvent		: function(){
		//因为是jQuery的选择器，所以this不生效
		var _this = this;
		//点击搜索按钮以后做搜索提交
		$('#search-btn').click(function(){
			_this.searchSubmit();
		});
		//输入回车后，做搜索提交
		$('#search-input').keyup(function(e){
			//13是回车键的keyCode
			if (e.keyCode === 13) {
				_this.searchSubmit();
			}
		});
	},
	//搜索提交
	searchSubmit : function(){
		var keyword = $.trim($('#search-input').val());
		//如果提交的时候有keyword， 正常调到list页
		if (keyword) {
			window.location.href = './list.html?keyword=' + keyword;
		}
		//如果为空，直接返回首页
		else{
			_mm.goHome();
		}
	}
};
header.init();