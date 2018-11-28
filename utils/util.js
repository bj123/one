function a(a) {
    return (a = a.toString())[1] ? a : "0" + a;
}

function t(a) {
    var t = Math.floor(a / 60), e = a % 60;
    return t < 10 && (t = "0" + t), e < 10 && (e = "0" + e), t + ":" + e;
}

function e(a, t, e) {
    wx.showModal({
        title: "温馨提示",
        content: a,
        confirmText: "我知道了",
        showCancel: !1,
        mask: !0,
        complete: function(a) {
            void 0 !== t && "" !== t && wx.navigateTo({
                url: t,
                success: function(a) {
                    console.info("???");
                },
                fail: function(a) {
                    wx.reLaunch({
                        url: t
                    });
                },
                complete: function(a) {
                    console.info(a);
                }
            }), void 0 !== e && e();
        }
    });
}

function o(a, t) {
    wx.showModal({
        title: "成功",
        content: a,
        showCancel: !1,
        complete: function() {
            void 0 !== t && t();
        }
    });
}

function n(a) {
  console.log('nnnn')
    var t = a.url, e = a.data, o = a.callback, n = wx.getStorageSync("member_id"), r = wx.getStorageSync("member_token");
    wx.checkSession({
        success: function() {},
        fail: function() {
            n = "", r = "";
        }
    }), n && r ? (e ? (e.version = h.globalData.version, e.xcx = 1) : e = {
        version: h.globalData.version,
        xcx: 1
    }, h.globalData.member ? l({
        url: t,
        data: e,
        member_id: n,
        member_token: r,
        callback: o
    }) : wx.request({
        url: j + "/login/myself",
        data: {},
        dataType: "json",
        header: {
            "member-id": n,
            "member-token": r
        },
        success: function(a) {
            "y" == a.data.status && (h.globalData.member = a.data.member, h.globalData.member_id = n, 
            h.globalData.member_token = r), l({
                url: t,
                data: e,
                member_id: n,
                member_token: r,
                callback: o
            });
        }
    })) : i(a);
}

function l(a) {
    var t = a.url, e = a.data, o = a.member_id, n = a.member_token, l = a.callback;
    wx.request({
        url: t,
        data: e,
        dataType: "json",
        header: {
            "member-id": o,
            "member-token": n
        },
        success: function(a) {
            if ("nologin" == a.data.status) return wx.setStorageSync("member_id", ""), wx.setStorageSync("member_token", ""), 
            void i({
                url: t,
                data: e,
                callback: l
            });
            l(a);
        },
        complete: function(a) {
            wx.hideLoading();
        }
    });
}

