function a(a, t) {
    clearInterval(e.play_timer);
    var i = 0, o = 0;
    switch (t) {
      case "0":
        clearInterval(e.play_timer), o = 0, wx.setStorageSync("timer_option", "0");
        break;

      case "1":
        clearInterval(e.play_timer), o = 1, wx.setStorageSync("timer_option", "1");
        break;

      case "2":
        i = 300, o = 2, wx.setStorageSync("timer_option", "2");
        break;

      case "3":
        i = 1800, o = 3, wx.setStorageSync("timer_option", "3");
        break;

      case "4":
        i = 3600, o = 4, wx.setStorageSync("timer_option", "4");
        break;

      case "5":
        i = 5400, o = 5, wx.setStorageSync("timer_option", "5");
    }
    wx.setStorageSync("timer_option", o), wx.setStorageSync("play_countdown", i), o <= 1 || (e.play_timer = setInterval(function() {
        var t = wx.getStorageSync("play_countdown");
        t - 1 <= 0 && o > 1 ? (console.info(t), a.setData({
            play: !1
        }), e.pause(a), wx.setStorageSync("play_countdown", 0), wx.setStorageSync("timer_option", 0), 
        a.setData({
            no_countdown: "active",
            countdown_end: "",
            countdown_15: "",
            countdown_30: "",
            countdown_60: "",
            countdown_90: ""
        }), clearInterval(e.play_timer)) : (t--, console.info(t), wx.setStorageSync("play_countdown", t));
    }, 1e3));
}

var t = getApp(), e = require("../../utils/util.js");

require("../../pages/wxParse/wxParse.js");

