function t(t, e, a) {
    return e in t ? Object.defineProperty(t, e, {
        value: a,
        enumerable: !0,
        configurable: !0,
        writable: !0
    }) : t[e] = a, t;
}

function e(t, e) {
    clearInterval(i.play_timer);
    var a = 0, n = 0;
    switch (e) {
      case "0":
        clearInterval(i.play_timer), n = 0, wx.setStorageSync("timer_option", "0");
        break;

      case "1":
        clearInterval(i.play_timer), n = 1, wx.setStorageSync("timer_option", "1");
        break;

      case "2":
        a = 300, n = 2, wx.setStorageSync("timer_option", "2");
        break;

      case "3":
        a = 1800, n = 3, wx.setStorageSync("timer_option", "3");
        break;

      case "4":
        a = 3600, n = 4, wx.setStorageSync("timer_option", "4");
        break;

      case "5":
        a = 5400, n = 5, wx.setStorageSync("timer_option", "5");
    }
    wx.setStorageSync("timer_option", n), wx.setStorageSync("play_countdown", a), n <= 1 || (i.play_timer = setInterval(function() {
        var e = wx.getStorageSync("play_countdown");
        e - 1 <= 0 && n > 1 ? (console.info(e), t.setData({
            play: !1
        }), i.pause(t), wx.setStorageSync("play_countdown", 0), wx.setStorageSync("timer_option", 0), 
        t.setData({
            no_countdown: "active",
            countdown_end: "",
            countdown_15: "",
            countdown_30: "",
            countdown_60: "",
            countdown_90: ""
        }), clearInterval(i.play_timer)) : (e--, console.info(e), wx.setStorageSync("play_countdown", e));
    }, 1e3));
}

var a = getApp(), i = require("../../utils/util.js");

require("../../pages/wxParse/wxParse.js");

