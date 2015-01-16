define(function(require, exports, module) {
    var base = require('dao');
    var Const = require('wap-const');

    return $.extend({},base,{
        /**
         *  查询分享信息
         */
        queShareInfo: function(data){
            return this.req(data,Const.QUE_SHARE_INFO);
        },

        /**
         *  查询好友列表
         */
        queFriends: function(data){
            return TestData.GET_HB_FRIEND;
//            return this.req(data,Const.QUE_FRIENDS);
        }
    });
});