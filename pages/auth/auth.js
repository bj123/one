var app = getApp();
Page({
  onGotUserInfo: function (e) {
    if (e.detail.userInfo) {
      app.globalData.userInfo = e.detail.userInfo
      wx.switchTab({
        url: '../index/index',
      });
    } else {
      wx.showModal({
        title: '提示',
        content: '为不影响您的使用请授权',
        showCancel: false
      });
    }
  },

  onLoad: function (options) {
    
    if (options.invitedUserId) {
      app.globalData.invitedUserId = options.invitedUserId
    }

    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {
              console.log(res.userInfo)
              app.globalData.userInfo = res.userInfo;
              wx.switchTab({
                url: '../index/index',
              });
            }
          })
        }
      }
    })
  }
})

