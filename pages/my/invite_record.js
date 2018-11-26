var t = require("../../utils/util.js"), i = t.api_url + "/my/invite/";

Page({
    data: {
        pid: 1,
        member: {},
        invite_list: [],
        next: !0,
        load_obj: {
            loading: "hide",
            nomore: "hide"
        },
        nodata_tip: "暂无邀请记录",
        nodata_hide: "hide"
    },
    onLoad: function(e) {
        t.get_info({
            url: i,
            data: {
                pid: that.data.pid
            },
            that: this,
            clear: !1,
            callback: function(t) {
                var i = {
                    loading: "hide",
                    nomore: t.member.ex.invite_count <= 20 ? "" : "hide"
                }, e = "hide";
                0 == t.invite_list.length && (e = ""), that.setData({
                    member: t.member,
                    invite_list: t.invite_list,
                    next: t.member.ex.invite_count > 20,
                    load_obj: i,
                    nodata_hide: e
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this, a = this.data.pid + 1;
        this.data.type;
        this.setData({
            pid: a
        }), t.get_info({
            url: i,
            data: {
                pid: e.data.pid
            },
            that: this,
            clear: !1,
            callback: function(t) {
                var i = e.data.invite_list.concat(t.invite_list), a = {
                    loading: "hide",
                    nomore: 20 * e.data.pid < t.member.ex.invite_count ? "hide" : ""
                };
                e.setData({
                    invite_list: i,
                    next: 20 * e.data.pid < t.member.ex.invite_count,
                    load_obj: a
                });
            }
        });
    }
});