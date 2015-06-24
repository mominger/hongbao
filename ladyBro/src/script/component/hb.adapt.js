/**
 *   内嵌适配：  计算font-size，为rem提供基准值
 */
(function(W){
    function _adaptFont(maxWidth, baseWidth,baseSize){
        maxWidth = maxWidth || 640;//最大值640px
        baseWidth = baseWidth || 320;
        baseSize = baseSize || 16;

        var winWidth =  parseInt(W.innerWidth);   /*s4手机读到的winWidth是分辨率的宽*/
        var docWidth =  parseInt(document.documentElement.clientWidth);  //和winWidth区别是，减去右边滚动条
        var bodyWidth =  parseInt(document.body.clientWidth);   //混合模式下使用
        var docWidth = Math.min(winWidth, bodyWidth, docWidth);
        docWidth > maxWidth && (docWidth = maxWidth);

        //设置基准值
        document.documentElement.style.fontSize =  (docWidth/baseWidth)*baseSize + 'px';

        //设置图片路径 自定义数据 data-adapt-type(0,1,2)  0:320  1:480 2:640
        var adaptV;
        if(docWidth <= 320){
            adaptV = 0;
        }else if(docWidth <= 480){
            adaptV = 1;
        }else{
            adaptV = 2;
        }
        document.body.dataset['adaptType']=adaptV;
    }
    _adaptFont();

    W.addEventListener('resize',function(e){
        _adaptFont();
    });
})(window);

