/**
 * @author 14033219
 * @desc  领红包类
 */
;(function($, M){
    var $root = $('.get-hb');
    var $contentConainer = $root.find('>.friend-by-bg>ul'),
        $contentDom =  $contentConainer,
        $descContainer = $contentDom.eq(0),
        $friendView = $('.friend-view'),
        $friends = $friendView.find('ul'),
        $sharePare=$(".share-root"),
        shareCmp,
        isShareGroup = false,
        $shareBtn = $('.share-btn>a'),
        $footFixed=$(".get-hb-foot");
    TPL_LOGOS=[
        '<li class="sub-hb-icon">',
        '</li>'
    ].join(''),
    TPL_DESC = [
        '<li class="sub-hb-bg">',
        '<div class="get-hb-desc">                   ',
        '		<em>¥</em>                                    ',
        '		<span>{rewardValue}</span>                    ',
        '		<em>元</em>                                   ',
        '		<p>领取<strong>{nickName}</strong>的红包, <br />所有红包可叠加使用，多领多用~</p> ',
        '	</div>                                            ' ,
        '</li>'
    ].join(''),
        TPL_FRIEND = [             /*好友列表*/
            '<li>																',
            '<img src="{icon}" onerror="this.src=\'img/nofilter/defaultHead.jpg\'">        ',
            '	<dl>                                                            ',
            '		<dd>                                                        ',
            '			<p>{nickName}<i></i><span>{date}</span></p>               ',
            '			<p>{desc}</p>                                           ',
            '		</dd>                                                       ',
            '		<dd>                                                        ',
            '			<div>领到<i></i><em>{receiveReward}</em><i></i>元</div> ',
            '		</dd>                                                       ',
            '	</dl>                                                           ',
            '</li>                                                             '

        ].join(''),
//0:成功 1：过期(已结束）
    STATUS_MAP = {
        '1': {
            afterFn: function(){
                //处理容器  切换成get-hbs的状态
                $root.removeClass('get-hb').addClass('get-hbs active-end');

                //处理头部
                $descContainer.append('<li class="big-font">活动已结束</li><li class="small-font">去购物，更多惊喜活动等你参加</li>');

                //处理内容
                /*$descContainer.append('<a href="javascript:;void(0);"></a>');*/

                //处理尾部

                $shareBtn.text('关注苏宁易购');
                $shareBtn.parent().addClass('data-focus-sn');

                $('.get-hbs').css({
                    "display":"block",
                    "height": window.innerHeight+"px",
                    "background-size":"20rem "+window.innerHeight+"px"
                });
            },
            isShareGroup: true
        }
    },
    URL_PARAM = M.Data.URL_PARAM,
    MOUDLE_NAME = 'GETHB';  //本模块标识

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

        //对冒泡事件，采用绑定一次事件
        $(document).on('click', function(e){
           var target = e.target;
           var $target = $(target);
           var dataset = target.dataset;
           var eventName = dataset && dataset['event'];

           if($H.isNoEvent($target)){
               return false;
           }

            switch(eventName){
                case 'share-btn': $target.parent().hasClass('data-focus-sn') ? $H.toFocusSN() : $H.toGetGroupHB();
            }

            return false;
        });
        
     
    }

    function flushData() {
            // 红包状态渲染
            var code = URL_PARAM.status,
               container = $descContainer;

            //如果是正常领取
            var isAllowGet = code === '0',
                $domStr;
            if(isAllowGet){
            	$domStr = $(TPL_DESC.format({
            		nickName:decodeURIComponent(URL_PARAM.nickName),
                	rewardValue:URL_PARAM.rewardValue
            	}));
                container.append(TPL_LOGOS);
                container.append($domStr);
                /*$('.actcive-rlues').show();
                $('.que818fun').show();*/
            }else{
            	ds = STATUS_MAP[code];

                //异常处理
                if(!ds){
                    return $H.tipNetError();
                }
                ds.afterFn && ds.afterFn();
            }
            //渲染完后页面展示
            $root.show();
            $footFixed.show();

        //异步请求: 好友列表渲染
            isAllowGet && M.Req.queFriendList(
                function(data){
                     $friends.empty();
                     var arr = [],dateO,friendO;
                     data = data || [];

                     if(data.length < 1) return;

                     for(var i = 0,len = data.length; i < len; i++){
                         friendO = data[i];
                         dateO = $H.getDate(friendO.receiveDate);
                         friendO.date = '{m}-{d} {h}:{mi}:{s}'.format(dateO);
                         friendO.nickName = friendO.nickName || '神秘好友';
                         friendO.receiveReward = friendO.receiveReward;
//                         friendO.receiveReward = $H.getInt(friendO.receiveReward);
                         arr.push(TPL_FRIEND.format(friendO));
                        }
                     $friends.append(arr.join(''));
                     $friendView.show();
                },{
                    dirPurseId: URL_PARAM.solutionId,
                    openId: URL_PARAM.openId
                });
            //异步请求: 分享信息
            var shareParam = {
                	activityId: URL_PARAM.activityId,
                	solutionId: URL_PARAM.solutionId,
                	type:  URL_PARAM.shareInfoType || '4',
                	path: M.Const.PRO_PATH + (isShareGroup ? M.Const.DO_GET_GROUP_HB : M.Const.DO_GET_HB)
            };

            M.Req.queShareInfo(function(data){
            	$H.share($.extend({},shareParam,data));
            },shareParam, false);
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
})(Zepto, HB);


