/**
 *  公共
 * @author 14033219
 */
define(function(require, exports, module) {
    var ErrorNet = function(options){
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
                this.renderTo = $(this.options.renderTo || 'body');
                this.dom =  $(this.TPL);
            },

            initEvent: function(){},

            render: function(){
                this.renderTo.prepend(this.dom);

            },
            afterRender: function(){}
        }
        return new  ErrorNet(options);
    };
    return ErrorNet;
});

