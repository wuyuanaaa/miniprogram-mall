// miniprogram/pages/chatRoom/chatRoom.js
const app = getApp();
const db = wx.cloud.database();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    roomName: '123',
    avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epNZ1D5qkkPGibaJiaqt49JZZGc2hZkDhM6xQx156OdfKz9z9pnicWpHkj8oavbK6mDWZ3zwTTpJB0Ig/132',
    userNickName: '吴予安',
    openid: 'oQNrH5YJcS2uLbG_WRZyi3v183vU',
    msgList: [
      {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epNZ1D5qkkPGibaJiaqt49JZZGc2hZkDhM6xQx156OdfKz9z9pnicWpHkj8oavbK6mDWZ3zwTTpJB0Ig/132',
        userNickName: '吴予安',
        openid: 'oQNrH5YJcS2uLbG_WRZyi3v183vU',
        msgType: 'text',
        msgContent: '有人吗？有人吗？有人吗？有人吗？有人吗？有人吗？有人吗？有人吗？有人吗？有人吗？有人吗？有人吗？'
      },
      {
        avatarUrl: 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epNZ1D5qkkPGibaJiaqt49JZZGc2hZkDhM6xQx156OdfKz9z9pnicWpHkj8oavbK6mDWZ3zwTTpJB0Ig/132',
        userNickName: '路人甲',
        openid: 'oQNrH5YJcS2uLbG_WRZyi3v183vu',
        msgType: 'text',
        msgContent: '有人！'
      }
    ],
    isTextMsg: true,
    showMore: true,
    textInputStyle: '',
    textInputVal: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (app.globalData.userInfo) {
      this.setData({
        roomName: options.roomName,
        userNickName: app.globalData.userInfo.nickName,
        avatarUrl: app.globalData.userInfo.avatarUrl,
        openid: app.globalData.openid
      })
    }
    wx.setNavigationBarTitle({
      title: 'oneDay：'+ this.data.roomName   //页面标题为路由参数
    })
    db.collection('chatHistory').where({
      _id: this.data.roomName
    })
      .limit(1)
      .get()
      .then(res => {
        if(!res.data.length){
          db.collection('chatHistory').add({
            data: {
              _id: this.data.roomName,
              time: new Date().getTime(),
              msgType: 'text',
              userNickName: this.data.userNickName,
              avatarUrl: this.data.avatarUrl,
              msgContent: this.data.userNickName + '开启了房间'
            },
            success: function(res) {
              console.log(res)
            }
          })
        }
      })
  },

  // textInput 样式变化
  textInputFocus: function () {
    this.setData({
      textInputStyle: 'border-color: #2AB769;'
    })
  },
  textInputBlur: function () {
    this.setData({
      textInputStyle: ''
    })
  },
  textInputChange: function (e) {
    var val = e.detail.value;
    this.setData({
      textInputVal: val,
      showMore: !val.length
    })
  },

  // 发送信息
  sendMsg: function () {
    
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