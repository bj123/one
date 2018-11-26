var e = getApp(), a = require("../../utils/util.js");

Page({
    data: {
        sexarray: [ "女", "男", "未选择" ],
        sexindex: 1,
        date: "点击选择"
    },
    onLoad: function(a) {
        var t = e.globalData.member;
        this.setData({
            member: t,
            date: t.ex.baby_birth ? t.ex.baby_birth : "点击选择",
            sexindex: -1 == t.ex.baby_sex ? 2 : t.ex.baby_sex
        });
    },
    clear_name: function(e) {
        var a = this.data.member;
        console.info(a), a.name = "", this.setData({
            member: a
        });
    },
    bindSexChange: function(e) {
        var a = e.detail.value;
        this.setData({
            sexindex: a
        });
    },
    bindDateChange: function(e) {
        var a = e.detail.value;
        this.setData({
            date: a
        });
    },
    save: function(t) {
        var r = t.detail.value.member_name, i = t.detail.value.sex, b = t.detail.value.birth;
        if (r) if ("点击选择" != b) {
            var s = e.globalData.member;
            s.name = r, s.ex.baby_sex = i, s.ex.baby_birth = b, a.request_m({
                url: a.api_url + "/my/save_info",
                data: {
                    name: r,
                    baby_sex: i,
                    baby_birth: b
                },
                callback: function(t) {
                    "y" === t.data.status ? (e.globalData.member = s, a.success("保存成功", function() {
                        var e = getCurrentPages();
                        e[e.length - 2].setData({
                            member: s
                        }), wx.navigateBack();
                    })) : a.error("未能保存信息，请稍后再试");
                }
            });
        } else a.error("请选择宝宝生日"); else a.error("请填写昵称");
    }
});