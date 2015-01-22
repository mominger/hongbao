/*启动插件*/
fis.config.set('modules.postpackager', 'simple');

/*自动合并页面的文件*/
fis.config.set('settings.postpackager.simple.autoCombine', true);

fis.config.set('roadmap.domain',  {
    //所有文件加域名
    /*'**.*' : 'http://10.24.64.235:8000/hb'*/
//    '**.*' : 'http://sale.suning.com/images/advertise/001/hb'
//    '**.*' : 'http://10.25.58.131/hb'
    '**.*' : 'http://oasit.cnsuning.com/infoResource/hb'
});

fis.config.set('roadmap.path', [
    {
//        去掉sprit目录，对此目录下的文件不编译，原因是在JS代码里引用图片，fis MD5编码后会定位出错
        reg : /^\/img\/nofilter\/(.*)$/,
        useCompile : false,
        useHash: false
    },
    /*{
        reg : '**.html',
        release : '/'
    },*/
    {
        reg : /^\/script\/(.*)\.png$/,
        release : 'img/$1'
    },
    {
        //所有的ico文件
        reg : /^\/static\/(.*)\.html/,
        //发布到/static/xxx目录下
        release : '/$1'
    }
]);


//图片合并功能
/*fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true
}]);
fis.config.set('settings.spriter.csssprites.margin', 10);

/*fis.config.get('roadmap.path').unshift({
 reg : 'detail_logo.png',
 useHash: false
 });*/

/*
fis.config.set('name', 'double11');
fis.config.set('version', '1.0');*/