function i(a) {
  console.log('ilogin')
    var t = a.url, o = a.url, l = a.callback;
    wx.login({
        success: function(r) {
            var s = r.code;
            s && wx.getUserInfo({
                success: function(i) {
                  var r = i.encryptedData, u = i.iv;
                    wx.request({
                      url: j + "/stroy/decrypt.json",
                        data: {
                            code: s,
                            encryptdata: r,
                            iv: u
                        },
                        dataType: "json",
                        success: function(i) {
                            r = i.data.data;
                            // try {
                            //     var r = i.data.replace("\ufeff", "");
                            //     r = JSON.parse(r);
                            // } catch (a) {}

                          if ("200" == i.data.code) {
                                var s = Date.parse(new Date()), u = c(s + "czgs_token"), p = wx.getSystemInfoSync();
                                wx.request({
                                  url: j + "/story/onlogin.json",
                                  data: {
                                      key: s,
                                      token: u,
                                      unionid: r.unionId,
                                      openid: r.openId,
                                      nickName: r.nickName,
                                      avatarUrl: r.avatarUrl,
                                      province: r.province,
                                      country: r.country,
                                      city: r.city,
                                      gender: r.gender,
                                      by: h.globalData.by,
                                      xcx: 1,
                                      terminal_type: JSON.stringify(p)
                                  },
                                  success: function(i) {
                                    if ("200" == i.data.code) {
                                      var res = i.data.data;
                                      h.globalData.member = res.member;
                                      h.globalData.member_id = res.member_id;
                                      h.globalData.member_token = res.member_token;
                                      wx.setStorageSync("member_id", res.member_id);
                                      wx.setStorageSync("member_token", res.member_token);
                                      // t && o ? n(a) : l && l(i);
                                      l && l(i);
                                    } else {
                                      e("登录失败，请稍后再试 2");
                                    }
                                      // "y" == i.data.status ? (h.globalData.member = i.data.member, h.globalData.member_id = i.data.member_id, 
                                      // h.globalData.member_token = i.data.member_token, wx.setStorageSync("member_id", i.data.member_id), 
                                      // wx.setStorageSync("member_token", i.data.member_token), t && o ? n(a) : l && l(i)) : e("登录失败，请稍后再试 2");
                                  },
                                  fail: function(a) {
                                      e("登录失败，请稍后再试 1 ");
                                  }
                                });
                            } else e("登录失败，请稍后再试。");
                        }
                    });
                },
                fail: function(t) {
                  e("未能获取到您的授权，请允许'村长讲故事'使用您的用户信息", "", function() {
                    wx.openSetting({
                      success: function(a) {},
                      fail: function(a) {},
                      complete: function(t) {
                        console.log(t), wx.showLoading({
                            title: "加载中..."
                        }), i(a);
                      }
                    });
                  });
                }
            });
        },
        fail: function(a) {
            console.info(a);
        }
    });
}

function r(a, t) {
    a.data.pay_detail.real_price;
    var o = a.data.pay_detail.coupon ? a.data.pay_detail.coupon.id : 0, l = j + "/pay/album_order", i = {};
    switch (t = t || 1) {
      case 1:
        i = {
            album_id: a.data.pay_id,
            coupon_id: o
        };
        break;

      case 2:
        l = j + "/pay/course_order", i = {
            course_id: a.data.pay_id,
            coupon_id: o
        };
    }
    n({
        url: l,
        data: i,
        callback: function(t) {
            if ("paid" == t.data.status) return e(t.data.info), void a.onLoad(a.data.para);
            console.info(t);
            var o = new Date().getTime().toString(), n = "appId=wx74831e0a7c35b067&nonceStr=" + t.data.wx.nonce_str + "&package=prepay_id=" + t.data.wx.prepay_id + "&signType=MD5&timeStamp=" + o + "&key=2n6dJRagB35Yj6yxEtezNO3mJBrZhcxl";
            n = c(n).toUpperCase(), wx.requestPayment({
                timeStamp: o,
                nonceStr: t.data.wx.nonce_str,
                package: "prepay_id=" + t.data.wx.prepay_id,
                signType: "MD5",
                paySign: n,
                success: function(t) {
                    "requestPayment:ok" === t.errMsg && a.setData({
                        pay_hide: "hide",
                        pay_success_hide: "",
                        buy: !0,
                        buy_hide: "hide"
                    });
                },
                fail: function(t) {
                    "requestPayment:fail cancel" == t.errMsg && a.setData({
                        pay_hide: "hide"
                    });
                },
                complete: function(a) {
                    console.info("complete"), console.info(a);
                }
            }), wx.hideLoading();
        }
    });
}

function c(a) {
    return x.md5(a);
}

function s(a, t) {
    console.info("上一首");
    var e = h.globalData.play_index, o = h.globalData.play_list;
    return 1 == o.length || 0 == e ? (a.setData({
        no_prev_hide: "icon-on-none"
    }), !1) : (e - 1 == 0 && a.setData({
        no_prev_hide: "icon-on-none"
    }), o.length > 1 && a.setData({
        no_next_hide: ""
    }), o ? (isNaN(e) && (e = 0), o[e].play_now = !1, o[e - 1] ? e-- : e = o.length - 1, 
    o[e].play_now = !0, g(a, o[e], o), p(a, !0), f(o[e].id, 1, a), h.globalData.play_list = o, 
    void (h.globalData.play_index = e)) : (this.setData({
        play: !1
    }), clearInterval(w), wx.pauseBackgroundAudio(), !1));
}

