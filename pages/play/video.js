function t() {
    for (var t = [], e = 0; e < 3; ++e) {
        var n = Math.floor(256 * Math.random()).toString(16);
        n = 1 == n.length ? "0" + n : n, t.push(n);
    }
    return "#" + t.join("");
}

Page({
    onReady: function(t) {
        this.videoContext = wx.createVideoContext("myVideo");
    },
    inputValue: "",
    data: {
        src: "",
        danmuList: [ {
            text: "第 1s 出现的弹幕",
            color: "#ff0000",
            time: 1
        }, {
            text: "第 3s 出现的弹幕",
            color: "#ff00ff",
            time: 3
        } ]
    },
    bindInputBlur: function(t) {
        this.inputValue = t.detail.value;
    },
    bindButtonTap: function() {
        var t = this;
        wx.chooseVideo({
            sourceType: [ "album", "camera" ],
            maxDuration: 60,
            camera: [ "front", "back" ],
            success: function(e) {
                t.setData({
                    src: e.tempFilePath
                });
            }
        });
    },
    bindSendDanmu: function() {
        this.videoContext.sendDanmu({
            text: this.inputValue,
            color: t()
        });
    }
});