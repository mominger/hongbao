define(function(require, exports, module) {
    var base = require('tpl');
    var Ext = require('wap-ext');

    var Tpl = $.extend({},base,{
        type:'staticTemplate',
        init: function(){
            //给模板注册函数
            this.rule[this.artTemplate].instance.helper('dateFormat',Ext.dateFormat);

            return this;
        },
        desc: [
            '<li>												  ',
            '	<div class="get-hb-desc">                         ',
            '		<em>¥</em>                                    ',
            '		<span>{rewardValue}</span>                    ',
            '		<em>元</em>                                   ',
            '		<p>领取<strong>{nickName}</strong>的红包</p> ',
            '	</div>                                            ',
            '</li>                                                '
        ].join(''),
        friend: [             /*好友列表*/
            '<div>',
            '<ul>',
            '{{ each list as val i}}',
            '<li>																',
            '<img src="{{val.icon}}" onerror="this.src=\'img/nofilter/icon_111.jpg\'">        ',
            '	<dl>                                                            ',
            '		<dd>                                                        ',
            '			<p>{{val.nickName}}<i></i><span>{{val.receiveDate | dateFormat:"MM-dd hh:mm:ss"}}</span></p>               ',
            '			<p>{{val.desc}}</p>                                           ',
            '		</dd>                                                       ',
            '		<dd>                                                        ',
            '			<div>领到<i></i><em>{{val.receiveReward}}</em><i></i>元</div> ',
            '		</dd>                                                       ',
            '	</dl>                                                           ',
            '</li>                                                             ',
            '{{/each}}',
            '</ul>',
            '</div>'
        ].join('')
    });
    return  Tpl.init();
});