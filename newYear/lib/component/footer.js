(function(Wap, M, W){
//    var Base = require('ext');
    var Const = Wap.Const;
    var Ext = Wap.Ext;

    M.FooterExt = {
        /**
         * TO 我的红包页面
         */
        toMyHB: function(){
            _w.redirect(_w.addURLParam(Const.MY_HB,{openId: Ext.getOpenId()}));
        },

        /**
         * TO 攻略
         */
        toGuides: function(){

            _w.redirect(Const.GUIDES);
        }
    };
})(window.Wap, window.HB=window.HB || {},window);

/**
 *   footer
 */
(function(Wap, M, W){
    var Cmp = Wap.Component;
    var Ext = Wap.Ext;
    var Const = Wap.Const;
    var FooterExt =  M.FooterExt = {
        /**
         * TO 我的红包页面
         */
        toMyHB: function(){
            _w.redirect(_w.addURLParam(Const.MY_HB,{openId: Ext.getOpenId()}));
        },

        /**
         * TO 攻略
         */
        toGuides: function(){

            _w.redirect(Const.GUIDES);
        }
    };

    var Footer = Cmp.extend({
        ClassName:"Footer",

        TPL:'<ul><li><div></div><a id="data-to-my" href="javascript:void(0);">我的优惠劵</a></li><li><div></div><a id="data-to-buy" href="javascript:void(0);">去购物</a></li></ul>',

/*        TPL:'<ul><li><a id="data-to-my" href="javascript:void(0);">我的红包</a></li><li><a id="data-to-guides" href="javascript:void(0);">购物攻略</a></li><li><a id="data-to-buy" href="javascript:void(0);">去购物</a></li></ul>',*/

        init: function(options){
            this.renderTo =  $('footer');
        },
        initEvent: function(){
            this.renderTo.on('click', 'a', function(e){
                var id = this.id;
                switch(id){
                    case 'data-to-my': FooterExt.toMyHB();break;
                    case 'data-to-buy': Ext.toBuy();break;
                    case 'data-to-guides': FooterExt.toGuides();break;
                }
                return false;
            })
        },

        render: function(){
            this.renderTo.append(this.TPL);
        }
    })

    new Footer();

})(window.Wap, window.HB,window);

