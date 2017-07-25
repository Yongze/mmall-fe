/*
* @Author: yw850
* @Date:   2017-07-20 01:30:34
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-20 20:22:14
*/

'use strict';
require('./index.css')
require('page/common/header/index.js');
require('page/common/nav/index.js');
var _mm 			= require('util/mm.js');
var Pagination 		= require('util/pagination/index.js');
var _product		= require('service/product-service.js');
var templateIndex 	= require('./index.string');

var page = {
	data : {
		listParam : {
			keyword 	: _mm.getUrlParam('keyword') || '',
			categoryId 	: _mm.getUrlParam('categoryId') || '',
			orderBy 	: _mm.getUrlParam('orderBy') || 'default',
			pageNum 	: _mm.getUrlParam('pageNum') || 1,
			pageSize 	: _mm.getUrlParam('pageSize') || 2
		}
	},
	init : function(){
		this.onLoad();
		this.bindEvent();
	},
	onLoad : function(){
		this.loadList();
	},
	bindEvent : function(){
		var _this = this;
		//排序点击事件
		$('.sort-item').click(function(){
			//设置jQuery缓存,效率高
			var $this = $(this);

			_this.data.listParam.pageNum = 1;

			//点击默认排序
			if ($this.data('type') === 'default') {
				if ($this.hasClass('active')) {
					return;
				}else{
					$this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
					_this.data.listParam.orderBy = 'default';
				}
			}
			//点击价格排序
			else if ($this.data('type') === 'price') {
				// active class处理
				$this.addClass('active').siblings('.sort-item').removeClass('active desc asc');
				// 升序降序处理
				if (!$this.hasClass('asc')) {
					$this.addClass('asc').removeClass('desc');
					_this.data.listParam.orderBy = 'price_asc';
				}else{
					$this.addClass('desc').removeClass('asc');
					_this.data.listParam.orderBy = 'price_desc';
				}
			}
			//重新加载列表
			_this.loadList();
		});
	},
	loadList : function(){
		var listParam = this.data.listParam;
		var listHtml = '';
		var _this = this;

		 var $pListCon = $('.p-list-con');
		 $pListCon.html('<div class="loading"></div>');



		//删除多余参数
		// delete (listParam.categoryId ? listParam.keyword : listParam.categoryId);
		listParam.categoryId ? (delete listParam.keyword) : (delete listParam.categoryId);

		//请求接口
		_product.getProductList(listParam, function(res){
			listHtml = _mm.renderHtml(templateIndex, {
				list : res.list
			});
			$pListCon.html(listHtml);
			_this.loadPagination({
				hasPreviousPage : res.hasPreviousPage,
				prePage 		: res.prePage,
				hasNextPage 	: res.hasNextPage,
				nextPage 		: res.nextPage,
				pageNum 		: res.pageNum,
				pages 			: res.pages
			});
		}, function(errMsg){
			_mm.errorTips(errMsg);
		});

	},
	//加载分页信息
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
				_this.loadList();
			}
		}));
	}
};

$(function(){
	page.init();
});