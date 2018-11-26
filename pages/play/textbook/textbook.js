getApp();

var e = require("../../../utils/util.js"), a = require("../../../pages/wxParse/wxParse.js");

Page({
    data: {},
    onLoad: function(r) {
        var s = this;
        e.request_m({
            url: e.api_url + "/index/chapter_desc",
            data: {
                id: r.id
            },
            callback: function(e) {
                console.info(e), a.wxParse("desc", "html", e.data.chapter.desc, s);
            }
        });
    }
});