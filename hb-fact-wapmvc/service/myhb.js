/**
 * 我的红包
 */
define(function(require, exports, module) {
    //基本库
    require('zepto');

    var Wap = require('wap-sea');

    var GetHB = Wap.Service.extend({
        ClassName: 'myhb',
        tpls: {
            'from,fromTip': 'reqFrom renderFrom',
            '!to': 'reqTo renderTo'
        },

        events:{
            "click .detail-circle document": 'getDetailHandler',
            "click .send-hb-btn document": 'shareBtnHandler',
            "click #data-tab-myto document": 'toHandler',
            "click #data-tab-myfrom document": 'fromHandler'
        },

        init: function(){
            this.toContainer = $('.my-to');
            this.fromContainer = $('.my-from');
//            this.fromFooter = this.fromContainer.find('footer');
        },

        reqTo: function(){
            return this.Dao.queTo({
                openId:this.URL_PARAM['openId']
//                code:this.URL_PARAM['code']
            })
        },

        renderTo: function(data,tplRender){
            $.extend(data,{urlParam: this.URL_PARAM});
            this.toContainer.append(tplRender(data));
        },

        reqFrom: function(){
            return this.Dao.queFrom({
                openId:this.URL_PARAM['openId']
//                code:this.URL_PARAM['code']
            })
        },

        renderFrom: function(data,tplRender){
            this.fromContainer.prepend(tplRender[0](data));
            this.fromContainer.prepend(tplRender[1](data));
            this.fromContainer.find('footer').show();
        },


        getDetailHandler: function($dom){
            this.Ext.toHBDetail({dirPurseId: $dom.attr("data-detail-id"), openId: $dom.attr("data-open-id")});
        },

        shareBtnHandler: function(e){
            $(e.target).parent().hasClass('data-focus-sn') ? this.Ext.toFocusSN() : this.Ext.toGetGroupHB();
        },

        toHandler: function(e){
            this._changeTab($(e.target).parent());
            this.fromContainer.hide();
            //启动此模板链，仅启动一次
            this.allTpls['to'].once();
            this.Ext.show(this.toContainer);
        },

        fromHandler: function(e){
            this._changeTab($(e.target).parent());

            //不采用zepto的show，因为它会影响不在body下dom的fixed定位
            this.Ext.show(this.fromContainer);

            this.toContainer.hide();
        },

        _changeTab: function(dom){
            dom.addClass('cur').siblings().removeClass('cur');
        }
    });

    new GetHB();


    //埋点
    require.async('buriedpoint');
});