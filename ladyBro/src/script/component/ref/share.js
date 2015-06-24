/* 

 */

(function($,window) {
    function pageShare(options) {
        var o = options;
        this.linkUrl = o.linkUrl || "";
        this.imgUrl =o.imgUrl||"";
        this.shareTitle = o.shareTitle || "";
        this.souhuTitle = o.shareTitle || "";
        this.descContent = o.descContent || "";
        this.pict = "";
        this.appid = "";
        this._initShare();
        return this;
    }
    pageShare.prototype = {
        constructor: pageShare,
        _initShare: function() {
        	var that=this;
            // 当微信内置浏览器完成内部初始化后会触发WeixinJSBridgeReady事件。
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                // 发送给好友
                WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                   that._shareFriend();
                });
                // 分享到朋友圈
                WeixinJSBridge.on('menu:share:timeline', function(argv) {
                    that._shareTimeline();
                });
                // 分享到微博
                WeixinJSBridge.on('menu:share:weibo', function(argv) {
                    that._shareWeibo();
                });
            
            }, false);

            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                WeixinJSBridge.call('hideToolbar');
            });

          // that._shareWb();
        },

        //微信分享
        _shareFriend: function() {
            var that = this;
            WeixinJSBridge.invoke('sendAppMessage', {
                "appid": that.appid,
                "img_url": that.imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": that.linkUrl,
                "desc": that.descContent,
                "title": that.shareTitle
            }, function(res) {
                //_report('send_msg', res.err_msg);
            });
        },

        _shareWeibo: function() {
            var that = this;
            WeixinJSBridge.invoke('shareWeibo', {
                "content": that.descContent,
                "url": that.linkUrl,
            }, function(res) {
                //_report('weibo', res.err_msg);
            });
        },

        _shareTimeline: function() {
            var that = this;
            WeixinJSBridge.invoke('shareTimeline', {
                "img_url": that.imgUrl,
                "img_width": "200",
                "img_height": "200",
                "link": that.linkUrl,
                "desc": that.descContent,
                "title": that.shareTitle
            }, function(res) {
                //_report('timeline', res.err_msg);
            });
        }
   }
   window.pageShare=pageShare;
})(jQuery,window)


