/**
 *  公共
 * @author 14033219
 */
(function(M){
    var Cmp = M.Component;

    var ErrorNet = Cmp.extend({
        ClassName: 'ErrorNet',

        TPL:[
            '<section id="error-def">',
            '<section class="error-def">	',
            '	<div></div>                 ',
            '	<p>网络异常，请稍后再试</p> ',
            '</section>                     ',
            '</section>'
        ].join(''),

        init:function(){
            var ops = this.options;
            this.renderTo = $(ops.renderTo || 'body');
            this.afterFn =  ops.after;
            this.dom =  $(this.TPL);

            return this;
        },

        render: function(){
            this.renderTo.prepend(this.dom);
        },

        afterRender: function(){
            this.afterFn && this.afterFn();
        }
    });
    M.ErrorNet = function(options){
        return new  ErrorNet(options);
    };
})(window.Wap);

