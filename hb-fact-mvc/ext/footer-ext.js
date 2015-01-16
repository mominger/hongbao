
define(function(require, exports, module) {
//    var Base = require('ext');
    var Const = require('const');

    return {
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
});
