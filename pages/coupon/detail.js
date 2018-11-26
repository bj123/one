getApp(), require("../../utils/util.js");

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
        hb_pop_hide: "hide"
    },
    onLoad: function() {
        this.setData({
            none_a: "display:block"
        });
    },
    closeX: function() {
        this.setData({
            none_a: "display:none"
        });
    },
    onShareAppMessage: function(e) {},
    onPullDownRefresh: function() {
        this.onLoad({
            id: this.data.promotion.id,
            task_id: this.data.task.id
        }), setTimeout(function() {
            wx.stopPullDownRefresh();
        }, 1e3);
    },
    show_rule: function(e) {
        this.setData({
            rule_hide: ""
        });
    },
    close_rule: function() {
        this.setData({
            rule_hide: "hide"
        });
    }
});