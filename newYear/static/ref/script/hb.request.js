/**
 * request
 * @author 14033219
 * @action 统一请求接口
 * @desc   后续需扩展成根据  模块名+request 异步加载 ,需模块化
 */
(function($, M){
	var Const = M.Const;
    M.Req = {
        /**
         * 获取默认异常
         */
        getDefError: function(data){
                $H.tipNetError();
        },

        getWholeURL: function(url){
              return url.indexOf('http') === -1 ? (Const.PRO_PATH + url) : url;
        },

        /**
         * 底层请求
         */
        req:function(url,success,data,async,error){
            //默认错误设置
            !error && (error = this.getDefError);
            
            $.ajax({
                url: this.getWholeURL(url),
                success:  success,
                error: error,
                async: async === undefined ? true : async,
                dataType: 'json',
                data:data,
                type: 'post',
                timeout: 60000,
                xhrFields:{
                	'withCredentials': 'true'   //凭证
                }
            });
        },

        /**
         * 验证手机号
         */
        checkPhone: function(successFn, data){
        	this.req(Const.CHECK_PHONE, successFn, data);
        },
        
        /**
         * 校对验证码
         */
        checkCode: function(successFn,data,anysc){
        	this.req(Const.CHECK_CODE, successFn, data, anysc);
        },
        
        /**
         * 绑定账号
         */
        bindAccount: function(successFn, data,anysc){
        	$H.redirect($H.getWeChat($H.addURLParam(Const.PRO_PATH+Const.GO_BIND_ACCOUNT, data)));
        },
        
        /**
         * 发送验证码
         */
        sendCode: function(successFn, data,anysc){
        	this.req(Const.SEND_CODE, successFn, data);
        },
        
        /**
         * 注册并绑定
         */
        regBind: function(successFn,data,errorFn){
        	//调整成微信URL提交
        	$H.redirect($H.getWeChat($H.addURLParam(Const.PRO_PATH_BIND+Const.REGISTER_BIND, data)));
        }

        /**
         * 获取绑定URL，切换为新的服务器地址
         */
       /* _getBindURL: function(url,isSafe){
             return  (isSafe ? Const.PRO_PATH_SSL_BIND : Const.PRO_PATH_BIND) + url;
         }*/
    }
})(jQuery,window.HB);