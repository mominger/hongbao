
/**
 * 组件基本接口： 仅做流程控制
 */
/*define(function(require, exports, module) {
    require('wap-util');*/

//    var viewOptions = ['ClassName'];
//['ClassName'];
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

    Component.prototype = {
        ClassName: 'Component',
        init:function(){},
        initEvent:function(){},
        render: function(){
            console.info(this.ClassName);
        },
        afterRender:function(){}
    }

    Component.extend = _w.extendClass;

/*    return Component;
})*/;
