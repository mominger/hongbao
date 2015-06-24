 //为什么每个类都有(function(M){})框住？冗余换边界。 以冗余写法来获得他们的明显边界。
 //我希望每个类都是独立的。类的内部只有类知道。
/**
 * 常量基类
 */
(function(M){
    var Const = M.Const = {
        /**   基本配置   **/
        PRO_PATH:  'http://msale.suning.com/mtss-web/',      //程序路径
         APP_ID: 'wx6aed9fdd44da794e',     				  //appID
         PRO_PATH_BIND: 'https://msale.suning.com/mtss-web/', //绑定程序路径
         BUY_PATH: 'http://m.suning.com/',               //购物路径

        /**   基本配置   **/
        /*PRO_PATH:  'http://sale.msit.cnsuning.com/mtss-web/',
        APP_ID: 'wx8f239bb5b209c040',     				  //appID
        PRO_PATH_BIND: 'https://sale.msit.cnsuning.com/mtss-web/',
        BUY_PATH: 'http://msit.cnsuning.com/',               //购物路径*/

        /**   特殊配置   **/
        CHANNEL_ID: '1001001',                                              //渠道ID
        APP_ANDROID: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.suning.mobile.ebuy&g_f=992129',//应用宝
        APP_IPHONE: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.suning.mobile.ebuy&g_f=992129', //应用宝
        SHARE_IMG: 'http://sale.suning.com/act/20150210/dj10/1212.jpg',             //分享图片
//        BUY_PATH: 'http://m.suning.com/',               //购物路径
        FOCUS_SN: 'http://mp.weixin.qq.com/s?__biz=MjM5NjA3MTU0MA==&mid=201247335&idx=1&sn=f6ef37131907242d75b347e378460a2b#rd', //关注引导页
        ACTIVE_RULE: 'http://sale.suning.com/images/advertise/009/xcgz9/actrule.html',//活动规则页
        GUIDES: 'http://m.suning.com/activeload_P291_0.html',   //攻略页

        /*话语配置*/
        SHARE_TITLE: '10亿新春礼包抢抢抢',    //分享标题
        SHARE_DESC:'新春礼包抢不停，喜过羊年倍开心！',      //分享内容

        /**    静态页面映射  **/
        BIND_ACCOUNT: 'bindaccount.html',                 //绑定账号
        GET_GROUP_HB: 'getgrouphb.html',                 //领取群红包*//*
        GET_HB: 'gethb.html',                             //领取红包
        HB_DETAIL: 'hbdetail.html',                       //红包详情
        MY_HB: 'myhb.html',                               //我的红包
        VALIDATE_CODE: 'validatecode.html',              //校对验证码

        /**    动态页面映射  **/
        DO_VALIDATE_CODE: 'gotoBindEgoAccount.do',       //后台校对验证码
        DO_GET_HB: 'mps/normalhb.do',                    //后台领取红包
        DO_GET_GROUP_HB: 'mps/grouphb.do',               //后台领取群红包

        /**  请求后台 公共URL **/
        CHECK_WECHAT: 'mps/queryShareConfigInfo.do',    //微信鉴权
        QUE_SHARE_INFO: 'mps/queryShareInfo.do'        //查询分享信息


        /**   请求后台URL **//*
         QUE_MY_TO_HB: 'mps/solutionList.do',				//查询我发的红包
         QUE_MY_FROM_HB: 'mps/normalList.do',         	//查询我挣的红包
         QUE_HB_DETAIL: 'mps/solutionDetail.do',          //查询红包详情
         CHECK_PHONE: 'verifyBindAct.do',                 //校对手机号
         CHECK_CODE: 'validateAuthCode.do',               //校对验证码
         GO_BIND_ACCOUNT: 'bindEgoAccount.do',            //绑定账号
         SEND_CODE: 'register/sendAuthCode.do',           //发送验证码
         REGISTER_BIND: 'regBind.do',                     //注册并绑定
         QUE_SHARE_INFO: 'mps/queryShareInfo.do',         //查询分享信息
         QUE_FRIEND_LIST: 'mps/luckyList.do',             //查询好友列表


         *//**  测试开关  **//*
         IS_TEST: false*/
    }
})(window.Wap = window.Wap || {});


