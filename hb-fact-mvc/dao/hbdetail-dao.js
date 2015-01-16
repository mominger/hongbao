define(function(require, exports, module) {
    var base = require('dao');
    var Const = require('wap-const');

    return $.extend({},base,{
        /**
         *  查询我发的红包详情
         */
        queHBDetail: function(data){
//            return this.req(data, Const.QUE_HB_DETAIL);
            return TestData.HB_DETAIL;
        }

    });
});