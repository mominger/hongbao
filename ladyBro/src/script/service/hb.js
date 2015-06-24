/**
 * HB 项目基类
 * @author 14033219
 * @desc  公共常量申明；事件源申明；
 *         红包不用英语Red Envelopes，用HB，是因为现网上流行语HB就是指红包意思，符合网民习惯
 *
 */

(function(M){
	   
   /**  通用数据  **/
   M.Data = {
	    IS_MOBILE: $H.isMobile(),
		URL_PARAM: $H.getURLParam()
   }
   
   /**  样式兼容  **/
   M.STYLE = {
		   UN_EVENT: 'hb-no-event'
   }
   
   /**  事件兼容  **/
   M.EVENT = {
		 CLICK: M.Data.IS_MOBILE ? 'touchstart' : 'click'
   }
   
   /**  通用数据扩展  **/
   $.extend(M.Data, {
	   CODE: M.Data.URL_PARAM.code,
	   OPEN_ID: M.Data.URL_PARAM.openId
   })
   
   /**  测试  **/
   window.test = function(msg){
	   if(M.Const.IS_TEST){
		   msg instanceof Function ? msg() : alert(msg);
	   }
   }

})(window.HB = window.HB || {});