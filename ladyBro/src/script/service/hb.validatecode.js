/**

 * @author 14033219
 * @desc  校对验证码类
 */
(function($, M){
    var TPL = [
            '<a class="{0}" href="javascript:;">  ',
            '	<p class="{1}">                     ',
            '		<em>{2}</em>                  ',
            '		<em>{3}</em>                    ',
            '	</p>                                   ',
            '</a>                                      '
        ].join(''),
    $dataContainer,
    $checkPhone = $('.hd-warn-phone'),
    $checkCode = $('.hd-warn-code'),
    $phone = $('#hd-phone'),
    POHONE_NUM,
    VALIDATE_CODE,
    $code = $('#yanzheng'),
    $sendCode = $('#yzm'),
    isPhoneMember = false,//手机号是否会员
    isPhoneBind = false,//手机号是否绑定
    URL_PARAM = M.Data.URL_PARAM,
    $memberTip = $('.hb-code-tip'),
    isCheckCodeing = false,
    MOUDLE_NAME = 'validatecode';  //本模块标识
        test('validatecode page '+location.href);
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
           		case 'yzm': sendCodeHandler(e);return;
           		case 'hd-code-submit': codeSubmitHandler(e);return;
           }
        });
        
        //焦点移出事件：判断 手机
        //手机有11位 验证。   失去焦点，也验证。
        $phone.on('blur',function(e){
        	POHONE_NUM = this.value;
        	checkPhone();
        })
        
        //仅允许输入11位
        $phone.on('keyup',function(e){
        	var v = this.value.trim();
        	
        	if(v.length >= 11){
        		this.value = v.substr(0,11);
        	}
        	if(v.length < 11){
        		$memberTip.text('');
        	}
        });
        
        //删除文本框内容功能
    	$("#hd-phone").keyup(function(){
    		YG.method("inputHandle",{
    			el: this,
    			closeCls: ".yg-input-close"    //删除按钮class
    		});
    	});
    }

    function flushData() {
    	var code = URL_PARAM.returnFlg,msg;

		switch(code){
		    case '1': msg = '该手机已经绑定过多个账号,请检查账号';break;
			case '6': 
				 msg = '您的手机号码未开通苏宁易购账号哦，快去苏宁易购网站开通吧！';
				break;
			case '3': msg = '绑定失败';break;
			case '99': msg = '验证码输入失败';break;
			case '4': msg = '绑定成功';
			                        $H.redirectId(URL_PARAM['target_url']);break;
			case '5': msg = '已经绑定过该手机';break;
			case '7': msg = '手机号已绑定，请更换手机号';break;
			case '2': 
			$H.redirect(M.Const.BIND_ACCOUNT, {
    	  		phone: POHONE_NUM || URL_PARAM['phone'],
    	  		target_url: URL_PARAM['target_url'],
    	  		authcode: URL_PARAM['authcode'],
        	    state: URL_PARAM['state']
    	  	});	
	        break;
			default:$("#alertBox").hide();
		}
        if(!msg){
            return ;
        }

        HB.alertBox({ type: "mini", msg: msg});
    }
    
    function checkPhoneEmpty(){
    	POHONE_NUM = $phone.val();
    	return !POHONE_NUM;
    }
    function checkCodeEmpty(){
    	VALIDATE_CODE = $code.val();
    	return !VALIDATE_CODE;
    }
    
    function checkEmpty(){
    	var isPE = checkPhoneEmpty(),isCE = checkCodeEmpty(); 
    	return isPE || isCE;
    }
    
    function codeSubmitHandler(){
    	if(isCheckCodeing) return;
    	//验证手机号，验证码不能为空
    	if(checkEmpty() || !checkJsPhone()) return;
    	
    	//校对验证码
    	M.Req.checkCode(function(data){
    		//校对成功
    		if(!data) return;
    		
    		isCheckCodeing = false;
    		//不成功
    		if(data.returnCode != '1002'){
    			return HB.alertBox({ type: "mini", msg: "短信验证失败" });
    		}
    		else{
    			M.Req.bindAccount(function(data){
            	},{
            		target_url: encodeURIComponent(URL_PARAM['target_url'])+","+POHONE_NUM+","+ VALIDATE_CODE+ "," + URL_PARAM['channel'] || M.Const.CHANNEL_ID
            	});
    		}
    	},{
    	   mobilenum: POHONE_NUM,
    	   authcode: VALIDATE_CODE
       },false)
    }
    
    //判断window.innerHeight的大小，来判断底层logo的位置
    /*function fixedLay(){
        $H.fixedLayPos(".yg-fixed");
    }*/
    //监听发送验证码
    function sendCodeHandler(e){
    	//手机号不能为空
    	if(checkPhoneEmpty() || !checkJsPhone()) return;
    	
		var $target = $(this);
		
		if($target.hasClass(HB.STYLE.UN_EVENT)) return !1;
		
		//发送   发送后倒计时  倒计时后又允许 重新发送
		M.Req.sendCode(function(data){
		
			var returnCode = data.returnCode;
			
			if (returnCode == '1001'){
				disabledSendCode(true);
				//验证码发送成功，启用心跳倒计时
				$H.setInterval(60, function(i){
					//屏蔽再次发送验证码，且倒计时
					$sendCode.text(i + 's重新获取');
				},function(){
					disabledSendCode(false);
					$sendCode.text('重新获取');
				})
			}else{
				var errorStr = '获取失败';
				
				switch(returnCode){
					case '01001': errorStr = '一个手机号每天只有三次获取验证码机会';break;
					case '01002': errorStr = '获取验证码过于频繁，请60秒后再试';break;
					case '01003': errorStr = '验证码超过限制，请稍后再试';break;
					//default: errorStr = '获取验证码失败';break;
				}
				HB.alertBox({
				     type: "mini",
				     msg: errorStr
			     });
			}
		},{mobilenum: POHONE_NUM});
		
    }

    function disabledSendCode(flag){
		var classs = HB.STYLE.UN_EVENT + ' yg-gray-bg';
		
		flag ? $sendCode.addClass(classs) : $sendCode.removeClass(classs).addClass('yg-yzm-btn');
	}
    
    /**
     * checkPhone
     */
    function checkPhone(value){
        //前台验证 数字11位
    	if(!checkJsPhone()) return;

        //后台验证   手机号唯一性 
        M.Req.checkPhone(function(data){
        	//如果是会员，判断是否绑定，给出对应提示语
        	isPhoneBind = data.isBind;
        	isPhoneMember = data.success === '1';//兼容后台，1为会员！！！

    		$checkPhone.text(isPhoneBind ? ' 您手机号码对应的苏宁易购帐户已经与其他微信帐户绑定，请更换输入' : ''); 
    		
    		$memberTip.text(isPhoneMember ? '' : '您的手机号码未注册苏宁易购会员，提交后将跳转设置密码页面完成注册。' );
        	
        },{mobilenum: POHONE_NUM,
        	openId: M.Data.OPEN_ID});
    }
    
    /**
     * 前台验证
     */
    function checkJsPhone(){
    	//前台验证 数字11位
        if (!/^1\d{10}$/.test(POHONE_NUM)){
            $checkPhone.text('请输入正确的手机号码');
            return !1;
        }else{
        	$checkPhone.text('');
        	return true;
        }
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
    	$H.hideShareBtn(true);
    }

    /**
     * 运行接口
     */
    $(function(){
        preCreate();
        create();
    })
})(Zepto, HB);


