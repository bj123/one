var t = getApp(), e = require("../../utils/util.js"), a = e.api_url + "/story/getTemplatelistByTypeAndPage.json";

Page({
    data: {
      pid: 1,
      next: true,
      list: {},
      share_coupon_hide: "hide",
      newer_hide: "hide",
      newer_coupon_hide: "hide",
      load_obj: {
          loading: "hide",
          nomore: "hide"
      },
      xcx_control_hide: true
    },
    onLoad: function(i) {
      var o = this;
      var classify_id = i.classify_id ? i.classify_id : "";
      e.get_info({
          url: a,
          data: {
            version: t.globalData.version,
            templateType: classify_id
          },
          that: this,
          clear: true,
          callback: function(t) {
              for (var a = o.data.list, i = 0; i < a.length; i++) a[i].time = e.sec2min(a[i].time_length);
              o.setData({
                  story_list: a,
                  xcx_control_hide: 1 == t.global.pay_hide,
                  share: t.share
              });
          }
      });
    },
    onPullDownRefresh: function() {
      this.setData({
          next: true,
          pid: 1
      }), this.onLoad(), setTimeout(function() {
          wx.stopPullDownRefresh();
      }, 1e3);
    },
    onReachBottom: function() {
      var i = this.data.pid + 1, o = this;
      this.setData({
          pid: i
      }), e.get_info({
          url: a,
          data: {
              version: t.globalData.version
          },
          that: this,
          clear: false,
          callback: function(t) {
              for (var a = o.data.list, i = 0; i < a.length; i++) a[i].time = e.sec2min(a[i].time_length);
              o.setData({
                  story_list: a
              });
          }
      });
    },
    onShareAppMessage: function(t) {
      this.data.member;
      return this.setData({
          share_hide: "hide"
      }), this.data.share.url = "/pages/story/new", e.share_info(this.data.share, !1, this);
    },
    onShow: function() {
      e.init_global_play(this);
    },
    play: function(a) {
      t.globalData.play ? e.pause(this) : e.play(this);
    },
    go_index: function(t) {
      this.setData({
          share_coupon_hide: "hide"
      });
    }
});