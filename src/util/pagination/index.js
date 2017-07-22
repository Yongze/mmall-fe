/*
* @Author: yw850
* @Date:   2017-07-20 16:10:50
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-20 19:49:14
*/

'use strict';
require('./index.css');
var _mm = require('../mm.js');
var templatePagination = require('./index.string');

var Pagination = function(){
	var _this = this;
	this.defaultOption = {
		container 		: null,
		pageNum 		: 1,
		pageRange 		: 3,
		onSelectPage 	: null
	};
	//事件处理
	$(document).on('click', '.pg-item', function(){
		var $this = $(this);
		//对active和disabled按钮不错处理
		if ($this.hasClass('active') || $this.hasClass('disabled')) {
			return;
		}
		typeof _this.option.onSelectPage === 'function' ? _this.option.onSelectPage($this.data('value')) : null;
	});
};
//渲染分页组件
Pagination.prototype.render = function(userOption){
	//对空对象进行添加,这样不会影响里面的内容
	//合并选项
	this.option = $.extend({}, this.defaultOption, userOption);
	//判断容器是否为合法的jQuery对象
	// ！的优先级高于instanceof， 所以要加口号
	if (!(this.option.container instanceof jQuery)) {
		return;
	}
	//判断是否只有页
	if (this.option.pages <= 1) {
		return;
	}
	// 渲染分页
	this.option.container.html(this.getPaginationHtml());
};
//获取分页的html
Pagination.prototype.getPaginationHtml = function(){
	var html = '';
	var pageArray = [];
	var dif = this.option.pageNum - this.option.pageRange;
	var start = dif > 0 ? dif : 1;
	var sum = this.option.pageNum + this.option.pageRange;
	var end = sum > this.option.pages ? this.option.pages : sum;

	//上一页
	pageArray.push({
		name : 'prev',
		value : this.option.prePage,
		disabled : !this.option.hasPreviousPage,
	});
	//数字按钮的处理
	for (var i = start; i <= end; i++) {
		pageArray.push({
			name : i,
			value : i,
			active : (i === this.option.pageNum)
		});
	}
		

	// 下一页
	pageArray.push({
		name : 'next',
		value : this.option.nextPage,
		disabled : !this.option.hasNextPage,
	});
	html = _mm.renderHtml(templatePagination, {
		pageArray 	: pageArray,
		pageNum 	: this.option.pageNum,
		pages 		: this.option.pages
	});
	return html;
};
module.exports = Pagination;
