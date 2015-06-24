/**
 * mts 项目扩展类
 * @author 14033219
 * @desc  ECMAScript, jQuery 方法扩展  
 * @ps   可以作为项目通用的扩展库
 */
(function(){
	/**
	 *  格式化:支持 动态参数/数组/json对象
	 * @desc xxx{0}xx{1} --> a,b --> xxxaxxb  或 xxx{a}xx{b} --> {a:1,b:2} --> xxx1xx2
	 * @returns
	 */
	!String.format && (String.prototype.format = function(){
		var jsonFlag = arguments.length == 1 && arguments[0] instanceof Object,
    	args = jsonFlag ? arguments[0] : arguments,
		reg = jsonFlag ? /\{(\w+)\}/g : /\{(\d+)\}/g;
    	
	    return this.replace(reg,              
	        function(m, i){
	            return args[i];
	        });
	});
	
	/**
	 * @desc 替换全部
	 * @param oldStr   String/RegExp
	 */
	String.prototype.replaceAll = function(oldStr, newStr){
		if(!RegExp.prototype.isPrototypeOf(oldStr)){
			return this.replace(new RegExp(oldStr, 'g'), newStr);
		}else{
			return this.replace(oldStr, newStr);
		}
    }
})();