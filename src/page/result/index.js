/*
* @Author: yw850
* @Date:   2017-07-17 00:16:58
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-24 18:50:59
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default', $element = $('.' + type + '-success');
	$element.show();
	if (type === 'payment') {
		var $orderNumber = $element.find('.order-number');
		var orderNumber = _mm.getUrlParam('orderNumber');
		$orderNumber.attr('href', $orderNumber.attr('href') + orderNumber);
	}
})