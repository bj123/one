var a = require("../../utils/util.js"), t = getApp();

Page({
    data: {
        coupon_list: [],
        nodata_hide: "hide"
    },
    onLoad: function(o) {
        var e = this;
        t.globalData.member ? a.request_m({
            url: a.api_url + "/my/coupon",
            data: {},
            callback: function(a) {
                for (var t = a.data.coupon_list, o = 0; o < t.length; o++) t[o].amount = parseFloat(t[o].amount);
                if ("y" == a.data.status) {
                    var i = "";
                    t.length > 0 && (i = "hide"), e.setData({
                        coupon_list: t,
                        nodata_hide: i
                    });
                }
            }
        }) : a.error_back("请求服务器超时，请稍后再试");
    }
});