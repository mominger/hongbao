define(function(require, exports, module) {
    var base = require('tpl');
    var Ext = require('wap-ext');

    var Tpl = $.extend({},base,{
        type:'artTemplate',

        init: function(){
            this.rule[this.artTemplate].instance.helper('getInt',Ext.getInt);
            this.rule[this.artTemplate].instance.helper('dateFormat',Ext.dateFormat);
            return this;
        },

        /**
         * 描述
         */
        desc: [
            ' <section class="item {{ dirPurse.isExpired == \'ture\' && \'disabled\'}}"> ',
            '		<div class="title"><div>{{dirPurse.activityDesc}}</div>        ',
            '		<span>{{dirPurse.receivedTime}}</span></div>                                         ',
            '		<div class="item-detail">       ',
                    '<div class="{{dirPurse.isExpired == \'ture\' ? \'detail-logo-gray\' : \'detail-logo\'}}"/>',
                        '<dl>',
                        '{{ if dirPurse.isExpired == \'ture\'}} ',
                            '已过期',
                        '{{else if dirPurse.noReceiveNum != "0"}}',
                            '<dd>已领取{{dirPurse.receiveNum}}个，还剩下<i class="a1">{{dirPurse.noReceiveNum}}</i>个</dd>',
                            '<dd><div>领取完获得{{dirPurse.reward}}元奖金红包</div></dd>',
                            '<dd><a href="#" class="hb-a-btn" id="invite-friend">继续拉好友</a></dd>',
                        '{{else}}',
                            '<dl><dd>已领完</dd><dd><div>已获得{{dirPurse.reward}}元奖金红包</div></dd> </dl>',
                        '{{/if}}',
                        '</dl>',
                    '</div>                                                                               ',
            ' </section>'
        ].join(''),

        /**
         * 好友列表
         */
        friend: [
            '<ul>',
            '{{ each friendLuckList as val i}}',
            '<li>																',
            '<img src="{{val.icon}}" onerror="this.src=\'img/nofilter/icon_111.jpg\'">        ',
            '	<dl>                                                            ',
            '		<dd>                                                        ',
            '			<p>{{val.nickName}}<i></i><span>{{val.receiveDate | dateFormat:"MM-dd hh:mm:ss"}}</span></p>               ',
            '			<p>{{val.desc}}</p>                                           ',
            '		</dd>                                                       ',
            '		<dd>                                                        ',
            '			<div>领到<i></i><em>{{val.receiveReward | getInt}}</em><i></i>元</div> ',
            '		</dd>                                                       ',
            '	</dl>                                                           ',
            '</li>                                                             ',
            '{{/each}}',
            '</ul>',
        ].join('')
    });

    return Tpl.init();
});