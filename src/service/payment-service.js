/*
* @Author: yw850
* @Date:   2017-07-24 18:31:24
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-24 18:43:00
*/

'use strict';
var _mm = require('util/mm.js');
var _payment = {
	getPaymentInfo : function(orderNumber, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/order/pay.do'),
			data	:{
				orderNo : orderNumber
			},
			success	: resolve, 
			error	: reject
		});
	},
	// 轮询订单状态
	getPaymentStatus : function(orderNumber, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/order/query_order_pay_status.do'),
			data	:{
				orderNo : orderNumber
			},
			success	: resolve, 
			error	: reject
		});
	}
}
module.exports=_payment;