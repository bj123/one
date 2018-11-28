var e = getApp(), t = require("../../utils/util.js");

t.api_url;

Page({
    data: {
      banners: [],
      news: [],
      all: [],
      share_coupon_hide: "hide",
      newer_hide: "hide",
      newer_coupon_hide: "hide",
      load_over: 1,
      xcx_control_hide: 1
    },
    onLoad: function(a) {
        console.log("12322222222")
        var n = this;
        wx.showLoading({
            title: "加载中..."
        }), wx.request({
          url: t.api_url + "/story/getCourse.json",
          data: {
              version: e.globalData.version
          },
          success: function(e) {
              "200" == e.data.code && n.setData({
                banners: e.data.data.banners,
                news: e.data.data.news,
                all: e.data.data.all,
                xcx_control_hide: false
              });
          },
          complete: function(e) {
              wx.hideLoading(), n.setData({
                  load_over: 0
              });
          }
        });
    },
    go_url: function(e) {
        var t = e.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onShow: function() {
        t.init_global_play(this);
    },
    onShareAppMessage: function(e) {
        return this.setData({
            share_hide: "hide"
        }), t.share_info({
            title: "亲子课程",
            url: "/pages/course/index",
            that: this
        });
    },
    play: function(a) {
        e.globalData.play ? t.pause(this) : t.play(this);
    },
    show_share_view: function(e) {
        this.setData({
            share_view_hide: ""
        });
    },
    close_share_view: function(e) {
        this.setData({
            share_view_hide: "hide"
        });
    },
    take_new_coupon: function(e) {
        t.take_new_coupon(this);
    },
    go_index: function(e) {
        this.setData({
            share_coupon_hide: "hide"
        });
    },
    banner_load: function(e) {
        var t = e.detail.width, a = e.detail.height, n = 0;
        wx.getSystemInfo({
            success: function(e) {
                var i = e.screenWidth / t;
                n = a * i;
            }
        }), this.setData({
            banner_height: n
        });
    },
    formSubmit: function(e) {
        t.send_formid(e, 2);
    }
});