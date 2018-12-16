var t = require("../../utils/util.js"), a = t.api_url + "/story/getBuyTemplate.json", app = getApp();

Page({
    data: {
        pid: 1,
        type: 1,
        next: false,
        userId: 0,
        album_next: false,
        course_next: false,
        album_list: {},
        album_count: "*",
        course_list: {},
        course_count: "*",
        album_active: "active",
        course_active: "",
        album_hide: "",
        course_hide: "hide",
        load_obj: {
            loading: "hide",
            nomore: "hide"
        },
        content: "还没有相关订单",
        nodata_hide: "hide"
    },
    onLoad: function(e) {
      var self = this;
      console.log(2313123)

      t.request_m({
        url: a,
        data: {
          userId: app.globalData.member.id
        },
        callback: function (a) {
          console.log(a)
          if ("200" == a.data.code) {
            console.log(a)
            var k = {
              loading: "hide",
              nomore: ""
            }
            self.setData({
              album_list: a.data.data.storytemps,
              album_count: a.data.data.storytemps_count,
              course_list: a.data.data.wks,
              course_count: a.data.data.wks_count,
              load_obj: k,
              nodata_hide: a.data.data.storytemps_count == 0,
              userId: app.globalData.member.id
            });
          }
        }
      });





        // t.get_info({
        //     url: a,
        //     data: {
        //         type: this.data.type
        //     },
        //     that: this,
        //     clear: !0,
        //     callback: function(t) {
        //         var a = {
        //             loading: "hide",
        //             nomore: "hide"
        //         }, e = u.data.nodata_hide;
        //         t.album_count <= 20 && t.album_count > 0 ? a.nomore = "" : e = "", u.setData({
        //             album_list: t.album_list,
        //             album_count: t.album_count,
        //             course_list: t.course_list,
        //             course_count: t.course_count,
        //             next: t.album_count > 20,
        //             album_next: t.album_count > 20,
        //             course_next: t.course_count > 20,
        //             load_obj: a,
        //             nodata_hide: e
        //         });
        //     }
        // });
    },
    onReachBottom: function() {
        var e = this, u = this.data.pid + 1, i = this.data.type;
        this.setData({
            pid: u
        }), t.get_info({
            url: a,
            data: {
                pid: e.data.pid,
                type: e.data.type
            },
            that: e,
            clear: !1,
            callback: function(t) {
                if (t.album_list) {
                    a = e.data.album_list.concat(t.album_list);
                    t.album_list = a;
                } else t.album_list = e.data.album_list;
                if (t.course_list) {
                    var a = e.data.course_list.concat(t.course_list);
                    t.course_list = a;
                } else t.course_list = e.data.course_list;
                e.setData({
                    album_list: t.album_list,
                    course_list: t.course_list,
                    album_next: t.album_count > 20 * u,
                    course_next: t.course_count > 20 * u,
                    next: 1 == i ? t.album_count > 20 * u : t.course_count > 20 * u
                });
            }
        });
    },
    change_tag: function(t) {
        var a = this, e = "";
        switch (t.currentTarget.dataset.id) {
          case "1":
            e = 0 == this.data.album_count ? "" : "hide", this.setData({
                type: 1,
                album_active: "active",
                course_active: "",
                album_hide: "",
                course_hide: "hide",
                next: a.data.album_next,
                nodata_hide: e
            });
            break;

          case "2":
            e = 0 == this.data.course_count ? "" : "hide", this.setData({
                type: 2,
                album_active: "",
                course_active: "active",
                album_hide: "hide",
                course_hide: "",
                next: a.data.course_next,
                nodata_hide: e
            });
        }
    },
    go_album: function(a) {
        var e = a.currentTarget.dataset.id;
        "" == e || isNaN(e) ? t.error("参数错误") : wx.navigateTo({
            url: "/pages/story/album?id=" + e
        });
    },
    go_course: function(a) {
        var e = a.currentTarget.dataset.id;
        "" == e || isNaN(e) ? t.error("参数错误") : wx.navigateTo({
            url: "/pages/course/detail?id=" + e
        });
    }
});