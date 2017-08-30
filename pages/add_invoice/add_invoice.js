var app = getApp();
var constract = require('../../utils/constract.js');
var proof = require('../../utils/proof.js');
Page({

  data: {
    typeTit:["个人","单位"],
    select:0,
    close:true
  },
  onLoad: function (options) {
    
  },
  SelectType:function(e){
    console.log(e);
    var index=e.target.dataset.index;
    this.setData({
      select:index
    })
  },
  SelectRise:function(){
    var that = this;
    if (wx.showLoading) {
      wx.showLoading();
    }
    app.Verification(function (token) {
      wx.request({
        url: constract.findAllInvoice,
        header: { token: token },
        success: function (res) {
          console.log(res);
          if (wx.hideLoading) {
            wx.hideLoading();
          };
          that.setData({
            invoice: res.data.data,
            close: false
          })

        }
      })
    }); 
  },
  confirmInvoice:function(e){
    var that=this;
    console.log(e);
    var id = e.currentTarget.dataset.id;
    console.log(id);
    app.Verification(function (token) {
      wx.request({
        url: constract.findInvoiceById,
        header:{token:token},
        data: {id: id},
        success: function (res) {
          console.log(res.data.data.type);
          if (res.data.data.type == 1) {
            that.setData({
              person: res.data.data,
              select: 0,
              close: true

            })
          } else if (res.data.data.type == 2) {
            that.setData({
              detail: res.data.data,
              select: 1,
              close: true

            })
          }
        }
      })
    }); 
    
  },
  Closed:function(){
    this.setData({
      close: true
    })
  },
  addSave:function(e){
    console.log(e);
    var data = e.detail.value;
    data.type = this.data.select+1;
    console.log(data);
    if (!proof.trim(data.name)) {
      wx.showModal({
        title: '提示',
        content: '姓名或单位名称不能为空!',
        showCancel: false
      });
      return;
    };
    if (data.taxNum) {
      if (data.taxNum.length < 15) {
        wx.showModal({
          title: '提示',
          content: '税号应为15-20位数字或字母!',
          showCancel: false
        });
        return;
      };
      if (!proof.isInvoice(data.taxNum)){
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
    }
    app.Verification(function (token) {
      wx.request({
        url: constract.insertInvoice,
        header: { token:token},
        data: data,
        success: function (res) {
          if (wx.hideLoading) {
            wx.hideLoading();
          };
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }
      })
    })
    
  }
})