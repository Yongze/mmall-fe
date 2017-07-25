/*
* @Author: yw850
* @Date:   2017-07-22 18:32:47
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-23 11:38:16
*/
'use strict';
require('./index.css')
require('page/common/header/index.js');
var nav 			= require('page/common/nav/index.js');
var _mm 			= require('util/mm.js');
var _cart			= require('service/cart-service.js');
var templateIndex 	= require('./index.string');


var page = {
	data : {
		cartInfo : ''
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadCart();
	},
	bindEvent : function(){
		var _this = this;
		// 选择与取消选择
		$(document).on('click','.cart-select', function(){
			var $this = $(this);
			// parent 和 parents不一样
			// parent是父级
			// parents是祖宗
			var productId = $this.parents('.cart-table').data('product-id');
			// 切换
			if ($this.is(':checked')) {
				_cart.selectProduct(productId, function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
			}else{
				_cart.unselectProduct(productId, function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
			}
		});
		// 全选和取消全选
		$(document).on('click','.cart-select-all', function(){
			var $this = $(this);
			
			// 切换
			if ($this.is(':checked')) {
				_cart.selectAllProduct(function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
			}else{
				_cart.unselectAllProduct(function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
				});
			}
		});
		// 数量
		$(document).on('click','.count-btn', function(){
			var $this 		= $(this),
				$pCount		= $this.siblings('.count-input'),
				type 		= $this.hasClass('plus') ? 'plus' : 'minus',
				productId 	= $this.parents('.cart-table').data('product-id'),
				currCount 	= parseInt($pCount.val()),
				minCount 	= 1,
				maxCount 	= parseInt($pCount.data('max')),
				newCount 	= 0;
			if (type === 'plus') {
				if (currCount >= maxCount) {
					_mm.errorTips('以达到上限');
					return;
				}
				newCount = currCount + 1;
			}else if (type === 'minus') {
				if (currCount <= minCount) {
					return;
				}
				newCount = currCount - 1;
			}
			_cart.updateProduct({
					productId: productId,
					count : newCount
				}, function(res){
					_this.renderCart(res);
				}, function(errMsg){
					_this.showCartError();
			});
		});
		//delete single one
		$(document).on('click','.cart-delete', function(){
			if (window.confirm('Are you sure ?')) {
				var productId = $(this).parents('.cart-table').data('product-id');
				_this.deleteCartProduct(productId);
			}
		});
		//delete selected one
		$(document).on('click','.delete-selected', function(){
			if (window.confirm('Are you sure ?')) {
				var arrProductIds = [],
					$selectedItem = $('.cart-select:checked');
				// to get selected product id
				for(var i = 0, iLength = $selectedItem.length; i < iLength; i++){
					arrProductIds.push($($selectedItem[i]).parents('.cart-table').data('product-id'));
				}
				if (arrProductIds.length) {
					_this.deleteCartProduct(arrProductIds.join(','));
				}else{
					_mm.errorTips('Selected product is not found!');
				}
			}
		});
		//submit cart
		$(document).on('click','.btn-submit', function(){
			if (_this.data.cartInfo && _this.data.cartInfo.cartTotalPrice > 0) {
				window.location.href = './order-confirm.html';
			}else{
				_mm.errorTips('Please select product before submit.');
			}
		});
	},
	loadCart : function(){
		var _this = this;
		_cart.getCartList(function(res){
			_this.renderCart(res);
		}, function(errMsg){
			_this.showCartError();
		});
	},
	filter : function(data){
		data.notEmpty = !! data.cartProductVoList.length;
	},
	renderCart : function(data){
		this.filter(data);
		// cache
		this.data.cartInfo = data;
		var cartHtml = _mm.renderHtml(templateIndex, data);
		$('.page-wrap').html(cartHtml);

		// to notice cart to update info in the nav
		nav.loadCartCount();
	},
	showCartError : function(){
		$('.page-wrap').html('<p class="err-tip">Some error ocurrs.</p>');
	},
	//delete target product, 可以批量，productId用逗号分隔
	deleteCartProduct : function(productIds){
		var _this = this;
		_cart.deleteProduct(productIds, function(res){
			_this.renderCart(res);
		}, function(errMsg){
			_this.showCartError();
		});
	}
};

$(function(){
	page.init();
});