 var YU = YU || {};

 (function() {
     if (window.addEventListener) {
         YU.addEvent = function(el, evt, func) {
             el.addEventListener(evt, func, false);
         };
         return YU;
     } else {
         YU.addEvent = function(el, evt, func) {
             el.attachEvent('on' + evt, func);
         };
         return YU;
     }
 })();
 //节流
 YU.throttle = function(after, wait) {
     var timer;
     var isScroll; //是否正在执行回调
     return function() {
         if (isScroll) return; //在回调函数未执行完以前
         isScroll = true;
         timer && clearTimeout(timer);
         timer = setTimeout(function() {
             after && after();
             isScroll = false;
             timer = null;
         }, wait);
     }
 }
 //RFA
 YU.rfa = function(after) {
     var isScroll;
     return function() {
         if (isScroll) return;
         isScroll = true;
         requestAnimationFrame(function() {
             after && after();
             isScroll = false;
         });
     }
 }
 YU.scroll = function(callback, ele) {
     var obj = {
         ele: ele || document.documentElement || document.body,
         bindEvent: function() {
             var _self = this;

             var scrollEle = _self.ele == document.documentElement || document.body ? window : _self.ele;

             if (window.requestAnimationFrame) {
                 var scrollCallback = YU.rfa(callback);
             } else {
                 var scrollCallback = YU.throttle(callback, 16);
             }
             YU.addEvent(scrollEle, 'scroll', scrollCallback);
         }
     }
     return obj.bindEvent();
 };