/*wap 扩展类*/
define(function(require, exports, module) {
    var Wap = require('wap');

//    var wapMoudleId = $('script[data-wap-moudle]')[0].dataset['wapMoudle'];
//    var Const =  require('wap-module/'+wapMoudleId+'-const');

    /*扩展标配类*/
    var oldHelper =  Wap.Service.prototype.loadHelper;
    Wap.Service.prototype.loadHelper = function(){
        oldHelper();

//      自动注入常量类
//        this.MOUDLE_ID = moduleId;
        this.Const = require('wap-const');
        this.Dao = require('wap-dao');
        this.Ext = require('wap-ext');
        this.Tpl = require('wap-tpl');
    }

    return Wap;
});