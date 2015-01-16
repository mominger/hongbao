//项目配置
seajs.config({
   base: '../',

    // 设置路径，方便跨目录调用
    paths: {
    },

    // 设置别名，方便调用
    alias: {
        /*基本库*/
        'zepto': 'http://m.suning.com/RES/wap/common/script/lib/zepto/1.1.4/zepto.min.js?v=2.3.2',
//        'zepto': 'test/component/interface/zepto_template1.1.4.js',
//        'jquery': 'http://script.suning.cn/javascript/mobileweb/jquery.min.js',
        'wap': 'lib/wap',
        'wap-util': 'lib/wap-util',
        'wap-sea': 'lib/wap-sea',
        'template': 'lib/template-debug',

        /*公共组件*/
        'wap-cmp':'lib/component/common/wap-cmp',
        'wap-cmp-ui':'lib/component/common/wap-cmp-ui',
        'error-net':'lib/component/common/error-net/error-net',

        /*定制组件*/
        'header': 'lib/component/header',
        'footer': 'lib/component/footer',
        'invitefriends': 'lib/component/invitefriends',
        'buriedpoint': 'lib/component/buriedpoint',
        'activeend': 'lib/component/activeend',

        /*标配类扩展*/
        'footer-ext': 'ext/footer-ext',

        /*模块*/
        'gethbs': 'service/gethbs',

        /*埋点*/
        'buriedpoint':'https://imgssl.suning.com/javascript/sn_da/da_opt'
    }
});

seajs.use('wap-service');
