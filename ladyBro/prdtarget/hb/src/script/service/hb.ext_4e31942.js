!function(t,e,n){var i=Array.prototype.slice;!String.format&&(String.prototype.format=function(){var t=1==arguments.length&&arguments[0]instanceof Object,e=t?arguments[0]:arguments,n=t?/\{(\w+)\}/g:/\{(\d+)\}/g;return this.replace(n,function(t,n){return e[n]||""})}),String.prototype.replaceAll=function(t,e){return RegExp.prototype.isPrototypeOf(t)?this.replace(t,e):this.replace(new RegExp(t,"g"),e)},n.$H=e.Util={IMG_HB:"img/nofilter/hb-pic.jpg",IMG_HB_EXPIRED:"img/nofilter/hb-gray.jpg",deferred:function(){var t=i.call(arguments,0);return function(e){for(var n=0,i=t.length;i>n&&t[n](e);n++);}},onlyClass:function(t,e){t.addClass(e).siblings().removeClass(e)},isNoEvent:function(t){return t.hasClass("hb-no-event")},getDate:function(t){try{var e=t.indexOf(".");-1!=e&&(t=t.substring(0,e));var n=t.split(" "),i=n[0].split("-"),o=n[1].split(":");return{y:i[0],m:i[1],d:i[2],h:o[0],mi:o[1],s:o[2]}}catch(r){return{y:1,m:1,d:1,h:1,mi:1,s:1}}},isMobile:function(){return navigator.userAgent.match(/Win/i)||navigator.userAgent.match(/MacIntel/i)||navigator.userAgent.match(/Linux/i)?!1:!0},isPhone:function(){return/(iPhone|iPod|iPad);?/i.test(navigator.userAgent)},isAndriod:function(){return/android/i.test(navigator.userAgent)},setInterval:function(t,e,n){var i=t,o=0,r="",a=function(){var t=i-o;0==t?(clearInterval(r),n&&n()):(e&&e(t),o++)};r=setInterval(a,1e3)},getURLParam:function(){var t=location.search,e=/[^\&]+=[^\&]+/g;if(!t)return{};t=t.slice(1);for(var n,i,o={};n=e.exec(t);)(i=n[0].match(/[^\=]+/g))&&(o[i[0]]=i[1]);return o},toMyHB:function(){this.redirect(this.addURLParam(e.Const.MY_HB,{openId:e.Data.OPEN_ID}))},toGuides:function(){this.redirect(e.Const.GUIDES)},toFocusSN:function(){this.redirect(e.Const.FOCUS_SN)},toGetGroupHB:function(){location.href=this.getWeChat(e.Const.PRO_PATH+e.Const.DO_GET_GROUP_HB)},toValidateCode:function(){location.href=this.getWeChat(e.Const.VALIDATE_CODE)},toApp:function(){this.redirect(this.isPhone()?e.Const.APP_IPHONE:e.Const.APP_ANDROID)},redirectId:function(n,i){this.redirect(n,t.extend({},i,{openId:e.Data.OPEN_ID}))},redirect:function(t,e){t?location.href=e?this.addURLParam(t,e):t:location.reload()},tipNetError:function(){try{Wap.ErrorNet()}catch(t){this.tipError("网络异常，请稍后再试"),console.error("Component Wap.ErrorNet is not exist")}},tipError:function(t){HB.alertBox({type:"mini",msg:t})},addURLParam:function(e,n){var i=-1===e.indexOf("?"),o="&{0}={1}",r="";return t.each(n,function(t,e){r+=o.format(t,e)}),i&&(r=r.replace("&","?")),e+r},toBuy:function(){var t=encodeURIComponent([e.Const.PRO_PATH,e.Const.DO_VALIDATE_CODE,"?target_url=",e.Const.BUY_PATH,"&channel=",e.Const.CHANNEL_ID].join("")),n=this.getWeChat(t,{state:1});this.redirect(n)},toDownLoad:function(){this.redirect(this.isPhone()?e.Const.APP_IPHONE:e.Const.APP_ANDROID)},getWeChat:function(t,n){var i=n||{};-1===t.indexOf("http")&&(t=encodeURIComponent([e.Const.PRO_PATH,"RES/hb/",t].join("")));var o=["https://open.weixin.qq.com/connect/oauth2/authorize?appid={0}&redirect_uri=",t,"&response_type=code&scope=snsapi_base&state={1}#wechat_redirect"].join("");return o.format(e.Const.APP_ID,i.state)},toggle:function(t,e,n){var i,o;n&&(i=n.show,o=n.hide),e?(this.show(t),i&&i()):(this.hide(t),o&&o())},error:function(t){var e=n.console;e||(e={},e.error=function(){}),e.error(t)},formSubmit:function(e,n,i){var o,r,a=[];"string"!=typeof e?(o=e.url,r=e.pros||{}):o=e;var s=t(['<form method="post" action="',o,'" style="position: absolute;top:-2000;left: -2000;" />'].join("")),c='<input type="hidden" name="{0}" value="{1}" />',u=[];r&&t.each(r,function(t,e){s.attr(t,e)}),t.each(n,function(t,e){u.push(c.format(t,e))}),s.append(u.join("")),a=t.makeArray(i);for(var d=0,h=a.length;h>d;d++)s.append(a[d]);t("body").append(s),s.submit(),s&&s.remove()},share:function(t){var n="{0}?activityId={1}&dirPurseId={2}",i=e.Const;t.url=this.getWeChat(encodeURIComponent(n.format(t.path,t.activityId,t.solutionId)));var o={imgUrl:t.shareIcon||i.SHARE_IMG,link:t.url,desc:t.shareContent||i.SHARE_DESC,title:t.title||i.SHARE_TITLE};wx.ready(function(){wx.checkJsApi({jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareWeibo","hideMenuItems","showMenuItems"],success:function(){}}),wx.onMenuShareAppMessage(o),wx.onMenuShareTimeline(o)})},fixedPosHandler:function(e){navigator.userAgent.match(/AppleWebKit.*Mobile.*/)&&t(window).resize(function(){t(e).css({bottom:t(e).offset().top<=300?"-50px":"20px"})})},hideShareBtn:function(t){function e(){t?WeixinJSBridge.call("hideOptionMenu"):(WeixinJSBridge.call("hideToolbar"),WeixinJSBridge.call("showOptionMenu"))}"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",e,!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",e),document.attachEvent("onWeixinJSBridgeReady",e)):e()},getInt:function(t){return t?isNaN(t)?0:parseInt(t):0},isExistLoading:function(){return t(".sn-html5-loading").size()>0},show:function(t){t.style.display="block"},adaptHeight:function(){var e=parseInt(n.innerHeight),i=parseInt(document.body.clientHeight+t(".get-hb-foot").height()),o=Math.max(e,i),r=document.querySelector("section"),a=r.classList;a=Array.prototype.slice.call(a),a.push("pd-hb-btm");var s=a.join(" ");r.style.height=o+"px",r.style.backgroundSize="20rem "+o+"px",i>=e&&(r.className=s)}}}(Zepto,window.HB=window.HB||{},window);