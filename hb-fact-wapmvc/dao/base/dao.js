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
                async: config.async === undefined ? true : config.async,
                dataType: 'json',
                data:config.data,
                type: 'post',
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