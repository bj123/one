var e = getApp(), t = require("../../utils/util.js"), i = require("../../pages/wxParse/wxParse.js");

Page({
    data: {
        course: {},
        chapter_list: {},
        comment_list: {},
        desc_tip_hide: "hide",
        history: null,
        desc_active: "active",
        chapter_active: "",
        comment_active: "",
        share_reward: "*.**",
        pay_id: 0,
        pay_detail: {},
        desc_hide: "",
        chapter_hide: "hide",
        comment_hide: "hide",
        buy_hide: "",
        pay_hide: "hide",
        coupon_list_hide: "hide",
        pay_success_hide: "hide",
        order_success_hide: "hide",
        buy: !1,
        sort_asc_hide: "hide",
        sort_desc_hide: "",
        course_sort: "desc",
        share_view_hide: "hide",
        share_coupon_hide: "hide",
        coupon: {},
        newer_hide: "hide",
        newer_coupon_hide: "hide",
        xcx_control_hide: 1,
        ios_buy_hide: 1,
        go_contact: 0,
        isiphone: e.globalData.isiphone
    },
    onLoad: function(e) {
        var a = this, s = e.id;
        ("" == s || isNaN(s)) && wx.navigateBack(), t.request_m({
            url: t.api_url + "/index/course_detail",
            data: {
                id: s,
                xcx: 1,
                banner_id: e.banner_id ? e.banner_id : 0
            },
            callback: function(d) {
                if ("y" == d.data.status) {
                    var c = d.data.course, h = (.1 * d.data.course.price).toFixed(2);
                    wx.setNavigationBarTitle({
                        title: c.title
                    });
                    for (var _ = 0; _ < d.data.chapter_list.length; _++) d.data.chapter_list[_].time = t.sec2min(d.data.chapter_list[_].time_length);
                    a.setData({
                        pay_id: s,
                        course: c,
                        chapter_list: d.data.chapter_list,
                        comment_list: d.data.comment_list,
                        desc_tip_hide: "",
                        share_reward: h,
                        buy_hide: d.data.is_buy ? "hide" : "",
                        desc_hide: d.data.is_buy ? "hide" : "",
                        chapter_hide: d.data.is_buy ? "" : "hide",
                        desc_active: d.data.is_buy ? "" : "active",
                        chapter_active: d.data.is_buy ? "active" : "",
                        buy: !!d.data.is_buy,
                        para: e,
                        xcx_control_hide: 1 == d.data.global.pay_hide,
                        ios_buy_hide: 1,
                        go_contact: 0
                    }), i.wxParse("desc", "html", c.desc, a);
                    var o = wx.getStorageSync("course_history");
                    o && a.setData({
                        history: o
                    });
                } else t.error("获取失败", "", function() {
                    wx.navigateBack();
                });
            }
        });
    },
    change_tag: function(e) {
        var t = e.currentTarget.dataset.type;
        switch (this.data.desc_hide = "hide", this.data.chapter_hide = "hide", this.data.comment_hide = "hide", 
        this.data.desc_active = "", this.data.chapter_active = "", this.data.comment_active = "", 
        t) {
          case "1":
            this.data.desc_hide = "", this.data.desc_active = "active";
            break;

          case "2":
            this.data.chapter_hide = "", this.data.chapter_active = "active";
            break;

          case "3":
            this.data.comment_hide = "", this.data.comment_active = "active";
        }
        this.setData(this.data);
    },
    pay: function(e) {
        var i = this;
        wx.getSystemInfoSync();
        t.pay(i.data.course.id, 2, i);
    },
    topay: function(e) {
        t.topay(this, 2);
    },
    chose_coupon: function(e) {
        var i = this;
        t.chose_coupon(e, i);
    },
    show_coupon: function(e) {
        this.setData({
            coupon_list_hide: ""
        });
    },
    close_coupon: function(e) {
        this.setData({
            coupon_list_hide: "hide",
            newer_coupon_hide: "hide"
        });
    },
    sort: function(e) {
        var t = this.data.course_sort, i = this.data.chapter_list;
        switch (t) {
          case "asc":
            i = i.sort(function(e, t) {
                return e.id < t.id ? -1 : e.id > t.id ? 1 : 0;
            }), t = "desc";
            break;

          case "desc":
            i = i.sort(function(e, t) {
                return e.id < t.id ? 1 : e.id > t.id ? -1 : 0;
            }), t = "asc";
        }
        this.setData({
            chapter_list: i,
            sort_asc_hide: "asc" === t ? "" : "hide",
            sort_desc_hide: "asc" === t ? "hide" : "",
            course_sort: t
        });
    },
    close_pay: function(e) {
        this.setData({
            pay_hide: "hide"
        });
    },
    close_pay_success: function(e) {
        this.setData({
            pay_success_hide: "hide"
        });
    },
    show_order_success: function() {
        this.setData({
            order_success_hide: "",
            pay_success_hide: "hide",
            pay_hide: "hide"
        });
    },
    go_play: function(i) {
        var a = i.currentTarget.dataset.id, s = "/pages/play/play?id=" + a + "&type=2", d = this;
        if (d.data.buy) wx.navigateTo({
            url: s
        }); else {
            for (var c = d.data.chapter_list, h = !0, _ = 0; _ < c.length; _++) c[_].id.toString() == a && 1 == c[_].try_listen && (h = !1, 
            c[_]);
            h ? t.is_iOS() ? t.error(e.globalData.iosTip) : t.error("请购买后收" + ("2" == this.data.course.type ? "看" : "听")) : wx.navigateTo({
                url: s
            });
        }
    },
    like: function(e) {
        var i = this, a = e.currentTarget.dataset.id;
        t.like(i, a);
    },
    onShow: function() {
        t.init_global_play(this), this.data.go_contact && this.onLoad(this.data.para);
    },
    onShareAppMessage: function(i) {
        this.setData({
            share_view_hide: "hide",
            pay_success_hide: "hide",
            share_gift_hide: "hide",
            share_hide: "hide"
        });
        var a = this.data.course, s = this.data.pay_detail.price > 0, d = a.title, c = "/pages/course/detail?id=" + a.id, h = this.data.course.share_img;
        return 0 == a.status && (d = "村长讲故事", c = "/pages/index/index?member_id=" + e.globalData.member_id, 
        h = "https://wx.cunzhanggushi.com/public/images/logo.jpg"), t.share_info({
            title: d,
            url: c,
            img: h
        }, s, this);
    },
    play: function(i) {
        e.globalData.play ? t.pause(this) : t.play(this);
    },
    close_coupon_tip: function(e) {
        this.setData({
            share_coupon_hide: "hide"
        });
    },
    go_index: function(e) {
        this.setData({
            share_coupon_hide: "hide"
        });
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
    maskHide: function() {
        this.setData({
            ios_buy_hide: 1
        });
    },
    copy_id: function() {
        t.copy_id(this, 2);
    }
});