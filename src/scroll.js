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

 YU.scroll = function(callback, ele) {
     var obj = {
         ele: ele || document.documentElement || document.body,
         bindEvent: function() {
             var _self = this;

             var scrollEle = _self.ele == document.documentElement || document.body ? window : _self.ele;
             var timer;
             var isScroll;
             YU.addEvent(scrollEle, 'scroll', function() {
                 if (isScroll) return;
                 isScroll = true;

                 function scrollCallback() {
                     callback && callback();
                     isScroll = false;
                     timer = null;
                 }
                 if (!window.requestAnimationFrame) {
                     timer && cancelAnimationFrame(timer);
                     timer = requestAnimationFrame(scrollCallback);
                 } else {
                     //节流:16ms执行一次
                     timer && clearTimeout(timer);
                     timer = setTimeout(scrollCallback, 16);
                 }
             });
         }
     }
     return obj.bindEvent();
 };