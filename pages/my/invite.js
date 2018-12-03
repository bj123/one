getApp();

var e = require("../../utils/util.js"), i = e.api_url + "/story/getShareInfo.json";

Page({
    data: {
        member: "",
        share_coupon_hide: "hide",
        is_test: ""
    },
    onLoad: function(t) {
      var a = this;
      e.request_m({
        url: e.api_url + "/getUserInfo.json",
        data: {
          xcx: 1
        },
        callback: function (userInfo) {
          if (userInfo) {
            var userId = userInfo.id;
            e.request_m({
              url: i,
              data: {
                pid: userId
              },
              callback: function (e) {
                console.log(e)
                a.setData({
                  member: e.data.data,
                  is_test: e.data.data.isShowfriendImg
                });
              }
            });
          } else o.error(t.data.info, "", function () {
            wx.switchTab({
              url: "/pages/index/index"
            });
          });
        }
      });

      
    },
    img_preview: function(i) {
        var t = {id:12};
        if (t) {
            var a = e.api_url + "/opera/qrcode?scene=member_id=" + t.id + "&member_id=" + t.id, r = [ a ];
            wx.previewImage({
                current: a,
                urls: r
            });
        }
    },
    onShareAppMessage: function(i) {
        this.setData({
            share_hide: "hide"
        });
        var t = this.data.member, a = e.api_url + "/opera/qrcode?scene=member_id=" + t.id + "&member_id=" + t.id;
        return e.share_info({
            img: a,
            title: "邀请好友听故事",
            that: this
        });
    },
    close_coupon_tip: function(e) {
        this.setData({
            share_coupon_hide: "hide"
        });
    },
    go_index: function(e) {
        wx.switchTab({
            url: "/pages/index/index"
        });
    }
});