function u(a, t) {
    console.info("下一首");
    var e = h.globalData.play_list, o = h.globalData.play_index;
    if ((1 == e.length || o == e.length - 1) && (a.setData({
        no_next_hide: "icon-next-none"
    }), t)) return !1;
    if (o == e.length - 2 && a.setData({
        no_next_hide: "icon-next-none"
    }), e.length > 1 && a.setData({
        no_prev_hide: ""
    }), 2 != h.globalData.play_obj.type) {
        clearInterval(w);
        var n = h.globalData.play_type;
        if (3 == n) return g(a, h.globalData.play_obj, e), void p(a, !0);
        if (!e) return this.setData({
            play: !1
        }), clearInterval(w), wx.pauseBackgroundAudio(), !1;
        (isNaN(o) || "" == o) && (o = 0);
        for (var l = 0; l < e.length; l++) e[l].play_now = !1;
        if (e[o].play_now = !1, "1" == wx.getStorageSync("timer_option")) return a.setData({
            no_countdown: "active",
            countdown_end: "",
            countdown_15: "",
            countdown_30: "",
            countdown_60: "",
            countdown_90: ""
        }), wx.setStorageSync("timer_option", "0"), void g(a, e[o], e);
        if (e[o + 1]) console.info("如果有下一首"), e[++o].play_now = !0, f(e[o].id, 1, a); else {
            if (console.info("如果有下一首"), 1 == n && o + 1 >= e.length) return _(a), void g(a, e[o], e);
            e[o = 0].play_now = !0;
        }
        g(a, e[o], e), p(a, !0);
    } else e[o + 1] && (e[o].play_now = !1, e[++o].play_now = !0, e[o + 1] && "hide" == e[o + 1].hide && (e[o + 1].hide = ""), 
    f(e[o].id, 2, a)), a.setData({
        play_list: e,
        play_obj: e[o]
    });
    h.globalData.play_list = e, h.globalData.play_index = o;
}

function p(a, o) {
    h.globalData.play;
    var l = h.globalData.play_obj;
    n({
        url: j + "/index/play_url",
        data: {
            id: l.id,
            type: a.data.info_type
        },
        callback: function(i) {
            (o || !0 === h.globalData.stop) && (console.info("app.globalData.stop: " + h.globalData.stop), 
            l.file_path = i.data.file_path, h.globalData.play_obj = l);
            var r = getCurrentPages();
            "pages/play/play" == r[r.length - 1].route && wx.setNavigationBarTitle({
                title: l.title
            }), 2 == l.type ? a.videoContext.play() : (console.info("file_path: " + h.globalData.play_obj.file_path), 
            (D = wx.getBackgroundAudioManager()).title = l.title, D.epname = l.parent.title, 
            D.singer = l.speaker.name, D.coverImgUrl = l.icon, (o || !0 === h.globalData.stop) && (h.globalData.curr_time > 0 && (D.startTime = h.globalData.curr_time, 
            h.globalData.curr_time = null), D.src = h.globalData.play_obj.file_path), D.play(), 
            h.globalData.play = !0, h.globalData.stop = !1, D.onPlay(function(t) {
                console.info("onPlay: "), a.setData({
                    play: !0
                });
            }), D.onWaiting(function(a) {
                console.info("onWaiting");
            }), D.onStop(function(a) {
                console.info("onStop");
            }), D.onPause(function(t) {
                console.info("onPause"), a.setData({
                    play: !1
                }), h.globalData.play = !1;
            }), D.onTimeUpdate(function(e) {
                var o = parseInt(h.globalData.play_obj.time_length), n = parseInt(h.globalData.play_now), l = n / o * 100;
                if (D.currentTime < o) {
                    var i = parseInt(D.currentTime);
                    l = n / o * 100, a.setData({
                        play: h.globalData.play,
                        play_now: i,
                        play_count: t(i),
                        play_percent: l,
                        play_end: h.globalData.play_end,
                        play_url: h.globalData.play_url,
                        play_obj: h.globalData.play_obj
                    }), h.globalData.play_now = i, h.globalData.play_count = t(i), h.globalData.play_percent = l, 
                    h.globalData.play_url = "/pages/play/play?id=" + h.globalData.play_obj.id + "&type=" + h.globalData.play_obj.info_type + "&like_play=" + (1 == h.globalData.like_play ? 1 : 0);
                } else u(a);
            }), D.onEnded(function() {
                u(a);
            }), D.onPrev(function(t) {
                console.info("onPrev"), s(a, !0);
            }), D.onNext(function(t) {
                u(a, !0);
            }), D.onError(function(t) {
                switch (_(a), parseInt(t.errCode)) {
                  case 10001:
                    e("系统错误");
                    break;

                  case 10002:
                    wx.showModal({
                        title: "网络错误",
                        content: "您的网络不稳定导致播放暂停，是否继续播放？",
                        cancelText: "不了",
                        confirmText: "是的",
                        success: function(t) {
                            t.confirm ? (h.globalData.curr_time = D.currentTime, h.globalData.play = !1, a.play()) : t.cancel;
                        }
                    });
                    break;

                  case 10003:
                    e("文件错误");
                    break;

                  case 10004:
                    e("格式错误");
                    break;

                  case -1:
                    e("未知错误");
                }
                var o = {
                    code: t.errCode,
                    msg: t.errMsg,
                    src: t.src
                };
                console.info("err_info"), console.info(o), n({
                    url: j + "/opera/add_error",
                    data: {
                        err_data: JSON.stringify(o)
                    },
                    callback: function(a) {
                        console.info(a);
                    }
                });
            }));
        }
    });
}

