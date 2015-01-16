/**
 *   HB 活动结束
 *   给领取群红包、子红包提供
 *   TODO: 不抽取UI 组件接口的原因是：  抽取TPL,renderTo，this.dom,并不一定能够大范围通用。 且一旦涉及请求，还需要组织一请求接口。接口过多。   让接口仅做纯粹的流程管理。
 */
define(function(require, exports, module) {
//
// var FooterExt = require('footer-ext');
     var Cmp = require('wap-cmp');

//    var $root = $('body>section');
    var options;
    var ActiveEnd = Cmp.extend({
        ClassName:"ActiveEnd",
//        root: $('body>section'),
        TPL: [
            '<ul>                                                                          ',
            '    <li>                                                                      ',
            '        <div class="big-font">活动已结束</div>                                ',
            '        <span class="small-font">去购物，更多惊喜活动等你参加</span>          ',
            '    </li>                                                                     ',
            '</ul>                                                                         ',
            '<div class="share-root">                                                      ',
            '    <div class="share-btn data-focus-sn">                                     ',
            '        <a href="javascript:void(0);" data-event="share-btn">关注苏宁易购</a> ',
            '    </div>                                                                    ',
            '</div>                                                                       '
        ].join(''),
        init: function(options){
            this.dom = $(this.TPL);
            this.root = $('body>section');
            this.renderTo = this.root.find('>section');;
//            this.renderTo = $(this.renderTo);
        },
        render: function(){
            this.renderTo.empty().append(this.dom);
        },
        afterRender: function(){
            this.root.removeClass('get-hb').addClass('get-hbs active-end');
            this.root.show();
        }

/*        init:function(){
//          this.dom = $(TPL);
        },
        render: function(){
            *//*$root.removeClass().addClass('gethbs active-end');
            $root.find('>section').empty().append(this.dom);
            return this.dom;*//*
        }*/
    })

   /* var ActiveEnd = function(options){
        function  ActiveEnd(options){
            this.renderTo = options.renderTo;
//            this.$root = $('body>section');
            this.isHBs = $('.gethbs').size() > 0;

            this.init();
            this.initEvent();
            this.render();

            return this;
        };
        InviteFriends.prototype = {
            ClassName: 'ActiveEnd',

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
                *//*3: [
                 '<li><span>赶快分享</span></li>  ',
                 '<li>小伙伴领完大红包就是你的了</li>                       ',
                 '<li class="smalldesc">(提醒：每人可领取3个群红包 10个普通红包)</li>'
                 ].join(''),*//*
                2: [
                    '<li>好东西一定要和亲爱的小伙伴</li>  ',
                    '<li><span>一起分享</span></li>                       '
                ].join('')
            },
            *//*TPL:[
             '<div class="fx-overlay">                            ',
             '<ul class="share-text">                          ',
             '<li>赶快分享给小伙伴</li>  ',
             '<li><span>1111元大红包</span>在等着你</li>                       ',
             '<li class="smalldesc">(提醒：每人可领取4个群红包 20个普通红包)</li>                       ',
             '</ul>                                            ',
             '</div>                                              '
             ].join(''),*//*
            *//* TPL:[
             '<div class="fx-overlay">                            ',
             '<ul class="share-text">                          ',
             '<li><span>赶快分享</span></li>  ',
             '<li>小伙伴领完大红包就是你的了</li>                       ',
             '<li class="smalldesc">(提醒：每人可领取4个群红包 20个普通红包)</li>',
             '</ul>                                            ',
             '</div>                                              '
             ].join(''),*//*
            *//**
             TPL:[
             '<div class="fx-overlay">                            ',
             '<ul class="share-text">                          ',
             '<li>好东西一定要和亲爱的小伙伴分享</li>  ',
             '<li><span>一起分享</span></li>                       ',
             '</ul>                                            ',
             '</div>                                              '
             ].join(''),*//*

            init:function(){
                this.dom =  $(this.TPL);
                this.dom.find('ul').append(this.TPL_WORDS[this.options.status || 1]);
            },

            initEvent: function(){
                var that = this;
                this.dom.on('click', function(e){
                    that.dom.remove();
                    that.options.remove && (that.options.remove());
                })
            },

            render: function(){
                var ops = this.options;
                ops.before && (ops.before());

                //加入body里
                $('body>section').append(this.dom);

            },
            afterRender: function(){

            }
        }
        return new  ActiveEnd(options);
    };*/
    return function(options){
//        options = options;
        return new  ActiveEnd(options);
    };
});

