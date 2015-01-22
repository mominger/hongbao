define(function(require, exports, module) {
    var base = require('dao');
    var Const = require('wap-const');
    var Ext = require('wap-ext');

    return $.extend({},base,{
        /**
         *  查询我发的红包
         */
        queTo: function(data){
            return this.req(data, Const.QUE_TO);
//            return TestData.MyHB_TO;
        },

        /**
         *  查询我挣的红包
         */
        queFrom: function(data){
//            return this.req(data, Const.QUE_FROM);
            return TestData.MY_HB_FROM;
        }

    });
});