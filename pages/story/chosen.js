var t = getApp(), e = require("../../utils/util.js"), a = e.api_url + "/index/album_list";

Page({
    data: {
        pid: 1,
        next: !0,
        list: {},
        chosen: "",
        share_coupon_hide: "hide",
        newer_hide: "hide",
        newer_coupon_hide: "hide",
        load_obj: {
            loading: "hide",
            nomore: "hide"
        }
    },
    onLoad: function(i) {
      var o = "";
      void 0 != i.chosen && (o = i.chosen, this.setData({
          chosen: o
      })), e.get_info({
          url: a,
          data: {
              chosen: o,
              version: t.globalData.version
          },
          that: this,
          clear: !0
      });
    },
    onReachBottom: function() {
        var i = this.data.pid + 1;
        this.setData({
            pid: i
        }), e.get_info({
            url: a,
            data: {
                version: t.globalData.version
            },
            that: this
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            next: !0,
            pid: 1
        });
        var e = {};
        e.chosen = this.data.chosen, e.version = t.globalData.version, this.onLoad(e), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onShow: function() {
        e.init_global_play(this);
    },
    onShareAppMessage: function(t) {
        return this.setData({
            share_hide: "hide"
        }), e.share_info({
            that: this
        });
    },
    play: function(a) {
        t.globalData.play ? e.pause(this) : e.play(this);
    }
});