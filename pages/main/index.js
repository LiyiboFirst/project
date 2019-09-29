var app=getApp()
Page({
  data: {  
  },
  getImg1: function (options) {

    if (app.globalData.version==1){
       wx.navigateTo({
         url: '../lonton/0013/yingyezhizhao',
       })
     }else{
      wx.navigateTo({
         url: '../baidu/0013/baidu',
       })
     } 
  },
  getImg2: function (options) {

    if (app.globalData.version == 1) {
      wx.navigateTo({
        url: '../lonton/0001/caibao',
      })
    } else {
      wx.navigateTo({
        url: '../baidu/0013/baidu',
      })
    }
  },
  getImg3: function (options) {

    if (app.globalData.version == 1) {
      wx.navigateTo({
        url: '../lonton/0002/fapiao',
      })
    } else {
      wx.navigateTo({
        url: '../baidu/0002/baidu',
      })
    }
  },

  getImg4: function (options) {

    if (app.globalData.version == 1) {
      wx.navigateTo({
        url: '../lonton/0003/fangchanzheng',
      })
    } else {
      wx.navigateTo({
        url: '../baidu/0002/baidu',
      })
    }
  },
  getImg6: function (options) {

    if (app.globalData.version == 1) {
      wx.navigateTo({
        url: '../lonton/0004/budongchanzheng',
      })
    } else {
      wx.navigateTo({
        url: '../baidu/0002/baidu',
      })
    }
  },
  getImg13: function (options) {

    if (app.globalData.version == 1) {
      wx.navigateTo({
        url: '../lonton/0014/hetong',
      })
    } else {
      wx.navigateTo({
        url: '../baidu/0002/baidu',
      })
    }
  }

})