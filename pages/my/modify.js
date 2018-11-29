var e = getApp(), a = require("../../utils/util.js");

Page({
    data: {
      sexarray: [ "女", "男", "未选择" ],
      sexindex: 1,
      date: "点击选择",
      childname:null
    },
    onLoad: function(a) {
      var t = e.globalData.member;
      this.setData({
        member: t.id,
        date: t.childbirthday ? t.childbirthday : "点击选择",
        sexindex: t.childsex ? t.childsex : 2,
        childname: t.childname ? t.childname : null
      });
    },
    clear_name: function(e) {
        this.setData({
          childname: null
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
        s.childname = r, s.childsex = i, s.childbirthday = b, a.request_m({
        url: a.api_url + "/story/updateChildInfo.json",
        data: {
          userId: s.id,
          name: r,
          sex: i,
          brithday: b
        },
        callback: function(t) {
          console.log(t)
          "200" == t.data.code ? (e.globalData.member = s, a.success("保存成功", function() {
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