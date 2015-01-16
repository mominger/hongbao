/**
 *   footer
 */
define(function(require, exports, module) {
    var FooterExt = require('footer-ext');

    //TPL
    var TPL = '<ul><li><a id="data-to-my" href="javascript:void(0);">我的红包</a></li><li><a id="data-to-guides" href="javascript:void(0);">购物攻略</a></li><li><a id="data-to-buy" href="javascript:void(0);">去购物</a></li></ul>';
    var $footer = $('footer');

    //init dom
    function init(){
        $footer.append(TPL);
    }

    //init event
    function initEvent(){
        /**  全局事件监听  **/
        $footer.on('click', 'a', function(e){
            var id = this.id;
            switch(id){
                case 'data-to-my': FooterExt.toMyHB();break;
                case 'data-to-buy': FooterExt.toBuy();break;
                case 'data-to-guides': FooterExt.toGuides();break;
            }
            return false;
        })
    }

    //exec
    init();
    initEvent();
});

