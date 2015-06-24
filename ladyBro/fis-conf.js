/*启动插件*/
fis.config.set('modules.postpackager', 'simple');
fis.config.set('roadmap.domain',  {
    //所有文件加域名
    /*'**.*' : 'http://10.24.64.235:8000/hb'*/
    '**.*' : 'http://sale.suning.com/images/advertise/001/hb'
//    '**.*' : 'http://oasit.cnsuning.com/infoResource/hb'
});

fis.config.set('roadmap.path', [
    {
//        去掉sprit目录
        reg : /^\/img\/nofilter\/(.*)$/,
        useCompile : false,
        useHash: false
    },
   /* {
//        去掉sprit目录
        reg : '*.png',
        useCompile : false,
        useHash: false
    },*/
    {    reg : /^\/script\/(.*)$/,
        release : 'script/$1'
    },
    {
        reg : /^\/style\/(.*)$/,
        release : 'style/$1'
    }
    /*{
        reg : /^\/static\/(.*)$/,
        release : '${name}/${version}/s/$1'
    },*/
    /*{
        reg : /^(.*)$/,
        release : '$1'
    }*/
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
