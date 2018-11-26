var a = getApp(), t = require("../../utils/util.js");

Page({
    data: {
      banners: [], // 滚屏展示
      today_list: {}, 
      parenting_list: {},
      recommend_list: {},
      parenting_first: {},
      play_now: a.globalData.play_now,
      play_count: a.globalData.play_count,
      play_end: a.globalData.play_end,
      play_url: a.globalData.play_url,
      play_obj: a.globalData.play_obj,
      banner_height: "150",
      coupon: {},
      share_coupon_hide: "hide",
      newer_hide: "hide",
      newer_coupon_hide: "hide",
      red_show: "hide",
      box_none: "",
      hide: 1,
      img_list: [],
      img_index: 0,
      xcx_control_hide: 1
    },
    onLoad: function(e) {
        // wx.showLoading({
        //     title: "加载中..."
        // });
        var n = wx.getSystemInfoSync();
        a.globalData.sys_info = n;
        var i = this;
        t.request_m({
            url: t.api_url,
            callback: function(a) {
              console.log(a)
                if ("200" == a.data.code) {
                    var t = "", e = "";
                    a.data.parenting_list && a.data.parenting_list.length % 2 == 1 && (e = a.data.parenting_list[0], 
                    a.data.parenting_list.splice(0, 1)), a.data.chosen_list && a.data.chosen_list.length % 2 == 1 && (t = a.data.chosen_list[0], 
                    a.data.chosen_list.splice(0, 1));
                    var n = "hide", o = wx.getStorageSync("index_hb_pop");
                    a.data.hb_record || o && !(o.end_time < Date.parse(new Date()) / 1e3) || (n = "", 
                    wx.setStorageSync("index_hb_pop", {
                        is_pop: 1,
                        end_time: Date.parse(new Date()) / 1e3 + 86400
                    })), 
                    i.setData({
                        banners: a.data.data.banners,
                        // today_list: a.data.today_list,
                        // parenting_list: a.data.parenting_list,
                        // recommend_list: a.data.chosen_list,
                        // parenting_first: e,
                        // recommend_first: t,
                        // promotion_list: a.data.promotion_list,
                        // red_show: n,
                        // free_album: a.data.free_album,
                        // xcx_control_hide: 1 == a.data.global.pay_hide,
                        // free_album_hide: 1 != a.data.global.free_album_switch,
                        // hide: 0,
                        // share: a.data.share
                    });
                }
            }
        });
    },
    box_none: function() {
        this.setData({
            red_show: "hide"
        });
    },
    onPullDownRefresh: function() {
        this.onLoad(), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    gosearch: function(a) {
        console.info(a), wx.navigateTo({
            url: "/pages/search/search"
        });
    },
    onShareAppMessage: function(a) {
        return this.setData({
            share_hide: "hide"
        }), t.share_info(this.data.share, !1, this);
    },
    redirect: function(a) {
        var e = a.currentTarget.dataset.url;
        t.redirect(e);
    },
    play: function(e) {
        a.globalData.play ? t.pause(this) : t.play(this);
    },
    onShow: function() {
        t.init_global_play(this);
    },
    go_url: function(a) {
        var t = a.currentTarget.dataset.url;
        wx.navigateTo({
            url: t
        });
    },
    close_newer_view: function(a) {
        this.setData({
            newer_hide: "hide"
        });
    },
    take_new_coupon: function(a) {
        t.take_new_coupon(this);
    },
    close_coupon: function(a) {
        this.setData({
            newer_coupon_hide: "hide"
        });
    },
    go_index: function(a) {
        this.setData({
            share_coupon_hide: "hide"
        });
    },
    banner_load: function(a) {
        var t = a.detail.width, e = a.detail.height, n = 0;
        wx.getSystemInfo({
            success: function(a) {
                var i = a.screenWidth / t;
                n = e * i;
            }
        }), this.setData({
            banner_height: n
        });
    },
    go_promotion: function(a) {
        wx.showLoading({
            title: "加载中..."
        });
        var e = a.currentTarget.dataset.id, n = a.currentTarget.dataset.url;
        t.request_m({
            url: t.api_url + "/promotion/can_add_promotion",
            data: {
                id: e
            },
            callback: function(a) {
                "y" == a.data.status ? wx.navigateTo({
                    url: n
                }) : t.error(a.data.info);
            }
        });
    },
    get_hb: function() {
        this.setData({
            red_show: "hide"
        }), wx.navigateTo({
            url: "/pages/coupon/detail"
        });
    },
    formSubmit: function(a) {
        t.send_formid(a, 1);
    },
    onPageScroll: function(a) {},
    gofreevip: function(a) {
        var e = a.currentTarget.dataset.url;
        t.request_m({
            url: t.api_url + "/promotion/free_check_unlock",
            data: {},
            callback: function(a) {
                "n" != a.data.status ? wx.navigateTo({
                    url: e
                }) : t.error(a.data.info);
            }
        });
    },
    test: function(a) {
        console.info(a);
    }
});