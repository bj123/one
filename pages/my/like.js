var t = require("../../utils/util.js"), a = t.api_url + "/story/getLikeStory.json", app = getApp();

Page({
    data: {
        pid: 1,
        type: 1,
        next: true,
        like_story_list: {},
        story_count: "0",
        like_chapter_list: {},
        chapter_count: "0",
        story_active: "active",
        chapter_active: "",
        story_hide: "",
        chapter_hide: "hide",
        story_content: "暂无喜欢的故事",
        course_content: "暂无喜欢的课程",
        story_nodata_hide: "hide",
        course_nodata_hide: "hide"
    },
    onLoad: function(e) {
      var r = this;
      t.request_m({
        url: a,
        data: {
          userId: app.globalData.member.id
        },
        callback: function (res) {
          console.log(res);
          if (res.data.code == 200) {
            if (res.data.data.length == 0) {
              r.setData({
                nodata_hide: ""
              });
            } else {
              r.setData({
                like_story_list: res.data.data.stories,
                story_count: res.data.data.stories.length,
                like_chapter_list: res.data.data.wks,
                chapter_count: res.data.data.wks.length,
                load_obj: { loading: "hide", nomore: "" }
              });
            }
          } else e.error("获取失败", "", function () {
            console.log(res);
          });
        }
      });

        // t.get_info({
        //     url: a,
        //     data: {
        //         pid: r.data.pid,
        //         type: r.data.type
        //     },
        //     that: this,
        //     clear: true,
        //     callback: function(t) {
        //         var a = r.handler_data_story(t.like_story_list), e = r.handler_data_chapter(t.like_chapter_list), i = t.story_count > 20, o = (t.chapter_count, 
        //         {
        //             loading: "hide",
        //             nomore: i ? "hide" : ""
        //         }), d = "hide";
        //         0 == t.story_count && (d = "", o.nomore = "hide"), t.course_count, r.setData({
        //             like_story_list: a,
        //             story_count: t.story_count,
        //             like_chapter_list: e,
        //             chapter_count: t.chapter_count,
        //             next: i,
        //             nodata_hide: d
        //         });
        //     }
        // });
    },
    onReachBottom: function() {
        // var e = this.data.pid + 1, r = (this.data.type, this);
        // this.setData({
        //     pid: e
        // }), t.get_info({
        //     url: a,
        //     data: {
        //         pid: r.data.pid,
        //         type: r.data.type
        //     },
        //     that: r,
        //     clear: !1,
        //     callback: function(t) {
        //         var a = {}, e = {}, i = {
        //             loading: "hide",
        //             nomore: "hide"
        //         };
        //         if (1 == r.data.type) {
        //             var o = t.story_count > 20 * r.data.pid;
        //             i.nomore = o ? "" : "hide", a = r.handler_data_story(t.like_story_list);
        //             n = r.data.like_story_list.concat(a);
        //             r.setData({
        //                 like_story_list: n,
        //                 next: o
        //             });
        //         } else {
        //             var d = t.chapter_count > 20 * r.data.pid;
        //             i.nomore = d ? "" : "hide", e = r.handler_data_chapter(t.like_chapter_list);
        //             var n = r.data.like_chapter_list.concat(e);
        //             r.setData({
        //                 like_chapter_list: n,
        //                 next: d
        //             });
        //         }
        //     }
        // });
    },
    change_tag: function(t) {
        switch (t.currentTarget.dataset.id) {
          case "1":
            // var a = this.data.story_count > 20 * this.data.pid, 
            var a = false;
            var e = {
                loading: "hide",
                nomore: a ? "hide" : ""
            };
            0 == this.data.story_count && (e.nomore = "hide"), this.setData({
                type: 1,
                story_active: "active",
                chapter_active: "",
                story_hide: "",
                chapter_hide: "hide",
                next: a,
                load_obj: e
            });
            break;

          case "2":
            // var r = this.data.chapter_count > 20 * this.data.pid, 
            var r = false;
            var e = {
                loading: "hide",
                nomore: r ? "hide" : ""
            };
            0 == this.data.chapter_count && (e.nomore = "hide"), this.setData({
                type: 2,
                story_active: "",
                chapter_active: "active",
                story_hide: "hide",
                chapter_hide: "",
                next: r,
                load_obj: e
            });
        }
    },
    go_play: function(a) {
      var e = a.currentTarget.dataset.id;
      var r = a.currentTarget.dataset.type;
      var i = a.currentTarget.dataset.status;
      var o = a.currentTarget.dataset.playType;
      var templateId = a.currentTarget.dataset.template;
      console.log(templateId)

      if ("1" == i) {
        wx.navigateTo({
          url: "/pages/play/play?id=" + e + "&templateId=" + templateId + "&type=" + r + "&like_play=" + (1 == o ? "1" : "0")
        })
      } else {
        t.error("抱歉，该" + (1 == r ? "故事" : "课程") + "已下架");
      }
    },
    handler_data_story: function(a) {
        if (!a) return !1;
        for (var e = 0; e < a.length; e++) a[e].story.time = t.sec2min(a[e].story.time_length);
        return a;
    },
    handler_data_chapter: function(a) {
        if (!a) return !1;
        for (var e = 0; e < a.length; e++) a[e].chapter.time = t.sec2min(a[e].chapter.time_length);
        return a;
    }
});
