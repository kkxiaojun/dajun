# 前端异常
对于前端来说，我们可做的异常捕获还真不少。总结一下，大概如下：

* JS 语法错误、代码异常
* AJAX 请求异常
* 静态资源加载异常
* Promise 异常
* Iframe 异常
* 跨域 Script error
* 崩溃和卡顿

1. try catch。只能捕获到同步的运行时错误，对语法和异步错误却无能为力
2. window.onerror。能捕获异步错误，捕获不到静态资源加载异常；（window.onerror 函数只有在返回 true 的时候，异常才不会向上抛出）
3. window.addEventListener('error')
4. promise catch
5. VUE errorHandle
6. 利用window对象的load和beforeunload事件实现了对网页崩溃的监控

# Node异常日志

异常收集：

1. API/GraphQL 层，在 API 层的最外层使用一个中间件对错误集中进行处理，并进行上报。
2. script 等非 API 层，如拉取配置，数据库迁移脚本以及计划任务等

# 