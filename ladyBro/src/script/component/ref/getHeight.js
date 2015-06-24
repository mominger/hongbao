function heights(){
    this.init.apply(this, arguments);
}
heights.prototype={
    init:function(){
       var that=this;
       var arrPageHeight=that.getHeight();
       $(".body-gradient").height(arrPageHeight[3]);

    },
    getHeight:function(){
        var xScroll, yScroll;
       if(window.innerHeight && window.scrollMaxY){
            xScroll=window.innerWidth+window.scrollMaxX;
            yScroll=window.innerHeight+window.scrollMaxY;
       }else if(document.body.scrollHeight > document.body.offsetHeight){
            xScroll=document.body.scrollWidth;
            yScroll=document.body.scrollHeight;
       }else{
            xScroll=document.body.clientWidth;
            yScroll=document.body.clientHeight;
       }
       var windowWidth, windowHeight;
       if(self.innerHeight){
           if(document.documentElement.clientWidth){
               windowWidth=document.documentElement.clientWidth;
           }else{
               windowWidth=self.innerWidth;
           }
           windowHeight=self.innerHeight;

       }else if(document.documentElement && document.documentElement.scrollHeight){
           windowWidth=document.documentElement.clientWidth;
           windowHeight=document.documentElement.clientHeight;
       }else if(document.body){
           windowWidth=document.body.clientWidth;
           windowHeight=document.body.clientHeight;
       }
       if(yScroll<windowHeight){
           pageHeight=windowHeight;
       }else{
           pageHeight=yScroll;
       }
        if(xScroll<windowWidth){
            pageWidth=windowWidth;
        }else{
           pageWidth=xScroll;
        }
       arrayPageSize=[pageWidth,pageHeight,windowWidth,windowHeight];

        return arrayPageSize;
    },
    getScrolls:function(){
        var xScroll, yScroll;
        if (self.pageYOffset) {
            yScroll = self.pageYOffset;
            xScroll = self.pageXOffset;
        } else if (document.documentElement && document.documentElement.scrollTop) {// Explorer 6 Strict
            yScroll = document.documentElement.scrollTop;
            xScroll = document.documentElement.scrollLeft;
        } else if (document.body) {// all other Explorers
            yScroll = document.body.scrollTop;
            xScroll = document.body.scrollLeft;
        }
        arrayPageScroll = [xScroll,yScroll];
        return arrayPageScroll;
    }
}
$(function(){
    new heights();
});