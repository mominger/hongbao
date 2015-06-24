/**
 *   错误处理
 * @author 14033219
 */
(function(w,M){
    M.ErrorTip = function(config){

        function  ErrorTip(config){
        	this.conf = config;
        };
        ErrorTip.prototype = {
            ClassName: 'error',

            TPL:[
                 '<section class="no-data">',
                        '<div>',
                        '<p></p>{titleStr}',
                        '<p>{desc}</p>',
                    '</div>',
				 '</section>'
            ].join(''),
            TPL_TITLE: '<p class="f18 bold">{title}</p>  ',

            init:function(){
            	var conf = this.conf,titleStr;
            	conf.title && (titleStr = titleStr.format(conf.title));
            	
                this.dom =  $(this.TPL.format({titleStr: titleStr || '', desc: conf.desc || ''}));

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
            		$H.error('hb.error.js  append error');
            	}
             },
            afterRender: function(){

            },
            destroy: function(){
            	this.dom.remove();
            }
        }
        return new  ErrorTip(config).init();
    };
})(window,  window.HB);

