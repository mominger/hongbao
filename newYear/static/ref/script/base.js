/*
 * @author 13011924
 * Date: 14-7-8
 */
(function(w, d, M){
    var htmlToDom = function(arg){
    　  var objE = document.createElement("div");
        objE.innerHTML = arg;
       return objE.childNodes;
    };

    M.alertBox = function(opts){

        function AlertBox(opts){
            this.opts = opts || {};
            this.type = this.opts.type || "doubleBtn",
            this.title = this.opts.title || "温馨提示",
            this.cancelText = this.opts.cancelText || "取消",
            this.confirmText = this.opts.confirmText || "确定",
            this.cancel = this.opts.cancel || function(){},
            this.confirm = this.opts.confirm || function(){},
            this.callback = this.opts.callback || function(){},
            this.msg = this.opts.msg || "";

        }

        AlertBox.prototype = {
            constructor: AlertBox,
            getEl: function(supEl, el){
                return supEl.querySelector(el);
            },
            init: function(){
                var self = this ;
                self.addAlertBox();
                self.type == "mini" ? self.minEvent() : self.alertEvent();
            },
            addAlertBox: function(){
                var self = this;
                self.getMask();
                self.alertBox = htmlToDom(self.getHtml())[0] ;
                self.alertBox.style.cssText = "width:"+ parseInt(self.getPos()[0]*0.7) +"px;top:"+ parseInt(self.getPos()[2] + w.innerHeight *0.3 -self.alertBox.offsetHeight/2)+"px;margin:auto 15%;";
                /*self.getEl(d, "body").insertAdjacentHTML('beforeend', self.getHtml());*/
                self.getEl(d, "body").appendChild(self.alertBox);
/*                self.getEl(d, "body").insertAdjacentHTML('beforeend', self.getHtml());
                self.alertBox = self.getEl(d, "#alertBox") ;
                self.alertBox.style.cssText = "width:"+ parseInt(self.getPos()[0]*0.7) +"px;top:"+ parseInt(self.getPos()[2] + w.innerHeight *0.3 -self.alertBox.offsetHeight/2)+"px;margin:auto 15%;";*/

            },
            getPos: function(){
                var w = d.documentElement.offsetWidth || d.body.offsetWidth,
                    h = d.documentElement.offsetHeight || d.body.offsetHeight,
                    s = d.documentElement.scrollTop || d.body.scrollTop;
                if(w.innerHeight > h){
                    h = w.innerHeight;
                }
                return [w, h, s];
            },
            getHtml: function(){
                var html = '',
                    self = this;
                switch(self.type){
                    case "doubleBtn" :
                        html += '<div class="alert-box" id="alertBox"><div class="alert-title">'+self.title+'</div><div class="alert-msg">'+self.msg+'</div><div class="wbox">' +
                            '<a href="javascript:;" class="w-flex ybx-btn ybx-btn-d mr10"><i>'+self.cancelText+'</i></a>' +
                            '<a href="javascript:;" class="w-flex ybx-btn ybx-btn-a"><i>'+self.confirmText+'</i></a></div></div>';
                        break;
                    case "onceCancel" :
                        html += '<div class="alert-box" id="alertBox"><div class="alert-title">'+self.title+'</div><div class="alert-msg">'+self.msg+'</div><div class="wbox">' +
                            '<a href="javascript:;" class="w-flex ybx-btn ybx-btn-d mlr30">'+self.cancelText+'</a></div></div>';
                        break;
                    case "onceConfirm" :
                        html += '<div class="alert-box" id="alertBox"><div class="alert-title">'+self.title+'</div><div class="alert-msg">'+self.msg+'</div><div class="wbox">' +
                            '<a href="javascript:;" class="w-flex ybx-btn ybx-btn-a mlr30">'+self.confirmText+'</a></div></div>';
                        break;
                    case "mini" :
                        html += '<div class="alert-box alertBoxBlack" id="alertBox"><div class="alert-msg">'+self.msg+'</div></div>';
                        break;
                }
                return  html;
            },
            getMask: function(){
                var self = this,
                    arr = self.getPos(),
                    mask = d.createElement("div");
                mask.id = "tMask";
                self.getEl(d, "body").appendChild(mask);
                mask.style.cssText = "position:absolute;left:0;top:0;width:"+ arr[0] +"px;height:" + arr[1] + "px;background:rgba(0,0,0,0.3);z-index:99";
                self.type == "mini" && (mask.style.backgroundColor = "rgba(255, 255, 255, 0)");
            },
            minEvent: function(){
                var self = this;
                setTimeout(function(){
                    if (navigator.userAgent.match(/iPhone/i)) {
                        $(self.alertBox).fadeOut(500, function(){
                            self.getEl(d, "body").removeChild(self.alertBox);
                        });
                    } else{
                        self.remove(self.alertBox);
                    }
                    self.remove(self.getEl(d, "#tMask"));

                },2000);

            },
            alertEvent: function(){
                var self = this;
                if(self.alertBox){
                    var cancelBtn = self.getEl(self.alertBox, ".ybx-btn-d"),
                        confirmBtn = self.getEl(self.alertBox, ".ybx-btn-a");
                    cancelBtn && self.reset(cancelBtn, self.cancel) ;
                    confirmBtn && self.reset(confirmBtn, self.confirm);
                }
            },
            reset: function(el,type){
                var self = this;
                el.onclick = function(){
                    type(this);
                    self.remove(self.alertBox);
                    self.remove(self.getEl(d, "#tMask"));
                    self.callback && self.callback();

                };
            },
            remove:function(el){
                this.getEl(d, "body").removeChild(el);
            }
        }
        new AlertBox(opts).init();
    }
})(window, window.document, window.HB = window.HB || {});