var e = getApp(), o = require("../../utils/util.js");

Page({
    data: {
        member: {},
        order_count: 0,
        like_count: 0,
        promotion_task_count: "0",
        share_coupon_hide: "hide",
        newer_hide: "hide",
        newer_coupon_hide: "hide",
        xcx_control_hide: 1,
        sumCoin:0
    },
    onLoad: function(t) {
        var a = this;
        o.request_m({
          url: o.api_url + "/getUserInfo.json",
          data: {
              xcx: 1,
              version: e.globalData.version
          },
          callback: function(userInfo) {
            if (userInfo) {
              // var n = e.globalData.member;

              if (1 == userInfo.is_new) {
                a.setData({
                  newer_hide: ""
                })
              };
              
              var orderCount = 0;
              if (userInfo.buytemplateid) {
                var orders = userInfo.buytemplateid.split(",");
                if (orders) {
                  orderCount = orders.length;
                }
              }
              var likeCount = 0;
              if (userInfo.likeid) {
                var likes = userInfo.likeid.split(",");
                if (likes) {
                  likeCount = likes.length;
                }
              }
            
              a.setData({
                member: userInfo,
                xcx_control_hide: false,
                order_count: orderCount,
                like_count: likeCount,
                sumCoin: userInfo.rewardcoin + userInfo.coinnum
                  // member: n,
                  // order_count: t.data.order_count,
                  // like_count: t.data.like_count,
                  // promotion_task_count: t.data.promotion_count,
                  // xcx_control_hide: 1 == t.data.global.pay_hide
              });
            } else o.error(t.data.info, "", function() {
              wx.switchTab({
                  url: "/pages/index/index"
              });
            });
          }
        });
        var n = wx.getSystemInfoSync();
        console.log(n);
    },
    to_url: function(t) {
        if (e.globalData.member) {
            var a = t.currentTarget.dataset.url;
            wx.navigateTo({
                url: a
            });
        } else o.login();
    },
    onShow: function() {
        this.onLoad();
    },
    take_new_coupon: function(e) {
        o.take_new_coupon(this);
    },
    close_coupon: function(e) {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    go_index: function(e) {
        this.setData({
            share_coupon_hide: "hide"
        }), wx.switchTab({
            url: "/pages/index/index"
        });
    }
});