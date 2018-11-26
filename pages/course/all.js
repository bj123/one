var e = getApp(), t = require("../../utils/util.js"), i = t.api_url + "/index/course_list";

Page({
    data: {
        pid: 1,
        next: !0,
        list: [],
        share_coupon_hide: "hide",
        coupon: {},
        newer_hide: "hide",
        newer_coupon_hide: "hide",
        load_obj: {
            loading: "hide",
            nomore: "hide"
        }
    },
    onLoad: function(e) {
        t.get_info({
            url: i,
            data: {},
            that: this,
            clear: !0
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {
        var e = this.data.pid + 1;
        this.setData({
            pid: e
        }), t.get_info({
            url: i,
            data: {},
            clear: this
        });
    },
    onShareAppMessage: function(e) {
        return this.setData({
            share_hide: "hide"
        }), t.share_info({
            title: "亲子教程",
            url: "/pages/course/all",
            that: this
        });
    },
    onShow: function() {
        t.init_global_play(this);
    },
    play: function(i) {
        e.globalData.play ? t.pause(this) : t.play(this);
    },
    go_index: function(e) {
        this.setData({
            share_coupon_hide: "hide"
        });
    }
});