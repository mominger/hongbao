/*启动插件*/
fis.config.set('modules.postpackager', 'simple');

/*自动合并页面的文件*/
fis.config.set('settings.postpackager.simple.autoCombine', true);

fis.config.set('roadmap.domain',  {
    //所有文件加域名
    /*'**.*' : 'http://10.24.64.235:8000/hb'*/
    '**.*' : 'http://sale.suning.com/images/advertise/001/hb'
//    '**.*' : 'http://10.24.64.150:8000/hb'
//    '**.*' : 'http://oasit.cnsuning.com/infoResource/hb'
});

fis.config.set('roadmap.path', [
    {
//        去掉sprit目录，对此目录下的文件不编译，原因是在JS代码里引用图片，fis MD5编码后会定位出错
        reg : /^\/static\/img\/nofilter\/(.*)$/,
        useCompile : false,
        useHash: false
    },
    {
//        去掉sprit目录，对此目录下的文件不编译，原因是在JS代码里引用图片，fis MD5编码后会定位出错
        reg : /^\/static\/ref\/img\/nofilter\/(.*)$/,
        useCompile : false,
        useHash: false
    },
    //所有img输出到img目录
    {
        reg : '**.png',
        release : '/img$&'
    },
    //所有img输出到img目录
    {
        reg : '**.jpg',
        release : '/img$&'
    },
    {
        //移植ref下的静态页面
        reg : /^\/static\/(.*)\/(.*)\.html/,
        /*  reg : 'static*//**.html',*/
    //发布到/static/xxx目录下
    release : '$2'
    },
    //所有html 输出到根目录
    {
        //移植静态页面
        reg : /^\/static\/(.*)\.html/,
        /*  reg : 'static*//**.html',*/
        //发布到/static/xxx目录下
        release : '$1'
    },
    //test、html目录下的资源不输出
    {
        reg : /^\/html\/.*$/,
        release : false
    },
    {
        reg : /^\/test\/.*$/,
        release : false
    }
    /*{
        reg : /^\/html\/.*$/,
        release : false
    },
    *//*{
        reg : /^\/test\/.*$/,
        release : false
    },*//*
    {
        reg : /^\/script\/(.*)\.png$/,
        release : 'img/$1'
    },
    {
        //移植ref下的静态页面
        reg : /^\/static\/(.*)\/(.*)\.html/,
      *//*  reg : 'static*//**//**.html',*//*
        //发布到/static/xxx目录下
        release : '$2'
    },
    { //引用img资源输出到/img下
        reg : /^\/static\/ref\/img\/(.*\.(?:png|jpg))/i,
        *//*  reg : 'static*//**//**.html',*//*
        //发布到/static/xxx目录下
        release : '/img/$1'
    },
    {   //引用img资源输出到/img下
        reg : /^\/static\/ref\/img\/sprit\/(.*\.(?:png|jpg))/i,
        *//*  reg : 'static*//**//**.html',*//*
        //发布到/static/xxx目录下
        release : '/img/$1'
    },
    {
        //移植静态页面
        reg : /^\/static\/(.*)\.html/,
        *//*  reg : 'static*//**//**.html',*//*
    //发布到/static/xxx目录下
        release : '$1'
    }*//*,*/
]);


//图片合并功能
/*fis.config.set('roadmap.path', [{
    reg: '**.css',
    useSprite: true
}]);
fis.config.set('settings.spriter.csssprites.margin', 10);*/

/*fis.config.get('roadmap.path').unshift({
 reg : 'detail_logo.png',
 useHash: false
 });

/*
fis.config.set('name', 'double11');
fis.config.set('version', '1.0');*/
