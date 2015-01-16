
/**
 * 组件基本接口： 仅做流程控制
 */
define(function(require, exports, module) {
    require('wap-util');

    var viewOptions = ['ClassName'];
    var Component = function () {
        ClassName: 'Component',

        //配置属性
         /*options || (options = {});
         _w.extend(this, _w.pick(options, viewOptions));*/
//         this.options = options || {};

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

    return Component;
});


var Component = function () {
    //配置属性
    /*options || (options = {});
     _w.extend(this, _w.pick(options, viewOptions));*/

    //执行初始化
    this.init.apply(this, arguments);

    //渲染流程
    this.initEvent();
    this.render();
    this.afterRender();
};


