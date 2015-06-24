/**
 *   邀请好友
 *   TODO: 后续再抽取组件渲染接口，组件流程规范等，另还需要去掉new
 *   TODO: 后续将界面的JS全部整合到我的体系里来
 *   TODO:  afterRender 是在append后，再自动调用的方法
 * @author 14033219
 */
(function(w,M){
    M.InviteFriends = function(options){
        function  InviteFriends(options){
            this.options =  options || {};
        };
        InviteFriends.prototype = {
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
            /*TPL:[
                '<div class="fx-overlay">                            ',
                '<ul class="share-text">                          ',
                '<li>赶快分享给小伙伴</li>  ',
                '<li><span>1111元大红包</span>在等着你</li>                       ',
                '<li class="smalldesc">(提醒：每人可领取4个群红包 20个普通红包)</li>                       ',
                '</ul>                                            ',
                '</div>                                              '
            ].join(''),*/
          /* TPL:[
                '<div class="fx-overlay">                            ',
                '<ul class="share-text">                          ',
                '<li><span>赶快分享</span></li>  ',
                '<li>小伙伴领完大红包就是你的了</li>                       ',
               '<li class="smalldesc">(提醒：每人可领取4个群红包 20个普通红包)</li>',
                '</ul>                                            ',
                '</div>                                              '
            ].join(''),*/
            /**
            TPL:[
                '<div class="fx-overlay">                            ',
                '<ul class="share-text">                          ',
                '<li>好东西一定要和亲爱的小伙伴分享</li>  ',
                '<li><span>一起分享</span></li>                       ',
                '</ul>                                            ',
                '</div>                                              '
            ].join(''),*/

            init:function(){
                this.dom =  $(this.TPL);
                this.dom.find('ul').append(this.TPL_WORDS[this.options.status || 1]);

                this.initEvent();
                this.render();
            },

            initEvent: function(){
            	var that = this;
            	this.dom.on(M.EVENT.CLICK, function(e){
            		that.dom.remove();
                    that.options.remove && (that.options.remove());
            	})
            },

            render: function(){
                var ops = this.options;
                ops.before && (ops.before());
                ops.after && (ops.after());

                //加入body里
                $('body>section').append(this.dom);
             },
            afterRender: function(){

            }
        }
        return new  InviteFriends(options).init();
    };
})(window,  window.HB);

