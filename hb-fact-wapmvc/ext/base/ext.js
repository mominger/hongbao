/**
 * 扩展类(工具类)  不允许存在子类重写父类的情况
 */
(function(M){
    var ErrorNet = M.ErrorNet;
    var Const = M.Const;

    /**ECMA扩展  **/
    /**
     *  格式化:支持 动态参数/数组/json对象
     * @desc xxx{0}xx{1} --> a,b --> xxxaxxb  或 xxx{a}xx{b} --> {a:1,b:2} --> xxx1xx2
     */
    String.prototype.format = function(){
        var jsonFlag = arguments.length == 1 && arguments[0] instanceof Object,
            args = jsonFlag ? arguments[0] : arguments,
            reg = jsonFlag ? /\{(\w+)\}/g : /\{(\d+)\}/g;

        return this.replace(reg,
            function(m, i){
                return args[i] || '';
            });
    };
    String.prototype.startWith=function(str){
        var reg=new RegExp("^"+str);
        return reg.test(this);
    }

    String.prototype.endWith=function(str){
        var reg=new RegExp(str+"$");
        return reg.test(this);
    }

    /**
     * @desc 替换全部
     * @param oldStr   String/RegExp
     */
    String.prototype.replaceAll = function(oldStr, newStr){
        if(!RegExp.prototype.isPrototypeOf(oldStr)){
            return this.replace(new RegExp(oldStr, 'g'), newStr);
        }else{
            return this.replace(oldStr, newStr);
        }
    };

    /*$扩展*/

    /** 项目扩展 **/
    M.Ext =  {
        tipNetError: function(){
            try{
                ErrorNet();
            }catch(e){
                console.error('Component Wap.ErrorNet is not exist');
            }
        },
        getWeChat: function(path, conf){
            var ops = conf || {};

            if(path.indexOf('http') === -1){
                path = encodeURIComponent([Const.PRO_PATH,'RES/hb/', path].join(''));
            }
            var tpl = ['https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri=',
                path, '&response_type=code&scope=snsapi_base&state={1}#wechat_redirect'].join('');

            return tpl.format(Const.APP_ID, ops.state);


        },
        share: function(config){
            var url = '{0}?activityId={1}&dirPurseId={2}';
            config.url = this.getWeChat(encodeURIComponent(url.format(config.path, config.activityId, config.solutionId)));
            var shareConfig = {
                "appid": '',
                "img_url":  config.shareIcon || Const.SHARE_IMG,
                "img_width": "200",
                "img_height": "200",
                "link": config.url,
                "desc": config.shareContent || Const.SHARE_DESC,
                "title": config.title || Const.SHARE_TITLE
            };
            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                WeixinJSBridge.on('menu:share:appmessage', function(argv) {
                    WeixinJSBridge.invoke('sendAppMessage', shareConfig, function(res) {
                        //_report('send_msg', res.err_msg);
                    });
                });
                // 分享到朋友圈
                WeixinJSBridge.on('menu:share:timeline', function(argv) {
                    WeixinJSBridge.invoke('shareTimeline', shareConfig, function(res) {
                    });
                });
                // 分享到微博
                WeixinJSBridge.on('menu:share:weibo', function(argv) {
                    WeixinJSBridge.invoke('shareWeibo', shareConfig, function(res) {
                    });
                });

                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
                    WeixinJSBridge.call('hideToolbar');
                });
            });
        },

        getInt: function(num){
            if(!num) return 0;
            return isNaN(num) ? 0 : parseInt(num);
        },

        /**
         * TO 关注苏宁
         */
        toFocusSN: function(){
            _w.redirect(Const.FOCUS_SN);
        },

        /**
         * 群红包
         */
        toGetGroupHB: function(){
           _w.redirect(Const.GET_GROUP_HB);
        },

        /**
         * TO 购物页面
         */
        toBuy: function(){
            //如果未绑定需要去绑定界面，绑定直接去购物
            var buyPath = encodeURIComponent([Const.PRO_PATH,Const.DO_VALIDATE_CODE,'?target_url=',Const.BUY_PATH,'&channel=',Const.CHANNEL_ID].join(''));
            var url = this.getWeChat(buyPath, {state:1});
            _w.redirect(url);
        },

        show: function(dom){
            (dom instanceof $) && (dom = dom[0]);
             dom[0].style.display='block';
        },

        /**
         * 时间格式化
         */
        dateFormat: function(date, format){
            date = new Date(date);

            var map = {
                "M": date.getMonth() + 1, //月份
                "d": date.getDate(), //日
                "h": date.getHours(), //小时
                "m": date.getMinutes(), //分
                "s": date.getSeconds(), //秒
                "q": Math.floor((date.getMonth() + 3) / 3), //季度
                "S": date.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdhmsqS])+/g, function(all, t){
                var v = map[t];
                if(v !== undefined){
                    if(all.length > 1){
                        v = '0' + v;
                        v = v.substr(v.length-2);
                    }
                    return v;
                }
                else if(t === 'y'){
                    return (date.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
     }
    }
})(window.Wap);
