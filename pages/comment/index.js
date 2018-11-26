var t = require("../../utils/util.js"), a = t.api_url + "/index/comment";

Page({
    data: {
        pid: 1,
        next: !0,
        list: [],
        content: "",
        nodata_hide: "hide"
    },
    onLoad: function(e) {
        var i = e.id, n = e.type, d = this;
        d.setData({
            id: i,
            type: n
        }), t.get_info({
            url: a,
            data: {
                pid: d.data.pid,
                id: i,
                type: n
            },
            that: d,
            clear: !0,
            callback: function(t) {
                var a = t.list;
                d.setData({
                    list: a,
                    info: t.info,
                    comment_count: t.comment_count,
                    nodata_hide: 0 == a.length ? "" : "hide"
                });
            }
        });
    },
    onReachBottom: function() {
        var e = this, i = this.data.pid + 1;
        this.setData({
            pid: i
        }), t.get_info({
            url: a,
            data: {
                pid: e.data.pid,
                id: e.data.id,
                type: e.data.type
            },
            that: this,
            clear: !1,
            callback: function(t) {}
        });
    },
    like: function(a) {
        var e = this, i = a.currentTarget.dataset.id;
        t.like_comment(e, i);
    },
    to_comment: function(a) {
        var e = a.detail.value.content, i = this;
        if (e) {
            var n = wx.getSystemInfoSync(), d = JSON.stringify(n);
            t.request_m({
                url: t.api_url + "/opera/comment",
                data: {
                    id: i.data.id,
                    type: i.data.type,
                    content: e,
                    system_info: d
                },
                callback: function(a) {
                    "y" == a.data.status ? (i.setData({
                        content: ""
                    }), t.success("留言成功，请等待系统审核")) : t.error("留言失败，请稍后再试");
                }
            });
        } else t.error("请输入留言内容");
    }
});