function d() {
    var a = getCurrentPages();
    return a[a.length - 1].route;
}

function _(a) {
    a.pause(), h.globalData.stop = !0, D && (D.stop(), D.onTimeUpdate(function() {}));
}

function g(a, e, o) {
    a.setData({
        play: !1,
        play_obj: e,
        play_list: o,
        play_now: 0,
        play_count: "00:00",
        play_percent: 0,
        play_end: t(e.time_length)
    }), h.globalData.play = !1, h.globalData.play_now = 0, h.globalData.play_count = "00:00", 
    h.globalData.play_end = t(e.time_length), h.globalData.play_obj = e, h.globalData.play_list = o, 
    h.globalData.play_url = "/pages/play/play?id=" + h.globalData.play_obj.id + "&type=" + h.globalData.play_obj.info_type, 
    2 == e.type && (a.videoContext = wx.createVideoContext("video"), a.videoContext.play());
}

function f(a, t, e) {
    wx.request({
        url: j + "/opera/play_add",
        data: {
            id: a,
            type: t
        },
        success: function(a) {
            e.setData({
                share: a.data.share
            });
        }
    });
}

function y(a) {
    n({
        url: j + "/opera/give_coupon_for_new",
        data: {},
        callback: function(t) {
            "y" == t.data.status ? a.setData({
                newer_hide: "hide",
                newer_coupon_hide: "",
                coupon: t.data.coupon
            }) : e("您似乎不能领取优惠券红包");
        }
    });
}

function b(a, t, o) {
    if ("y" == a.data.status) {
        if (a.data.price > 0) {
            var n = {
                coupon: a.data.coupon,
                coupon_list: a.data.coupon_list,
                price: a.data.price,
                real_price: a.data.real_price
            };
            if (n.coupon_list) for (var l = 0; l < n.coupon_list.length; l++) n.coupon_list[l].amount = parseFloat(n.coupon_list[l].amount);
            n.coupon_list ? t.setData({
                pay_detail: n,
                pay_hide: ""
            }) : (t.setData({
                pay_detail: n
            }), r(t, o));
        }
    } else e("请求服务器超时，请稍后再试");
}

