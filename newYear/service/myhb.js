/**
 * 我的红包
 */
(function(Wap, M, W){
    /**
     * 常量类
     */
    M.Const = $.extend(Wap.Const,{
        /**
         * Req 常量
         */
        QUE_TO: 'mps/solutionList.do',				//查询我发的红包
        QUE_FROM: 'mps/normalList.do'         	   //查询我挣的红包

    });

    /**
     * Dao 类
     */
    M.Dao = $.extend(Wap.Dao,{
        /**
         *  查询我发的红包
         */
        queTo: function(data){
//            return this.req(data, M.Const.QUE_TO);
            return TestData.MyHB_TO;
//            return {};
        },

        /**
         *  查询我挣的红包
         */
        queFrom: function(data){
//            alert('reqFrom');
//            return this.req(data, M.Const.QUE_FROM);
            return TestData.MY_HB_FROM;
//            return {};
        }

    });


    var MyHB = Wap.Service.extend({
        ClassName: 'myhb',
        tpls: {
            'from,fromTip': 'reqFrom renderFrom',
            '!to': 'reqTo renderTo'
        },
        events:{
            "tap .detail-circle document": 'getDetailHandler',
            "tap .send-hb-btn document": 'shareBtnHandler',
            "tap #data-tab-myto document": 'toHandler',
            "tap #data-tab-myfrom document": 'fromHandler',
            "tap to-app document": 'appHandler',
            "tap to-bind document": 'bindHandler'      /*IOS下用click不触发点击事件*/
        },

        init: function(){
            this.toContainer = $('.my-to');
            this.fromContainer = $('.my-from');

            this.Tpl.register('','getInt', this.Ext.getInt);
            this.Tpl.register('','dateFormat', this.Ext.dateFormat);

//            this._changeDao();

            //屏蔽微信分享
            this.Ext.share();
        },

        reqTo: function(){
            return this.Dao.queTo({
                data:{openId:this.URL_PARAM['openId']}
//                code:this.URL_PARAM['code']
            })
        },

        renderTo: function(data,tplRender){
            if(this._nodata(data)) return;
            $.extend(data,{urlParam: this.URL_PARAM});
            this.toContainer.append(tplRender(data));
        },

        reqFrom: function(){
            return this.Dao.queFrom({
                data:{openId:this.URL_PARAM['openId']}
//                code:this.URL_PARAM['code']
            })
        },

        renderFrom: function(data,tplRender){
            if(this._nodata(data,true)) return;

            this.fromContainer.prepend(tplRender[0](data));
            this.fromContainer.prepend(tplRender[1](data));
            this.Ext.show(this.fromContainer);
            this.fromContainer.find('footer').css('display','-webkit-box');
        },

        _nodata: function(data,isFrom){
            var key,word,container,_this = this;

            if(isFrom){
                key = 'normalPurseList';
                word='赚';
                container =  this.fromContainer;
            }else{
                key =  'dirPurseList';
                word = '发';
                container =  this.toContainer;
            }
            if(!data || !data[key] || data[key].length < 1){
                M.NoData({desc: '您还没有{0}过苏宁易购优惠劵'.format(word),
                    container: container,
                    className: isFrom && 'from',
                    afterFn: function(){
                        _this.Ext.show(container);
                    }
                });
                return true;
            }
        },

        getDetailHandler: function(e){
            var $parent = $(e.target).parent();
            this.Ext.toHBDetail({dirPurseId: $parent.attr("data-detail-id"), openId: $parent.attr("data-open-id")});
        },

        shareBtnHandler: function(e){
            $(e.target).parent().hasClass('data-focus-sn') ? this.Ext.toFocusSN() : this.Ext.toGetGroupHB();
        },

        toHandler: function(e){
            this._changeTab($(e.target).parent());
            this.fromContainer.hide();
            //启动此模板链，仅启动一次
            this.allTpls['to'].once();
            this.Ext.show(this.toContainer);
        },

        fromHandler: function(e){
            this._changeTab($(e.target).parent());

            //不采用zepto的show，因为它会影响不在body下dom的fixed定位
            this.Ext.show(this.fromContainer);

            this.toContainer.hide();
        },

        _changeTab: function(dom){
            dom.addClass('cur').siblings().removeClass('cur');
        },

        appHandler: function(){
            this.Ext.toApp();
        },

        bindHandler: function(){
            this.Ext.toBuy();
        }

       /* _changeDao: function(){
            //代理DAO层
            var _this = this;
            //TODO:  代理方法可以考虑抽出来
            this.Dao.getDefError = function(){
                return _this.Ext.tipNetError({
                    after: function(){
                        //如果展示的是myfrom
                        $('section.content').css('background','#f2f2f2');
                    }
                });
            }
        }*/
    });

    new MyHB();

})(window.Wap, window.HB,window);