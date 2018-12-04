var a = getApp(), t = require("../../utils/util.js"), e = t.api_url + "/my/cash";

Page({
    data: {
        pid: 1,
        psize: 20,
        next: !0,
        member: {},
        list: {},
        amount_value: "",
        load_obj: {
            loading: "hide",
            nomore: "hide"
        },
        nodata_hide: "hide"
    },
    onLoad: function(r) {
        var i = this, o = a.globalData.member;
        o && this.setData({
            member: o
        }), t.get_info({
            url: e,
            data: {},
            that: this,
            clear: !0,
            callback: function(a) {
                var e = i.data.load_obj, r = "hide";
                0 == a.list.length ? r = "" : a.list.length < i.data.psize && (e.nomore = ""), i.setData({
                    load_obj: e,
                    nodata_hide: r
                }), "y" != a.status && t.error_back(a.data.info);
            }
        });
    },
    to_cash: function(a) {
        var e = a.detail.value.real_name, r = a.detail.value.amount, i = this;
        if ("" == e) return t.error("请输入真实姓名"), !1;
        if ("" == r) return t.error("请输入提现金额"), !1;
        if (!t.check(e, "zh")) return t.error("真实姓名只能输入中文"), !1;
        if (!t.check(r, "n")) return t.error("提现金额只能输入整数"), !1;
        if (parseInt(r) < 30) return t.error("提现金额必须大于30元"), !1;
        var o = new Date().getTime(), n = t.md5(o + "czgs_token");
        t.request_m({
          url: t.api_url + "/story/returnCash.jso",
          data: {
            real_name: e,
            amount: r,
            userId: a.globalData.member.id,
            key: o,
            token: n
          },
          callback: function(a) {
              "200" === a.data.code ? (t.success("提现成功，3个工作日内到帐，请注意查收"), i.setData({
                  amount_value: ""
              })) : t.error(a.data.info);
          }
        });
    },
    onReachBottom: function() {
        if (this.data.next) {
            var a = this, r = this.data.pid + 1;
            this.setData({
                pid: r
            }), t.get_info({
                url: e,
                data: {},
                that: this,
                clear: !1,
                callback: function(t) {
                    var e = a.data.load_obj, r = "hide";
                    0 == t.list.length ? r = "" : t.list.length < a.data.psize && (e.nomore = ""), a.setData({
                        load_obj: e,
                        nodata_hide: r
                    });
                }
            });
        }
    }
});