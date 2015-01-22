/**
 * wap 工具类
 * TODO: 依赖jquery/zepto ?
 */
(function() {
    var root = this;
    root._w = root.waputil = {};

    var ArrayProto = Array.prototype, ObjProto = Object.prototype, FuncProto = Function.prototype;

    var push             = ArrayProto.push,
        slice            = ArrayProto.slice,
        concat           = ArrayProto.concat,
        toString         = ObjProto.toString,
        hasOwnProperty   = ObjProto.hasOwnProperty;

    var nativeForEach      = ArrayProto.forEach;

    _w.result = function(object, property) {
        if (object == null) return void 0;
        var value = object[property];
        return $.isFunction(value) ? value.call(object) : value;
    };

    _w.has = function(obj, key) {
        return hasOwnProperty.call(obj, key);
    };

    _w.each = _w.forEach = function(obj, iterator, context) {
        if (obj == null) return obj;
        if (nativeForEach && obj.forEach === nativeForEach) {
            obj.forEach(iterator, context);
        } else if (obj.length === +obj.length) {
            for (var i = 0, length = obj.length; i < length; i++) {
                if (iterator.call(context, obj[i], i, obj) === breaker) return;
            }
        } else {
            var keys = _.keys(obj);
            for (var i = 0, length = keys.length; i < length; i++) {
                if (iterator.call(context, obj[keys[i]], keys[i], obj) === breaker) return;
            }
        }
        return obj;
    };

    _w.pick = function(obj) {
        var copy = {};
        var keys = concat.apply(ArrayProto, slice.call(arguments, 1));
        _w.each(keys, function(key) {
            if (key in obj) copy[key] = obj[key];
        });
        return copy;
    };
    /**
     * 继承属性 Prop/JSON
     * 不支持深层继承
     */
    _w.extend = function(obj) {
        _w.each(slice.call(arguments, 1), function(source) {
            if (source) {
                for (var prop in source) {
                    obj[prop] = source[prop];
                }
            }
        });
        return obj;
    };

    /**
     * indexOf 远高于数组循环
     * @param arr   数组
     * @param code 匹配值
     */
    _w.hasItem = function(arr,code){
        return _w.roundStr(arr.join(','),',').indexOf(_w.roundStr(code,',')) !== -1;
    };
    /**
     *
     * @param str       字符串
     * @param symbol    符号
     * @returns {string}
     */
    _w.roundStr = function(str,symbol){
        return [symbol,str,symbol].join('');
    };

    /**
     * 获取URL参数
     * @returns {{}}
     */
    _w.getURLParam = function(){
        var search = location.search,
            reg = /[^\&]+=[^\&]+/g;

        if(!search) return {};

        //解析出锚点参数
        search = search.slice(1);

        var arr,arrs,result={};
        while(arr = reg.exec(search)){
            if(arrs = arr[0].match(/[^\=]+/g)){
                result[arrs[0]] = arrs[1];
            }
        }

        return result;
    };

    /**
     * 跳转： 只传递url，则采用location.href, 传递json，则'?A=B&A=B'拼接
     */
    _w.redirect = function(url, json){
        url ? (location.href = json ? this.addURLParam(url, json) : url) :
            location.reload();
    };
    /**
     * 给URL增加参数
     */
    _w.addURLParam = function(url, param){
        var p = param || {},
            noP = url.indexOf('?') === -1,
            tpl = '&{0}={1}',
            params = '';
        $.each(param, function(k,v){
            params += tpl.format(k,v);
        })

        noP && (params = params.replace('&','?'));

        return url+params;
    },

    /**
     *  继承类
     */
    _w.extendClass = function(protoProps, staticProps) {
        var parent = this;
        var child;

        // The constructor function for the new subclass is either defined by you
        // (the "constructor" property in your `extend` definition), or defaulted
        // by us to simply call the parent's constructor.
        if (protoProps && _w.has(protoProps, 'constructor')) {
            child = protoProps.constructor;
        } else {
            child = function(){ return parent.apply(this, arguments); };
        }

        // Add static properties to the constructor function, if supplied.
        _w.extend(child, parent, staticProps);

        // Set the prototype chain to inherit from `parent`, without calling
        // `parent`'s constructor function.
        var Surrogate = function(){ this.constructor = child; };
        Surrogate.prototype = parent.prototype;
        child.prototype = new Surrogate;

        // Add prototype properties (instance properties) to the subclass,
        // if supplied.
        if (protoProps) _w.extend(child.prototype, protoProps);

        // Set a convenience property in case the parent's prototype is needed
        // later.
        child.__super__ = parent.prototype;

        return child;
    };

    // 支持AMD
    if (typeof define === 'function' && define.amd) {
        define(['wap-util'], function($, exports) {
            return _w;
        });
        // 支持commonJS.
    }else if(typeof exports !== 'undefined'){
        exports = _;
    }

    /*else if (typeof define === 'function' && define.cmd) {
        define(function(require, exports, module) {
            return _w;
        });
    }*/


}).call(this);
