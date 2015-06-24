/**
 *   WeChat 插件
 *   自启动组件
 */
(function(Wap, M, W){
    var Const = M.Const;
    var Dao = M.Req;

    var WeChat ={
        ClassName:"WeChat",

        init: function(ops){
            this.ops = ops || {};

            this._check({
                url:this.ops.url
            });
        },
        _check:function(config){
               var conf = config || {};
                    Dao.req(
                        Const.CHECK_WECHAT,
                        function(data){
                            var config = {
                                debug: false,
                                appId: Const.APP_ID,
                                timestamp: data.timestamp,
                                nonceStr: data.nonceStr,
                                signature: data.signature,
                                jsApiList: [
                                    'onMenuShareTimeline',
                                    'onMenuShareAppMessage',
                                    'hideMenuItems',
                                    'showMenuItems'
                                ]
                            };


                            wx.config(config);
                },
                {shareUrl:encodeURI(location.href)},
                true,
                function(data){
                    console.error('req  '+ Const.CHECK_WECHAT + " error "+data);
                });


        }
    };

    WeChat.init();
   /* M.WeChat = function(ops){
         return  new WeChat(ops);
    }*/
})(window.Wap, window.HB,window);