Page({
    data: {
        like: null,
        info_id: "",
        info_type: "",
        play_obj: {},
        comment_count: "**",
        play_list: {},
        play_list_hide: "hide",
        play: !1,
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
        parent: {}
    },
    onLoad: function(t) {
        var e = t.id, n = t.type, o = t.like_play ? t.like_play : 0, l = this, _ = a.globalData.play_type;
        switch (_ || (_ = 1, a.globalData.play_type = _), _) {
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
        var s = wx.getStorageSync("timer_option");
        s && l.setData({
            no_countdown: "0" == s ? "active" : "",
            countdown_end: "1" == s ? "active" : "",
            countdown_15: "2" == s ? "active" : "",
            countdown_30: "3" == s ? "active" : "",
            countdown_60: "4" == s ? "active" : "",
            countdown_90: "5" == s ? "active" : ""
        });
        var d = i.api_url + "/index/play";
        1 == o && (d = i.api_url + "/index/like_play"), wx.request({
            url: d,
            data: {
                id: e,
                type: n
            },
            header: {
                member_id: a.globalData.member_id,
                member_token: a.globalData.member_token
            },
            success: function(o) {
                if ("y" == o.data.status) {
                    var _ = 0, s = o.data.play_obj, d = o.data.play_list;
                    a.globalData.play_list = d, s.info_type = n, s.play_now = !0, wx.setNavigationBarTitle({
                        title: o.data.play_obj.title
                    });
                    for (r = 0; r < d.length; r++) d[r].id == s.id ? (_ = r, d[r].play_now = !0) : d[r].play_now = !1, 
                    2 == s.type && r > 2 && (d[r].hide = "hide"), d[r].time = i.sec2min(d[r].time_length);
                    if (a.globalData.play_index = _, 1 == d.length ? l.setData({
                        no_prev_hide: "icon-on-none",
                        no_next_hide: "icon-next-none"
                    }) : 0 == _ ? l.setData({
                        no_prev_hide: "icon-on-none"
                    }) : _ == d.length - 1 && l.setData({
                        no_next_hide: "icon-next-none"
                    }), l.setData({
                        play_obj: s,
                        play_list: d,
                        comment_count: o.data.comment_count,
                        play_end: i.sec2min(s.time_length),
                        like: o.data.like,
                        rand_list: o.data.rand_list,
                        share: o.data.share,
                        info_id: t.id,
                        info_type: n,
                        parent: 1 == t.type ? o.data.album : o.data.course
                    }), 2 == s.type) {
                        i.init_play(l, s, d), i.stop(l);
                        for (var p = getCurrentPages(), r = 0; r < p.length; r++) p[r].setData({
                            play_count: null
                        });
                        if (_ > 0) {
                            for (r = 0; r < d.length; r++) r <= _ + 1 && (d[r].hide = "");
                            l.setData({
                                play_list: d
                            });
                        }
                        l.videoContext = wx.createVideoContext("video"), l.videoContext.play();
                    } else wx.getBackgroundAudioPlayerState({
                        success: function(t) {
                            var o = t.status;
                            1 != o && 0 != o || !a.globalData.play_obj || parseInt(e) != parseInt(a.globalData.play_obj.id) || parseInt(n) != parseInt(a.globalData.play_obj.info_type) ? (wx.stopBackgroundAudio(), 
                            i.init_play(l, s, d), i.play(l, !0)) : (i.counting(l), 0 == o && i.play(l));
                        },
                        fail: function(t) {
                            console.info("没有后台播放，开始播放新内容"), i.init_play(l, s, d), i.play(l);
                        },
                        complete: function(t) {
                            a.globalData.play_obj = s, wx.onBackgroundAudioPause(function(t) {
                                l.setData({
                                    play: !1
                                }), i.clear_counting();
                            }), wx.onBackgroundAudioPlay(function(t) {
                                l.setData({
                                    play: !0
                                }), i.counting(l);
                            });
                        }
                    });
                    i.play_add(s.id, n, l);
                } else i.error_back("播放失败，请稍后再试");
            },
            fail: function(t) {}
        });
    },
    onReady: function(t) {},
    play: function(t) {
        a.globalData.play ? i.pause(this) : i.play(this);
    },
    pause: function(t) {
        this.setData({
            play: !1
        }), clearInterval(void 0), wx.pauseBackgroundAudio();
    },
    open_playoption: function(t) {
        var e = a.globalData.play_type;
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
    close_playoption: function(t) {
        this.setData({
            play_list_hide: "hide"
        });
    },
    like: function(e) {
        var n, o = this;
        i.request_m((n = {
            data: i.api_url + "/opera/like"
        }, t(n, "data", {
            id: o.data.play_obj.id,
            type: o.data.play_obj.info_type
        }), t(n, "callback", function(t) {
            if ("y" == t.data.status) {
                var e = o.data.play_obj, n = o.data.play_list;
                "1" == t.data.add ? (e.like = !0, i.success("已添加到我喜欢的")) : (e.like = !1, i.success("已取消喜欢"));
                for (var l = 0; l < n.length; l++) parseInt(n[l].id) == parseInt(e.id) && (n[l].like = e.like);
                o.setData({
                    play_obj: e,
                    play_list: n
                }), a.globalData.play_obj = e, a.globalData.play_list = n;
            }
        }), n));
    },
    next: function(t) {
        i.play_next(this, !0);
    },
    prev: function(t) {
        i.play_prev(this, !0);
    },
    chose_play: function(t) {
        var e = this, n = t.currentTarget.dataset.id, o = a.globalData.play_list, l = a.globalData.play_index;
        if (o) {
            for (var _ = 0; _ < o.length; _++) o[_].play_now = !1, o[_].id == n && e.data.play_obj.id != n && (l = _);
            if ("*" == o[l].file_path) return a.globalData.isiphone ? void i.error(a.globalData.iosTip) : (2 == o[l].type ? i.error("请购买后收看") : i.error("购买后才能播放哦"), 
            !1);
            l > 0 ? e.setData({
                no_prev_hide: ""
            }) : e.setData({
                no_prev_hide: "icon-on-none"
            }), 1 == o.length || l == o.length - 1 ? e.setData({
                no_next_hide: "icon-next-none"
            }) : e.setData({
                no_next_hide: ""
            }), o[l].play_now = !0, 2 == o[l].type && o[l + 1] && "hide" == o[l + 1].hide && (o[l + 1].hide = ""), 
            this.setData({
                play_obj: o[l],
                play_list: o
            }), a.globalData.play_index = l, a.globalData.play_list = o, i.init_play(e, o[l], o), 
            i.play(e, !0);
        }
    },
    set_playoption: function(t) {
        var e = this, n = t.currentTarget.dataset.type;
        switch (n = parseInt(n)) {
          case 1:
            n = 2;
            break;

          case 2:
            n = 3;
            break;

          case 3:
            n = 1;
        }
        switch (a.globalData.play_type = n, n) {
          case 1:
            i.tip("顺序播放"), e.setData({
                turn_op_hide: "",
                cycle_op_hide: "hide",
                single_op_hide: "hide"
            });
            break;

          case 2:
            i.tip("循环播放"), e.setData({
                turn_op_hide: "hide",
                cycle_op_hide: "",
                single_op_hide: "hide"
            });
            break;

          case 3:
            i.tip("单曲循环"), e.setData({
                turn_op_hide: "hide",
                cycle_op_hide: "hide",
                single_op_hide: ""
            });
        }
    },
    show_timer: function(t) {
        this.setData({
            timer_hide: ""
        });
    },
    close_timer: function(t) {
        this.setData({
            timer_hide: "hide"
        });
    },
    set_timer_option: function(t) {
        var a = t.currentTarget.dataset.type;
        this.setData({
            no_countdown: "0" == a ? "active" : "",
            countdown_end: "1" == a ? "active" : "",
            countdown_15: "2" == a ? "active" : "",
            countdown_30: "3" == a ? "active" : "",
            countdown_60: "4" == a ? "active" : "",
            countdown_90: "5" == a ? "active" : ""
        }), e(this, a);
    },
    show_all_video: function(t) {
        for (var e = this.data.play_list, i = 0; i < e.length; i++) e[i].hide = "";
        a.globalData.play_list = e, this.setData({
            play_list: e,
            show_btn_hide: "hide",
            shrink_hide: ""
        });
    },
    hide_video: function(t) {
        for (var e = this.data.play_list, i = 0; i < e.length; i++) e[i].hide = i <= 2 ? "" : "hide";
        a.globalData.play_list = e, this.setData({
            play_list: e,
            show_btn_hide: "",
            shrink_hide: "hide"
        });
    },
    set_title: function(t) {
        var e = this;
        wx.setNavigationBarTitle({
            title: e.data.play_obj.title
        });
    },
    onShareAppMessage: function(t) {
        var e = this.data.share, n = "";
        return 0 == this.data.parent.status ? (e.title = "村长讲故事", n = "/pages/index/index?member_id=" + a.globalData.member_id) : (n = 0 == this.data.parent.price || 1 == this.data.play_obj.try_listen ? "/pages/play/play?id=" + this.data.play_obj.id + "&type=" + this.data.info_type : "/pages/" + (1 == this.data.info_type ? "story/album" : "course/detail") + "?id=" + this.data.parent.id, 
        n += "&member_id=" + a.globalData.member_id), i.share_info({
            title: e.title,
            url: n,
            that: this,
            img: ""
        }, !1, this);
    }
});