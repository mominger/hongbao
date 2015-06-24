/**
 * @author 13011924
 * Date: 14-7-8
 */
(function(w, M ){
    M.method = function( method, opts ){
        function G(){}
        G.prototype = {
            constroctor: G,
            getEl: function(d, e ){
                return d.querySelectorAll(e);
            },
            inputHandle: function( opts ){
                var self = this,
                    el = opts.el,
                    cl = self.getEl( el.parentNode.parentNode, opts.closeCls )[0];
                cl.style.display = el.value.length > 0 ? "block" : "none";
                cl.onclick = function(){
                    Array.prototype.slice.call(self.getEl(this.parentNode, "input")).forEach(function(item){
                        item.value = "";
                    });
                    this.style.display = "none";
                }
            },
            yzmHandle: function(opts){
                var self = this,
                    el = opts.el,
                     n = opts.count,
                    gs = opts.grayCls;
                 el.innerHTML = "<i>" + n + "</i>重新获取";
                 el.className = el.className.trim() + " " + gs;
                el.removeEventListener("click", M.yzm, false);
                 var timeout = setInterval(function(){
                       if(n < 2){
                           clearInterval(timeout);
                           el.innerHTML = "获取验证码";
                           el.className = el.className.replace( " " + gs, "").trim();
                           el.addEventListener("click", M.yzm, false);
                       }else{
                           self.getEl(el, "i")[0].innerHTML = --n;
                       }
                 }, 1000);

            },
            passHandle: function( opts ){
                var self = this,
                    el = opts.el,
                    showCls = opts.showCls,
                    input = self.getEl( el.parentNode, "input" );
                  if(el.className.trim().indexOf(" ") < 0){
                      el.className = el.className.trim() + " " + showCls;
                      setInput(0, 6);
                  }else{
                      el.className = el.className.replace( " " + showCls, "").trim();
                      setInput(1, 4);
                  }
                //n文本框的索引，i文本框的层级
                function setInput(n, i){
                    var m = n == 0 ? n++ : n--;
                    var d= i< 5 ? "none" : "block";
                    input[n].value = input[m].value;
                    input[1].style.zIndex = i;
                    input[1].style.display= d;
                }
            }
        }
        new G()[method](opts);
    }

})(window, window.YG = window.YG|| {});
