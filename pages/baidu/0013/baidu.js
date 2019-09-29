// var Parser = require('../../lib/dom-parser.js')
var app=getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
      
  },

  //选择图片
  choose: function () {
    var that = this
    wx.chooseImage({
      count: 1,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: function (res) {
        var tempFilePaths = res.tempFilePaths
        that.setData({
          tempFilePaths: res.tempFilePaths
        })
        var ssss = wx.getFileSystemManager().readFileSync(tempFilePaths[0], "base64")
        app.globalData.base64Str = ssss
        console.log(ssss)
        //调用识别方法
        that.submit()
      },
    })
  },

  //识别
  submit: function () {
     var that=this
    var wsdlurl = "https://aip.baidubce.com/rest/2.0/ocr/v1/business_license?access_token=24.543563465d5973aaead9f722cc1f68b3.2592000.1572081126.282335-16726956";
    wx.request({
      url: wsdlurl,
      data: {
        'image': app.globalData.base64Str
      },
      method: 'POST',
      header: {
        'content-type': 'application/x-www-form-urlencoded',
      },
      success: function (res) {
        console.log(res.data.words_result)
        that.setData({
             list:res.data.words_result,
         
        })
        console.log('success')
      },
      fail: function () {
        console.log('fail')
      },
      complete: function () {
        console.log('complete')
      }
    })
   
  }

})