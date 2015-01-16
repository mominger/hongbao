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
         * 我挣的
         */
        from: [
            '<ul>',
                '{{ each normalPurseList as val i}}',
                '<li class="{{if val.isExpired === \'true\'}}disabled{{/if}}">														',
                '	<dl>                                                    ',
                '		<dd>',
                '{{if val.isExpired === \'true\'}}已失效',
                '{{else}}',
                '{{ if val.exchangeStatus == "1002" }}已兑换{{ else }}',
                '兑换有效期：{{val.expireTime | dateFormat:"MM-dd hh"}}前有效{{/if}}' ,
                '{{/if}}',
                '</dd>               ',
                '		<dd class="price">¥<span>{{val.purseValue | getInt}}</span><em>元</em></dd> ',
                '	</dl>                                                   ',
                '	<dl>                                                    ',
                '		<dd>来自-<span>我的',
                '{{if val.shareAccountId === val.accountId}}',
                '{{if val.rewardType == "2"}}',
                '普通',
                '{{else}}',
                '奖励',
                '{{/if}}',
                '{{else}}',
                '{{val.purseSource}}红包',
                '{{/if}}',
                '</span></dd>             ',
                '		<dd>{{val.isExpired != "true"&&ticketRule}}</dd>                         ',
                '	</dl>                                                   ',
                '</li>                                                      ',
                '{{ /each }}',
            '</ul>'
        ].join(''),

        /**
         * 我发的
         */
        to: [
            '<ul>',
            '{{ each dirPurseList as val i}}',
            ' <li class="item {{ val.isExpired == \'ture\' && \'disabled\'}}"> ',
            '	<a href="javascript:void(0);">                             ',
            '		<div class="title"><div>{{val.activityDesc}}</div>        ',
            '		<span>{{val.receivedTime}}</span></div>                                         ',
            '		<div class="item-detail" data-detail-id="{{val.dirPurseId}}" data-open-id="{{urlParam.openId}}">       ',
            '			<div class="{{val.isExpired == \'ture\' ? \'detail-logo-gray\' : \'detail-logo\'}}"/>                                      ',
                        '<dl>',
                            '{{ if val.isExpired == \'ture\'}} ',
                                '已过期',
                            '{{else if val.noReceiveNum != "0"}}',
                                '<dd>已领取{{val.receiveNum}}个，还剩下<i class="a1">{{val.noReceiveNum}}</i>个</dd>',
                                  '<dd><div>领取完获得{{val.reward}}元奖金红包</div></dd>',
                            '{{else}}',
                                '<dl><dd>已领完</dd><dd><div>已获得{{val.reward}}元奖金红包</div></dd> </dl>',
                            '{{/if}}',
                        '</dl>',
            '			<dl class="detail-circle">详情</dl>                                              ',
            '		</div>                                                                               ',
            '	</a>                                                                                     ',
            ' </li>',
            '{{ /each }}',
            '</ul>'
        ].join(''),

        /**
         * 我赚的提示
         */
        fromTip:[
            '<div class="tip"><i></i>',
                '<p data-event-name="to-bind">',
                '{{if isBindEgo == "true"}}',
                    '已绑定账号，打开/下载<strong data-event-name="to-app">苏宁易购客户端</strong>去购物。</p>',
                '{{else}}',
                    '绑定苏宁易购账号，快速使用红包。',
                '{{/if}}',
            '</div>'
        ].join('')
});
    return Tpl.init();
});