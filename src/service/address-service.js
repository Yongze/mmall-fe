/*
* @Author: yw850
* @Date:   2017-07-23 15:02:29
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-24 11:34:08
*/

'use strict';
var _mm = require('util/mm.js');

// 通常用下划线表示自己写的或者工具类的东西
var _address = {
	getAddressList : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/shipping/list.do'),
			data	:{
				pageSize : 50
			},
			success	: resolve, 
			error	: reject
		});
	},
	// create new address for receiver
	save : function(addressInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/shipping/add.do'),
			data	: addressInfo,
			success	: resolve, 
			error	: reject
		});
	},
	update : function(addressInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/shipping/update.do'),
			data	: addressInfo,
			success	: resolve, 
			error	: reject
		});
	},
	deleteAddress : function(shippingId, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/shipping/del.do'),
			data	: {
				shippingId : shippingId
			},
			success	: resolve, 
			error	: reject
		});
	},
	// to get a selected receiver address
	getAddress : function(shippingId, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/shipping/select.do'),
			data	: {
				shippingId : shippingId
			},
			success	: resolve, 
			error	: reject
		});
	}
}
module.exports=_address;