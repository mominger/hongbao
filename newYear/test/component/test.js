$.ajax({
    url: 'mps/queryShareConfigInfo.do',
    data:{
        shareUrl:encodeURI(location.href)
    },
    success:function(data){
        wx.config({
            debug: false,
            appId: Const.APP_ID,
            timestamp: data.timestamp,
            nonceStr: data.nonceStr,
            signature: data.signature,
            jsApiList: [
                'onMenuShareTimeline',
                'onMenuShareAppMessage',
                'hideMenuItems',
                'showMenuItems'
            ]
        });
    },
    error:function(data){
        console.error('req  '+ Const.CHECK_WECHAT + " error "+data);
    }
});