var m, D, h = getApp(), w = {}, v = {}, x = require("md5.js"), k = 1, S = 20, j = "http://127.0.0.1:8888";

module.exports = {
    random_num: function(a, t) {
        var e = t - a, o = Math.random();
        return a + Math.round(o * e);
    },
    formatTime: function(t) {
        var e = t.getFullYear(), o = t.getMonth() + 1, n = t.getDate(), l = t.getHours(), i = t.getMinutes(), r = t.getSeconds();
        return [ e, o, n ].map(a).join("/") + " " + [ l, i, r ].map(a).join(":");
    },
    checkTime: function(a) {
        return a < 10 && (a = "0" + a), a;
    },
    error: e,
    add_error: function(a) {
        n({
            url: j + "/opera/add_error",
            data: {
                url: d(),
                err_data: a
            },
            callback: function(a) {}
        });
    },
    error_back: function(a) {
        wx.showModal({
            title: "提示",
            content: a,
            showCancel: !1,
            mask: !0,
            complete: function(a) {
                wx.navigateBack();
            }
        });
    },
    success: o,
    tip: function(a) {
        wx.showToast({
            title: a
        });
    },
    get_info: function(a) {
        var t = a.url, e = a.data, o = a.that, l = a.clear, i = a.callback;
        if (k = o.data.pid ? o.data.pid : k, S = o.data.psize ? o.data.psize : S, e ? e.version = h.globalData.version : e = {
            version: h.globalData.version
        }, !o.data.next) return o.setData({
            load_obj: {
                loading: "hide",
                nomore: ""
            }
        }), !1;
        o.setData({
            load_obj: {
                loading: "",
                nomore: "hide"
            }
        }), n({
            url: t + "?pid=" + k + "&psize=" + S,
            data: e,
            callback: function(a) {
                o.setData({
                    base: a,
                    m: a.data.member
                });
                try {
                    void 0 !== o.data.m && o.data.m.name && (o.data.m.name = o.data.m.name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, ""));
                } catch (a) {}
                if ("n" === a.data.status) wx.showToast({
                    title: a.data.info
                }); else if (void 0 !== a.data.list) {
                    if ((void 0 === a.data.list || 0 === a.data.list.length) && 1 === o.data.pid) return o.setData({
                        next: !1,
                        list: {}
                  }), void (i && i(a.data));
                    if (a.data.list.length < (o.data.psize ? o.data.psize : S) && o.setData({
                        next: !1,
                        load_obj: {
                            loading: "hide",
                            nomore: ""
                        }
                    }), l) o.setData({
                        list: a.data.list,
                        list_state: "",
                        xcx_control_hide: a.data.global ? 1 == a.data.global.pay_hide : 0
                    }); else {
                        var t = o.data.list.concat(a.data.list);
                        o.setData({
                            list: t,
                            list_state: "",
                            xcx_control_hide: a.data.global ? 1 == a.data.global.pay_hide : 0
                        });
                    }
                    i && i(a.data);
              } else i && i(a.data); 
            },
            fail: function(a) {},
            complete: function(a) {
                wx.stopPullDownRefresh();
                var t = o.data.load_obj;
                t.loading = "hide", o.setData({
                    load_obj: t
                });
            }
        });
    },
    check: function(a, t) {
        switch (t) {
          case "zh":
            if (/[\u4E00-\u9FA5]|[\uFE30-\uFFA0]/gi.exec(a)) return !0;
            break;

          case "zh2-4":
            if (/^[\u4E00-\u9FA5\uf900-\ufa2d]{2,4}$/.test(a)) return !0;
            break;

          case "phone":
            if (/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(a)) return !0;
            break;

          case "e":
            if (/^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,3}$/.test(a)) return !0;
            break;

          case "n":
            if (!isNaN(a) && void 0 !== a && "" !== a) return !0;
        }
        return !1;
    },
    invite: function(a) {
        if (isNaN(a) || 0 === a || "0" === a) return !1;
        wx.request({
            url: "https://api.wzhekou.com/quan/set_my_parent_member",
            data: {
                parent_id: a
            },
            header: {
                member_id: h.globalData.member_id,
                member_token: h.globalData.member_token
            },
            success: function(a) {
                console.clear(), console.info(a);
            }
        });
    },
    redirect: function(a) {
        "#" !== a && "" !== a && wx.reLaunch({
            url: a
        });
    },
    request_m: n,
    request: l,
    login: i,
    pay: function(a, t, o) {
        var l = wx.getSystemInfoSync();
        if (console.info(l), l.system.toLowerCase().indexOf("ios") > -1) e(h.globalData.iosTip); else {
            var r = j + "/pay/";
            switch (t) {
              case 1:
                r += "/album";
                break;

              case 2:
                r += "/course";
                break;

              default:
                return e("操作失误，请稍后稍后重试"), !1;
            }
            var c = h.globalData.member_id, s = h.globalData.member_token;
            if (!c || !s) return i(r, {
                id: a,
                xcx: 1
            }, function(a) {
                1 == a.data.is_new && y(o), b(a, o, t);
            }), !1;
            wx.showLoading({
                title: "正在确认订单...",
                mask: !0
            }), n({
                url: r,
                data: {
                    id: a,
                    xcx: 1
                },
                callback: function(a) {
                    b(a, o, t);
                }
            });
        }
    },
    topay: r,
    md5: c,
    sec2min: t,
    chose_coupon: function(a, t) {
        var e = a.currentTarget.dataset.id, o = a.currentTarget.dataset.status, n = t.data.pay_detail;
        if (1 == o) {
            for (var l = t.data.pay_detail.coupon_list, i = 0; i < l.length; i++) l[i].id == e && (n.coupon = l[i], 
            n.real_price = (n.price - n.coupon.amount).toFixed(2), t.setData({
                pay_detail: n
            }));
            t.close_coupon();
        }
    },
    like_comment: function(a, t) {
        n({
            url: j + "/opera/like",
            data: {
                id: t,
                type: 3
            },
            callback: function(e) {
                if ("y" == e.data.status) {
                    var o = "", n = e.data.count, l = a.data.comment_list;
                    "1" == e.data.add && (o = 1);
                    for (var i = 0; i < l.length; i++) l[i].id == t && (l[i].like = o, l[i].like_count = n);
                    a.setData({
                        comment_list: l
                    });
                }
            }
        });
    },
    init_global_play: function(a) {
        if (D) {
            var e = D.src, o = D.currentTime;
            D.title, D.coverImgUrl, h.globalData.play_now = parseInt(o), h.globalData.play_count = t(parseInt(o)), 
            e && (a.setData({
                play: h.globalData.play,
                play_now: h.globalData.play_now,
                play_count: h.globalData.play_count,
                play_end: h.globalData.play_end,
                play_url: h.globalData.play_url,
                play_obj: h.globalData.play_obj
            }), clearInterval(m), m = setInterval(function() {
                h.globalData.play_now, h.globalData.play_obj.time_length, a.setData({
                    play: h.globalData.play,
                    play_now: h.globalData.play_now,
                    play_count: h.globalData.play_count,
                    play_end: h.globalData.play_end,
                    play_url: h.globalData.play_url,
                    play_obj: h.globalData.play_obj,
                    play_percent: h.globalData.play_percent
                });
            }, 1e3));
        }
    },
    share_info: function(a, t, e, l) {
        var i = h.globalData.member, r = "/pages/index/index", c = "", s = "村长讲故事";
        return a && (a.img_url ? c = a.img_url : a.img && (c = a.img), a.url && (r = a.url ? a.url : r), 
        a.title && (s = a.title)), -1 == r.indexOf("?") ? r += "?member_id=" + (i ? i.id : 0) : r += "&member_id=" + (i ? i.id : 0), 
        e || (e = a.that), e && e.setData({
            share_hide: "hide"
        }), {
            title: s,
            path: r,
            imageUrl: c,
            success: function(r) {
                i && e && n({
                    url: t ? j + "/opera/pay_share" : j + "/opera/first_share",
                    data: {},
                    callback: function(t) {
                        "y" == t.data.status ? e.setData({
                            coupon: t.data.coupon,
                            share_coupon_hide: ""
                        }) : l ? l() : o(a.share_tip ? a.share_tip : "分享成功");
                    }
                });
            },
            complete: function() {
                e && e.setData({
                    share_gift_hide: "",
                    share_hide: ""
                });
            }
        };
    },
    counting: function(a) {
        return;
    },
    play_prev: s,
    play_next: u,
    play: p,
    stop: _,
    pause: function(a) {
        a.setData({
            play: !1
        }), h.globalData.play = !1, clearInterval(w), clearInterval(v), D && D.pause(), 
        a.videoContext && a.videoContext.pause();
    },
    init_play: g,
    play_add: f,
    take_new_coupon: y,
    clear_counting: function() {
        clearInterval(w);
    },
    take_counting: function(a) {
        var t = Date.parse(new Date());
        a = a.replace(/-/g, "/");
        var e = Date.parse(new Date(a)) - t, o = Math.floor(e / 864e5), n = e % 864e5, l = Math.floor(n / 36e5), i = n % 36e5, r = Math.floor(i / 6e4), c = i % 6e4, s = Math.round(c / 1e3);
        if (l = l < 10 ? "0" + l : l, r = r < 10 ? "0" + r : r, s = s < 10 ? "0" + s : s, 
        parseInt(o) <= 0 && parseInt(l) <= 0 && parseInt(r) <= 0 && parseInt(s) <= 0) return !1;
        var u = "";
        return o > 0 && (u += o + "天"), u += l + ":" + r + ":" + s;
    },
    send_formid: function(a, t) {
        var e = a.detail.target.dataset.url;
        wx.navigateTo({
            url: e
        });
    },
    lazy_show_img: function(a, t, e) {
        var o = h.globalData.scroll;
        if (o) o.time != new Date().getTime() && (h.globalData.scroll = {
            time: new Date().getTime(),
            top: t
        }); else {
            var n = {
                time: new Date().getTime(),
                top: t
            };
            h.globalData.scroll = n;
        }
        setTimeout(function() {
            if (console.info("scroll_top: " + t + ", app.globalData.scroll.top: " + h.globalData.scroll.top), 
            t == h.globalData.scroll.top) {
                var o = e.data.img_list;
                wx.createSelectorQuery().selectAll(a).boundingClientRect(function(a) {
                    var n = !1;
                    a.forEach(function(a, e) {
                        a.top < h.globalData.sys_info.windowHeight + t && "lazy-img" != o[e].css && (o[e].css = "lazy-img", 
                        n = !0);
                    }), n && e.setData({
                        img_list: o
                    }), setTimeout(function() {
                        n = !1, a.forEach(function(a, e) {
                            a.top < h.globalData.sys_info.windowHeight + t && o[e].base_img != o[e].origin_img && (o[e].base_img = o[e].origin_img, 
                            n = !0);
                        }), n && e.setData({
                            img_list: o
                        });
                    }, 500);
                }).exec();
            }
        }, 500);
    },
    get_all_img_list: function(a, t, e) {
        var o = [];
        wx.createSelectorQuery().selectAll(a).boundingClientRect(function(a) {
            a.forEach(function(a, t) {
                var e = {
                    base_img: "/pages/image/story_lazy.png",
                    origin_img: a.dataset.original
                };
                o.push(e);
            });
        }).exec(function(a) {
            t.setData({
                img_list: o
            }), e();
        });
    },
    copy_id: function(a, t) {
        var e = 1 == t ? a.data.album : a.data.course;
        wx.setClipboardData({
            data: e.id + "-" + t
        }), a.setData({
            go_contact: 1
        });
    },
    get_url: d,
    is_iOS: function() {
        return wx.getSystemInfoSync().system.toLowerCase().indexOf("ios") > -1;
    },
    api_url: j,
    play_timer: void 0,
    bgm: D
};