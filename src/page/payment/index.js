/*
* @Author: yw850
* @Date:   2017-07-24 18:13:22
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-24 18:41:42
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm 			= require('util/mm.js');
var _payment 			= require('service/payment-service.js');
var templateIndex 	= require('./index.string');

// page逻辑部分
var page = {
	data : {
		orderNumber : _mm.getUrlParam('orderNumber')
	},
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		this.loadPaymentInfo();
	},
	loadPaymentInfo : function(){
		var paymentHtml = '',
			_this = this,
			$pageWrap = $('.page-wrap');

		// loading icon
		$pageWrap.html('<div class="loading"></div>');

		_payment.getPaymentInfo(this.data.orderNumber, function(res){
			// render
			paymentHtml = _mm.renderHtml(templateIndex, res);
			$pageWrap.html(paymentHtml);

			_this.listenOrderStatus();


		}, function(errMsg){
			$pageWrap.html('<p class="err-tip">' + errMsg + '</p>');
		});
	},
	// 监听订单状态，轮询
	listenOrderStatus : function(){
		var _this = this;
		this.paymentTimer = window.setInterval(function(){
			_payment.getPaymentStatus(_this.data.orderNumber, function(res){
				if (res === true) {
					window.location.href = './result.html?type=payment&orderNumber=' + _this.data.orderNumber;
				}
			});
		}, 5e3);
	}
};
$(function(){
	page.init();
});