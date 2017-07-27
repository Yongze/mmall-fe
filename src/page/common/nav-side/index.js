/*
* @Author: yw850
* @Date:   2017-07-16 21:45:18
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-27 13:26:05
*/

'use strict';
require('./index.css');
var _mm 			= require('util/mm.js');
var templateIndex 	= require('./index.string');
//侧边导航
var navSide = {
	option: {
		name: '',
		navList: [
			{name : 'user-center',desc : 'Profile', href :'./user-center.html'},
			{name : 'order-list',desc : 'My order', href :'./order-list.html'},
			{name : 'user-pass-update',desc : 'Reset pass', href :'./user-pass-update.html'},
			{name : 'about',desc : 'About MMall', href :'./about.html'}
		]
	},
	init: function(option){
		//合并选项
		$.extend(this.option, option);
		this.renderNav();
	},
	//渲染导航菜单
	renderNav: function(){
		//计算active数据
		for(var i = 0, iLength = this.option.navList.length; i < iLength; i++){
			if (this.option.navList[i].name === this.option.name) {
				this.option.navList[i].isActive = true;
			}
		}
		//渲染list数据
		var navHtml = _mm.renderHtml(templateIndex, {
			navList : this.option.navList
		});
		//把HTML放入容器
		$('.nav-side').html(navHtml);
	}
};
module.exports = navSide;