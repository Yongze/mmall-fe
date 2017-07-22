/*
* @Author: yw850
* @Date:   2017-07-16 15:06:51
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-22 22:04:47
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
	},
	getCartList : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/list.do'),
			success	: resolve, 
			error	: reject
		});
	},
	selectProduct : function(productId, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/select.do'),
			data	: {
				productId : productId
			},
			success	: resolve, 
			error	: reject
		});
	},
	unselectProduct : function(productId, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/un_select.do'),
			data	: {
				productId : productId
			},
			success	: resolve, 
			error	: reject
		});
	},
	selectAllProduct : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/select_all.do'),
			success	: resolve, 
			error	: reject
		});
	},
	unselectAllProduct : function(resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/un_select_all.do'),
			success	: resolve, 
			error	: reject
		});
	},
	// 更新cart商品数量
	updateProduct : function(productInfo, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/update.do'),
			data	: productInfo,
			success	: resolve, 
			error	: reject
		});
	},
	// 删除指定商品
	deleteProduct : function(productIds, resolve, reject){
		_mm.request({
			url 	:_mm.getServerUrl('/cart/delete_product.do'),
			data	: {
				productIds : productIds
			},
			success	: resolve, 
			error	: reject
		});
	},
}
module.exports=_cart;