var app = getApp();
var constract = require('../../utils/constract.js');
var proof = require('../../utils/proof.js');
Page({


  data: {
    
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      detail: options
    })
  },
  save:function(e){
    var data=e.detail.value;
    data.id=this.data.detail.id;
    data.type=this.data.detail.type;
    console.log(data);
    if (!proof.trim(data.name)){
      wx.showModal({
        title: '提示',
        content: '姓名或单位名称不能为空!',
        showCancel: false
      });
      return;
    };
    if(data.taxNum){
      if(data.taxNum.length<15){
        wx.showModal({
          title: '提示',
          content: '税号应为15-20位数字或字母!',
          showCancel: false
        });
        return;
      };
      if (!proof.isInvoice(data.taxNum)) {
        wx.showModal({
          title: '提示',
          content: '税号应为15-20位数字或字母!',
          showCancel: false
        });
        return;
      }
    };
    if (wx.showLoading) {
      wx.showLoading();
    };
    app.Verification(function (token) {
      wx.request({
        url: constract.updateInvoiceById,
        header:{token:token},
        data: data,
        success: function (res) {
          console.log(res);
          if (wx.hideLoading) {
            wx.hideLoading();
          };
          wx.navigateBack();
        }
      });
    })
    
  }
})