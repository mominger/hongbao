/**

 * @author 14033219
 * @desc  领群红包类
 * @function   页面渲染规范： URL等常量申明 -->  init dom初始化---》initEvent事件初始化  --》页面渲染接口 create
 */
;(function($, M){
     var $root = $('.get-hbs');
     var $inviteFriendBtn =  $(".share-btn>a");
     var $contentConainer = $root.find('>.hb-content>ul');
     var $descContainer = $contentConainer.find('li:first-child');
     var $smallDesc =  $descContainer.find('.small-font');
     var $bigDesc =  $descContainer.find('.big-font');
     var $btnBeforeStart =  $root.find('.share-root');
     var $footFixed=$(".get-hb-foot");
    //3：正常领取，剩余多少个,  5： 群红包已发完  4:活动已结束 , 1:获得神秘群红包     2：您的群红包已发完
        //暂定0   活动尚未开始
    var STATUS_MAP = {
        '3':{
            rootClass: 'remain-hbs',
            bigDesc: '您的神秘群红包',
            smallDesc: '',
            btnDesc: '继续邀请好闺蜜',
            isShareHBs: false,
            afterFn: function(domData,renderData){
                var remainNum = parseInt(renderData.total) - parseInt(renderData.hasNum);
//                var remainNum = renderData.total - renderData.hasNum;
                $smallDesc.append(['<p>已被亲们领了<strong>',renderData.hasNum,'</strong>个,<i></i>还剩<strong>',remainNum,'</strong>个</p>',
                    '<p class="rmain-pare">继续邀请好友，领完有惊喜哦</p>'].join(''));

            }
         },
         '2': {
             rootClass: 'u-hbs-end',
             smallDesc: '',
             bigDesc: '你的群红包已领完',
             btnDesc: '分享给小伙伴',
             isShareHBs: true,
             afterFn: function(data){
                 //$contentConainer.append('<li><p>最高可得100元！</p><p>(每人可领取5个群红包 15个普通红包)</p></li>');
                //$btnBeforeStart.prepend('<div class="share-tell-txt"><span>告诉你最好的闺蜜们吧</span></div>');
             }
         },
         '4':{
             rootClass: 'active-end',
             smallDesc: '去购物 更多惊喜活动等你参加',
             bigDesc: '活动已经结束',
             btnDesc: '关注苏宁易购',
             isShareHBs: true,
             afterFn: function(data){
                 _followSuning();
             }
         },
         '1':{
             rootClass: 'my-hbs',
             smallDesc: '独乐不如众乐 邀请亲们也来领大钱吧',
             bigDesc: '群红包到手啦',
             btnDesc: '邀请闺蜜领红包',
        	 afterFn: function(dom,data){
                 $btnBeforeStart.prepend('<div class="share-tell-txt"><span>告诉你最好的闺蜜们吧</span></div>');
             },
             isShareHBs: false
          },
         '5':{
             rootClass: 'hbs-over',
             smallDesc: '群红包已发完了',
             bigDesc: '亲~ 你迟到了',
             btnDesc: '关注苏宁易购',
             isShareHBs: true,
             afterFn: function(data){
//                 _descTranslate();
                 _followSuning();
             }
         },
        '6':{
            rootClass: 'active-no-begin',
            smallDesc: '请稍候',
            bigDesc: '活动尚未开始',
            btnDesc: '关注苏宁易购',
            afterFn:function(data){
                //_descTranslate();
                _followSuning();
            },
            isShareHBs: true
        }
         
    };
    var shareCmp,
    shareTitle,
    shareContent,
    shareIcon,
    URL_PARAM = M.Data.URL_PARAM,
    CURRENT_STATUS,//当前状态，存储STATUS_MAP的索引值
    MOUDLE_NAME = 'GETHBS';  //本模块标识
    /**
     * dom初始化
     */
    function init() {

    	flushData();

    };


    /**
     * 事件初始化
     */
    function initEvent() {
        $(document).on('click', function(e){
           var target = e.target;
            var $target = $(target);
            var dataset = target.dataset;
            var eventName = dataset && dataset['event'];

            switch(eventName){
                case 'share-btn': $target.parent().hasClass('data-focus-sn') ? $H.toFocusSN() : shareCmp = M.InviteFriends({
                    status: CURRENT_STATUS,
                    after:function(){
                        window.scrollTo(0,0);
                    }
                });
                    return false;
            }
        });

    }
    
    /**
     * 刷新数据
     */
    function flushData(){
        CURRENT_STATUS = URL_PARAM.activityFlag;

        var domdata = STATUS_MAP[CURRENT_STATUS];
        if(!domdata){
            return $H.tipNetError();
        }

        //TODO：如果领取到openID，存入全局   ?
        window.HB.OPEN_ID = URL_PARAM.openId;

        //模板渲染  TODO:不知道为什么一定要这么写
        $('.get-hbs').addClass(domdata.rootClass);
        $('.small-font').text(domdata.smallDesc);
        $('.big-font').text(domdata.bigDesc);
        domdata.btnDesc && ($inviteFriendBtn.text(domdata.btnDesc));
        domdata.afterFn && domdata.afterFn(domdata,URL_PARAM);

        //渲染完后展示
        $('.get-hbs').show();
//        $H.show($('.get-hbs')[0]);
        //渲染完之后底部显示
        $footFixed.show();
        //自适应高度
        M.Util.adaptHeight();
        //异步请求分享信息
        var shareParam = {
            	activityId: URL_PARAM.activityId,
            	solutionId: URL_PARAM.solutionId,
            	type:  URL_PARAM.shareInfoType,
            	path: M.Const.PRO_PATH + (domdata.isShareHBs ? M.Const.DO_GET_GROUP_HB : M.Const.DO_GET_HB)
        };
        M.Req.queShareInfo(function(data){
            $H.share($.extend({},shareParam,data));
        },shareParam, true);

    }

    /**
     * 关注苏宁
     */
    function _followSuning(){
        $btnBeforeStart.prepend('<div class="share-tell-txt"><span>告诉你最好的闺蜜们吧</span></div>');
        $inviteFriendBtn.parent().addClass('data-focus-sn');
    }
    /**
     * 切换描述顺序
     */
     function _descTranslate(){
        $descContainer.prepend($bigDesc).prepend($smallDesc);
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
    	$H.hideShareBtn(false);
    }
    

    /**
     * 运行接口
     */
    $(function(){
        preCreate();
        create();
    })
})(Zepto, HB);


