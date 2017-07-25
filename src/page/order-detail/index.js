/*
* @Author: yw850
* @Date:   2017-07-24 14:55:49
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-24 16:36:17
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide			= require('page/common/nav-side/index.js');
var _mm 			= require('util/mm.js');
var _order 			= require('service/order-service.js');
var templateIndex 	= require('./index.string');

// page逻辑部分
var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		navSide.init({
			name: 'order-list'
		});

		this.loadDetail();
	},
	bindEvent : function(){
		var _this = this;
		$(document).on('click', '.order-cancel', function(){
			if (!window.confirm('Are you sure ?')) {
				return;
			}
			_order.cancelOrder(_this.data.orderNumber, function(res){
				_mm.successTips('Succeed to cancel this order.');
				_this.loadDetail();
			}, function(errMsg){
				_mm.errTips(errMsg);
			});
		});
	},
	loadDetail : function(){
		var orderDetailHtml = '',
			_this = this,
			$content = $('.content');

		// loading icon
		$content.html('<div class="loading"></div>');

		_order.getOrderDetail(this.data.orderNumber, function(res){
			_this.dataFilter(res);
			// render
			orderDetailHtml = _mm.renderHtml(templateIndex, res);
			$content.html(orderDetailHtml);
		}, function(errMsg){
			$content.html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	// 数据适配
	dataFilter : function(data){
		data.needPay = data.status == 10;
		data.isCancelable = data.status == 10;
	}
};
$(function(){
	page.init();
});