var t = getApp(), a = require("../../utils/util.js"), e = require("../../pages/wxParse/wxParse.js"), i = 0;

Page({
    data: {
        hide: 1,
        unlock_success: "hide",
        desc_hide: "",
        story_hide: "hide",
        desc_active: "active",
        story_active: "",
        animationData: {},
        story_sort: "desc",
        sort_asc_hide: "hide"
    },
    onLoad: function(t) {
        var s = this;
        wx.showLoading({
            title: "加载中..."
        }), a.request_m({
            url: a.api_url + "/promotion/free_vip",
            data: {},
            callback: function(t) {
                if ("y" == t.data.status) if (1 == t.data.global.free_album_switch) {
                    s.setData(t.data), e.wxParse("desc", "html", s.data.album.desc, s), s.setData({
                        hide: 0,
                        member_rand: t.data.member_list[i]
                    });
                    var n = wx.createAnimation({
                        duration: 1e3,
                        delay: 0,
                        timingFunction: "ease-in-out"
                    });
                    s.animation = n, s.showLabel();
                } else a.error("该活动已结束", "", function() {
                    wx.switchTab({
                        url: "/pages/index/index"
                    });
                }); else a.error(t.data.info, "", function(t) {
                    wx.switchTab({
                        url: "/pages/index/index"
                    });
                });
            }
        });
    },
    showLabel: function() {
        var t = this;
        this.animation.opacity(.7).step(), this.setData({
            animationData: this.animation.export()
        }, function() {
            setTimeout(function() {
                t.hideLabel();
            }, 3e3);
        });
    },
    hideLabel: function() {
        var t = this, a = this;
        this.animation.opacity(0).step(), this.setData({
            animationData: this.animation.export()
        }, function() {
            i++, setTimeout(function() {
                a.data.member_list <= i && (i = 0), a.setData({
                    member_rand: a.data.member_list[i]
                }), t.showLabel();
            }, 1500);
        });
    },
    change_tag: function(t) {
        var a = t.currentTarget.dataset.type, e = this;
        switch (e.setData({
            desc_hide: "hide",
            story_hide: "hide",
            comment_hide: "hide",
            desc_active: "",
            story_active: "",
            comment_active: ""
        }), a) {
          case "1":
            e.setData({
                desc_hide: "",
                desc_active: "active"
            });
            break;

          case "2":
            e.setData({
                story_hide: "",
                story_active: "active"
            });
            break;

          case "3":
            e.setData({
                comment_hide: "",
                comment_active: "active"
            });
        }
    },
    freeUnlock: function() {
        this.setData({
            unlock_success: ""
        });
    },
    closeModal: function() {
        this.setData({
            unlock_success: "hide"
        });
    },
    go_play: function(t) {
        var e = t.currentTarget.dataset.id, i = "/pages/play/play?id=" + e + "&type=1", s = this;
        if (1 == s.data.is_unlock || 0 == s.data.album.price) wx.navigateTo({
            url: i
        }); else {
            for (var n = s.data.story_list, o = !0, c = 0; c < n.length; c++) n[c].id.toString() == e && 1 == n[c].try_listen && (o = !1);
            o && 1 != this.data.xcx_control_hide ? a.error("请解锁后收听") : wx.navigateTo({
                url: i
            });
        }
    },
    try_listen: function() {
        this.change_tag({
            currentTarget: {
                dataset: {
                    type: "2"
                }
            }
        });
    },
    sort: function(t) {
        var a = this.data.story_sort, e = this.data.story_list;
        switch (a) {
          case "asc":
            e = e.sort(function(t, a) {
                return t.id < a.id ? -1 : t.id > a.id ? 1 : 0;
            }), a = "desc";
            break;

          case "desc":
            e = e.sort(function(t, a) {
                return t.id < a.id ? 1 : t.id > a.id ? -1 : 0;
            }), a = "asc";
        }
        this.setData({
            story_list: e,
            sort_asc_hide: "asc" === a ? "" : "hide",
            sort_desc_hide: "asc" === a ? "hide" : "",
            story_sort: a
        });
    },
    onShareAppMessage: function(e) {
        return a.share_info({
            title: this.data.share.title,
            url: "/pages/story/free_unlock?member_id=" + t.globalData.member_id,
            that: this,
            img: this.data.share.img
        }, this.data.is_unlock, this);
    },
    returnClose: function(t) {},
    copy_account: function(t) {
        var a = this, e = this.data.wechat, i = this;
        wx.setClipboardData({
            data: e,
            success: function(t) {
                wx.showToast({
                    title: "复制成功",
                    complete: function(t) {
                        i.setData({
                            unlock_success: "hide"
                        });
                    }
                }), a.setData({
                    unlock_success: "hide"
                });
            }
        });
    },
    pop_bg_click: function(t) {
        console.info("asd");
    }
});