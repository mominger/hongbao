/**
 *   header
 *   自启动组件
 */
(function(Wap, M, W){
    var Const = Wap.Const;
    var Ext = Wap.Ext;

    var Cmp = Wap.Component;

    var Header = Cmp.extend({
        ClassName:"Header",

        TPL_GET_HBS:  '<div class="focus-sn"><a data-event="focus-sn" href="javascript:void(0);">关注苏宁易购</a></div><div class="active-rlue"></div>',
        TPL_GET_HB: '<div class="active-rlue"></div>',

        init: function(options){
            this.renderTo =  $('header');
//            this.isInit = false;
        },
        initEvent: function(){
            this.renderTo.on('click',function(e){
                var target = e.target;
                var $target = $(e.target);
                var eventName = target.dataset && target.dataset['event'];

                if($target.hasClass('active-rlue')){
                    location.href = Const.ACTIVE_RULE;
                }else{
                    switch(eventName){
                        case 'focus-sn': Ext.toFocusSN();break;
                    }
                }

                return false;
            });
        },

        render: function(){
            this.renderTo.append(this._getTpl());
        },

        /**
         * @returns dom tpl
         * @private 获取模板
         */
        _getTpl: function(){
            var tpl;
            //TODO 只能控制页面级别，不能更精细控制，除非能进行依赖管理
            if($('.get-hbs').size()>0){
                tpl =  this.TPL_GET_HBS;
            }else if($('.get-hb').size()>0){
                tpl = this.TPL_GET_HB;
            }
            return tpl;
        }
    })

    new Header();
})(window.Wap, window.HB,window);

