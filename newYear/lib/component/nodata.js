/**
 *   错误处理
 * @author 14033219
 */
(function(Wap, M, W){
    var Cmp = Wap.Component;

    var NoData = Cmp.extend({
        ClassName: 'NoData',

        TPL:[
            '<section class="no-data {className}">',
            '<div>',
            '<p></p>{titleStr}',
            '<p>{desc}</p>',
            '</div>',
            '</section>'
        ].join(''),
        TPL_TITLE: '<p class="f18 bold">{title}</p>  ',

        init:function(ops){

            var conf = this.conf = ops || {},titleStr;
            conf.title && (titleStr = titleStr.format(conf.title));

            this.dom =  $(this.TPL.format({titleStr: titleStr || '', desc: conf.desc || '', className:conf.className}));

            this.initEvent();
            this.render();
        },

        initEvent: function(){
        },

        render: function(){
            try{
                var conf = this.conf;

                conf.beforeFn && (conf.beforeFn());

                //加入到section里
                conf.container ? conf.container.append(this.dom):
                    $('body>section').append(this.dom);

                conf.afterFn && (conf.afterFn());
            }catch(e){
                console.error('nodata.js  append error');
            }
        },
        afterRender: function(){

        },
        destroy: function(){
            this.dom.remove();
        }
    });
    M.NoData = function(options){
        return new  NoData(options);
    };
})(window.Wap, window.HB,window);
