
/**
 * 组件基本接口： 仅做流程控制
 * 组件通信采用zepto 自定义事件或.因为较少碰到需要组件通信的情况。不给组件单独支持事件机制。
 */
(function(M, _w, W){
    var viewOptions = ['ClassName'];
    var Component = M.Component = function (options) {
        ClassName: 'Component',

        //配置属性
         this.options = options || {};

        //增加自定义事件
        this._event();

        //执行初始化
        this.init.apply(this, arguments);

        //渲染流程
        this.initEvent();
        this.render();
        this.afterRender();
    };

    Component.prototype = {
        /**
         * 初始化参数等
         */
        init:function(){},

        /**
         * 初始化事件
         */
        initEvent:function(){},

        /**
         * 渲染dom
         */
        render: function(){},

        /**
         * 渲染后处理
         */
        afterRender:function(){},

        _event: function(){
            //支持事件
            var events = ['on','off','trigger'],souce = $('');
            var _this = this;
            events.filter(function(v){
                _this[v] =  souce[v];
            })
        }
    }

    Component.extend = _w.extendClass;

})(window.Wap = window.Wap || {}, window._w,window);



