/**
 * @author 14033219
 * @desc  绑定账号类
 */
(function($, M){
    var $checkPwd = $('.hd-pwd-warn1'),
        $checkPwd2 = $('.hd-pwd-warn2'),//确认密码
        $pwd = $('.hd-pwd-one'),
        $pwd2 = $('.hd-pwd-two'),
        URL_PARAM = M.Data.URL_PARAM,
        PHONE_NUM = URL_PARAM.phone,
        PASSWORD,
        MOUDLE_NAME = 'bindaccount';  //本模块标识

    test('bindaccount page '+location.href);

    /**
     * dom初始化
     */
    function init() {
    	flushData();
//        fixedLay();
    };

    /**
     * 事件初始化
     */
    function initEvent() {
        $H.fixedPosHandler(".yg-fixed");

        //对冒泡事件，采用绑定一次事件
        $(document).on(M.EVENT.CLICK, function(e){
           var target = e.target;

           switch(target.id){
               case 'bdClick': bindRegisterHandler(e);return;
           }
        });
        
        //监听密码 
        $pwd.on('blur',function(e){
        	checkPwdHandler(e.target.value);
        });
        $pwd2.on('blur',checkSamePwd);
        
      //TODO:移植代码 删除文本框内容功能
   	  $("#pass").find("input").each(function(){
   		 this.onkeyup = function(){
   			 YG.method("inputHandle",{
   				 el: this,
   				 closeCls: ".yg-input-close"  //删除按钮class
   			 });
   		 };
   	 });

   	 //TODO:移植代码 密码显示隐藏功能
   	 $(".yg-hide-pass").click(function(){
   		 YG.method("passHandle",{
   			 el: this,
   			 showCls: "yg-show-pass"   //显示文本数字class
   		 });
   	 });
    }

    function checkPwdHandler(value){
		//前台验证 6-20字符+数字+符号
		//1 验证 6-20位 2 验证必须为两者的混合
		if (!checkPayPwd(value, function(msg){
			$checkPwd.text(msg);
		}))return !1;
		
		//通过验证
		$checkPwd.text('');
		PASSWORD = value;
	}
     //验证密码，
	function checkPayPwd(payPwd, errorFn){
		var patIsAllNum = /^\d+$/,
		    patIsAllLetter = /^[a-zA-Z]+$/,
		    patIsAllSymbol = /^[^0-9a-zA-Z\s\\]+$/,
		    patHasIllegalSymbol = /[\s\/|\\]/,
		    patHasChineseSymbol = /[\u4e00-\u9fa5]/,
		    flag = false;

		 if(payPwd.length < 6 || payPwd.length > 20){
			errorFn("输入注册密码为长度6-20位的字母、数字或符号的组合！");
		}else if(payPwd.match(patIsAllNum) || payPwd.match(patIsAllLetter) 
		       || payPwd.match(patIsAllSymbol) || payPwd.match(patHasChineseSymbol)){
			errorFn("输入注册密码为长度6-20位的字母、数字或符号的组合！");
		}else if(payPwd.match(patHasIllegalSymbol)){
			errorFn("很抱歉，注册密码不能包含空格，竖线或正反斜线！");
		}else{
			flag = true;
		}

		return flag;
	}
    
	function checkEmptyPwd(){
		PASSWORD || (PASSWORD = $pwd.val());
		return !PASSWORD;
	}
	
	function checkSamePwd(){
		if(PASSWORD != $pwd2.val()){
        	$checkPwd2.show();
        	return false;
        }else{
        	$checkPwd2.hide();
        	return true;
        }
	}
	
	function bindRegisterHandler(){
		//验证两密码是否一致
        if(checkEmptyPwd() || !checkSamePwd()) return;
        
		M.Req.regBind(function(data){
			if(!data) return;
    	},{para:PHONE_NUM+","+PASSWORD+","+URL_PARAM['target_url']+","+URL_PARAM.authcode + "," + URL_PARAM['channel'] || M.Const.CHANNEL_ID});
	}

    function flushData() {
    	var code = M.Data.URL_PARAM.returnFlg,msg;
		switch(code){
			case '3': msg = '注册失败';break;
			case '4': msg = '绑定成功'; $H.redirectId(URL_PARAM['target_url']);break;
			case '8': msg = '绑定失败';break;
			case '5': msg = '已经绑定过该手机';break;
		}
	   
		msg && HB.alertBox({type: "mini", msg: msg});
    }
    
    /**
     * 渲染接口
     */
    function create(){
        init();
        initEvent();
    }


    /**
     * 页面预处理： 和页面数据的耦合处理写在这
     */
    function preCreate(){
    	//设置手机号码
    	$('.pdlayout').html('手机号码 '+'<i>'+PHONE_NUM+'</i>');
    	$H.hideShareBtn(true);
    }

    /**
     * 运行接口
     */
    $(function(){
        preCreate();
        create();
    });
})(Zepto, HB);


