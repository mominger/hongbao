
define(function(require, exports, module) {
    var base = require('ext');
    var Const = require('const');

    return $.extend({
        toHBDetail: function(data){
            _w.redirect(Const.HB_DETAIL,data);
        }
    },base);
});
