var t = getApp(), a = require("../../utils/util.js"), e = require("../../pages/wxParse/wxParse.js"), i = {}, o = 0, d = {};

Page({
    data: {
        desc_active: "active",
        story_active: "",
        desc_hide: "",
        story_hide: "hide",
        promotion: {
            start_time_format: "**-**-** **:**",
            end_time_format: "**-**-** **:**"
        },
        need_count: {},
        end_time: "**:**:**",
        time_stamp: "",
        share_tip_hide: "hide",
        rule_hide: "hide",
        member: {},
        pop_tip: ""
    },
    onLoad: function(s) {
        var r = s.id, n = s.task_id ? s.task_id : 0, _ = this;
        a.request_m({
            url: a.api_url + "/promotion/",
            data: {
                id: r,
                task_id: n
            },
            callback: function(s) {
                if ("y" == s.data.status) {
                    for (var r = [], n = 0; n < s.data.promotion.need_count; n++) r.push(n);
                    if (s.data.need_count = r, s.data.time_stamp = Date.parse(new Date()) / 1e3, s.data.member = t.globalData.member, 
                    console.log("d.data.promotion.status != -1"), console.log(-1 != s.data.promotion.status), 
                    s.data.task && 0 == s.data.task.status && t.globalData.member.id == s.data.task.member_id && -1 != s.data.promotion.status && (s.data.pop_tip = "您的拼团还差" + (s.data.promotion.need_count - s.data.task.now_count) + "人才能成功，别忘了邀请好友一起拼哦", 
                    s.data.share_tip_hide = ""), s.data.task_detail) for (n = 0; n < s.data.task_detail.length; n++) s.data.task_detail[n].member_id == t.globalData.member.id && (s.data.is_group = 1);
                    if (1 == s.data.is_group && !s.data.pop_tip && s.data.task && 0 == s.data.task.status && (s.data.pop_tip = "您已成功加入" + s.data.task.member.name + "的拼团，还差" + (s.data.promotion.need_count - s.data.task.now_count) + "人即可成团  赶快去邀请好友吧！", 
                    s.data.share_tip_hide = ""), 1 == s.data.task.status && (s.data.share_tip_hide = "hide"), 
                    s.data.suc_member_list) {
                        for (n = 0; n < s.data.suc_member_list.length; n++) s.data.suc_member_list[n].hide = "hide";
                        var u = s.data.suc_member_list;
                        clearTimeout(d), d = setInterval(function() {
                            o > u.length && (o = 0), u[o].hide = "", _.setData({
                                suc_member_list: u
                            }), setTimeout(function() {
                                u[o].hide = "hide", _.setData({
                                    suc_member_list: u
                                }), o++;
                            }, 2e3);
                        }, 3e3);
                    }
                    _.setData(s.data), s.data.task && (clearTimeout(i), i = setInterval(function() {
                        var t = a.take_counting(s.data.task.end_time);
                        t ? _.setData({
                            end_time: t
                        }) : _.setData({
                            end_time: "已结束"
                        });
                    }, 1e3)), e.wxParse("desc", "html", s.data.promotion.parent.desc, _), "is_buy" == s.data.code && a.error("您已通过【购买】解锁该专辑，可参与其它专辑的拼团活动~");
                } else a.error_back(s.data.info);
                setTimeout(function() {
                    _.setData({
                        share_tip_hide: "hide"
                    });
                }, 2e3), wx.hideLoading();
            }
        });
    },
    onShow: function(t) {
        wx.showLoading({
            title: "加载中..."
        }), setTimeout(function() {
            wx.hideLoading();
        }, 1e3);
    },
    onHide: function() {
        clearTimeout(d);
    },
    change_tag: function(t) {
        var a = t.currentTarget.dataset.type, e = this;
        switch (e.data.desc_hide = "hide", e.data.story_hide = "hide", e.data.comment_hide = "hide", 
        e.data.desc_active = "", e.data.story_active = "", a) {
          case "1":
            e.data.desc_hide = "", e.data.desc_active = "active";
            break;

          case "2":
            e.data.story_hide = "", e.data.story_active = "active";
        }
        e.setData(e.data);
    },
    onShareAppMessage: function(t) {
        var e = this, i = "pages/promotion/detail?id=" + this.data.promotion.id + "&task_id=" + this.data.task.id;
        return a.share_info({
            title: "来和我一起拼团，精选儿童睡前绘本故事免费听！",
            url: i,
            that: this,
            img: "https://img.cunzhanggushi.com/uploads/promotion_share_banner.jpg"
        }, !1, this, function() {
            a.request_m({
                url: a.api_url + "/promotion/add_share_count",
                data: {
                    promotion_id: e.data.promotion.id
                },
                callback: function(t) {}
            }), e.show_tip("已发送邀请！分享3个微信群，成功拼团概率高达98%");
        });
    },
    go_play: function(t) {
        var e = t.currentTarget.dataset.id, i = "/pages/play/play?id=" + e + "&type=" + this.data.promotion.info_type, o = this;
        if ("1" == o.data.task.status) wx.navigateTo({
            url: i
        }); else {
            for (var d = o.data.promotion.play_list, s = !0, r = 0; r < d.length; r++) d[r].id.toString() == e && 1 == d[r].try_listen && (s = !1, 
            d[r]);
            s ? a.error("拼团成功后即可解锁播放！") : wx.navigateTo({
                url: i
            });
        }
    },
    add_group: function(t) {
        var e = this;
        a.request_m({
            url: a.api_url + "/promotion/join_group",
            data: {
                task_id: e.data.task.id
            },
            callback: function(t) {
                "y" == t.data.status ? (1 == t.data.task.status ? a.success("恭喜您，已经解锁当前活动专辑") : a.success("参团成功！赶紧邀请好友一起来参团吧！"), 
                e.onLoad({
                    id: e.data.promotion.id,
                    task_id: e.data.task.id
                })) : a.error(t.data.info);
            }
        });
    },
    show_rule: function(t) {
        this.setData({
            rule_hide: ""
        });
    },
    close_rule: function() {
        this.setData({
            rule_hide: "hide"
        });
    },
    create_new_group: function() {
        var t = this;
        wx.showLoading({
            title: "加载中..."
        }), a.request_m({
            url: a.api_url + "/promotion/create",
            data: {
                id: t.data.promotion.id
            },
            callback: function(e) {
                "y" == e.data.status ? t.onLoad({
                    id: t.data.promotion.id
                }) : a.error(e.data.info), wx.hideLoading();
            }
        });
    },
    show_play_list: function() {
        this.setData({
            desc_hide: "hide",
            story_hide: "",
            desc_active: "",
            story_active: "active"
        }), wx.pageScrollTo({
            scrollTop: 300,
            duration: 300
        });
    },
    onPullDownRefresh: function() {
        this.onLoad({
            id: this.data.promotion.id,
            task_id: this.data.task.id
        }), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    show_tip: function(t) {
        var a = this;
        a.setData({
            pop_tip: t,
            share_tip_hide: ""
        }), setTimeout(function() {
            a.setData({
                share_tip_hide: "hide"
            });
        }, 2e3);
    }
});