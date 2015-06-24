/**
 * 活动规则
 */
(function($, M){
	var URL_PARAM = M.Data.URL_PARAM,
    MOUDLE_NAME = 'activerule';  //本模块标识

    /**
     * dom初始化
     */
    function init() {
    	//授权失败弹窗
    	
		$('.pipup-btn').on(M.EVENT.CLICK,function(e){
			$H.redirect($H.getWeChat(URL_PARAM.redirectUrl));
		})
    	
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
})(jQuery, HB);


