function a(a, i, e) {
    return i in a ? Object.defineProperty(a, i, {
        value: e,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : a[i] = e, a;
}

var i, e = getApp(), t = require("../../utils/util.js"), s = t.api_url + "/index/classify";

Page({
    data: (i = {
        pid: 1,
        list: {},
        classify_id: "",
        buy_obj: {},
        next: !0,
        nodata_hide: "hide",
        pay_detail: {},
        buy_hide: "",
        pay_hide: "hide",
        coupon_list_hide: "hide",
        pay_success_hide: "hide",
        order_success_hide: "hide",
        share_coupon_hide: "hide",
        coupon: {},
        share_view_hide: "hide"
    }, a(i, "share_coupon_hide", "hide"), a(i, "newer_hide", "hide"), a(i, "newer_coupon_hide", "hide"), 
    a(i, "load_obj", {
        loading: "hide",
        nomore: "hide"
    }), a(i, "xcx_control_hide", 1), i),
    onLoad: function(a) {
        var i = this, o = a.classify_id ? a.classify_id : "";
        o && this.setData({
            classify_id: o
        });
        var n = "";
        switch (parseInt(o)) {
          case 5:
            n = "哄睡故事";
            break;

          case 6:
            n = "叫早故事";
            break;

          default:
            n = "全部故事";
        }
        wx.setNavigationBarTitle({
            title: n
        }), t.get_info({
            url: s,
            data: {
                pid: 1,
                classify_id: o,
                version: e.globalData.version
            },
            that: this,
            clear: !0,
            callback: function(a) {
                for (var e = a.list, s = 0; s < e.length; s++) e[s].time = t.sec2min(e[s].time_length);
                i.setData({
                    list: e,
                    xcx_control_hide: 1 == a.global.pay_hide,
                    share: a.share
                });
            }
        });
    },
    onPullDownRefresh: function() {
        this.setData({
            next: !0,
            pid: 1
        });
        var a = {};
        a.classify_id = this.data.classify_id, this.onLoad(a), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    onReachBottom: function() {
        var a = this, i = this.data.pid + 1, o = this.data.classify_id;
        this.setData({
            pid: i
        }), t.get_info({
            url: s,
            data: {
                classify_id: o,
                version: e.globalData.version
            },
            that: this,
            clear: !1,
            callback: function(i) {
                for (var e = a.data.list, s = 0; s < e.length; s++) e[s].time = t.sec2min(e[s].time_length);
                a.setData({
                    list: e,
                    xcx_control_hide: 1 == i.global.pay_hide
                });
            }
        });
    },
    go_play: function(a) {
        var i = a.currentTarget.dataset.url;
        wx.navigateTo({
            url: i
        });
    },
    pay: function(a) {
        for (var i = this, e = a.currentTarget.dataset.id, s = i.data.list, o = 0; o < s.length; o++) s[o].id == e && 1 == s[o].type && i.setData({
            buy_obj: s[o]
        });
        i.setData({
            pay_id: e,
            share_reward: parseFloat(.1 * i.data.buy_obj.price)
        }), t.pay(e, 1, i);
    },
    topay: function(a) {
        t.topay(this);
    },
    close_pay: function(a) {
        this.setData({
            pay_hide: "hide"
        });
    },
    close_pay_success: function(a) {
        this.setData({
            pay_success_hide: "hide"
        });
    },
    show_coupon: function(a) {
        this.setData({
            coupon_list_hide: ""
        });
    },
    close_coupon: function(a) {
        this.setData({
            coupon_list_hide: "hide"
        });
    },
    chose_coupon: function(a) {
        var i = this, e = a.currentTarget.dataset.id, t = a.currentTarget.dataset.status, s = i.data.pay_detail;
        if (1 == t) {
            for (var o = i.data.pay_detail.coupon_list, n = 0; n < o.length; n++) o[n].id == e && (s.coupon = o[n], 
            s.real_price = (s.price - s.coupon.amount).toFixed(2), i.setData({
                pay_detail: s
            }));
            this.close_coupon();
        }
    },
    onShow: function() {
        t.init_global_play(this);
    },
    play: function(a) {
        e.globalData.play ? t.pause(this) : t.play(this);
    },
    onShareAppMessage: function(a) {
        this.setData({
            share_view_hide: "hide",
            pay_success_hide: "hide",
            share_hide: "hide"
        });
        var i = "/pages/index/classify";
        return this.data.classify_id && (i += "?classify_id=" + this.data.classify_id), 
        this.data.share.url = i, t.share_info(this.data.share, !1, this);
    },
    close_coupon_tip: function(a) {
        this.setData({
            share_coupon_hide: "hide"
        });
    },
    go_index: function(a) {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    show_share_view: function(a) {
        this.setData({
            share_view_hide: ""
        });
    },
    close_share_view: function(a) {
        this.setData({
            share_view_hide: "hide"
        });
    }
});