var constract = require('../../utils/constract.js');
var app = getApp();
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
    console.log('分享');
    console.log(id);
    if (wx.showLoading) {
      wx.showLoading();
    };
    app.Verification(function(token){
      wx.request({
        url: constract.saveInvoiceByShare,
        header:{token:token},
        data: {oldId:id },
        success: function (res) {
          console.log(res);
          if(res.data.data.from){
            that.setData({
              from: res.data.data.from
            });
            wx.request({
              url: constract.findInvoiceById,
              header: { token: token },
              data: { id: res.data.data.id },
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
          }else {
            wx.request({
              url: constract.findInvoiceById2,
              header:{token:token},
              data: { id: res.data.data.id},
              success:function(res){
                if (wx.hideLoading) {
                  wx.hideLoading();
                };
                console.log(res);
                that.setData({
                  detail: res.data.data
                })
              }
            })
          }
          
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