/**
 * 常量类:  只需允许提供常量配置。不允许提供任何动态(方法）功能。
 */
define(function(require, exports, module) {
    var base = require('const');

    return $.extend({
        /**
         * Req 常量
         */
        QUE_FRIENDS: 'mps/luckyList.do'                 //查询好友列表

    },base);
});