/*群红包*/
(function(Wap, M, W){
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
            "click share-btn document": 'shareBtnHandler'
        },

        /**
         * 初始化参数等
         */
        init: function(){
            this.root = $('.get-hbs');
        },

        //请求群红包数据  对应模板配置中心的请求
        reqGroupHB: function(){
            var data =  this.Const.STATUS[this.URL_PARAM.activityFlag];
            data && (data.resData = this.URL_PARAM);
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

            //模板渲染
            var dom = tplRender(data);
            this.root.find('>section').append(dom);

            //渲染后处理
            this.root.addClass(data.rootClass).show();
        },

        /**
         * 请求分享信息
         */
        reqShareInfo: function(data){
           if(!data) return;

            var resData = data.resData;
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
            $(e.target).parent().hasClass('data-focus-sn') ? this.Ext.toFocusSN() : InviteFriends({
                status: this.currentStatus
            });
        }
    });

    new GetGrouphb();

})(window.Wap, window.HB,window);