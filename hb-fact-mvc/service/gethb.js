/**
 * 领普通红包
 */
define(function(require, exports, module) {
    //基本库
    require('zepto');

    //自启动组件
    require.async('header');
    require.async('footer');

    var Wap = require('wap-sea');
    var ActiveEnd = require('activeend');

    var GetHB = Wap.Service.extend({
        ClassName: 'gethb',
        tpls: {
            'desc': 'reqHB renderHB friend',
            'friend': 'reqFriend renderFriend'
        },

        events:{
            "click share-btn document": 'shareBtnHandler'
        },

        init: function(){
            this.root = $('.get-hb');
        },

        reqHB: function(){
            var param = this.URL_PARAM;
            param.nickName = decodeURIComponent(param.nickName);
            param.rewardValue = this.Ext.getInt(param.rewardValue);
            return param;
        },

        renderHB: function(data,tplRender){
            switch(data.status){
                case '0': this.root.find('.data-desc').append(tplRender(data));return this.root.show();
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
            $('.friends').append(tplRender({list:data},this.Tpl.artTemplate)).parent().show();
        },

        shareBtnHandler: function(e){
            $(e.target).parent().hasClass('data-focus-sn') ? this.Ext.toFocusSN() : this.Ext.toGetGroupHB();
        }

    });

    new GetHB();


    //埋点
    require.async('buriedpoint');
});