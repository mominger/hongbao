/**
 * 红包详情
 * 流程编写：  const--- ext --- tpl ---dao --- service(ext  tplRender EventListener)
 */
(function(Wap, M, W){
    /**
     * 常量类
     */
    M.Const = $.extend(Wap.Const,{
        /**
         * Req 常量
         */
        QUE_HB_DETAIL: 'mps/solutionDetail.do'         //查询红包详情

    });

    /**
     * Dao 类
     */
    M.Dao = $.extend(Wap.Dao,{
        /**
         *  查询我发的红包详情
         */
        queHBDetail: function(data){
            return this.req(data, M.Const.QUE_HB_DETAIL);
//            return TestData.HB_DETAIL;
        }

    });


    var InviteFriends = M.InviteFriends;
    var HBDetail = Wap.Service.extend({
        ClassName: 'hbdtail',
        tpls: {
            'desc,friend': 'reqDetail renderDetail'
        },

        events:{
            "click #invite-friend document": 'inviteFriendHandler'     //蒙板采用tap会出现透视情况
        },

        init: function(){
            this.root = $('.content');
            this.friends = $('.friends');

            this.Tpl.register('','getInt', this.Ext.getInt);
            this.Tpl.register('','dateFormat', this.Ext.dateFormat);
        },

        reqDetail: function(){
            return this.Dao.queHBDetail({
                data:{
                    dirPurseId: this.URL_PARAM['dirPurseId'],
                    openId: this.URL_PARAM['openId']
                }
            })
        },

        renderDetail: function(data,tplRender){
            //渲染描述
            this.root.prepend(tplRender[0](data)).show();

            //渲染好友
            this.friends.append(tplRender[1](data)).show();

            //调用默认分享
            var item  = data ? data.dirPurse : {};
            this.Ext.share({
                path: M.Const.PRO_PATH + this.Const.DO_GET_HB,
                activityId: item.activityId,
                solutionId: item.dirPurseId,
                title: item.shareTitle,
                shareContent: item.shareContent,
                shareIcon: item.shareIcon
            });
        },

        inviteFriendHandler: function(){
            InviteFriends({status: 3});
        }
    });

    new HBDetail();

})(window.Wap, window.HB,window);