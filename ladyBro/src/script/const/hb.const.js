/**
 * url
 * @author 14033219
 * @action 常量配置类
 * @desc   界面所有涉及的路径，URL等可配置常量都从这里读取。  
 * @warn   修改此文件后，请务必验证一把！！！
 */
(function(M){
	M.Const = {
       /* PRO_PATH:  'http://sale.msit.cnsuning.com/mtss-web/',
        APP_ID: 'wx8f239bb5b209c040',     				  //appID
        PRO_PATH_BIND: 'https://sale.msit.cnsuning.com/mtss-web/',
        BUY_PATH: 'http://m.suning.com/activeload_P634_0.html',               //购物路径
        D_SNAPP_PATH:'http://mapp.suning.com/a.php?s=qrcode/offline&f=ygznxyrc&pack=com.suning.mobile.ebuy#mp.weixin.qq.com',//微信里下载客户端的链接*/

        PRO_PATH:  'http://msale.suning.com/mtss-web/',      //程序路径
        APP_ID: 'wx6aed9fdd44da794e',     				  //appID
        PRO_PATH_BIND: 'https://msale.suning.com/mtss-web/', //绑定程序路径
        BUY_PATH: 'http://m.suning.com/activeload_P443_0.html',               //购物路径
        D_SNAPP_PATH:'http://mapp.suning.com/a.php?s=qrcode/offline&f=ygznxyrc&pack=com.suning.mobile.ebuy#mp.weixin.qq.com',//微信里下载客户端的链接

        /**   特殊配置   **/
        CHANNEL_ID: '1001001',                                              //渠道ID
        APP_ANDROID: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.suning.mobile.ebuy&g_f=992129',//应用宝
        APP_IPHONE: 'http://a.app.qq.com/o/simple.jsp?pkgname=com.suning.mobile.ebuy&g_f=992129', //应用宝
        SHARE_IMG: 'http://sale.suning.com/act/20150227/100/100-100.jpg',             //分享图片
//        BUY_PATH: 'http://m.suning.com/',               //购物路径
        FOCUS_SN: 'http://mp.weixin.qq.com/s?__biz=MjM5NjA3MTU0MA==&mid=201247335&idx=1&sn=f6ef37131907242d75b347e378460a2b#rd', //关注引导页
        ACTIVE_RULE: 'http://sale.suning.com/act/20150212/gmj/index.html',//活动规则页
        GUIDES: 'http://m.suning.com/channel_P597_0.html',   //攻略页

        /*话语配置*/
        SHARE_TITLE: '有钱，任性！发100元大红包啦！',    //分享标题
        SHARE_DESC:'有钱，任性！发100元大红包啦！',      //分享内容
       /* APP_ID:'wx8f239bb5b209c040',*/
        CHECK_WECHAT:'mps/queryShareConfigInfo.do',    //微信鉴权,
		   /**    静态页面映射  **/
		   BIND_ACCOUNT: 'bindaccount.html',                 //绑定账号
		   GET_GROUP_HB: 'getgrouphb.html',                 //领取群红包
		   GET_HB: 'gethb.html',                             //领取红包
		   HB_DETAIL: 'hbdetail.html',                       //红包详情
		   MY_HB: 'myhb.html',                               //我的红包
		   VALIDATE_CODE: 'validatecode.html',               //校对验证码
		   
		   /**    动态页面映射  **/
	       DO_VALIDATE_CODE: 'gotoBindEgoAccount.do',       //后台校对验证码
	       DO_GET_HB: 'mps/normalhb.do',                    //后台领取红包
	       DO_GET_GROUP_HB: 'mps/grouphb.do',               //后台领取群红包
	       
	       
	       
		   /**   请求后台URL **/
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

	       /**  测试开关  **/
	       IS_TEST: false
	}
})(window.HB = window.HB || {});
