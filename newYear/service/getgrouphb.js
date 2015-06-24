/**
 * 常量类:  只需允许提供常量配置。不允许提供任何动态(方法）功能。
 * 常量的继承方式：是父类覆盖子类，因为常量，不应也不能发生继承上的重写
 */
(function(Wap, M, W){
    var base = Wap.Const;

    M.Const =  $.extend({

        /**
         * 状态
         */
        STATUS: {
            '1':{
                id: 1,
                rootClass: 'my-hbs',
                smallDesc: '好友一起领优惠劵吧！',
                btnDesc: '好友领优惠劵',
                isShareHBs: false
            },
            '2': {
                id:2,
                rootClass: 'u-hbs-end',
                smallDesc: '和小伙伴一起分享吧！',
                smallDesc2: '赶快将苏宁易购优惠券的好消息告诉小伙伴，',
                btnDesc: '分享给小伙伴',
                isShareHBs: true
            },
            '3':{
                id:3,
                rootClass: 'remain-hbs',
                smallDesc: '继续邀请好友！',
                btnDesc: '继续邀请好友',
                isShareHBs: false
            },
            '4':{
                id:4/*,
                 rootClass: 'active-end',
                 smallDesc: '去购物，更多惊喜活动等你参加',
                 bigDesc: '活动已结束',
                 btnDesc: '关注苏宁易购',
                 shareClass:'data-focus-sn',
                 isShareHBs: true*/
            },
            '5':{
                id:5,
                rootClass: 'hbs-over',
                smallDesc: '关注官方微信，不再让优惠劵悄悄溜走',
                btnDesc: '关注苏宁易购',
                shareClass:'data-focus-sn',
                isShareHBs: true
            },
            '6':{
                id:6,
                rootClass: 'active-no-begin',
                smallDesc: '关注官方微信，不让优惠劵悄悄溜走',
                btnDesc: '关注苏宁易购',
                shareClass:'data-focus-sn',
                isShareHBs: true
            }
        }
    },base);

})(window.Wap, window.HB = window.HB || {},window);

/**
 * Dao 类
 */
(function(Wap, M, W){
    var base = Wap.Dao;
    var Const = M.Const;
    var Ext = M.Ext;

    M.Dao = $.extend({},base,{
        /*queGroupHB: function(data){
         return this.req(data,Const.QUE_GROUP_HB);
         },*/
        /**
         *  查询分享信息
         */
        queShareInfo: function(data){
            return this.req(data,Const.QUE_SHARE_INFO);
        }
    });

})(window.Wap, window.HB,window);

/*群红包*/
(function(Wap, M, W){
//    var WeChat = M.WeChat();
    var InviteFriends = M.InviteFriends;
    var ActiveEnd = M.ActiveEnd;

    var GetGrouphb = Wap.Service.extend({
        ClassName: 'getgrouphb',

        /**
         * 模板渲染中心
         */
        tpls: {
            'gethbs': 'reqGroupHB renderGroupHB none1',  //可以加errorGroupHB处理链异常
            'none1': 'reqShareInfo renderShareInfo'
        },

        /**
         * 事件分发中心
         */
        events:{
            "click share-btn document": 'shareBtnHandler'       //蒙板采用tap会出现透视情况
        },

        /**
         * 初始化参数等
         */
        init: function(){
//            this.root = $('.get-hbs');
        },

        //请求群红包数据  对应模板配置中心的请求
        reqGroupHB: function(){
            var data =  this.Const.STATUS[this.URL_PARAM.activityFlag];
            data && (data.resData = this.URL_PARAM);
            window.OPEN_ID = this.URL_PARAM.openId;
            return data;
        },

        //渲染群红包   对应模板配置中心的渲染， 参数 data，tplRender会自动注入进来，你看不到模板。
        renderGroupHB: function(data,tplRender){
            //解析数据源 、数据异常处理
            if(!data){
               return this.Ext.tipNetError();
            }
            if(data.id == 4){

                return  ActiveEnd();
            }

            //模板渲染  TODO:不知道为什么一定要这么写，否则步步高，魅族4的微信DOM刷不出来
            var dom = tplRender(data);
            $('.get-hbs>section')[0].innerHTML = dom;
            $('.get-hbs').addClass(data.rootClass);

            //渲染后处理
            $('.get-hbs').show();
            this.Ext.show($('footer'));
        },

        /**
         * 请求分享信息
         */
        reqShareInfo: function(data){
           if(!data) return;

            //活动ID不存在，不请求数据
            var resData = data.resData;
            if(!resData.activityId) return '';

            this.shareParam = {
                activityId: resData.activityId,
                solutionId: resData.solutionId,
                type:  resData.shareInfoType,
                path: this.Const.PRO_PATH + (data.isShareHBs ? this.Const.DO_GET_GROUP_HB : this.Const.DO_GET_HB)
            };
            return this.Dao.queShareInfo({data: this.shareParam});
        },

        /**
         * 渲染分享信息
         */
        renderShareInfo: function(data){
            this.Ext.share($.extend({},this.shareParam,data));
            this.shareParam = null;
        },

        /**
         * 分享按钮事件
         */
        shareBtnHandler: function(e){
//            $(e.target).parent().hasClass('data-focus-sn') && this.Ext.toFocusSN();
            $(e.target).parent().hasClass('data-focus-sn') ? this.Ext.toFocusSN() : InviteFriends({
                status: this.currentStatus
            });
        }
    });

    new GetGrouphb();

})(window.Wap, window.HB,window);