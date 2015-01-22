/**
 *  公共
 * @author 14033219
 */
(function(M){
    var Cmp = M.Component;

    var ErrorNet = Cmp.extend({
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

        render: function(){
            this.renderTo.prepend(this.dom);
        }
    });
    M.ErrorNet = function(options){
        return new  ErrorNet(options);
    };
})(window.Wap);

