/*
* @Author: yw850
* @Date:   2017-07-16 15:06:51
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-22 14:38:09
*/

'use strict';
var _mm = require('util/mm.js');

// 通常用下划线表示自己写的或者工具类的东西
var _cart = {
	//获取购物车数量
	getCartCount : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/get_cart_product_count.do'),
			success	: resolve, 
			error	: reject
		});
	},
	addToCart : function(productInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/add.do'),
			data	: productInfo,
			success	: resolve, 
			error	: reject
		});
	}
}
module.exports=_cart;