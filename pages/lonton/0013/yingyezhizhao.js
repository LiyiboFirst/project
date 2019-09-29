var Parser=require('../../../lib/dom-parser.js')
var app=getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    tempFilePaths: 'img/hit.png' ,
    
    list:[
      

      {
        "key": "注册号",
        "value": "4420007575520910"
      },
      {
        "key": "类型",
        "value": "个人独资企业"
      },
      {
        "key": "住所",
        "value": "深圳市小榄镇绩东一裕联路5号首层之"
      },
      {
        "key": "投资人",
        "value": "赵工厂大道"
      },
      {
        "key": "成立日期",
        "value": "2018年07月17日"
      },
      {
        "key": "经营范围",
        "value": "生产、销售:机械设备;销售:喷砂机及其配件、加防腐剂焦恩俊。)"
      }


    ]
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
        console.log(ssss)
        //调用识别方法
        that.submit()
           
      },
    })    
  },

  //识别
  submit: function () {
    var that = this;
    //method中设置想要调用的方法名
    var method = 'ocr';
    //wsdlurl中设置需要访问的webService的url地址
   // var wsdlurl = 'http://smartaiocr:8080/service/api?wsdl';

    var wsdlurl ="http://10.8.0.173:9000/service/api?wsdl";
    var targetNamespace = 'http://smartai.webservice.lonton.com/';
    //datacopy中拼接字符串，即http传输中的soap信息
    var datacopy = '<?xml version="1.0" encoding="utf-8"?>';
    datacopy += '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:ser="http://smartai.webservice.lonton.com/">';
    datacopy += '<soapenv:Header/>';
    datacopy += '<soapenv:Body>';
    datacopy += '<ser:ocr>';
    datacopy += '<arg0>';
    datacopy += '<fileData>' + app.globalData.base64Str + '</fileData>';
    datacopy += '<fileSuffix>jpg</fileSuffix>';
    datacopy += '<ocrType>0013</ocrType>';
    datacopy += '</arg0>';
    datacopy += '</ser:ocr>';
    datacopy += '</soapenv:Body>';
    datacopy += '</soapenv:Envelope>';

    wx.request({
      url: wsdlurl,
      data: datacopy,
      method: 'POST',
      header: {
        'Content-type': 'text/xml;charset=utf-8',
        'SOAPAction': targetNamespace + method,
      },
      //接口调用成功后，回调函数(携带处理后的结果)
      success: function (res) {
        console.log('success')
        console.log(res)
       var parser=new Parser.DOMParser();
       var xmlDoc=parser.parseFromString(res.data,"text/xml");
       var resultJson=xmlDoc.getElementsByTagName('resultJson')[0];
       console.log(resultJson)
       console.log(resultJson.firstChild.nodeValue);
       var jsond=JSON.parse(resultJson.firstChild.nodeValue);
       that.setData({ 
          list: jsond.ocr[0].elements[0]
       })
        console.log('44444')
       
      },
      fail: function () {
        console.log('fail')
      }
    })
  }

})