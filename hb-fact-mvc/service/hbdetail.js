/**
 * 红包详情
 * 流程编写：  const --- dao --- ext --- tpl --- service(ext  tplRender EventListener)
 */
define(function(require, exports, module) {
    //基本库
    require('zepto');

    var Wap = require('wap-sea');
    var InviteFriends = require('invitefriends');

    var HBDetail = Wap.Service.extend({
        ClassName: 'hbdtail',
        tpls: {
            'desc,friend': 'reqDetail renderDetail'
        },

        events:{
            "click #invite-friend document": 'inviteFriendHandler'
        },

        init: function(){
            this.root = $('.content');
            this.friends = $('.friends');
        },

        reqDetail: function(){
            return this.Dao.queHBDetail({
                dirPurseId: this.URL_PARAM['dirPurseId'],
                openId: this.URL_PARAM['openId']
            })
        },

        renderDetail: function(data,tplRender){
            //渲染描述
            this.root.prepend(tplRender[0](data)).show();

            //渲染好友
            this.friends.append(tplRender[1](data)).show();
        },

        inviteFriendHandler: function(){
            InviteFriends({status: 3});
        }
    });

    new HBDetail();


    //埋点
    require.async('buriedpoint');
});