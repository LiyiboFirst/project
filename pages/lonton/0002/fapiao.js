var Parser = require('../../../lib/dom-parser.js')
var app = getApp()
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
        //选择图片后，打印图片路径到Console
        console.log(res.tempFilePaths)
        var app = getApp();
        var ssss = wx.getFileSystemManager().readFileSync(tempFilePaths[0], "base64")
        app.globalData.base64Str = ssss
        //调用识别方法
        that.submit()
      },
    })
  },

  //识别
  submit: function () {
    var app = getApp();
    var that = this;
    //method中设置想要调用的方法名
    var method = 'ocr';
    //wsdlurl中设置需要访问的webService的url地址
    var wsdlurl = app.globalData.wsdlurl;
  //  var wsdlurl = "http://10.8.0.173:9000/service/api?wsdl";
    var targetNamespace = 'http://webservice.smartaiocr.lonton.com/';
    //datacopy中拼接字符串，即http传输中的soap信息
    var datacopy = '<?xml version="1.0" encoding="utf-8"?>';
    datacopy += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://webservice.smartaiocr.lonton.com/">';
    datacopy += '<soapenv:Header/>';
    datacopy += '<soapenv:Body>';
    datacopy += '<ser:ocr>';
    datacopy += '<arg0>';
    datacopy += '<fileData>' + app.globalData.base64Str + '</fileData>';
    datacopy += '<fileSuffix>jpg</fileSuffix>';
    datacopy += '<ocrType>0002</ocrType>';
    datacopy += '</arg0>';
    datacopy += '</ser:ocr>';
    datacopy += '</soapenv:Body>';
    datacopy += '</soapenv:Envelope>';

    wx.request({
      url: wsdlurl,
      data: datacopy,
      method: 'POST',
      header: {
        //'content-type':'application/x-www-form-urlencoded',
        'Content-type': 'text/xml;charset=utf-8',
        'SOAPAction': targetNamespace + method,
      },
      //接口调用成功后，回调函数(携带处理后的结果)
      success: function (res) {
        console.log('success')

        var parser = new Parser.DOMParser();
        var xmlDoc = parser.parseFromString(res.data, "text/xml");
        var resultJson = xmlDoc.getElementsByTagName('resultJson')[0];
    console.log(resultJson.firstChild.nodeValue);
        var jsond = JSON.parse(resultJson.firstChild.nodeValue);
        that.setData({
          list: jsond.ocr[0].elements[0]
        })
      },
      fail: function () {
        console.log('fail')
      }
    })
  }

})