/**
 *   WeChat 插件
 *   自启动组件
 */
(function(Wap, M, W){
    var Const = Wap.Const;
    var Cmp = Wap.Component;
    var Dao = Wap.Dao;

    var WeChat = Cmp.extend({
        ClassName:"WeChat",

        init: function(ops){
            this.ops = ops || {};

            this._check({
                url: this.ops.url
            });
        },

        _check:function(config){
            var conf = config || {};

            //发送ajax请求，请求配置信息，注入微信验证
            Dao.req({
                data:{
                    shareUrl:encodeURI(location.href)
                },
                success:function(data){
//                    alert(JSON.stringify(data));
                    wx.config({
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
                    });
                },
                error:function(data){
                     console.error('req  '+ Const.CHECK_WECHAT + " error "+data);
                }
            },Const.CHECK_WECHAT)
        }
    });

    new WeChat()
   /* M.WeChat = function(ops){
         return  new WeChat(ops);
    }*/
})(window.Wap, window.HB,window);

