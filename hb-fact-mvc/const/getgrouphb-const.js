/**
 * 常量类:  只需允许提供常量配置。不允许提供任何动态(方法）功能。
 * 常量的继承方式：是父类覆盖子类，因为常量，不应也不能发生继承上的重写
 */
define(function(require, exports, module) {
    var base = require('const');

    return $.extend({

        /**
         * 状态
         */
        STATUS: {
            '1':{
                id: 1,
                rootClass: 'my-hbs',
                smallDesc: '领到一个神秘群红包！',
                bigDesc: '恭喜您！',
                btnDesc: '邀请好友领红包',
                tipDesc: '邀请好友一起领红包',
                isShareHBs: false
            },
            '2': {
                id:2,
                rootClass: 'u-hbs-end',
                smallDesc: '好红包和小伙伴一起分享',
                bigDesc: '您的群红包已领完',
                btnDesc: '分享给小伙伴',
                midDesc1: '最高可得100元！',
                midDesc2:'(每人可领取5个群红包 15个普通红包)',
                isShareHBs: true
            },
            '3':{
                id:3,
                rootClass: 'remain-hbs',
                bigDesc: '您的神秘群红包',
                smallDesc: '',
                btnDesc: '继续邀请好友',
                midDesc1: '赶快邀请好友来领红包喔！',
                isShareHBs: false
            },
            '4':{
                id:4/*,
                rootClass: 'active-end',
                smallDesc: '去购物，更多惊喜活动等你参加',
                bigDesc: '活动已结束',
                btnDesc: '关注苏宁易购',
                shareClass:'data-focus-sn',
                isShareHBs: true*/
            },
            '5':{
                id:5,
                rootClass: 'hbs-over',
                smallDesc: '群红包已发完',
                bigDesc: '您来晚了!',
                btnDesc: '关注苏宁易购',
                shareClass:'data-focus-sn',
                isShareHBs: true
            },
            '6':{
                id:6,
                rootClass: 'active-no-begin',
                smallDesc: '活动尚未开始',
                bigDesc: '请稍候',
                btnDesc: '关注苏宁易购',
                shareClass:'data-focus-sn',
                isShareHBs: true
            }
        }
    },base);
});