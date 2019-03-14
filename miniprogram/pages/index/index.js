import api from '../../api/api.js'
const app = getApp()
// const db = wx.cloud.database()


Page({
  data: {
    swipers: [
      'https://i8.mifile.cn/v1/a1/86b2778b-03be-856f-833c-3b58342dbfae!720x360.webp',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ]
  },

  onLoad: function(options) {
    api.getHomePageData({
      success: res => {
        console.log(res)
        this.setData({
          swipers: res.swiper
        })
      }
    })
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
