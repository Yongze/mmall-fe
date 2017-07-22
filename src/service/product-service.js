/*
* @Author: yw850
* @Date:   2017-07-20 01:34:37
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-22 13:00:05
*/

'use strict';
var _mm = require('util/mm.js');

// 通常用下划线表示自己写的或者工具类的东西
var _product = {
	getProductList : function(listParam, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/product/list.do'),
			data 	: listParam,
			success	: resolve, 
			error	: reject
		});
	},
	getProductDetail : function(productId, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/product/detail.do'),
			data 	: {
				productId: productId
			},
			success	: resolve, 
			error	: reject
		});
	}
}
module.exports=_product;