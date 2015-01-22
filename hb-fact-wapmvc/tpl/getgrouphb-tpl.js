(function(Wap, M, W){
    var base = Wap.Tpl;

    M.Tpl = $.extend({
        type:'artTemplate',
        gethbs:[
            '<ul>													',
            '	<li>                                                                    ',
            '		<div class="big-font">{{bigDesc}}</div>                             ',
            '		<span class="small-font">{{smallDesc}}',
                    '{{if id == 3}}',
                        '已被好友领了<strong>{{resData.hasNum}}</strong>个<i></i>还剩<strong>{{resData.total-resData.hasNum}}</strong>个',
                    '{{/if}}',
                    '</span>                       ',
            '		{{if id == 1}}                                                      ',
            '			<div class="desc"><span>{{tipDesc}}</span></div>                ',
            '	    {{/if}}                                                             ',
            '	</li>                                                                   ',
            '{{if id == 2}}',
              '<li><p>{{midDesc1}}</p><p>{{midDesc2}}</p></li>',
              '{{else if id == 3}}',
                 '<div class="desc"><span>{{midDesc1}}</span></div>',
            '{{/if}}',
            '</ul>                                                                      ',
            '<div class="share-root">                                                   ',
            '	<div class="share-btn {{shareClass}}">                                                 ',
            '		<a href="javascript:void(0);" data-event="share-btn">{{btnDesc}}</a>',
            '	</div>                                                                  ',
            '</div>                                                                     '
        ].join('')
    },base);
})(window.Wap, window.HB,window);