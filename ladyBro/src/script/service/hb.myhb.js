/**
 * @author 14033219
 * @desc  我的红包类
 */
;(function($, M){
var TPL_TO = [
        ' <li class="item {itemClass}"> ',
        '	<a href="javascript:void(0);">                             ',
        '		<div class="title"><div>{activityDesc}</div>        ',
        '		<span>{receivedTime}</span></div>                                         ',
        '		<div class="item-detail" data-detail-id="{id}" data-open-id="{openId}">       ',
        '			<img src="{path}"/>                                      ',
        '			<dl>{desc}</dl>                                                                ',
        '			<dl class="detail-circle">详情</dl>                                              ',
        '		</div>                                                                               ',
        '	</a>                                                                                     ',
        ' </li>                                                                                 '
    ].join(''),
    TPL_FROM = [
        '<li class="{liClass}">														',
        '	<dl>                                                    ',
        '		<dd>{date}</dd>               ',
        '		<dd class="price">¥<span>{purseValue}</span><em>元</em></dd> ',
        '	</dl>                                                   ',
        '	<dl>                                                    ',
        '		<dd>来自-<span>{purseSourceStr}</span></dd>             ',
        '		<dd>{ticketRule}</dd>                         ',
        '	</dl>                                                   ',
        '</li>                                                      '
    ].join(''),
    $path = $('body>section'),
    TPL_HB_GET = '已领取{0}个，还剩下<i class="a1">{1}</i>个',
    TPL_TO_DEC = '<dd>{0}</dd><dd><div>{1}</div></dd> ',
    $toContext =  $('.my-to'), //我发的
    $toContainer = $toContext.find('ul'),
    $fromContext = $('.my-from'),//  $('.my-from'),
    $fromContainer = $fromContext.find('>ul'),  //我挣的
    $userFoot = $('footer'),
    isGetMyToHB = false,
    isGetMyFromHB = false,
    URL_PARAM = M.Data.URL_PARAM,
    noDataTpl = '您还没有{0}过红包呢',
    TPL_BUTTON = '<div class="send-hb-btn"><a href="javascript:void(0);">我要{name}大红包</a></div>',
    $myToFoot=$(".myTo-foot"),
    $myFromFoot=$(".myFrom-foot"),
    isFromFootShow = false,
    isToFootShow = false,
    MOUDLE_NAME = 'myhb';  //本模块标识
    test('myhb page '+location.href);
    /**
     * dom初始化
     */
    function init() {
        flushData();
//        $fromContext.show();
    };

    /**
     * 事件初始化
     */
    function initEvent() {
        //特殊事件处理
        $(document).on('click', '.item-detail', function(e){
            getDetailHandler($(this));return !1;
        });
        $(document).on('click', '.send-hb-btn', function(e){
            $H.toGetGroupHB();return !1;
        });

        //通用事件处理
        $(document).on('tap',function(e){
            var target = e.target,
                $target = $(target),
                $parent = $target.parent(),
                id = target.id,
                dataset =   target.dataset,
                eventName = dataset['eventName'];


            //ID
            switch(id){
                case 'data-tab-myto':   $H.onlyClass($parent, 'cur');hbStatusHandler(true);return !1;
                case 'data-tab-myfrom':  $H.onlyClass($parent, 'cur');hbStatusHandler();return !1;
                case 'data-to-down' : $H.toDownLoad();return !1;

            }

            //eventName
            switch(eventName){
                case 'to-app': $H.toApp();return !1; //跳到易购首页
                case 'to-bind': $H.toBuy();return !1;//跳到绑定页面

            }
        });
    }

    function flushData() {
        try{
            flushMyFromHB();
        }catch(e){
            $H.error('flushMyFromHB no response');
        }

    }

    function getDetailHandler($dom){
        $H.redirect(M.Const.HB_DETAIL, {dirPurseId: $dom.attr("data-detail-id"), openId: $dom.attr("data-open-id")});
    }

    /**
     * 红包状态切换
     * @param flag
     */
    function hbStatusHandler(isTo){
        /*$(".to-section-ph").css({
            height:"100%"});*/
        if(isTo){
            $fromContext.hide();
            $myFromFoot.hide();
            flushMyToHB();
            isToFootShow && $myToFoot.show();
            $toContext.show();
        }else{
            $toContext.hide();
            $myToFoot.hide();
            flushMyFromHB();
            isFromFootShow && $myFromFoot.show();
            $fromContext.show();

        }

        preIsTo = isTo;
    }

    //不需要实时读取数据，只加载一次数据
    function flushMyToHB(backFn){
        if(isGetMyToHB) return;
        var arr = [];


        //我发的
       M.Req.queMyToHB(function(ds){
           isGetMyToHB = true;
           //当有数据的时候我发的红包的底部出现
//           $myFromFoot.hide();
           if(ds.openId) M.Data.OPEN_ID = ds.openId;
           if(ds === undefined){
               return $H.tipNetError();
           }

           data = ds.dirPurseList || [];

           var item,time;
           //无数据时展示提示框
           if(data.length <= 0){
               //当没有数据的时候我发的红包的底部隐藏
//               $myToFoot.hide();
//               $myFromFoot.hide();
//               isToFootShow  = true;
               return M.ErrorTip({desc: noDataTpl.format('发'), container: $toContext,
                   afterFn: function(){
                       $userFoot.hide();
                       addBtn($toContext,{name:'发'});
                   }
               });
           }
           for(var i = 0,len = data.length; i < len; i++){
               item = data[i];
               //拼装对应数据 expiredTime path desc status
               item.path =  $H.IMG_HB;
               item.id = data[i].dirPurseId;
               item.openId = URL_PARAM.openId;
               item.reward = item.reward;
//               item.reward = $H.getInt(item.reward);

               time = item.receivedTime;
               if(time){
                   var index = time.indexOf('.');
                   (index != -1) && (item.receivedTime = time.substring(0, index));
               }

               if(item.isExpired === 'ture'){//无语的后台返回字段
                   item.path = $H.IMG_HB_EXPIRED;
                   item.desc = '已过期';
                   item.itemClass = 'disabled';
//                    item.status
               }
               else if(item.noReceiveNum === '0' ){
                   item.desc = TPL_TO_DEC.format('已领完','已获得{0}元奖金红包'.format(item.reward));
               }else{
                   item.desc = TPL_TO_DEC.format(TPL_HB_GET.format(item.receiveNum, item.noReceiveNum),'领取完获得{0}元奖金红包'.format(item.reward));
               }
               //是否展示领取信息等
               item.prizeMark <= 0 && ( item.status = '');

               arr.push(TPL_TO.format(item));
           }
           $toContainer.empty().append(arr.join(''));
           isToFootShow  = true;
           isToFootShow && $myToFoot.show();
       },{openId:M.Data.OPEN_ID, code:M.Data.CODE});
    }

    function flushMyFromHB(){
        if(isGetMyFromHB) return;
        var arr = [];

        //我挣的
        M.Req.queMyFromHB(function(data){
            //当有数据的时候底部出现
            isGetMyFromHB = true;
            var ds;
            if(data.openId) M.Data.OPEN_ID = data.openId;

            //如果绑定了用户
            data.isBindEgo != undefined && (addBindAccount(data.isBindEgo === 'true'));
            data = data.normalPurseList || [];
            //无数据时加载error 无数据框，加入本容器
            if(data.length <= 0){
                //当没有数据的时候底部隐藏
//                $myFromFoot.hide();
                return M.ErrorTip({desc: noDataTpl.format('赚'), container: $fromContext,
                    beforeFn:function(){
                        //清掉
                        $fromContext.empty();
                    },
                    afterFn: function(){
                        addBtn($fromContext,{name:'领'});
                    }
                });
            }

            for(var i = 0,len = data.length; i < len; i++){
                ds = data[i];
                ds.purseValue = ds.purseValue;
//                ds.purseValue = $H.getInt(ds.purseValue);

                //如果是已兑换
                if(ds.exchangeStatus === '1002'){
                    ds.date = '已兑换';
                }else{
                    var dateO = $H.getDate(ds.expireTime);
                    ds.date = ['兑换有效期：','{0}-{1} {2}点'.format(dateO.m, dateO.d, dateO.h) , '前有效'].join('');
                }

                //奖励，普通红包处理
                var isSelf = ds.shareAccountId === ds.accountId,
                    isNormal = ds.rewardType === '2';
                ds.purseSourceStr = isSelf ? ('我的{0}红包'.format(isNormal?'普通':'奖励')):(ds.purseSource+'红包');
                //失效处理
//                 ds.liClass = 'my-from-item';
                if(ds.isExpired === 'true'){
                    ds.liClass = 'disabled';
                    ds.date = '已失效';
                    ds.ticketRule = '';
                }
                arr.push(TPL_FROM.format(ds));
            }
            $fromContainer.empty().append(arr.join(''));
            isFromFootShow = true;
            isFromFootShow && $myFromFoot.show();
        },{openId:M.Data.OPEN_ID, code:M.Data.CODE});
    }

    function addBindAccount(isBind){
        $('.tip').remove();
        var  ygTpl =  '<div class="tip"><i></i><p data-event-name="{0}">{1}</p></div>',
             domStr =  isBind ? ygTpl.format('to-bind','已绑定账号，打开/下载<strong data-event-name="to-app">苏宁易购客户端</strong>去购物。') : ygTpl.format('to-bind','绑定苏宁易购账号，快速使用红包。');

        //加入相应位置
        $fromContext.prepend(domStr);
    }

    function addBtn(dom,data){
        var btn =  TPL_BUTTON.format(data);
        dom ? dom.append(btn) : $path.append(btn);
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
    	$H.hideShareBtn(true);
    }

    /**
     * 运行接口
     */
    $(function(){
        preCreate();
        create();
    })
})(Zepto, HB);