/**
 * 扩展基类(工具类)  不允许存在子类重写父类的情况
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
        tipNetError: function(ops){
            try{
                M.ErrorNet(ops);
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
            if(!config){
                return wx.ready(function () {
                    wx.hideOptionMenu();
                });
            }

            var url = '{0}?activityId={1}&dirPurseId={2}';
            config.url = this.getWeChat(encodeURIComponent(url.format(config.path, config.activityId, config.solutionId)));
            var shareConfig = {
                "imgUrl":  config.shareIcon || Const.SHARE_IMG,
                "link": config.url || location.href,
                "desc": config.shareContent || Const.SHARE_DESC,
                "title": config.title || Const.SHARE_TITLE
            };

            wx.ready(function () {
                wx.checkJsApi({
                    jsApiList: [
                        'onMenuShareTimeline',
                        'onMenuShareAppMessage',
                        'onMenuShareQQ',
                        'onMenuShareWeibo',
                        'hideMenuItems',
                        'showMenuItems'
                    ],
                    success: function (res) {
                    }
                });
                wx.showOptionMenu();
                wx.onMenuShareAppMessage(shareConfig);
                wx.onMenuShareTimeline(shareConfig);

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
            _w.redirect(this.getWeChat(M.Const.PRO_PATH + M.Const.DO_GET_GROUP_HB));
        },

        getOpenId: function(){
            if(!window.OPEN_ID){
                var params = _w.getURLParam() || {};
                window.OPEN_ID =  params['openId'];
            }
            return window.OPEN_ID;
        },

        /**
         * 红包详情
         * @param data
         */
        toHBDetail: function(data){
            _w.redirect(Const.HB_DETAIL,data);
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

        isPhone: function(){
            return /(iPhone|iPod|iPad);?/i.test(navigator.userAgent);
        },

        /**
         * 下载应用
         */
        toApp: function(){
            _w.redirect(this.isPhone() ? Const.APP_IPHONE : Const.APP_ANDROID);
        },

        /**
         * 时间格式化
         */
        dateFormat: function(date, format){
            // 兼容IOS   ’XXXX-XX-XX‘先转换成’XXXX/XX/XX‘
            if(date.indexOf('-') !=  -1) date=date.split('-').join('/');
            if(date.indexOf('.') !=  -1) date=date.substr(0,date.indexOf('.')) ;//兼容后台返回时间脑残包含.0？
            var dateO = new Date(date);

            var map = {
                "M": dateO.getMonth() + 1, //月份
                "d": dateO.getDate(), //日
                "h": dateO.getHours(), //小时
                "m": dateO.getMinutes(), //分
                "s": dateO.getSeconds(), //秒
                "q": Math.floor((dateO.getMonth() + 3) / 3), //季度
                "S": dateO.getMilliseconds() //毫秒
            };
            format = format.replace(/([yMdhmsqS])+/g, function(all, t){
                var v = map[t];
                if(v !== undefined){
                    if(all.length > 1){
                        v = '0' + v;
                        v = v.substr(v.length - 2);
                       /* v = String(v);
                        len = v.length;
                        v = v.substr(len - (len > 1 ? 2 : 1));*/
                    }
                    return v;
                }
                else if(t === 'y'){
                    return (dateO.getFullYear() + '').substr(4 - all.length);
                }
                return all;
            });
            return format;
        }
    }
})(window.Wap);

/**
 * 模版基类
 * 默认支持  静态模板、artTemplate模板
 */
