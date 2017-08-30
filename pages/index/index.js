var app = getApp();
var constract = require('../../utils/constract.js');
Page({

  data: {

  },
  onShow: function () {
    var that=this;
    if (wx.showLoading) {
      wx.showLoading();
    };
    app.Verification(function (token) {
      wx.request({
        url: constract.findAllInvoice,
        header: { token:token},
        success: function (res) {
          if (wx.hideLoading) {
            wx.hideLoading();
          };
          if(!res.data.data.length){
            wx.redirectTo({
              url: '/pages/add_invoice/add_invoice'
            })
          }
          that.setData({
            invoice: res.data.data
          })

        }
      })
    })
  },
  delete: function (e) {
    var that = this;
    var id = e.target.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除么？',
      success: function (res) {
        if (res.confirm) {
          if (wx.showLoading) {
            wx.showLoading();
          };
          app.Verification(function (token) {
            wx.request({
              url: constract.deleteInvoiceByid,
              header:{token:token},
              data: { id: id },
              success: function (res) {
                wx.request({
                  url: constract.findAllInvoice,
                  header: { token: token },
                  success: function (res) {
                    if (wx.hideLoading) {
                      wx.hideLoading();
                    };
                    if (!res.data.data.length) {
                      wx.redirectTo({
                        url: '/pages/add_invoice/add_invoice'
                      })
                    };
                    that.setData({
                      invoice: res.data.data
                    })
                  }
                })
              }
            })
          })         
        }
      }
    })
  },

  touchstart: function (e) {
    var list = this.data.invoice;
    var index = e.currentTarget.dataset.index;
    if (e.touches.length == 1) {
      for (var i = 0; i < list.length; i++) {
        if (i != index) {
          list[i].txtStyle = "left:0px";
        }
      };
      this.setData({
        startX: e.touches[0].clientX,
        invoice:list
      })
    }
  },
  touchmove: function (e) {
    var that = this;
    if (e.touches.length == 1) {
      var moveX = e.touches[0].clientX;
      var disX = that.data.startX - moveX;
      var txtStyle = '';
      if (disX == 0 || disX < 0) {
        txtStyle = "left:0px";
      } else if (disX > 0 && disX < 50) {
        txtStyle = "left:-" + disX + "px";
      } else {
        txtStyle = "left:-120rpx";
      }
      var index = e.currentTarget.dataset.index;
      var list = this.data.invoice;
      list[index].txtStyle = txtStyle;
      this.setData({
        invoice: list
      })
    };
  },
  touchend: function (e) {
    if (e.changedTouches.length == 1) {
      var endX = e.changedTouches[0].clientX;
      var disX = this.data.startX - endX;
      var txtStyle = disX > 50 ? "left:-120rpx" : "left:0px";
      var index = e.currentTarget.dataset.index;
      var list = this.data.invoice;
      list[index].txtStyle = txtStyle;
      this.setData({
        invoice: list
      })
    }
  }
})