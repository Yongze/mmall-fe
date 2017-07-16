/*
* @Author: yw850
* @Date:   2017-07-17 00:16:58
* @Last Modified by:   yw850
* @Last Modified time: 2017-07-17 00:48:05
*/

'use strict';
require('./index.css');
require('page/common/nav-simple/index.js');
var _mm = require('util/mm.js');

$(function(){
	var type = _mm.getUrlParam('type') || 'default', $element = $('.' + type + '-success');
	$element.show();
})