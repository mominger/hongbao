/*公共方法*/
/*读取对象的属性/方法*/

//TODO: 支持   多模板  ------   单请求  ---  多渲染？

/*
设计原则：在应该的地方，放一个应该放的地方。如果因为外部导致没有，那就放一个空。彰显它原本的存在
*/
/*(function($, M){*/
(function(root, factory) {

    // 支持AMD
    if (typeof define === 'function' && define.amd) {
        define(['jquery', 'exports'], function($, exports) {
            root.Wap = factory(root, exports, $);
        });

        // 支持commonJS.
    } else if (typeof define === 'function' && define.cmd) {
        define(function(require, exports, module) {
            require('zepto');
            require('wap-util');
            factory(root, exports, $, _w);
        });
        // Broswer Global Object
    } else {
        root.Wap = factory(root, root.Wap =  root.Wap || {}, $, _w);
    }

}(this, function(root, Wap, $, _w) {

    var ArrayProto = Array.prototype;

    var slice  = ArrayProto.slice;


    var Service = Wap.Service = function () {
        //执行初始化
        this.init.apply(this, arguments);

         //加载标配类
          this.loadHelper();

        //事件处理
        this._ensureDom();
        this._tplrender();
    };

    /*事件分割符*/
    var eventSplitter = /^(\S+)\s*(\S+)\s*(.*)$/;

    /*模板分割符*/
    var tplSplitter = /^(\S+)\s*(\S+)\s*(.*)$/;

    /*延迟标识符*/
    var delaySplitter = '!';

    /*错误标识符*/
    var errorSplitter = 'error';

    var $document = $(document);

    /*并行分割符*/
    //不建议采用并行分隔符进行多事件同时监听，我希望每一条配置都是傻瓜式，流程一幕了然的。
    //开放事件并行，是针对tab，很多人习惯采用一个事件监听
    var parallelSplitter = ',';

    Service.prototype = {
        /**
         * 对链设值的时候，应该唤醒全部链的设值。
         * 任何链都给予保存。但只开放延迟链。允许启动延迟链，也允许只启动一次延迟链
         */
        allTpls: {
            _auto:{},   /*自动处理tpl集*/
            _pipe: {}, /*等待依赖的TPLS唤醒处理。*/
            _delay: {}/*延迟处理的TPLS */
        },
        URL_PARAM:_w.getURLParam(),  /*url参数集*/
        ClassName: '',

        init: function () {
        },

        _ensureDom: function(){
            this._delegateEvents();
        },

        _delegateEvents: function (events) {
            if (!(events || (events = _w.result(this, 'events')))) return this;
            for (var key in events) {
                var method = events[key];
                if (!$.isFunction(method)) method = this[method];
                if (!method) continue;
                var match = key.match(eventSplitter);

                var container = match[3];
                //TODO: 参数过多，需要重构
                this._delegate(match[1], $.proxy(method,this), match[2],container);

            }
        },

        _delegate: function (eventName, method, selector, container) {
            var selectors = selector.split(parallelSplitter);

            if(container){
                this._delegateWithDoc(eventName, method, selectors, container);
            }else{
                this._delegateWidth(eventName, method, selectors);
            }
        },

        _delegateWithDoc: function(eventName, method, selectors, container){
            $(this._getElement(container)).on(eventName, function (e) {
                selectors.forEach(function(selet,i){
                    var plac = selet.charAt(0);
                    var isValidate = false;

                    //匹配是否有此ID class data-event等
                    if (plac == '#') {
                        isValidate = e.target.id == selet.substr(1);
                    } else if (plac == '.') {
                        isValidate = $(e.target).hasClass(selet.substr(1));
                    } else {
                        var dataset = e.target.dataset;
                        var eventName = dataset && dataset['event'];
                        isValidate = eventName == selet;
                    }

                    return isValidate && method(e);
                })
            });
        },
        _delegateWidth: function(eventName, method, selectors){
            selectors.forEach(function(selet,i){
                $(selet).on(eventName, method);
            })
        },

        /*模板渲染*/
        _tplrender : function(tpls){
            //解析模板集
            if (!(tpls || (tpls = _w.result(this, 'tpls')))) return this;
            for (var key in tpls) {
                this._tplrenderWith(key, tpls[key])
            }
        },

        _tplrenderWith: function(key, tpl){
            if(!tpl) return;
            var match = tpl.match(tplSplitter);

            //match[1]请求集  match[2]渲染集  match[3] 管道集(被依赖的模板链)
            this._tplchain(match[0],key, match[1],match[2],match[3],match[4]);
        },


        /*模板链*/
        _tplchain:function(native,id,req,render,error,pipe){
            var args = slice.call(arguments);
            req = args[2] = this[req];
            render = args[3] = this[render];

            //判断fail处理
            if(!error.startWith(errorSplitter)){
                pipe = args[5] = error;
                error = args[4] = this.defChainError;
            }else{
                error = args[4] = this[error];
            }

            //判断延迟链
            var isDelay = false;
            if(id.startWith(delaySplitter)){
                id = args[1] = id.slice(1);
                isDelay = true;
            }

            //存储模板链
            this._saveTplChain(id);

            //如果是延迟链
            if(isDelay)  return this.allTpls._delay[id]= this._chainObj('',args);

            args[5] = true;//标记当前链已执行
            if(this.allTpls._pipe[id]){
                //寻找管道链的宿主
                var chain = this.allTpls._pipe[id];
                //挂到宿主链的回调队列
                var chainHost = this.allTpls._auto[chain['host']];
                $.extend(chain,this._chainObj(this._getChain(id, chainHost.chain.then($.proxy(req,this)), render,error),args));
            }else{
                this.allTpls._auto[id] = this._chainObj(this._getChain(id, req, render,error), args);

                //备注管道链
                if(pipe){
                    this.allTpls._pipe[pipe] = {
                        host: id
                    };
                }
            }
        },

        /*获取链*/
        _getChain: function(tplId,req,render,error){
            //如果请求不存在，或非Deferred，构建空的Deferred对象。
            return this.getDeferrdReq(req).fail(error).done(this._render(tplId,render));
        },

        /**
         * 链执行
         * @param obj
         * @private
         */
        _chainExec: function(obj){
            var _this = this;

             var run = function(){
                 _this._tplrenderWith(obj['id'],obj['native']);
             };
             var once = function(){
                 !obj.isExec && run(obj);
             }

            return {
                run: run,
                once: once
            }
        },

        /**
         * 默认链异常处理,允许重写
         *   链异常处理和分层异常处理起冲突，比如dao异常，会抛出dao异常，对链来说，也应抛出异常。两者功能重叠
         * @param e
         */
        defChainError: function(e){
//            console.warn(e);
        },

        _getElement: function(element){
            var names = ['window','document'];
            return _w.hasItem(names,element) ? window[element] : element;
        },
        /**
         * @returns Deferred对象
         */
        getDeferrdReq: function(req){
            var result = $.isFunction(req) ? req.call(this) : req;
          return (result && result.done) ? result : $.when(result);
        },

        /**
         * 链标配对象
         * @private
         */
        _chainObj: function(chain,args){
            return {
                native: args[0],
                id: args[1],
                req: args[2],
                render: args[3],
                error: args[4],
                pipe: args[5],
                chain:chain,
                isExec:args[5]
            }
        },

        /**
         * 获取渲染函数
         */
        _render: function(tplId, render){
            var oldRender = render;
            var _this = this;
            var tplParse = this.tplParse;

            return function(data,name,xhr){
                render.call(_this,data,tplParse.call(_this,tplId), name, xhr);
            }
        },

        /**
         * 存储模板链
         */
        _saveTplChain: function(id,key){
            //_delay,_auto,_pipe,设值时，同步更新到allTpls,  allTpls读值时，自动读取相应JSON下的值。
            if(this._hasID(id)) return;

            var _this = this;

            //检测 allTpls，提供全局访问模板数据源的能力
            _w.defineProperty(this.allTpls,id,'',function(){
                    var obj = key ? this[key][id] : _this._hasID(id);
                    if(!obj) return console.warn('此属性'+id+' 读取不了，请检查是否被allTpls存储');

                    return _this._chainExec(obj);
            });
        },

        /**
         * 检测目标数据集里是否有此ID
         * @private
         */
        _hasID: function(id){
              var allTpls = this.allTpls;
              return allTpls['_auto'][id] || allTpls['_pipe'][id] || allTpls['_delay'][id];
        },

        /**
         * 模版解析函数,输出
         * 如果子类无this.TPL,需要子类重写此方法
         */
        tplParse: function(tplId){
           if(!tplId) return;

           return this.Tpl ? this.Tpl.parse(tplId):tplId;
        },

        /**
         * 加载标配类
         * 依赖按需加载框架提供
         **/
        loadHelper: function(){}
    }

    Service.extend = _w.extendClass;

    return Wap;
}));