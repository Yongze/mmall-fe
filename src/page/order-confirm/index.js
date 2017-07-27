/*
* @Author: yw850
* @Date:   2017-07-23 11:38:45
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 13:22:27
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm 			= require('util/mm.js');
var _order			= require('service/order-service.js');
var _address		= require('service/address-service.js');
var templateProduct	= require('./product-list.string');
var templateAddress	= require('./address-list.string');
var addressModal	= require('./address-modal.js');

var page = {
	data : {
		selectedAddressId : null
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadAddressList();
		this.loadProductList();
	},
	bindEvent : function(){
		var _this = this;
		// 地址选择
		$(document).on('click','.address-item', function(){
			$(this).addClass('active').siblings('.address-item').removeClass('active');
			_this.data.selectedAddressId = $(this).data('id');
		});
		// 订单提交
		$(document).on('click','.order-submit', function(){
			var shippingId = _this.data.selectedAddressId;
			if (shippingId) {
				_order.createOrder({
					shippingId : shippingId
				}, function(res){
					window.location.href = './payment.html?orderNumber=' + res.orderNo;
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}else{
				_mm.errorTips('Please choose an address before submit');
			}
		});
		// 地址添加
		$(document).on('click','.address-add', function(){
			addressModal.show({
				isUpdate : false,
				onSuccess : function(){
					_this.loadAddressList();
				}
			});
		});
		// 地址编辑
		$(document).on('click','.address-update', function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');
			_address.getAddress(shippingId, function(res){
				addressModal.show({
					isUpdate 	: true,
					data	 	: res,
					onSuccess 	: function(){
						_this.loadAddressList();
					}
				});
			}, function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
		// 地址删除
		$(document).on('click','.address-delete', function(e){
			e.stopPropagation();
			var shippingId = $(this).parents('.address-item').data('id');

			if (!window.confirm('Are you sure ?')) {
				return;
			}

			// delete在ie8是专用字，高版本browser没问题
			_address.deleteAddress(shippingId, function(res){
				_this.loadAddressList();
			}, function(errMsg){
				_mm.errorTips(errMsg);
			});
		});
	},
	loadAddressList : function(){
		var _this = this;

		//loading icon
		$('.address-con').html('<div class="loading"></div>');
		
		_address.getAddressList(function(res){
			_this.addressFilter(res);
			var addressListHtml = _mm.renderHtml(templateAddress, res);
			$('.address-con').html(addressListHtml);
		}, function(errMsg){
			$('.address-con').html('<p class="err-tip">Fail to load address, please reload</p>');
		});
	},
	loadProductList : function(){
		var _this = this;

		//loading icon
		$('.product-con').html('<div class="loading"></div>');

		_order.getProductList(function(res){
			var productListHtml = _mm.renderHtml(templateProduct, res);
			$('.product-con').html(productListHtml);
		}, function(errMsg){
			$('.product-con').html('<p class="err-tip">Fail to load goods, please reload</p>');
		});
	},
	// reload地址后，保留选中状态
	addressFilter : function(data){
		if (!this.data.selectedAddressId) {
			return;
		}

		var selectedAddressIdFlag = false;
		for (var i = 0, length = data.list.length; i < length; i++) {
			if (data.list[i].id === this.data.selectedAddressId) {
				data.list[i].isActive  = true;
				selectedAddressIdFlag = true;
			}
		}
		// 入选中地址不在列表，清空
		if (!selectedAddressIdFlag) {
			this.data.selectedAddressId = null;
		}
	},
};

$(function(){
	page.init();
});