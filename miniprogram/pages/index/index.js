//index.js
const app = getApp()
// const db = wx.cloud.database()


Page({
  data: {
    
  },

  onLoad: function(options) {
    
  },

  onShow: function () {
    
  },

  // 页面分享设置
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      // title: '来看看我的毛大豆er~',
      path: '/page/index?id=123'
    }
  }

})
