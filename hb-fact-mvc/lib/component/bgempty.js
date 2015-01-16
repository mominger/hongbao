/**
 *    修改gethbs gethb 分辨率高度值过大时，背景难以覆盖的bug
 */
define(function(require, exports, module) {
    var W = window;

    //TPL
    var TPL = '<div class="empty-bg"></div>';

    //init dom
    function init(){
        // 979：背景图片值   80： footer值  640：最大宽度值

        //TODO: 和适配代码重复
        var winWidth =  parseInt(W.innerWidth);   /*s4手机读到的winWidth是分辨率的宽*/
        var docWidth =  parseInt(document.documentElement.clientWidth);  //和winWidth区别是，减去右边滚动条
        var bodyWidth =  parseInt(document.body.clientWidth);   //混合模式下使用
        var docWidth = Math.min(winWidth, bodyWidth, docWidth);

        var rate = docWidth/640;
        var footerHeight =  rate * 80;
        //TODO:针对图片高度并非979做特殊兼容
        var disHeight = (W.innerHeight - rate * 979 - footerHeight)+32;
        var bgSize =  [docWidth,'px ',disHeight,'px'].join('');

        if(disHeight > 0){
            var $bg = $(TPL);
            $bg.css({
                width: window.innerWidth,
                height:disHeight,
                bottom: footerHeight+'px',
                backgroundSize: bgSize
            });
            $('body').append($bg);
        }
    }

    //exec
    init();
});

