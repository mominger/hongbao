/**
 *   footer
 */
(function(Wap, M, W){
    var Cmp = Wap.Component;
    var FooterExt = M.FooterExt;

    var Footer = Cmp.extend({
        ClassName:"Footer",

        TPL:'<ul><li><a id="data-to-my" href="javascript:void(0);">我的红包</a></li><li><a id="data-to-guides" href="javascript:void(0);">购物攻略</a></li><li><a id="data-to-buy" href="javascript:void(0);">去购物</a></li></ul>',

        init: function(options){
            this.renderTo =  $('footer');
        },
        initEvent: function(){
            this.renderTo.on('click', 'a', function(e){
                var id = this.id;
                switch(id){
                    case 'data-to-my': FooterExt.toMyHB();break;
                    case 'data-to-buy': FooterExt.toBuy();break;
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

