// pages/userConsole/userConsole.js
const app = getApp();

Page({

  data: {
    logged: false,
    avatarUrl: './user-unlogin.png',
    userNickName: '',
    userInfo: {},
    inputValue: '',
    tab: '0',
    maxLeft: 120,
    allLists: [],
    curLists: []
  },

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
              this.getList();   // 更新TODO列表
              this.getOpenid();   // 获取 openid
            }
          })
        }
      }
    });
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
      this.getList();
      this.getOpenid();   // 获取 openid
    }
  },
  // 获取用户 openid
  getOpenid: function() {
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

  // 获得用户数据
  getList: function() {
    if (this.data.logged) { 
      const db = wx.cloud.database();
      db.collection('todos').doc(this.data.openid).get().then(res => {
        this.setData({
          allLists: res.data.list
        })
        this.reloadList();
      }, err => {
        console.log('该用户的数据为空！');
      })
    }
  },
  // 保存列表至服务器
  saveList: function () {
    const db = wx.cloud.database();
    db.collection('todos').doc(this.data.openid).set({
      data: {
        list: this.data.allLists
      },
      success(res) {
        console.log('更新数据');
      }
    })
  },
  // input 改变事件
  setInput: function (e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  // 添加新的待办
  addList: function () {
    if(this.data.inputValue.length) {
      this.data.allLists.push({
        done: false,
        info: this.data.inputValue,
        time: +new Date()
      })
      this.setData({
        allLists: this.data.allLists,
        inputValue: ''
      })
      this.reloadList();
      this.saveList();
    }
  },
  // 刷新列表
  reloadList: function () {
    var all = this.data.allLists;
    if (this.data.tab === '0') {
      this.setData({
        curLists: all
      })
    } else if (this.data.tab === '1') {
      this.setData({
        curLists: all.filter((val,index) => !val.done)
      })
    } else {
      this.setData({
        curLists: all.filter((val, index) => val.done)
      })
    }
  },
  // tab切换
  changeTab: function (e) {
    this.setData({
      tab: e.currentTarget.dataset.tab
    })
    this.reloadList();
  },
  // 改变todo状态
  changeDone: function (e) {
    var id = e.currentTarget.dataset.id;
    this.data.allLists.forEach((val, index) => {
      (val.time === id) && (val.done = !val.done);
    })
    this.setData({
      allLists: this.data.allLists
    })
    this.reloadList();
    this.saveList();
  },
  // 滑动删除
  touchstart: function (e) {
    // console.log(e);
    if (e.touches.length !== 1) {
      return;
    }
    this.setData({
      startX: e.touches[0].clientX
    })
  },
  touchmove: function (e) {
    if (e.touches.length !== 1) {
      return;
    }
    var moveX = e.touches[0].clientX,
        disX = moveX - this.data.startX,
        style = '';
    if (disX >= 0) {
      style = 'left: 0';
      return;
    } else {
      disX = -disX > this.data.maxLeft ? -this.data.maxLeft : disX;
      style = 'left:'+ disX + 'rpx';
    }
    var index = e.currentTarget.dataset.index;
    this.data.curLists[index].style = style;
    this.setData({
      curLists: this.data.curLists
    })
  },
  touchend: function (e) {
    var endX = e.changedTouches[0].clientX,
        disX = endX - this.data.startX,
        maxLeft = this.data.maxLeft,
        style = '';
    if (-disX > maxLeft / 2) {
      style = 'left:' + -maxLeft + 'rpx';
    } else {
      style = 'left: 0';
    }
    var index = e.currentTarget.dataset.index;
    this.data.curLists[index].style = style;
    this.setData({
      curLists: this.data.curLists
    })
  },
  // 删除事件
  delList: function (e) {
    var _this = this;
    wx.showModal({
      title: '删除',
      content: '确定删除该条？',
      success(res) {
        if (res.confirm) {
          var id = e.currentTarget.dataset.id,
            all = _this.data.allLists;
          all = all.filter((val, index) => val.time !== id);
          _this.setData({
            allLists: all
          })
          _this.reloadList();
          _this.saveList();
        }
      }
    })

    
  }

})