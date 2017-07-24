/*
* @Author: yw850
* @Date:   2017-07-24 12:08:45
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-24 13:45:44
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var navSide			= require('page/common/nav-side/index.js');
var _mm 			= require('util/mm.js');
var _order 			= require('service/order-service.js');
var templateIndex 	= require('./index.string');
var Pagination 		= require('util/pagination/index.js');

// page逻辑部分
var page = {
	data : {
		listParam : {
			pageNum : 1,
			pageSize : 2
		}
	},
	init : function(){
		this.onLoad();
	},
	onLoad : function(){
		this.loadOrderList();

		navSide.init({
			name: 'order-list'
		});
	},
	loadOrderList : function(){
		var orderListHtml = '',
			_this = this,
			$listCon = $('.order-list-con');

		// loading icon
		$listCon.html('<div class="loading"></div>');

		_order.getOrderList(this.data.listParam, function(res){
			// _this.dataFilter(res);
			// render
			orderListHtml = _mm.renderHtml(templateIndex, res);
			$listCon.html(orderListHtml);

			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage 		: res.prePage,
				hasNextPage 	: res.hasNextPage,
				nextPage 		: res.nextPage,
				pageNum 		: res.pageNum,
				pages 			: res.pages
			});
		}, function(errMsg){
			$listCon.html('<p class="err-tip">加载订单失败，请刷新后重试</p>');
		});
	},
	// dataFilter : function(data){
	// 	data.isEmpty = !data.list.length;
	// },
	loadPagination : function(pageInfo){
		//用类的形式而不用对象的形式， 这样的好处是
		// 在同一个页面有两个pagination是不会相互干扰
		//先判断是否new过
		var _this = this;
		this.pagination ? '' : (this.pagination = new Pagination());
		this.pagination.render($.extend({}, pageInfo, {
			container : $('.pagination'),
			onSelectPage : function(pageNum){
				_this.data.listParam.pageNum = pageNum;
				_this.loadOrderList();
			}
		}));
	}
};
$(function(){
	page.init();
});