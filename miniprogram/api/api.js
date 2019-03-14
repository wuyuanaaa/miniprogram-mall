const host = 'https://www.easy-mock.com/mock/5c89c56d5a08681ae3b49d14/mini-mall'
const wxRequest = (params, url) => {
  wx.showToast({
    title: '加载中',
    icon: 'loading'
  })

  https://www.easy-mock.com/mock/5c89c56d5a08681ae3b49d14/mini-mall/api/home
  wx.request({
    url: url,
    method: params.method || 'GET',
    data: params.data || {},
    header: {
      'Content-Type': 'application/json'
    },
    success: res => {
      params.success && params.success(res.data)
      wx.hideToast()
    },
    fail: res => {
      params.fail && params.fail(res)
    },
    complete: res => {
      params.complete && params.complete(res)
    }
  })
}

const getHomePageData = (params) => wxRequest(params, host + '/api/home')


module.exports = {
  getHomePageData
}