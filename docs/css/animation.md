# animation
## requestAnimationFrame与setTimeout
1. requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机
2. CPU节能;当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停
3. 函数节流;高频率事件(resize,scroll等)