Page({
    data: {
        like: null,
        info_id: "",
        info_type: "",
        play_obj: {},
        play_suffix:0,
        comment_count: "**",
        play_list: {},
        play_list_hide: "hide",
        play: false,
        play_now: 0,
        play_count: "00:00",
        play_end: "**:**",
        play_percent: 0,
        play_option_hide: "hide",
        turn_op_hide: "hide",
        cycle_op_hide: "hide",
        single_op_hide: "hide",
        shrink_hide: "hide",
        timer_hide: "hide",
        no_countdown: "active",
        countdown_end: "",
        countdown_15: "",
        countdown_30: "",
        countdown_60: "",
        countdown_90: "",
        share: {},
        parent: {},
        hide: false,
        xcx_control_hide: 1,
      backgroundAudioManager:{}
    },
    onLoad: function(a) {
      wx.showLoading({
          title: "加载中..."
      });
      var i = a.id, templateId = a.templateId, o = a.type, n = a.like_play ? a.like_play : 0, l = this, _ = t.globalData.play_type;
        switch (_ || (_ = 1, t.globalData.play_type = _), _) {
          case 1:
            l.setData({
                turn_op_hide: "",
                cycle_op_hide: "hide",
                single_op_hide: "hide"
            });
            break;

          case 2:
            l.setData({
                turn_op_hide: "hide",
                cycle_op_hide: "",
                single_op_hide: "hide"
            });
            break;

          case 3:
            l.setData({
                turn_op_hide: "hide",
                cycle_op_hide: "hide",
                single_op_hide: ""
            });
        }
        var d = wx.getStorageSync("timer_option");
        if (d) {
          l.setData({
            no_countdown: "0" == d ? "active" : "",
            countdown_end: "1" == d ? "active" : "",
            countdown_15: "2" == d ? "active" : "",
            countdown_30: "3" == d ? "active" : "",
            countdown_60: "4" == d ? "active" : "",
            countdown_90: "5" == d ? "active" : ""
          });
        }

      var s = e.api_url + "/story/getPlayInfo.json";
      e.request_m({
        url: s,
        data: {
          storyId: i,
          templateId: templateId,
          type: o
        },
        callback: function(n) {
          if ("200" == n.data.code) {
            wx.hideLoading();
            var backgroundAudioManager = l.play_currentstroy(n.data.data.currentStory);
            l.setData({
              play_obj: n.data.data.currentStory,
              play_list: n.data.data.stories,
              backgroundAudioManager: backgroundAudioManager,
              play:true,
              play_suffix: parseInt(n.data.data.suffix),
              no_prev_hide: parseInt(n.data.data.suffix) == 0 ? "icon-on-none":"",
              no_next_hide: parseInt(n.data.data.suffix) == n.data.data.stories.length-1 ? "icon-on-none" : ""
            });
          }
        }
      });

        // var s = e.api_url + "/index/play";
        // 1 == n && (s = e.api_url + "/index/like_play", t.globalData.like_play = 1), e.request_m({
        //     url: s,
        //     data: {
        //         id: i,
        //         type: o
        //     },
        //     callback: function(n) {
        //         if ("y" == n.data.status) {
        //             wx.hideLoading();
        //             var _ = 0, d = n.data.play_obj, s = n.data.play_list;
        //             t.globalData.play_list = s, d.info_type = o, d.play_now = !0, wx.setNavigationBarTitle({
        //                 title: n.data.play_obj.title
        //             });
        //             for (r = 0; r < s.length; r++) s[r].id == d.id ? (_ = r, s[r].play_now = !0) : s[r].play_now = !1, 
        //             2 == d.type && r > 2 && (s[r].hide = "hide"), s[r].time = e.sec2min(s[r].time_length);
        //             if (t.globalData.play_index = _, 1 == s.length ? l.setData({
        //                 no_prev_hide: "icon-on-none",
        //                 no_next_hide: "icon-next-none"
        //             }) : 0 == _ ? l.setData({
        //                 no_prev_hide: "icon-on-none"
        //             }) : _ == s.length - 1 && l.setData({
        //                 no_next_hide: "icon-next-none"
        //             }), l.setData({
        //                 play_obj: d,
        //                 play_list: s,
        //                 play_end: e.sec2min(d.time_length),
        //                 like: n.data.like ? "1" : "0",
        //                 rand_list: n.data.rand_list ? n.data.rand_list : {},
        //                 share: n.data.share,
        //                 info_id: a.id,
        //                 info_type: o,
        //                 parent: n.data.parent ? n.data.parent : {},
        //                 xcx_control_hide: n.data.global.pay_hide ? n.data.global.pay_hide : 0,
        //                 hide: 0
        //             }), 2 == d.type) {
        //                 e.stop(l), e.init_play(l, d, s);
        //                 for (var p = getCurrentPages(), r = 0; r < p.length; r++) p[r].setData({
        //                     play_count: null
        //                 });
        //                 if (_ > 0) {
        //                     for (r = 0; r < s.length; r++) r <= _ + 1 && (s[r].hide = "");
        //                     l.setData({
        //                         play_list: s
        //                     });
        //                 }
        //                 l.videoContext = wx.createVideoContext("video"), l.videoContext.play();
        //             } else e.bgm = wx.getBackgroundAudioManager(), !0 !== e.bgm.paused ? t.globalData.play_obj && parseInt(i) == parseInt(t.globalData.play_obj.id) && parseInt(o) == parseInt(t.globalData.play_obj.info_type) ? e.play(l) : (t.globalData.play_obj = d, 
        //             e.init_play(l, d, s), e.play(l, !0)) : (console.info("没有后台播放，开始播放新内容"), e.init_play(l, d, s), 
        //             e.play(l, !0));
        //             e.play_add(d.id, o, l);
        //         } else {
        //             e.error_back("播放失败，请稍后再试");
        //             var h = {
        //                 member_id: t.globalData.member_id,
        //                 member_token: t.globalData.member_token,
        //                 result: n.data
        //             };
        //             e.add_error(JSON.stringify(h));
        //         }
        //     }
        // });
    },
    play_currentstroy:function(story){
      console.log(story.contenturl)
      var backgroundAudioManager = wx.getBackgroundAudioManager();
      backgroundAudioManager.src = story.contenturl;
      backgroundAudioManager.title = story.storyname;
      backgroundAudioManager.coverImgUrl = story.storyicon;

      backgroundAudioManager.onTimeUpdate(function(){
        // console.log(backgroundAudioManager.currentTime)
      })

      backgroundAudioManager.play();
      return backgroundAudioManager;
    },
    onReady: function(a) {},
    play: function(a) {
      var self = this;
      var backgroundAudioManager = self.data.backgroundAudioManager;
      if (self.data.play) {
        backgroundAudioManager.pause();
        self.setData({
          play: false
        });
      } else {
        backgroundAudioManager.play();
        self.setData({
          play: true
        });
      }
        // t.globalData.play ? e.pause(this) : e.play(this);
    },
    pause: function(a) {
        e.pause(this);
    },
    open_playoption: function(a) {
        var e = t.globalData.play_type;
        switch (e || (e = 1), e) {
          case 1:
            this.setData({
                turn_op_hide: "",
                cycle_op_hide: "hide",
                single_op_hide: "hide"
            });
            break;

          case 2:
            this.setData({
                turn_op_hide: "hide",
                cycle_op_hide: "",
                single_op_hide: "hide"
            });
            break;

          case 3:
            this.setData({
                turn_op_hide: "hide",
                cycle_op_hide: "hide",
                single_op_hide: ""
            });
        }
        this.setData({
            play_list_hide: ""
        });
    },
    close_playoption: function(a) {
        this.setData({
            play_list_hide: "hide"
        });
    },
    like: function(a) {
        var i = this;
        e.request_m({
            url: e.api_url + "/opera/like",
            data: {
                id: i.data.play_obj.id,
                type: i.data.play_obj.info_type
            },
            callback: function(a) {
                if ("y" == a.data.status) {
                    var o = i.data.play_obj, n = i.data.play_list;
                    "1" == a.data.add ? (o.like = !0, e.success("已添加到我喜欢的")) : (o.like = !1, e.success("已取消喜欢"));
                    for (var l = 0; l < n.length; l++) parseInt(n[l].id) == parseInt(o.id) && (n[l].like = o.like);
                    i.setData({
                        play_obj: o,
                        play_list: n
                    }), t.globalData.play_obj = o, t.globalData.play_list = n;
                }
            }
        });
    },
    next: function(a) {
      var storys = this.data.play_list;

      if (this.data.play_suffix == storys.length-1) {
        return;
      }

      var play_suffix = this.data.play_suffix+1;

      if (play_suffix == 1) {
        this.setData({
          no_prev_hide: ""
        })
      }

      if (storys.length-1 == play_suffix) {
        this.setData({
          no_next_hide: "icon-on-none"
        })
      }
      this.play_currentstroy(storys[play_suffix]);
      this.setData({
        play_suffix: play_suffix,
        play_obj: (storys[play_suffix])
      })
        // e.play_next(this, !0);
    },
    prev: function(a) {
      var storys = this.data.play_list;

      if (this.data.play_suffix == 0) {
        return;
      }

      var play_suffix = this.data.play_suffix-1;
      if (0 == play_suffix) {
        this.setData({
          no_prev_hide: "icon-on-none"
        })
      }
      console.log(play_suffix);
      
      this.play_currentstroy(storys[play_suffix]);
      this.setData({
        play_suffix: play_suffix,
        play_obj: (storys[play_suffix]),
        no_next_hide: ""
      })
        // e.play_prev(this, !0);
    },
    chose_play: function(a) {
        var i = this, o = a.currentTarget.dataset.id, n = t.globalData.play_list, l = t.globalData.play_index;
        if (n) {
            for (var _ = 0; _ < n.length; _++) n[_].play_now = !1, n[_].id == o && i.data.play_obj.id != o && (l = _);
            if ("*" == n[l].file_path && 1 != this.data.xcx_control_hide) return t.globalData.isiphone ? void e.error(t.globalData.iosTip) : (2 == n[l].type ? e.error("请购买后收看") : e.error("购买后才能播放哦"), 
            !1);
            l > 0 ? i.setData({
                no_prev_hide: ""
            }) : i.setData({
                no_prev_hide: "icon-on-none"
            }), 1 == n.length || l == n.length - 1 ? i.setData({
                no_next_hide: "icon-next-none"
            }) : i.setData({
                no_next_hide: ""
            }), n[l].play_now = !0, 2 == n[l].type && n[l + 1] && "hide" == n[l + 1].hide && (n[l + 1].hide = ""), 
            this.setData({
                play_obj: n[l],
                play_list: n
            }), t.globalData.play_obj = n[l], t.globalData.play_index = l, t.globalData.play_list = n, 
            e.init_play(i, n[l], n), e.play(i, !0);
        }
    },
    set_playoption: function(a) {
        var i = this, o = a.currentTarget.dataset.type;
        switch (o = parseInt(o)) {
          case 1:
            o = 2;
            break;

          case 2:
            o = 3;
            break;

          case 3:
            o = 1;
        }
        switch (t.globalData.play_type = o, o) {
          case 1:
            e.tip("顺序播放"), i.setData({
                turn_op_hide: "",
                cycle_op_hide: "hide",
                single_op_hide: "hide"
            });
            break;

          case 2:
            e.tip("循环播放"), i.setData({
                turn_op_hide: "hide",
                cycle_op_hide: "",
                single_op_hide: "hide"
            });
            break;

          case 3:
            e.tip("单曲循环"), i.setData({
                turn_op_hide: "hide",
                cycle_op_hide: "hide",
                single_op_hide: ""
            });
        }
    },
    show_timer: function(a) {
        this.setData({
            timer_hide: ""
        });
    },
    close_timer: function(a) {
        this.setData({
            timer_hide: "hide"
        });
    },
    set_timer_option: function(t) {
        var e = t.currentTarget.dataset.type;
        this.setData({
            no_countdown: "0" == e ? "active" : "",
            countdown_end: "1" == e ? "active" : "",
            countdown_15: "2" == e ? "active" : "",
            countdown_30: "3" == e ? "active" : "",
            countdown_60: "4" == e ? "active" : "",
            countdown_90: "5" == e ? "active" : ""
        }), a(this, e);
    },
    show_all_video: function(a) {
        for (var e = this.data.play_list, i = 0; i < e.length; i++) e[i].hide = "";
        t.globalData.play_list = e, this.setData({
            play_list: e,
            show_btn_hide: "hide",
            shrink_hide: ""
        });
    },
    hide_video: function(a) {
        for (var e = this.data.play_list, i = 0; i < e.length; i++) e[i].hide = i <= 2 ? "" : "hide";
        t.globalData.play_list = e, this.setData({
            play_list: e,
            show_btn_hide: "",
            shrink_hide: "hide"
        });
    },
    set_title: function(a) {
        var t = this;
        wx.setNavigationBarTitle({
            title: t.data.play_obj.title
        });
    },
    onShareAppMessage: function(a) {
        var i = this.data.share, o = "";
        return 0 == this.data.parent.status ? (i.title = "村长讲故事", o = "/pages/index/index?member_id=" + t.globalData.member_id) : (o = 0 == this.data.parent.price || 1 == this.data.play_obj.try_listen ? "/pages/play/play?id=" + this.data.play_obj.id + "&type=" + this.data.info_type : "/pages/" + (1 == this.data.info_type ? "story/album" : "course/detail") + "?id=" + this.data.play_obj.parent.id, 
        o += "&member_id=" + t.globalData.member_id, console.info(o)), e.share_info({
            title: i.title,
            url: o,
            that: this,
            img: this.data.share.img
        }, !1, this);
    }
});