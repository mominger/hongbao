/**
 * @author 14033219
 * @desc  红包详情类
 */
;(function($, M){
    var TPL_TO = [
            ' <section class="item {itemClass}" data-detail-id="{id}" data-open-id="{openId}" > ',
            '		<div class="title"><div>闺蜜节狂购high不停-苏宁易购</div>        ',
            '		<span>{receivedTime}</span></div>                                         ',
            '		<div class="item-detail" data-detail-id="{id}" data-open-id="{openId}">       ',
            '			<img src="{path}" onerror="this.src=\'img/nofilter/hb-pic.jpg\'"/>                                      ',
            '			<dl>{desc}</dl>                                                                ',
            '		</div>                                                                               ',
            ' </section>                                                                                 '
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
        TPL_HB_GET = '已领取{0}个，还剩下<i class="a1">{1}</i>个',
        TPL_TO_DEC = '<dd>{0}</dd><dd><div class="wbox-flex of gray9">{1}</div></dd> ',
        /*$toContext = $toContainer = $('.hb-my-to')*/ //我发的
        $root = $('body>section'),
        $content = $('body>section .content'),
        inviteFriendsCmp,
        $detailContext = $('.friends'),
        $detailContainer = $detailContext.find('ul'),
        $ygTip = $('.hb-tip'),
        isShareGroup = false,
        URL_PARAM = M.Data.URL_PARAM,
        MOUDLE_NAME = 'hbdetail';  //本模块标识

    /**
     * dom初始化
     */
    function init() {
        flushData();
    };

    /**
     * 事件初始化
     *
     */
    function initEvent() {
        //对冒泡事件，采用绑定一次事件
        $(document).on(M.EVENT.CLICK, function(e){
            var target = e.target;

            switch(target.id){
                case 'invite-friend': inviteFriendsCmp = M.InviteFriends({status: 3});
                    window.onpopstate = function(e){
                        console.info(e);
                    }
                    return !1;
            }
        });
    }

    function flushData() {
        flushDetail();
    }


    /**
     * 获取详情数据
     */
    function flushDetail(){

        //请求详情数据，实时渲染数据
        //我发的
        M.Req.queHBDetail(function(data){
         $detailContainer.empty();
         var friendLuckList = data.friendLuckList;
         var    item = data.dirPurse;
         item.reward = item.reward;
//         item.reward = $H.getInt(item.reward);
         var detailArr = [];
         var time = item.receivedTime;
         if(time){
         var index = time.indexOf('.');
         (index != -1) && (item.receivedTime = time.substring(0, index));
         }
         item.path =  $H.IMG_HB;
         if(item.isExpired === 'ture'){//无语的后台返回字段
         item.path = $H.IMG_HB_EXPIRED;
         item.desc = '已过期';
         item.itemClass = 'disabled';
         //                    item.status
         }
         else if(item.noReceiveNum === '0' ){
         item.desc = TPL_TO_DEC.format('已领完','已获得{0}元奖金红包'.format(item.reward));
         }else{
         item.desc = TPL_TO_DEC.format(TPL_HB_GET.format(item.receiveNum, item.noReceiveNum),'领取完获得{0}元奖金红包'.format(item.reward))+
         '<dd><a href="#" class="hb-a-btn" id="invite-friend">继续拉好友</a></dd>';
         }                                                         //是否展示领取信息等
         item.prizeMark <= 0 && ( item.status = '');

         detailArr.push(TPL_TO.format(item));
         $content.prepend(detailArr.join(''));
         $content.show();

         //初始化好友列表
         var friendArr=[],dateO,friendO;
         if(friendLuckList){
         for(var i = 0,len = friendLuckList.length; i < len; i++){
         friendO = friendLuckList[i];
         dateO = $H.getDate(friendO.receiveDate);
         friendO.date = '{m}-{d} {h}:{mi}:{s}'.format(dateO);
         friendO.nickName = friendO.nickName || '神秘好友';
         friendO.receiveReward = friendO.receiveReward;
//         friendO.receiveReward = $H.getInt(friendO.receiveReward);
         friendArr.push(TPL_FRIEND.format(friendO));
         }
         //                friendArr.length > 0 && ($H.show($('.subhb-views')))
         $detailContainer.append(friendArr.join(''));
         $detailContext.show();
         }

         $H.share({
         path: M.Const.PRO_PATH + (isShareGroup ? M.Const.DO_GET_GROUP_HB : M.Const.DO_GET_HB),
         activityId: item.activityId,
         solutionId: item.dirPurseId,
         title: item.shareTitle,
         shareContent: item.shareContent,
         shareIcon: item.shareIcon
         })
         },{
         code: URL_PARAM['code'],
         dirPurseId: URL_PARAM['dirPurseId'],
         openId: URL_PARAM['openId']
         },false);
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

     });
})(Zepto, HB);


