import api from '../../api/api.js'
const app = getApp()
// const db = wx.cloud.database()


Page({
  data: {
    swipers: [
      {
        "info": "swiper1",
        "src": "https://i8.mifile.cn/v1/a1/86b2778b-03be-856f-833c-3b58342dbfae!720x360.webp",
        "url": "/pages/anyChat/anyChat",
        "openType": "switchTab"
      },
      {
        "info": "swiper1",
        "src": "https://i8.mifile.cn/v1/a1/b7e7e28b-a4e7-def3-a004-d40b9da7706a!720x360.webp",
        "url": "/pages/anyChat/anyChat",
        "openType": "switchTab"
      },
      {
        "info": "swiper1",
        "src": "https://i8.mifile.cn/v1/a1/649e9979-217b-8477-6240-e033677ab4ee!720x360.webp",
        "url": "/pages/anyChat/anyChat",
        "openType": "switchTab"
      }
    ],
    multiCell: [
      {
        "info": "红米Note7",
        "url": "",
        "openType": "",
        "src": "https://i8.mifile.cn/v1/a1/7cfd4ddc-3df8-2d5a-13d3-fcda4364b478!358x508.webp"
      },
      {
        "info": "智能新品爆款",
        "url": "",
        "src": "https://i8.mifile.cn/v1/a1/4be6beae-c18c-799c-19bd-30c620814969!358x252.webp"
      },
      {
        "info": "小米电视特惠",
        "url": "",
        "src": "https://i8.mifile.cn/v1/a1/68dfcbb2-e66f-00c7-e287-edbff49674d0!358x252.webp"
      }
    ],
    programa: [
      {
        "classify": "phone",
        "banner": {
          "info": "小米8 SE",
          "url": "",
          "src": "https://i8.mifile.cn/v1/a1/5df15531-f43d-4255-7e2b-006c7e19ef12!720x440.webp"
        },
        "list": [
          {
            "title": "小米8 青春版",
            "dec": "2400万旗舰自拍",
            "currentPrice": "1499",
            "price": "1699",
            "priceDec": "起",
            "src": "https://i8.mifile.cn/v1/a1/1c3e0097-73a6-1788-96f7-2cdb58d82ba1!360x360.webp",
            "url": ""
          },
          {
            "title": "小米8 屏幕指纹版",
            "dec": "压感屏幕指纹，手持超级夜景",
            "currentPrice": "2499",
            "price": "2999",
            "priceDec": "起",
            "src": "https://i8.mifile.cn/v1/a1/5c55b30b-abd9-3a52-7f8b-7322d288835d!360x360.webp",
            "url": ""
          },
          {
            "title": "黑鲨游戏手机 Helo",
            "dec": "双液冷，更能打",
            "currentPrice": "3199",
            "price": "3499",
            "priceDec": "起",
            "src": "https://i8.mifile.cn/v1/a1/def98121-4b54-54a6-debb-e5c8a51dd4f7!360x360.webp",
            "url": ""
          },
          {
            "title": "红米6",
            "dec": "小屏高性能的双摄手机",
            "currentPrice": "729",
            "price": "799",
            "priceDec": "起",
            "src": "https://i8.mifile.cn/v1/a1/a081da10-3758-e051-7a20-0de017f37476!360x360.webp",
            "url": ""
          },
          {
            "title": "红米6A",
            "dec": "好看耐用/轻巧省心",
            "currentPrice": "549",
            "price": "599",
            "priceDec": "起",
            "src": "https://i8.mifile.cn/v1/a1/2c506517-9477-c928-8e77-bee18b6818a1!360x360.webp",
            "url": ""
          },
          {
            "title": "小米6X",
            "dec": "轻薄美观的拍照手机",
            "currentPrice": "1249",
            "price": "1799",
            "priceDec": "起",
            "src": "https://i8.mifile.cn/v1/a1/bd9b6895-5b51-a0d6-fb79-e430ca40dca6!360x360.webp",
            "url": ""
          },
          {
            "title": "小米Play",
            "dec": "一年流量放心用",
            "currentPrice": "1099",
            "price": "",
            "priceDec": "",
            "src": "https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/a183eae8ce729005a1e1bf2907f6d51d.png?thumb=1&w=360&h=360",
            "url": ""
          },
          {
            "title": "小米平板4",
            "dec": "大屏、长续航、超薄电脑",
            "currentPrice": "1099",
            "price": "",
            "priceDec": "起",
            "src": "https://i8.mifile.cn/v1/a1/a3005732-76c4-0c24-c311-6caf9913bc7c!360x360.webp",
            "url": ""
          }
        ]
      }
    ],
  },

  onLoad: function(options) {
    // api.getHomePageData({
    //   success: res => {
    //     console.log(res)
    //     this.setData({
    //       swipers: res.swiper,
    //       multiCell: res.multiCell,
    //       programa: res.programa
    //     })
    //   }
    // })
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
