// miniprogram/pages/anyChat/anyChat.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    chatRoomName: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 获取用户信息 
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框 
          wx.getUserInfo({
            success: res => {
              this.setData({
                avatarUrl: res.userInfo.avatarUrl,
                userNickName: res.userInfo.nickName,
                userInfo: res.userInfo,
                logged: true
              })
              app.globalData.userInfo = res.userInfo;
              this.getOpenid();
            }
          })
        }
      }
    });
  },

  // 获取用户 openid
  getOpenid: function () {
    if (!app.globalData.openid) {
      wx.cloud.callFunction({
        name: 'login',
        data: {},
        success: res => {
          app.globalData.openid = res.result.openid;
          this.setData({
            openid: res.result.openid
          })
        },
        fail: err => {
          console.log('云函数获取 openid 失败！')
        }
      })
    } else {
      this.setData({
        openid: app.globalData.openid
      })
    }
  },

  onGetUserInfo: function (e) {
    if (!this.logged && e.detail.userInfo) {
      this.setData({
        logged: true,
        avatarUrl: e.detail.userInfo.avatarUrl,
        userNickName: e.detail.userInfo.nickName,
        userInfo: e.detail.userInfo
      })
      app.globalData.userInfo = e.detail.userInfo;
      this.getOpenid();
    }
  },
  // input 改变事件
  chatNameInput: function (e) {
    this.setData({
      chatRoomName: e.detail.value
    })
  },
  // 进入聊天室
  enterChatRoom: function () {
    if(this.data.openid) {
      wx.navigateTo({
        url: '../chatRoom/chatRoom?roomName='+ this.data.chatRoomName,
      })
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})