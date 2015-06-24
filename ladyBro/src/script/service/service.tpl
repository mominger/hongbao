/**

 * @author 14033219
 * @desc  JS类
 * @function   页面渲染规范： URL等常量申明 -->  init dom初始化---》initEvent事件初始化  --》页面渲染接口 create
 * @ps:
 *        针对ftl模板进行logic与view的解耦。
 *        每个wap页面只加载工具类与渲染接口，
 */
(function($){

    var TPL = [
        ].join(''),
        MOUDLE_NAME = 'redenvelopes';  //本模块标识

    /**
     * dom初始化
     */
    function init() {
    };

    /**
     * 事件初始化
     */
    function initEvent() {
    }

    /**
     * 渲染接口
     */
    function create(){
        init();
        initEvent();
    }


    /**
     * 页面预处理： 和页面数据的耦合处理写在这
     */
    function preCreate(){
    }

    /**
     * 运行接口
     */
    $(function(){
        preCreate();
        create();
    })
})(jQuery);


