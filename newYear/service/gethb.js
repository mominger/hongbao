/**
 * 常量类
 */
(function(Wap, M, W){
    var base = Wap.Const;

    M.Const = $.extend({
        /**
         * Req 常量
         */
        QUE_FRIENDS: 'mps/luckyList.do'                 //查询好友列表

    },base);
})(window.Wap, window.HB = window.HB || {},window);

/**
 * Dao 类
 */
(function(Wap, M, W){
    var base = Wap.Dao;
    var Const = M.Const;
    var Ext = M.Ext;

    M.Dao = $.extend({},base,{
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
//            return TestData.GET_HB_FRIEND;
            return this.req(data,Const.QUE_FRIENDS);
        }
    });

})(window.Wap, window.HB,window);

/**
 * 领子红包
 */
(function(Wap, M, W){
    var ActiveEnd = M.ActiveEnd;

    var GetHB = Wap.Service.extend({
        ClassName: 'gethb',
        tpls: {
            'desc': 'reqHB renderHB friend',
            'friend': 'reqFriend renderFriend'
        },

        events:{
            "tap share-btn document": 'shareBtnHandler'
        },

        init: function(){
            this.root = $('.get-hb');

            //注册模板
            this.Tpl.register('','dateFormat',this.Ext.dateFormat);
        },

        reqHB: function(){
            var param = this.URL_PARAM;
            param.nickName = decodeURIComponent(param.nickName);
            param.rewardValue = this.Ext.getInt(param.rewardValue);
            return param;
        },

        renderHB: function(data,tplRender){
            switch(data.status){
                case '0': this.root.find('.data-desc').prepend(tplRender(data,this.Tpl.staticTemplate));
                            this.root.show(); this.Ext.show($('footer')); return;
                case '1': ActiveEnd();return this.root.show();
                default: return this.Ext.tipNetError();
            }
        },

        reqFriend: function(data){
             return data.status == '0' && this.Dao.queFriends({
                 data: {
                     dirPurseId: data.solutionId,
                     openId: data.openId
                 }
             });
        },

        renderFriend: function(data,tplRender){
            if(!data) return;

            //渲染
            $('.friends').append(tplRender({list:data})).parent().show();
        },

        shareBtnHandler: function(e){
            $(e.target).parent().hasClass('data-focus-sn') ? this.Ext.toFocusSN() : this.Ext.toGetGroupHB();
        }

    });

    new GetHB();

})(window.Wap, window.HB,window);