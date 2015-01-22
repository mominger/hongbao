
/**
 * 组件基本接口： 仅做流程控制
 */
(function(M, _w, W){
    var viewOptions = ['ClassName'];
    var Component = M.Component = function (options) {
        ClassName: 'Component',

        //配置属性
         this.options = options || {};

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
        afterRender:function(){}
    }

    Component.extend = _w.extendClass;

})(window.Wap = window.Wap || {}, window._w,window);



