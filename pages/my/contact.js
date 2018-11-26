var t = require("../../utils/util.js");

Page({
    data: {},
    onLoad: function(t) {},
    copy: function(a) {
        var c = a.currentTarget.dataset.content;
        wx.setClipboardData({
            data: c,
            success: function(a) {
                t.success("复制成功");
            },
            fail: function(a) {
                t.error("复制失败，请稍后再试");
            }
        });
    }
});