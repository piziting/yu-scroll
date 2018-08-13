 var YU = YU || {};

 (function() {
     if (window.addEventListener) {
         YU.addEvent = function(el, evt, func) {
             el.addEventListener(evt, func, false);
         };
         YU.dispatchEvent = function(el, evt) {
             el.dispatchEvent(evt);
         };
         return YU;
     } else {
         YU.addEvent = function(el, evt, func) {
             el.attachEvent('on' + evt, func);
         };
         YU.dispatchEvent = function(el, evt) {
             el.fireEvent(evt);
         };
         return YU;
     }
 })();

 YU.scrollStop = function(callback, ele) {
     var obj = {
         ele: ele || document.documentElement || document.body,
         pre: 0, //上一次scrollTop值
         event: new Event('scrollStop'),
         bindEvent: function() {
             var _self = this;
             var timer;
             var scrollEle = _self.ele == document.documentElement || document.body ? window : _self.ele;
             YU.addEvent(scrollEle, 'scroll', function() {
                 //防抖：防止快速滚动时不断执行回调
                 timer && clearTimeout(timer);
                 timer = setTimeout(function() {
                     _self.stop();
                     timer = null;
                 }, 300);
                 _self.pre = _self.ele.scrollTop;
             });
             YU.addEvent(_self.ele, 'scrollStop', callback);
         },
         stop: function() {
             var _self = this;
             var m2 = _self.ele.scrollTop;
             if (m2 == _self.pre) {
                 YU.dispatchEvent(_self.ele, _self.event);
             }
         }
     }
     return obj.bindEvent();
 };