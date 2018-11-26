getApp();

var t = require("../../utils/util.js");

Page({
    data: {
        order: {}
    },
    onLoad: function(a) {
        var r = this;
        t.request_m({
            url: t.api_url + "/order/fresh",
            data: {},
            callback: function(t) {
                "y" === t.data.status && r.setData({
                    order: t.data.order,
                    title: t.data.title
                });
            }
        });
    }
});