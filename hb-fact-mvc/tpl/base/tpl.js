/**
 * 模版基类
 * 默认支持  静态模板、数据模板、artTemplate模板
 * 数据模板不是模板， 数据池只是纯粹的数据，直接和业务关联，放到业务里。模板就是纯粹的模板，必须有HTML存在。围绕字符串--模板服务
 *         模板；操作DOM？   不，辅助操作DOM。在一定范围内操作DOM。   data-render，更改数据源，塞入DOM。  DOM，相当于VIEW层。针对DOM的变更。  render：相当于操作数据。更改DAO传回来的标准数据，进行业务匹配。
 *
 *     或者 render，协调几个TPL？  不，只会存在一个TPL。一个TPL---REQ-- TPL。
 *     静态模板：    DOM操作交给Render
 *     artTemplate： DOM操作转移给模板。  Render主要负责数据转换。辅助artTemplate完成DOM操作。它应该存在。所以放在那里。
 *     置于你将其作为渲染核心，还是作为辅助，由你使用的技术决定。
 *
 *     暂不放开独立注入模板
 */

define(function(require, exports, module) {
    var template = require('template');

     var tplConfig = ['staticTemplate','artTemplate'];
     var TPL = {
        tpl: 'staticTemplate',
        /*并行分割符*/
        parallelSplitter:',',
         /*模板: parse 模板解析方法 obj:模版对象 映射*/
         rule:{},
        startFilter: 'none',
        init: function(){
            var _this = this;
            tplConfig.forEach(function(v,i){
                var instance;
                switch(v){
                    case 'artTemplate': instance=template;break;
                    default: instance = {};
                }
                _this.rule[v] = {
                    parse: _this[['_',v,'Parse'].join('')],
                    instance: instance
                };
                _this[v]=v;
            })
            return this;
        },

        /**
         * 模板解析方法，多模板返回解析数组，单模板返回单个解析方法
         * @param tplId
         * @param type
         * @returns {*}
         */
        parse:  function(tplId,type){
                var _this = this;
                if(!tplId || tplId.startWith(this.startFilter)) return '';

                 var tplIds = tplId.split(this.parallelSplitter);

                 var tplFn = [];
                 tplIds.forEach(function(v,i){
                     tplFn.push(_this._parse(v));
                 })

                return tplIds.length > 1 ? tplFn : tplFn[0];

        },
        /**
         *  解析单个模板
         * @param tplId
         * @returns {*}
         * @private
         */
        _parse: function(tplId){
            var tpl = this[tplId] || $(tplId);
            if(!tpl) return;
            return this._adapt(tpl);
        },

         /**
         * 适配器
         */
        _adapt: function(tpl){
            /*var tplFn;
            var type = type === undefined ? this.type : type;
            switch(this.type){
                 case 0:  tplFn = this.staticTemplate;break;
                 case 1:  tplFn = this.artTemplate;break;
             }*/
//            return tplFn ? tplFn(tpl) : tpl;
             return this._adaptWith(tpl);
        },

        _adaptWith: function(tpl){
            /*var tplObj;
            var tplType;
            var fn = function(data,type){

                *//*if(tplType){
                    return tplObj ? tplObj.parse(tpl)(data) : tpl;
                }*//*
                //如果未获取过原生模板对象
                if(!tplType){
                    var type = type === undefined ? this.type : type;
                    tplObj = this.rule[type];
                }

                return tplObj ? tplObj.parse(tpl)(data) : tpl;
//                return tplFn ? tplFn(tpl)(data) : tpl;
            };
            //获取原生模板对象
            var proxyFn = $.proxy(fn,this);
            proxyFn.getTpl = $.proxy(function(type){
                tplType = type;
                tplObj = this.rule[type];
                return tplObj && tplObj.instance;
            },this);
            *//*fn.getTpl = function(type){
                tplType = type;
                tplObj = this.rule[type];
                return tplObj && tplObj.instance;
            }*//*
            return proxyFn;*/


            return $.proxy(function(data,type){
                var type = type === undefined ? this.type : type;
                var tplObj = this.rule[type];
                return tplObj ? tplObj.parse(tpl)(data) : tpl;
            },this);
        },

        /**
         *  静态模板解析
         */
        _staticTemplateParse:function(tpl){
            return function(data){
                return tpl.format(data);
            }
        },

        /**
         * artTemplate解析
         */
        _artTemplateParse: function(tpl){
//            var render = template.compile(tpl);
            /* var renderFn = function(data){
                return  template.compile(tpl)(data);
             };
            renderFn.Tpl = template; */
            return function(data){
                return  template.compile(tpl)(data);
            };
        }

    }

    return TPL.init();

});