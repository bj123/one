require("./utils/ald-stat.js"), getApp();

App({
    onLaunch: function(e) {
        var t = e.query.member_id, a = e.query.scene;
        if (isNaN(t) || "" == t) {
            if (a) {
                wx.request({
                    url: "https://xcx.cunzhanggushi.com/opera/scene",
                    data: {
                        scene: a
                    },
                    success: function(e) {}
                }), -1 == a.indexOf("=") && (a = decodeURIComponent(a));
                var n = a.split("=");
                if (2 == n.length && "member_id" == n[0] && !isNaN(n[1]) && "" != n[1]) try {
                    t = parseInt(n[1]);
                    this.globalData.by = t;
                } catch (e) {
                    this.globalData.by = 0;
                }
            }
        } else this.globalData.by = t;
    },
    getUserInfo: function(e) {
        var t = this;
        this.globalData.userInfo ? "function" == typeof e && e(this.globalData.userInfo) : wx.getUserInfo({
            withCredentials: !1,
            success: function(a) {
                t.globalData.userInfo = a.userInfo, "function" == typeof e && e(t.globalData.userInfo);
            }
        });
    },
    onShow: function(e) {
        wx.showShareMenu({
            withShareTicket: !0
        }), e.shareTicket && (this.globalData.shareTicket = e.shareTicket);
    },
    globalData: {
        by: 0,
        userInfo: null,
        member_id: 0,
        play: !1,
        play_now: 0,
        play_count: 0,
        version: "1.6.6",
        iosTip: "小程序暂不支持付费章节\n请前往【村长讲故事APP】查看",
        isiphone: wx.getSystemInfoSync().model.indexOf("iPhone") > -1 ? 1 : 0
    }
});