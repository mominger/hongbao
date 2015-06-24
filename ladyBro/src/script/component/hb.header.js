/**
 *   header
 */
(function(w,M){
    //TPL
    var TPL_GET_HBS = '<div class="focus-sn"><a data-event="focus-sn" href="javascript:void(0);"></a></div><div class="active-rlue"></div>';
    var TPL_GET_HB = '<div class="active-rlue"></div>';
    var $header =  $('header');
    var Const = M.Const;
    var isInit = true;//是否初始化了dom

    //init dom
    function init(){
        $header.append(_getTpl());
    }

    //init event
    function initEvent(){
        isInit && $header.on('click',function(e){
            var target = e.target;
            var $target = $(e.target);
            var eventName = target.dataset && target.dataset['event'];

            /*if($target.hasClass('time-world')){
                location.href = Const.FOCUS_SN;*/
            if($target.hasClass('active-rlue')){
                location.href = Const.ACTIVE_RULE;
            }else{
                switch(eventName){
                    case 'focus-sn': $H.toFocusSN();break;
                }
            }

            return false;
        })
    }

    /**
     * @returns dom tpl
     * @private 获取模板
     */
    function _getTpl(){
        var tpl;
        //TODO 只能控制页面级别，不能更精细控制，除非能进行依赖管理
        if($('.get-hbs').size()>0){
            tpl =  TPL_GET_HBS;
        }else if($('.get-hb').size()>0){
            tpl = TPL_GET_HB;
        }else{
            isInit = false;
        }
        return tpl;
//        return TPL_GET_HBS;
    }
    //exec
    init();
    initEvent();
})(window,  window.HB = window.HB || {});

