/*
* @Author: yw850
* @Date:   2017-07-23 20:26:11
* @Last Modified by:   yw850
* @Last Modified time: 2017-08-03 01:28:06
*/

'use strict';
var _mm 					= require('util/mm.js');
var _address				= require('service/address-service.js');
// var _cities					= require('util/cities/index.js');//China address
var _cities					= require('util/cities/address.js');//Australia address
var templateAddressModal	= require('./address-modal.string');

var addressModal = {
	show : function(option){
		// option绑定
		this.option 		= option;
		this.option.data 	= option.data || {};
		this.$modalWrap 	= $('.modal-wrap');
		// 渲染页面
		this.loadModal();
		// 绑定事件
		this.bindEvent();
	},
	hide : function(){
		this.$modalWrap.empty();	
	},
	loadModal : function(){
		var addressModalHtml = _mm.renderHtml(templateAddressModal, {
			isUpdate : this.option.isUpdate,
			data	 : this.option.data
		});
		this.$modalWrap.html(addressModalHtml);
		// 加载省份城市
		this.loadProvince();
		// this.loadCities();

	},
	bindEvent : function(){
		var _this = this;
		// 省份和城市的二级联动
		this.$modalWrap.find('#receiver-province').change(function(){
			var selectedProvince = $(this).val();
			_this.loadCities(selectedProvince);
		});
		// 提交收货地址
		this.$modalWrap.find('.address-btn').click(function(){
			var receiverInfo = _this.getReceivcerInfo(),
				isUpdate	 = _this.option.isUpdate;
				// 使用新地址且验证通过
			if (!isUpdate && receiverInfo.status) {
				_address.save(receiverInfo.data, function(res){
					_mm.successTips('Succeed to add new address');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			// 更新收件人. 并且验证通过
			else if (isUpdate && receiverInfo.status) {
				_address.update(receiverInfo.data, function(res){
					_mm.successTips('Succeed to edit address');
					_this.hide();
					typeof _this.option.onSuccess === 'function' && _this.option.onSuccess(res);
				}, function(errMsg){
					_mm.errorTips(errMsg);
				});
			}
			// 验证不通过
			else{
				_mm.errorTips(receiverInfo.errMsg || 'The addres is not valid.');
			}
		});
		// 避免点击modal区时关闭窗口
		this.$modalWrap.find('.modal-container').click(function(e){
			e.stopPropagation();
		});
		// 点击关闭弹窗
		this.$modalWrap.find('.close').click(function(){
			_this.hide();
		});
	},
	loadProvince : function(){
		var provinces = _cities.getProvinces() || [],
			$provinceSelect = this.$modalWrap.find('#receiver-province');
		$provinceSelect.html(this.getSelectOption(provinces, 'STATE'));

		//如果更新地址并且有省份,做省份回填
		if (this.option.isUpdate && this.option.data.receiverProvince) {
			// set province selection list to the selected option
			$provinceSelect.val(this.option.data.receiverProvince);
			this.loadCities(this.option.data.receiverProvince);
		}
	},
	loadCities : function(provinceName){
		var cities 			= _cities.getCities(provinceName) || [],
			$citySelect 	= this.$modalWrap.find('#receiver-city');
		$citySelect.html(this.getSelectOption(cities, 'CITY')); 

		//如果更新地址并且有city,做city回填
		if (this.option.isUpdate && this.option.data.receiverCity) {
			// set city selection list to the selected option
			$citySelect.val(this.option.data.receiverCity);
		}
	},
	// 获取select框的选项
	getSelectOption : function(optionArray, type){
		var html = '<option value="">--' +  type + '--</option>';
		for (var i = 0, iLength = optionArray.length; i < iLength; i++) {
			html +=	'<option value=' + optionArray[i] + '>' + optionArray[i]  + '</option>'
		}
		return html;
	},
	getReceivcerInfo : function(){
		var receiverInfo = {},
			result		 = {
				status : false
			};
		receiverInfo.receiverName 		= $.trim(this.$modalWrap.find('#receiver-name').val());
		receiverInfo.receiverProvince 	= this.$modalWrap.find('#receiver-province').val();
		receiverInfo.receiverCity 		= this.$modalWrap.find('#receiver-city').val();
		receiverInfo.receiverMobile 	= $.trim(this.$modalWrap.find('#receiver-phone').val());
		receiverInfo.receiverAddress 	= $.trim(this.$modalWrap.find('#receiver-address').val());
		receiverInfo.receiverZip 		= $.trim(this.$modalWrap.find('#receiver-zip').val());

		// 添加receiver id
		if (this.option.isUpdate) {
			receiverInfo.id 			= this.$modalWrap.find('#receiver-id').val();
		}

		// 验证
		if (!receiverInfo.receiverName) {
			result.errMsg = 'Please enter receiver name';
		}else if(!receiverInfo.receiverProvince){
			result.errMsg = 'Please select the state';
		}else if(!receiverInfo.receiverCity){
			result.errMsg = 'Please select the city/suburb';
		}else if(!receiverInfo.receiverMobile){
			result.errMsg = 'Please enter phone number';
		}else if(!receiverInfo.receiverAddress){
			result.errMsg = "Please enter receiver's detailed address";
		}else{
			result.status = true;
			result.data   = receiverInfo;
		}
		return result;
	}
};
module.exports = addressModal;