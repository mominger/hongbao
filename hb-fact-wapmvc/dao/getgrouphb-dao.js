(function(Wap, M, W){
    var base = Wap.Dao;
    var Const = M.Const;
    var Ext = M.Ext;

    M.Dao = $.extend({},base,{
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

})(window.Wap, window.HB,window);