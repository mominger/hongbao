/**
 *   邀请好友
 *   TODO:  需要抽取成自定义组件，包含img、css，js的组件
 * @author 14033219
 */
(function(Wap, M, W){
    var Cmp = Wap.Component;

    var InviteFriends = Cmp.extend({
        ClassName: 'InviteFriends',

        TPL:[
            '<div class="fx-overlay">                            ',
            '<ul class="share-text">                          ',
            '</ul>                                            ',
            '</div>                                              '
        ].join(''),

        TPL_WORDS:{
            1: [
                '<li>分享给小伙伴<span>一起领红包</span>吧</li>  ',
                '<li class="smalldesc">(提醒：每人可领取3个群红包 8个普通红包)</li>'
            ].join(''),
            3: [
                '<li>红包当然要和小伙伴<span>一起分享</span></li>  ',
                '<li class="smalldesc">(提醒：每人可领取3个群红包 8个普通红包)</li>'
            ].join(''),
            /*3: [
             '<li><span>赶快分享</span></li>  ',
             '<li>小伙伴领完大红包就是你的了</li>                       ',
             '<li class="smalldesc">(提醒：每人可领取3个群红包 10个普通红包)</li>'
             ].join(''),*/
            2: [
                '<li>好东西一定要和亲爱的小伙伴</li>  ',
                '<li><span>一起分享</span></li>                       '
            ].join('')
        },

        init:function(){
            this.dom =  $(this.TPL);
            this.dom.find('ul').append(this.TPL_WORDS[this.options.status || 1]);
        },

        initEvent: function(){
            var that = this;

            this.dom.on('click',function(e){
                that.dom.remove();
                that.options.remove && (that.options.remove());
            });
        },

        render: function(){
            var ops = this.options;
            ops.before && (ops.before());

            //加入body里
            $('body>section').append(this.dom);

        }
    });
    M.InviteFriends = function(options){
        return new  InviteFriends(options);
    };
})(window.Wap, window.HB,window);

