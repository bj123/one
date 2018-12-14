var t = getApp(), e = require("../../utils/util.js"), i = require("../../pages/wxParse/wxParse.js");

Page({
    data: {
        album: {},
        story_list: {},
        comment_list: {},
        desc_list:[],
        desc_tip_hide: "hide",
        desc_active: "active",
        story_active: "",
        comment_active: "",
        share_reward: "*.**",
        pay_detail: {},
        desc_hide: "",
        story_hide: "hide",
        comment_hide: "hide",
        buy_hide: "",
        pay_hide: "hide",
        coupon_list_hide: "hide",
        pay_success_hide: "hide",
        order_success_hide: "hide",
        buy: false,
        sort_asc_hide: "hide",
        sort_desc_hide: "",
        story_sort: "desc",
        share_coupon_hide: "hide",
        coupon: {},
        share_view_hide: "hide",
        newer_hide: "hide",
        newer_coupon_hide: "hide",
        xcx_control_hide: "hide",
        maskToggle: "maskHide",
        go_contact: 0,
        ios_buy_hide: 1,
        showAppMask: 1,
        isiphone: t.globalData.isiphone
    },
    onLoad: function(options) {
        var a = this;
        e.request_m({
          url: e.api_url + "/story/getTemplateDesc.json",
          data: {
            templateId: options.id,
            banner_id: options.banner_id ? options.banner_id : 0,
            userId: t.globalData.member.id
          },
          callback: function(s) {
            console.log(s)
            if ("200" == s.data.code) {
              // var d = (.1 * s.data.album.price).toFixed(2);
              wx.setNavigationBarTitle({
                title: s.data.data.album.templatename
              });
              // for (var o = s.data.story_list, h = 0; h < o.length; h++){
              //   o[h].time = e.sec2min(o[h].time_length);
              // } 

              var introductions = s.data.data.introductions;
              for (var i = 0; i < introductions.length; i++) {
                if (introductions[i].desction) {
                  introductions[i].desction = introductions[i].desction.replace(/\\n/g, "\n");
                }
                
              }

              a.setData({
                album: s.data.data.album,
                xcx_control_hide: s.data.data.showConfig.IS_NOT_XCX_CONTROL_HIDE == "true" ? true : false,
                share_reward: s.data.data.shareReward,
                desc_list: introductions,
                desc_hide: s.data.data.isbuy == "true" ? "hide" : "",
                story_hide: s.data.data.isbuy == "true" ? "" : "hide",
                story_list: s.data.data.stories,
                buy: s.data.data.isbuy == "true" ? true : false



                // pay_id: t.id,
                // album: s.data.album,
                // story_count: s.data.album.chapter_count,
                // story_list: s.data.story_list,
                // comment_list: s.data.comment_list,
                // share_reward: d,
                // buy_hide: s.data.is_buy ? "hide" : "",
                // desc_hide: s.data.is_buy ? "hide" : "",
                // story_hide: s.data.is_buy ? "" : "hide",
                // desc_active: s.data.is_buy ? "" : "active",
                // story_active: s.data.is_buy ? "active" : "",
                // buy: !!s.data.is_buy,
                // desc_tip_hide: "",
                // para: t,
                // xcx_control_hide: 1 == s.data.global.pay_hide,
                // ios_buy_hide: 1,
                // go_contact: 0
              });
              // i.wxParse("desc", "html", a.data.album.desc, a);
            } else e.error("获取失败", "", function() {
              wx.navigateBack();
            });
          }
        });
    },
    change_tag: function(t) {
        var e = t.currentTarget.dataset.type;
        switch (this.data.desc_hide = "hide", this.data.story_hide = "hide", this.data.comment_hide = "hide", 
        this.data.desc_active = "", this.data.story_active = "", this.data.comment_active = "", 
        e) {
          case "1":
            this.data.desc_hide = "", this.data.desc_active = "active";
            break;

          case "2":
            this.data.story_hide = "", this.data.story_active = "active";
            break;

          case "3":
            this.data.comment_hide = "", this.data.comment_active = "active";
        }
        this.setData(this.data);
    },
    like: function(t) {
        var i = this, a = t.currentTarget.dataset.id;
        e.like_comment(i, a);
    },
    pay: function(t) {
        var i = this, a = wx.getSystemInfoSync();
        this.data.album.price > 0 && a.system.toLowerCase().indexOf("android") > -1 ? e.pay(i.data.album.id, 1, i) : this.setData({
            ios_buy_hide: 0
        });
    },
    topay: function(t) {
        e.topay(this, 1);
    },
    chose_coupon: function(t) {
        e.chose_coupon(t, this);
    },
    show_coupon: function(t) {
        this.setData({
            coupon_list_hide: ""
        });
    },
    close_coupon: function(t) {
        this.setData({
            coupon_list_hide: "hide",
            newer_coupon_hide: "hide"
        });
    },
    close_pay: function(t) {
        this.setData({
            pay_hide: "hide"
        });
    },
    close_pay_success: function(t) {
        this.setData({
            pay_success_hide: "hide"
        });
    },
    show_order_success: function() {
        this.setData({
            order_success_hide: "",
            pay_success_hide: "hide"
        });
    },
    go_play: function(i) {
      var a = i.currentTarget.dataset, s = this;
      var d = a.id, o = "/pages/play/play?id=" + d + "&type=1&templateId=" + a.tempid;

      if (s.data.buy || 0 == s.data.album.saleprice) {
        wx.navigateTo({
          url: o
        });
      } else {
        // for (var h = s.data.story_list, c = !0, _ = 0; _ < h.length; _++) {
        //   h[_].id.toString() == d && 1 == h[_].try_listen && (c = !1);
        // }
        if (!this.data.xcx_control_hide && a.pay != "1") {
          // if (t.globalData.isiphone) {
          //   return void e.error(t.globalData.iosTip);
          // }
          e.error("请购买后收听");
        } else {
          wx.navigateTo({
            url: o
          });
        }
      }


        // if (1 != a.pay && s.data.isiphone && 0 != s.data.album.price) {
        //   wx.showModal({
        //     title: "温馨提示",
        //     content: t.globalData.iosTip,
        //     showCancel: !1,
        //     confirmText: "我知道了",
        //     success: function (t) {
        //       t.confirm ? console.log("用户点击确定") : t.cancel && console.log("用户点击取消");
        //     }
        //   });
        // } else {
        //     var d = a.id, o = "/pages/play/play?id=" + d + "&type=1";
        //     if (s.data.buy || 0 == s.data.album.price) {
        //       wx.navigateTo({
        //         url: o
        //       });
        //     } else {
        //         for (var h = s.data.story_list, c = !0, _ = 0; _ < h.length; _++) {
        //           h[_].id.toString() == d && 1 == h[_].try_listen && (c = !1);
        //         }
        //         if (c && 1 != this.data.xcx_control_hide) {
        //             if (t.globalData.isiphone) return void e.error(t.globalData.iosTip);
        //             e.error("请购买后收听");
        //         } else wx.navigateTo({
        //             url: o
        //         });
        //     }
        // }
    },
    sort: function(t) {
        var e = this.data.story_sort, i = this.data.story_list;
        switch (e) {
          case "asc":
            i = i.sort(function(t, e) {
                return t.id < e.id ? -1 : t.id > e.id ? 1 : 0;
            }), e = "desc";
            break;

          case "desc":
            i = i.sort(function(t, e) {
                return t.id < e.id ? 1 : t.id > e.id ? -1 : 0;
            }), e = "asc";
        }
        this.setData({
            story_list: i,
            sort_asc_hide: "asc" === e ? "" : "hide",
            sort_desc_hide: "asc" === e ? "hide" : "",
            story_sort: e
        });
    },
    onShow: function() {
        e.init_global_play(this), this.data.go_contact && this.onLoad(this.data.para);
    },
  onShareAppMessage: function (ops) {
        // this.setData({
        //     share_view_hide: "hide",
        //     pay_success_hide: "hide",
        //     share_gift_hide: "hide",
        //     share_hide: "hide"
        // });
        // var a = this.data.album, s = this.data.pay_detail.price > 0, d = a.title, o = "/pages/story/album?id=" + a.id, h = this.data.album.icon;
        // return 0 == a.status && (d = "村长讲故事", o = "/pages/index/index?member_id=" + t.globalData.member_id, 
        // h = "https://wx.cunzhanggushi.com/public/images/logo.jpg"), e.share_info({
        //     title: d,
        //     url: o,
        //     that: this,
        //     img: h
        // }, s, this);

      var self = this
      if (ops.from === 'button') {
        // 来自页面内转发按钮
        console.log(ops.target)
      }
      return {
        title: '村长讲故事',
        path: '/pages/auth/auth?invitedUserId=' + t.globalData.member.id,
        imageUrl: 'https://aiw19920706.oss-cn-beijing.aliyuncs.com/stroys/img/fx.png',
        success: function (res) {
          // 转发成功
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail: function (res) {
          console.log("转发失败:" + JSON.stringify(res));
          if (res.errMsg == 'shareAppMessage:fail cancel') {
            // 用户取消转发
            console.log(res.errMsg);
          } else if (res.errMsg == 'shareAppMessage:fail') {
            // 转发失败，其中 detail message 为详细失败信息
            console.log("转发失败:" + JSON.stringify(res));
          }
        }
      }
    },
    play: function(i) {
        t.globalData.play ? e.pause(this) : e.play(this);
    },
    close_coupon_tip: function(t) {
        this.setData({
            share_coupon_hide: "hide"
        });
    },
    go_index: function(t) {
        wx.switchTab({
            url: "/pages/index/index"
        });
    },
    show_share_view: function(t) {
      console.log("show_share_view")
        this.setData({
            share_view_hide: ""
        });
    },
    close_share_view: function(t) {
        this.setData({
            share_view_hide: "hide"
        });
    },
    take_new_coupon: function(t) {
        e.take_new_coupon(this);
    },
    hide_all: function(t) {
        this.setData({
            share_view_hide: "hide",
            pay_success_hide: "hide",
            share_gift_hide: "hide",
            share_hide: "hide"
        });
    },
    maskHide: function() {
        this.setData({
            ios_buy_hide: 1
        });
    },
    copy_id: function(t) {
        e.copy_id(this, 1);
    },
    returnClose: function() {
        return !1;
    }
});