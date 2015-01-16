/**
 * 常量类:  只需允许提供常量配置。不允许提供任何动态(方法）功能。
 */
define(function(require, exports, module) {
    var base = require('const');

    return $.extend({
        /**
         * Req 常量
         */
        QUE_TO: 'mps/solutionList.do',				//查询我发的红包
        QUE_FROM: 'mps/normalList.do'         	   //查询我挣的红包

    },base);
});