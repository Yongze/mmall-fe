/*
* @Author: yw850
* @Date:   2017-07-12 22:28:36
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 15:48:01
*/
'use strict';
require('./index.css');
require('page/common/header/index.js');
require('util/slider/index.js');
require('page/common/nav/index.js');
var navSide         = require('page/common/nav-side/index.js');
var templateBanner  = require('./banner.string');
var _mm             = require('util/mm.js');
var templateNotice  = require('page/index/notice.string');

$(function() {
	//渲染banner的html
	var bannerHtml 	= _mm.renderHtml(templateBanner);
	$('.banner-con').html(bannerHtml);
	//初始化banner
    var $slider 	= $('.banner').unslider({
    	dots: true
    });
    //prev, next 事件绑定
    $('.banner-con .banner-arrow').click(function(){
    	var forword = $(this).hasClass('prev') ? 'prev' : 'next';
    	$slider.data('unslider')[forword]();
    })

    // show modal
    var $modalWrap = $('.index-modal')
    $modalWrap.html(templateNotice);
    $modalWrap.find('.modal-container').click(function(e){
            e.stopPropagation();
        });
    $modalWrap.find('.close').click(function(){
            $modalWrap.empty();
        });

});



// _mm.request({
// 	url	: '/product/list.do?keyword=1',
// 	success	:function(res){
// 		console.log(res);
// 	},
// 	error	:function(errMsg){
// 		console.log(errMsg);
// 	}
// });
// console.log(_mm.getUrlParam("test"));
// var html = "<div>{{data}}</div>";
// var data = {
// 	data : 123
// }
// console.log(_mm.renderHtml(html, data));