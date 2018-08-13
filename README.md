# yu-scroll

window或元素内滚动停止事件和滚动事件性能优化调用，不依赖任何框架，纯js

#### 使用说明

##### 监听页面或元素内滚动事件
```
 YU.scroll(
    function() {console.log('滚动');},
    document.getElementById('test')
);
```
##### 监听页面或元素内滚动停止事件
```
 YU.scrollStop(
    function() {console.log('滚动');},
    document.getElementById('test')
);
```
###### Options：
* 2个参数，依次是监听事件回调函数,监听元素;
* 若监听页面scroll/scrollStop事件,则省略第2个参数;
