var constract = require('../../utils/constract.js');
var app=getApp();
Page({

  data: {
  },
  onLoad: function (options) {
    console.log(options);
    this.setData({
      id:options.id
    })
  },
  onShow: function () {
    var that=this;
    var id = this.data.id;
    console.log(id);
    if (wx.showLoading) {
      wx.showLoading();
    };
    app.Verification(function(token){
      wx.request({
        url: constract.findInvoiceById,
        header: { token: token },
        data: { id: id },
        success: function (res) {
          console.log(res);
          if (wx.hideLoading) {
            wx.hideLoading();
          };
          that.setData({
            detail: res.data.data,
            id: res.data.data.id
          })
        }
      })
    })
  },
  onShareAppMessage:function(res){
    var id=this.data.detail.id;
    return {
      title: '发票帮手',
      path: '/pages/invoice_share/invoice_share?id='+id
  
    }
  }
})