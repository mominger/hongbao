
(function(Wap, M, W){
//    var Base = require('ext');
    var Const = Wap.Const;

    M.FooterExt = {
        /**
         * TO 我的红包页面
         */
        toMyHB: function(){
            _w.redirect(_w.addURLParam(Const.MY_HB,{openId: Const.OPEN_ID}));
        },

        /**
         * TO 攻略
         */
        toGuides: function(){

            _w.redirect(Const.GUIDES);
        }
    };
})(window.Wap, window.HB,window);
