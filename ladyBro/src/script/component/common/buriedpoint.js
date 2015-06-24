/**
 * @author 14033219
 */
(function(){
	/**
	 * 加载JS
	 */
	var load = function(args){
        var loadStr = '';
        args.forEach(function(v,i){
            loadStr += ['<script type="text/javascript" async="true" src="',v,'"></script>'].join('');
        })

        document.body.insertAdjacentHTML('beforeend',loadStr);
    }


	// 异步加载埋点统计JS
	window.addEventListener("load",function(){
        // 埋点的js地址,数组方式引入
        setTimeout(function(){
            load([
                "https://imgssl.suning.com/javascript/sn_da/da_opt.js"
            ]);
        },100)
	});
	
})();



