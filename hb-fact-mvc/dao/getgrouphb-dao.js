define(function(require, exports, module) {
    var base = require('dao');
    var Const = require('wap-const');
    var Ext = require('wap-ext');

    return $.extend({},base,{
        /*queGroupHB: function(data){
              return this.req(data,Const.QUE_GROUP_HB);
        },*/
        /**
         *  查询分享信息
         */
        queShareInfo: function(data){
            return this.req(data,Const.QUE_SHARE_INFO);
        }
    });
});