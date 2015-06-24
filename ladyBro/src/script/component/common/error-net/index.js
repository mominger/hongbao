/**
 *   默认异常： 网络异常，请稍后再试
 * @author 14033219
 */
(function(W,$,M){
    M.ErrorNet = function(options){
        function  ErrorNet(options){
            this.options =  options || {};

            this.init();
            this.initEvent();
            this.render();
            this.afterRender();
        };
        ErrorNet.prototype = {
            ClassName: 'ErrorNet',

            TPL:[
                '<section>',
                        '<section class="error-def">	',
                        '	<div></div>                 ',
                        '	<p>网络异常，请稍后再试</p> ',
                        '</section>                     ',
                '</section>'
            ].join(''),

            init:function(){
                this.dom =  $(this.TPL);
            },

            initEvent: function(){},

            render: function(){
                //加入body里
                $('body').prepend(this.dom);

            },
            afterRender: function(){}
        }
        return new  ErrorNet(options);
    };
})(window,window.jQuery || window.Zepto, window.Wap = window.Wap || {});