(function(M,W){
    var template = W.template;

    var tplConfig = ['staticTemplate','artTemplate'];
    M.Tpl = {
        /*默认artTemplate*/
        type: 'artTemplate',
        /*并行分割符*/
        parallelSplitter:',',
        /*模板: parse 模板解析方法 obj:模版对象 映射*/
        rule:{},
        startFilter: 'none',
        init: function(){
            var _this = this;
            tplConfig.forEach(function(v,i){
                var instance;
                switch(v){
                    case 'artTemplate': instance=template;break;
                    default: instance = {};
                }
                _this.rule[v] = {
                    parse: _this[['_',v,'Parse'].join('')],
                    instance: instance
                };
                _this[v]=v;
            })
            return this;
        },

        /**
         * 注册解析方法
         * @param type  artTemplate  staticTemplate
         * @param fn
         */
        register: function(type,name,fn){
            this.rule[type || this.artTemplate].instance.helper(name,fn);
        },

        /**
         * 模板解析方法，多模板返回解析数组，单模板返回单个解析方法
         * @param tplId
         * @param type
         * @returns {*}
         */
        parse:  function(tplId,type){
            var _this = this;
            if(!tplId || tplId.startWith(this.startFilter)) return '';

            var tplIds = tplId.split(this.parallelSplitter);

            var tplFn = [];
            tplIds.forEach(function(v,i){
                tplFn.push(_this._parse(v));
            })

            return tplIds.length > 1 ? tplFn : tplFn[0];

        },
        /**
         *  解析单个模板
         * @param tplId
         * @returns {*}
         * @private
         */
        _parse: function(tplId){
            //支持js，也支持script id包含的模板
            tpl = this._getTpl(tplId);
            if(!tpl) return console.warn('找不到此模板 '+tplId);
            return this._adapt(tpl);
        },

        _getTpl: function(tplId){
            var tpl = this[tplId];

            if(!tpl){
               var $dom = $(['#'+tplId+'[type="text/html"]'].join(''));
               tpl = $dom.html();
               $dom.remove();
            }

            return tpl;
        },

        /**
         * 适配器
         */
        _adapt: function(tpl){
            return this._adaptWith(tpl);
        },

        _adaptWith: function(tpl){
            return $.proxy(function(data,type){
                var type = type === undefined ? this.type : type;
                var tplObj = this.rule[type];
                return tplObj ? tplObj.parse(tpl)(data) : tpl;
            },this);
        },

        /**
         *  静态模板解析
         */
        _staticTemplateParse:function(tpl){
            return function(data){
                return tpl.format(data);
            }
        },

        /**
         * artTemplate解析
         */
        _artTemplateParse: function(tpl){
            return function(data){
                return  template.compile(tpl)(data);
            };
        }

    }.init();

//    Tpl = M.Tpl = Tpl.init();

})(window.Wap, window);

/**
 * 请求基类
 */
(function(M){
    var Const = M.Const;
    var Ext = M.Ext;

    M.Dao =  {
        /**
         * 获取默认异常
         */
        getDefError: function(data){
            Ext.tipNetError();
        },

        getWholeURL: function(url){
            return url.indexOf('http') === -1 ? (Const.PRO_PATH + url) : url;
        },

        /**
         * 底层请求
         */
        reqWith:function(config){
            //默认错误设置
            !config.error && (config.error = this.getDefError);

            return $.ajax({
                url: this.getWholeURL(config.url),
                success:  config.success,
                error: config.error,
                cache:false,
                async: config.async === undefined ? true : config.async,
                dataType: 'json',
                data:config.data,
                type: config.type || 'post',
                timeout: 60000,
                xhrFields:{
                    'withCredentials': 'true'   //凭证
                }
            });
        },

        req: function(config,url){
            return this.reqWith($.extend(config,{url:url}));
        }

    }
})(window.Wap);


/*wap 扩展类*/
(function(Wap,M, W){
    /*扩展标配类*/
    var oldHelper =  Wap.Service.prototype.loadHelper;
    Wap.Service.prototype.loadHelper = function(){
        oldHelper();

//      自动注入常量类
        this.Const = M.Const || Wap.Const;
        this.Dao = M.Dao || Wap.Dao;
        this.Ext = M.Ext || Wap.Ext;
        this.Tpl = M.Tpl || Wap.Tpl;
    }
})(window.Wap, window.HB = window.HB || {}, window);