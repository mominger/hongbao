/*wap 扩展类*/
(function(Wap, M, W){
    /*扩展标配类*/
    var oldHelper =  Wap.Service.prototype.loadHelper;
    Wap.Service.prototype.loadHelper = function(){
        oldHelper();

//      自动注入常量类
        this.Const = M.Const;
        this.Dao = M.Dao;
        this.Ext = M.Ext;
        this.Tpl = M.Tpl;
    }
})(window.Wap, window.HB,window);