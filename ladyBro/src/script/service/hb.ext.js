
/**
 * HB项目扩展工具类
 * @author 14033219
 * TODO: id拆分工具类？ 如果传递了ID，则在加载工具类基类的基础上，
 */
;(function($, M, W){
    var slice = Array.prototype.slice;

    /** ECMA扩展  **/
    /**
	 *  格式化:支持 动态参数/数组/json对象
	 * @desc xxx{0}xx{1} --> a,b --> xxxaxxb  或 xxx{a}xx{b} --> {a:1,b:2} --> xxx1xx2
	 * @returns
	 */
	!String.format && (String.prototype.format = function(){
		var jsonFlag = arguments.length == 1 && arguments[0] instanceof Object,
    	args = jsonFlag ? arguments[0] : arguments,
		reg = jsonFlag ? /\{(\w+)\}/g : /\{(\d+)\}/g;
    	
	    return this.replace(reg,              
	        function(m, i){
	            return args[i] || '';
	        });
	});
	
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
	
    /** 项目扩展类  **/
	W.$H = M.Util = {
	    IMG_HB: 'img/nofilter/hb-pic.jpg',
	    IMG_HB_EXPIRED: 'img/nofilter/hb-gray.jpg',
	    
        /**
         * 回调队列,不支持异步
         * TODO:后续需优化此方法，参照$.Deffered
         */
        deferred: function(){
            var args =  slice.call(arguments, 0);

            return function(data){
                for (var i = 0,len = args.length; i < len; i++){
                    if(!args[i](data)) break;
                }
            };
        },

        onlyClass: function(dom, className){
             dom.addClass(className).siblings().removeClass(className);
        },

        //屏蔽事件
        isNoEvent: function($dom){
            return $dom.hasClass('hb-no-event');
        },
        
        /**
         * 2014-07-09 00:00:00.0 转换成时间对象  {y: m: d: h: mi: s:}
         */
        getDate: function(date){
        	try{
        		//时间格式可能是 2014-07-09 00:00:00.0。需去掉.0
        		var index = date.indexOf('.') ;
        		(index != -1) && (date = date.substring(0, index));
        		
        		var  arr = date.split(' '),
        	        ymd = arr[0].split('-'),
        		    time = arr[1].split(':');
        		
        		return {
        			y: ymd[0],
        			m: ymd[1],
        			d: ymd[2],
        			h: time[0],
        			mi: time[1],
        			s: time[2]
        		}
        	}catch(e){
        		return {
        			y:1,m:1,d:1,h:1,mi:1,s:1
        		}
        	}
        },
        
        isMobile: function(){
			return (navigator.userAgent.match(/Win/i) 
				|| navigator.userAgent.match(/MacIntel/i) 
				|| navigator.userAgent.match(/Linux/i)
			) ? false : true;
		},
		isPhone: function(){
			return /(iPhone|iPod|iPad);?/i.test(navigator.userAgent);
		},
		isAndriod: function(){
			return /android/i.test(navigator.userAgent);
		},
		
        /**
		 *  心跳方法
		 *  @param waitSecond秒数   fn：每次的执行方法    backFn  退出时的方法
		 *  
		 */
		setInterval: function(waitSecond, fn, backFn){
			var wait = waitSecond; 
			
			//设置秒数(单位秒) 
			var i = 0,
				ind = '',
				timer = function() {    
				  var r = wait-i;      
				  if(r == 0){     
					  clearInterval(ind);     
					  backFn && backFn(); 
				  }else{     
					  fn && fn(r);  
					  i++;   
				  } 
			} 
			
			ind = setInterval(timer, 1000);
		},
		
		/**
		 *获取URL参数
		 */
		getURLParam: function(){
			var search = location.search,
				reg = /[^\&]+=[^\&]+/g;
			
			if(!search) return {};
			
			//解析出锚点参数
			search = search.slice(1);
			
			var arr,arrs,result={};
			while(arr = reg.exec(search)){
				if(arrs = arr[0].match(/[^\=]+/g)){
					result[arrs[0]] = arrs[1];
				}
			}
			
			return result;
		},
		
		/**
		 * TO 我的红包页面
		 */
		toMyHB: function(){
			this.redirect(this.addURLParam(M.Const.MY_HB,{openId: M.Data.OPEN_ID}));
		},

		/**
		 * TO 攻略
		 */
        toGuides: function(){

			this.redirect(M.Const.GUIDES);
		},

        /**
         * TO 关注苏宁
         */
        toFocusSN: function(){

            this.redirect(M.Const.FOCUS_SN);
        },

		/**
		 * TO抢群红包页面  TODO：重构to集合方法，合并为一个
		 */
		toGetGroupHB: function(){
			location.href = this.getWeChat(M.Const.PRO_PATH + M.Const.DO_GET_GROUP_HB);
		},
		
		/**
		 * TO validatecode 页面
		 */
		toValidateCode: function(){
			location.href = this.getWeChat(M.Const.VALIDATE_CODE);
		},

		toApp: function(){
			this.redirect(this.isPhone() ? M.Const.APP_IPHONE : M.Const.APP_ANDROID);
		},
		
		/**
		 * 携带openId页面跳转
		 */
		redirectId: function(url,json){
			//取openID
			this.redirect(url, $.extend({}, json, {openId: M.Data.OPEN_ID}));
		},
		
		/**
		 * 跳转： 只传递url，则采用location.href, 传递json，则'?A=B&A=B'拼接
		 */
		redirect: function(url, json){
			url ? (location.href = json ? this.addURLParam(url, json) : url) :
				location.reload();
		},
		
		tipNetError: function(){
            try{
                Wap.ErrorNet();
            }catch(e){
                this.tipError( '网络异常，请稍后再试');
                console.error('Component Wap.ErrorNet is not exist');
            }
//			this.tipError( '网络异常，请稍后再试');

        },
		tipError: function(msg){
			HB.alertBox({type: "mini", msg:msg});
		},
		
		/**
		 * 给URL增加参数
		 */
		addURLParam: function(url, param){
			var p = param || {},
			    noP = url.indexOf('?') === -1,
			    tpl = '&{0}={1}',
			    params = '';
			$.each(param, function(k,v){
				params += tpl.format(k,v);
			})
			
			noP && (params = params.replace('&','?'));
			
			return url+params;
		},
		
		/**
		 * TO 购物页面
		 */
		toBuy: function(){
			//如果未绑定需要去绑定界面，绑定直接去购物
            var buyPath = encodeURIComponent([M.Const.PRO_PATH,M.Const.DO_VALIDATE_CODE,'?target_url=',M.Const.BUY_PATH,'&channel=',M.Const.CHANNEL_ID].join(''));
			var url = this.getWeChat(buyPath, {state:1});
			this.redirect(url);
		},
        /*
        * TO download
        * SNAPP
        * */
        toDownLoad:function(){
            this.redirect(this.isPhone() ? M.Const.APP_IPHONE : M.Const.APP_ANDROID);
            //this.redirect(M.Const.D_SNAPP_PATH);
        },
 		getWeChat: function(path, conf){
            var ops = conf || {};

			if(path.indexOf('http') === -1){
				path = encodeURIComponent([M.Const.PRO_PATH,'RES/hb/', path].join(''));
			}
			var tpl = ['https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri=',
			           path, '&response_type=code&scope=snsapi_base&state={1}#wechat_redirect'].join('');

			return tpl.format(M.Const.APP_ID, ops.state);
			
			
		},

		/**
		 * 显示或隐藏  true：显示  false：隐藏
		 */
		toggle: function($d,flag,conf){
			var showFn,hideFn;
			
			if(conf){
				showFn = conf.show;
				hideFn = conf.hide;
			}
			
			if(flag){
				this.show($d);
				showFn && showFn();
			}else{
				this.hide($d);
				hideFn && hideFn();
			}
			
		},
		
		/**
		 * 日志
		 */
		error: function(msg){
			var c = W.console;
			if(!c){
				c = {};
				c.error = function(){};
			}
			c.error(msg);
		},
		
		/**
		 * @param json传递的参数值   
		 *        url:{url, pros:}/url   sonDom/[sonDom]
		 */
		formSubmit: function(urlConf, json, sonDom){
			var url,pros,
				sonDoms = [];
				
			if(!(typeof urlConf == 'string')){
				url = urlConf.url;
				pros = urlConf.pros || {};
			}else{
				url = urlConf;
			}
			
			var $form = $(['<form method="post" action="',url, '" style="position: absolute;top:-2000;left: -2000;" />'].join("")),
				  tpl = '<input type="hidden" name="{0}" value="{1}" />',
				  tpls = [];
			
			//pros parse
			pros && $.each(pros, function(k, v){
				$form.attr(k, v);
			});
			
			$.each(json, function(k, v){
				tpls.push(tpl.format(k, v));
			});
			
			$form.append(tpls.join(''));
			
			sonDoms = $.makeArray(sonDom); 
			for (var i = 0,len = sonDoms.length; i<len; i++) $form.append(sonDoms[i]);
			
			$('body').append($form);
			
			//submit
			$form.submit();
			
			$form && $form.remove();
		},
	
		share: function(config){
            var url = '{0}?activityId={1}&dirPurseId={2}',Const= M.Const;
            config.url = this.getWeChat(encodeURIComponent(url.format(config.path, config.activityId, config.solutionId)));
            var shareConfig = {
                "imgUrl":  config.shareIcon || Const.SHARE_IMG,
                "link": config.url,
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
                wx.onMenuShareAppMessage(shareConfig);
                wx.onMenuShareTimeline(shareConfig);


            });
//			var url = '{0}?activityId={1}&dirPurseId={2}';
//			config.url = $H.getWeChat(encodeURIComponent(url.format(config.path, config.activityId, config.solutionId)));
//        	var shareConfig = {
//                    "appid": '',
//                    "img_url":  config.shareIcon || M.Const.SHARE_IMG,
//                    "img_width": "200",
//                    "img_height": "200",
//                    "link": config.url,
//                    "desc": config.shareContent || M.Const.SHARE_DESC,
//                    "title": config.title || M.Const.SHARE_TITLE
//                };

//            wx.onMenuShareTimeline(shareConfig);
//            document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
//        		 WeixinJSBridge.on('menu:share:appmessage', function(argv) {
//                	 WeixinJSBridge.invoke('sendAppMessage', shareConfig, function(res) {
//                         //_report('send_msg', res.err_msg);
//                     });
//                });
//                // 分享到朋友圈
//                WeixinJSBridge.on('menu:share:timeline', function(argv) {
//                	WeixinJSBridge.invoke('shareTimeline', shareConfig, function(res) {
//                    });
//                });
//                // 分享到微博
//                WeixinJSBridge.on('menu:share:weibo', function(argv) {
//                	WeixinJSBridge.invoke('shareWeibo', shareConfig, function(res) {
//                    });
//                });
//                WeixinJSBridge.call('hideToolbar');
////                document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
////                    WeixinJSBridge.call('hideToolbar');
////                });
//        	 });
		},

        fixedPosHandler:function(fixedLay){
            navigator.userAgent.match(/AppleWebKit.*Mobile.*/) && $(window).resize(function(){
                $(fixedLay).css({"bottom": $(fixedLay).offset().top <= 300 ? '-50px' : '20px'});
            });
        },

        hideShareBtn:function(flag){
            function onBridgeReady(){
            	if(flag){
            		WeixinJSBridge.call('hideOptionMenu');
            	}else{
            		WeixinJSBridge.call('hideToolbar');
        		    WeixinJSBridge.call('showOptionMenu');
            	}
            }
            if (typeof WeixinJSBridge == "undefined"){
                if( document.addEventListener ){
                    document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
                }else if (document.attachEvent){
                    document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
                    document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
                }
            }else{
                onBridgeReady();
            }
        },
        getInt: function(num){
          if(!num) return 0;
          return isNaN(num) ? 0 : parseInt(num);
        },
        isExistLoading: function(){
        	return $('.sn-html5-loading').size()>0;
        },

        show: function(dom){
           dom.style.display='block';
        },
        adaptHeight:function(){
            var winHeight=  parseInt(W.innerHeight),
                bodyHeight=  parseInt(document.body.clientHeight+$(".get-hb-foot").height()),
                docHeight = Math.max(winHeight, bodyHeight),
                sections= document.querySelector("section"),
                sArr=sections.classList;
                sArr=Array.prototype.slice.call(sArr);
                sArr.push("pd-hb-btm");
                var sNArr=sArr.join(' ');
            //设置值使得背景图片可以适应窗口的高度
            sections.style.height =docHeight+"px";
            sections.style.backgroundSize ="20rem "+docHeight+"px";

            (winHeight <= bodyHeight) && (sections.className=sNArr);

        }
	}
})(Zepto, window.HB = window.HB || {}, window);