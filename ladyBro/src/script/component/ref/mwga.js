 var _gaq = _gaq || [];
 var ga_thisUrl =  document.location.href; //ga可能会重写_thisUrl的值，所以不能直接拿全局的location.href
  _gaq.push(['_setAccount', 'UA-36124205-1']);
  _gaq.push(['_trackPageview']);

	_gaq.push(['_setAllowHash', false]); 
 	_gaq.push(['_addOrganic', 'soso', 'w']);
	_gaq.push(['_addOrganic', '3721', 'name']);
 	_gaq.push(['_addOrganic', 'yodao', 'q']);
 	_gaq.push(['_addOrganic', 'vnet', 'kw']);
 	_gaq.push(['_addOrganic', 'sogou', 'query']);
 	
 	
 	if(ga_thisUrl.indexOf("SNMWPaySubmit")!=-1){
 		// 2、ga订单数据发送（下单成功页面）
 		_gaq.push(['_setVar','buyer']);
 		_gaq.push(['_trackPageview','/销售/手机web收银台页面']);
 		
 	    var totalPriceString = $("#payPrice").val();
 	    var payorderId = $("#payorderId").val();
 	    var totalPrice = (totalPriceString=="")?0:parseInt(totalPriceString);
 		_gaq.push(['_addTrans',base64encode(payorderId),'',totalPrice*10 ,'','','','','' ]);
 		
 		_gaq.push(['_trackTrans']);
 		  
 	}
  
  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl': 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();