//针对wap.js的配置
var wapModule = document.querySelector('script[data-wap-moudle]').dataset['wapMoudle'],
    wapHelper = ['const','dao','ext','tpl'],
    wapConfig = {
        'service': 'service/'+wapModule
    };
wapHelper.forEach(function(v,i){
    wapConfig[v] = [v,'/',wapModule,'-',v].join('');
})
seajs.config({
    alias: {
        /*模块配置*/
        'const': 'const/base/const',
        'dao': 'dao/base/dao',
        'ext': 'ext/base/ext',
        'tpl': 'tpl/base/tpl',
        'wap-service': wapConfig.service,
        'wap-const': wapConfig.const,
        'wap-dao': wapConfig.dao,
        'wap-ext': wapConfig.ext,
        'wap-tpl': wapConfig.tpl
    }
});
