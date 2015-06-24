

/**
 * HB项目扩展工具类
 * @author 14033219
 * TODO: id拆分工具类？ 如果传递了ID，则在加载工具类基类的基础上，
 */
(function($, M, W){
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

        //屏蔽事件
        isNoEvent: function($dom){
            return $dom.hasClass('hb-no-event');
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
		

        fixedPosHandler:function(fixedLay){
            navigator.userAgent.match(/AppleWebKit.*Mobile.*/) && $(window).resize(function(){
                $(fixedLay).css({"bottom": $(fixedLay).offset().top <= 300 ? '-50px' : '20px'});
            });
        }
	}
})(jQuery, window.HB = window.HB || {}, window);