getApp();

var a = require("../../utils/util.js");

Page({
    data: {
        all_hide: "",
        suc_hide: "hide",
        ing_hide: "hide",
        fail_hide: "hide",
        all_nodata_hide: "1",
        all_active: "active",
        suc_active: "",
        ing_active: "",
        fail_active: ""
    },
    onLoad: function(i) {
        wx.showLoading({
            title: "努力加载中..."
        });
        var t = this;
        a.request_m({
            url: a.api_url + "/my/group",
            data: {},
            callback: function(i) {
                if ("y" == i.data.status) {
                    for (var e = i.data.task_list, s = [], c = [], l = [], n = 0; n < e.length; n++) switch (parseInt(e[n].status)) {
                      case 1:
                        c.push(e[n]);
                        break;

                      case -1:
                        l.push(e[n]);
                        break;

                      case 0:
                        s.push(e[n]);
                    }
                    t.setData({
                        task_list: e,
                        ing_list: s,
                        suc_list: c,
                        fail_list: l
                    }), wx.hideLoading();
                } else a.error_back(i.data.info);
            }
        });
    },
    change_tab: function(a) {
        var i = a.currentTarget.dataset.type;
        switch (this.setData({
            all_hide: "hide",
            suc_hide: "hide",
            ing_hide: "hide",
            fail_hide: "hide",
            all_active: "",
            suc_active: "",
            ing_active: "",
            fail_active: ""
        }), parseInt(i)) {
          case 1:
            this.setData({
                all_hide: "",
                all_active: "active"
            });
            break;

          case 2:
            this.setData({
                ing_hide: "",
                ing_active: "active"
            });
            break;

          case 3:
            this.setData({
                suc_hide: "",
                suc_active: "active"
            });
            break;

          case 4:
            this.setData({
                fail_hide: "",
                fail_active: "active"
            });
        }
    },
    go_promotion: function(a) {
        var i = a.currentTarget.dataset.id;
        wx.navigateTo({
            url: "/pages/promotion/detail?id=" + i
        });
    },
    onPullDownRefresh: function() {},
    onReachBottom: function() {},
    onShareAppMessage: function() {}
});