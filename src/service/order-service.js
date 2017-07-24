/*
* @Author: yw850
* @Date:   2017-07-23 11:45:14
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-24 16:32:58
*/

'use strict';
var _mm = require('util/mm.js');

// 通常用下划线表示自己写的或者工具类的东西
var _order = {
	getProductList : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/order/get_order_cart_product.do'),
			success	: resolve, 
			error	: reject
		});
	},
	// submit order
	createOrder : function(orderInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/order/create.do'),
			data 	: orderInfo,
			success	: resolve, 
			error	: reject
		});
	},
	getOrderList : function(listParam, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/order/list.do'),
			data 	: listParam,
			success	: resolve, 
			error	: reject
		});
	},
	getOrderDetail : function(orderNumber, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/order/detail.do'),
			data 	: {
				orderNo : orderNumber
			},
			success	: resolve, 
			error	: reject
		});
	},
	cancelOrder : function(orderNumber, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/order/cancel.do'),
			data 	: {
				orderNo : orderNumber
			},
			success	: resolve, 
			error	: reject
		});
	},
}
module.exports=_order;