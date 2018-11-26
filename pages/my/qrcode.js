var e = getApp(), r = require("../../utils/util.js"), a = r.api_url + "/opera/qrcode?scene=member_id=";

Page({
    data: {
        img_url: ""
    },
    onLoad: function(i) {
        var t = e.globalData.member;
        t ? this.setData({
            img_url: a + t.id
        }) : r.error_back("请求服务器超时，请稍后再试");
    }
});