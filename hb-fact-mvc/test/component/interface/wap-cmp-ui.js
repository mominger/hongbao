/**
 * UI组件接口
 */
//define(function(require, exports, module) {
//    var Cmp = require('wap-cmp');

//    var viewOptions = ['root','renderTo', 'TPL'];
    var UIComponent =  Component.extend({
        root:'',
        renderTo: '',
        TPL: '',
        ClassName: 'UIComponent',
        init: function(){
            this.renderTo = $(this.renderTo);
        },
        render: function(){
            //判断，如果有renderTo，自动加入容器里
//            console.info(this.ClassName);

            if(this.renderTo) $(this.renderTo).append(this.dom);

        }
    });

/*UIComponent.prototype = {
    init: function(){

    },
    initEvent: function(){

    },
    render: function(){
        console.info(2);
    },
    afterRender:function(){}
}*/
/*    return function(o){
        return new UIComponent(o);
    }*/

    /*var UIComponent = function (options) {
        ClassName: 'UIComponent',

        //配置属性
         options || (options = {});
         _w.extend(this, _w.pick(options, viewOptions));
    };

    UIComponent.prototype = {
        initEvent:function(){
            this.dom = $(this.TPL);
        },
        render: function(){
            if(this.renderTo && this.dom) this.renderTo.append(this.dom);
        },
        afterRender:function(){}
    }

    UIComponent.extend = _w.extendClass;

    return function(options){
        return new UIComponent(options);
    }*/
//});

/**
 * 代理 $.append()添加DOM的方法
 */

