/*
* @Author: yw850
* @Date:   2017-07-20 20:18:19
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-22 14:36:46
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm 			= require('util/mm.js');
var _product		= require('service/product-service.js');
var _cart			= require('service/cart-service.js');
var templateIndex 	= require('./index.string');


var page = {
	data : {
		listParam : {
			productId : _mm.getUrlParam('productId') || ''
		}
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		// 如productId为空，返回首页
		if (!this.data.listParam.productId) {
			_mm.goHome();
		}
		this.loadDetail();
	},
	bindEvent : function(){
		// 用异步通信，所以加载后再绑定是绑不上的
		// 所以要用事件代理
		var _this = this;
		// 这个版本jQuery不支持on 'hover'的形式
		// 只能用mouseenter
		// 图片hover
		$(document).on('mouseenter','.p-img-item',function(){
			var imageUrl = $(this).find('.p-img').attr('src');
			$('.main-img').attr('src',imageUrl);
		});
		// 加减数量
		$(document).on('click','.p-count-btn',function(){
			var type = $(this).hasClass('plus') ? 'plus' : 'minus';
			var $pCount = $('.p-count');
			var currCount = parseInt($pCount.val());
			var minCount = 1;
			var maxCount = _this.data.detailInfo.stock || 1;
			if (type === 'plus') {
				$pCount.val(currCount < maxCount ? currCount + 1 : maxCount);
			}
			else if (type === 'minus') {
				$pCount.val(currCount > minCount ? currCount - 1 : minCount);
			}
		});
		// 加入购物车
		$(document).on('click','.cart-add',function(){
			_cart.addToCart({
				productId : _this.data.listParam.productId,
				count     :$('.p-count').val()
			}, function(res){
				window.location.href = './result.html?type=cart-add';
			}, function(errMsg){
				_mm.errTips(errMsg);
			});
		});

	},
	loadDetail : function(){
		var _this = this;
		var html = '';
		var $pagewrap = $('.page-wrap');
		//loading
		$pagewrap.html('<div class="loading"></div>');
		//request deail info
		_product.getProductDetail(this.data.listParam.productId, function(res){
			_this.filter(res);
			_this.data.detailInfo = res;
			html = _mm.renderHtml(templateIndex, res);
			$pagewrap.html(html);
		}, function(errMsg){
			$pagewrap.html('<p class="err-tip">此商品太淘气，找不到了</p>');
		});
	},
	//切割用','链接的subimage
	// 注意引用类型
	filter : function(data){
		data.subImages = data.subImages.split(',');
	}
};

$(function(){
	page.init();
});