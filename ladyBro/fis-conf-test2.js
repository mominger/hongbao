/*启动插件*/
fis.config.set('modules.postpackager', 'simple');
fis.config.set('roadmap.domain',  {
    //所有文件加域名
    /*'**.*' : 'http://10.24.64.235:8000/hb'*/
    '**.*' : 'http://sale.suning.com/images/advertise/001/hb'
//    '**.*' : 'http://oasit.cnsuning.com/infoResource/hb'
});

fis.config.set('roadmap.path', [
    {    reg : /^\/target\/(.*)$/,
        release : false
    },
    {    reg : '**.bat',
        release : false
    },
    {
        reg : /^\/src\/img\/sprit\/(.*)$/,
        release : 'img/sprit/$1'
    },
    //把style下的img全部挪到img下
    {    reg : /^\/src\/style\/images\/(.*)$/,
        release : 'img/$1'
    },
    {    reg : /^\/src\/style\/images\/sprit\/(.*)$/,
        release : 'img/srpit/$1'
    },
//    html文件输出到src根目录
    {
        reg : /^\/src\/img\/nofilter\/(.*)$/,
        release : 'img/nofilter/$1',
        useHash: false
    },
    {    reg : /^\/src\/(.*)\.html/,
        release :  '$1'
    },
    {    reg : /^\/src\/script\/(.*)$/,
        release : 'script/$1'
    },
    {    reg : /^\/src\/style\/(.*)$/,
        release : 'style/$1'
    }
]);


/*自动合并页面的文件*/
fis.config.set('settings.postpackager.simple.autoCombine', true);


//图片合并功能
/*fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true
}]);
fis.config.set('settings.spriter.csssprites.margin', 10);*/

/*fis.config.get('roadmap.path').unshift({
 reg : 'detail_logo.png',
 useHash: false
 });*/

/*
fis.config.set('name', 'double11');
fis.config.set('version', '1.0');*/
