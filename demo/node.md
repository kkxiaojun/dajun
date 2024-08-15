# nodejs
readStream和readFile
## koa
中间件
## express
## nestjs
自动依赖注入
ioc
aop

## node做bff层
做了什么，多语言的项目，脚手架/cli

node多进程通信，Node提供了 child_process(单机Node集群) 和 cluster 模块来实现多进程以及进程管理

child_process

- child_process.spawn()：在子线程开始执行后，就开始不断将数据从子进程返回给主进程。从语法中我们可以发现与exec的一个区别是spawn是不支持callback函数的，它通过**流的方式发数据传给主进程**，从而实现了多进程之间的数据交换。适用**于返回大量数据，例如图像处理，二进制数据处理**。
- child_process.exec()：在子进程输出结果放在buffer中，在结果返回完全之后，再将输出**一次性地以回调函数参数的形式返回**。适用于**小量数据**，maxBuffer 默认值为 - 200 * 1024 超出这个默认值将会导致程序崩溃，数据量过大可采用 spawn。
- child_process.execFile()：类似 child_process.exec()，区别是不能通过 shell 来执行，不支持像 I/O 重定向和文件查找这样的行为
- child_process.fork()： 衍生新的进程，进程之间是相互独立的，每个进程都有自己的 V8 实例、内存，系统资源是有限的，不建议衍生太多的子进程出来，通长根据系统 CPU 核心数设置。

父子进程间通信：
Node父子进程之间可以通过parent.on(‘message’)和process.send()来实现通信(单机Node集群)

缺点：需要自己处理很多情况

cluster，也是使用fork实现；Node提供了 cluster 模块，该模块提供了更完善的API，除了能够实现多进程充分利用CPU资源以外，还能够帮助我们更好地进行**进程管理和处理进程的健壮性问题**

https://www.shengshunyan.xyz/2021/03/31/Node.js%E4%B8%AD%E7%9A%84%E5%A4%9A%E8%BF%9B%E7%A8%8B%E5%92%8C%E5%A4%9A%E7%BA%BF%E7%A8%8B/#%E8%BF%9B%E7%A8%8B%E5%AE%88%E6%8A%A4

## pm2（进程守护工具）
> 进程管理工具

* 进程管理；控制重启（各种异常重启，超内存、崩溃、定时）、停止
* 日志管理；log文件
* 负载均衡；pm2 start app.js -i 2（利用cpu多核）（node 提供的 cluster 模块，通过一个父进程管理一坨子进程的方式来实现集群的功能。）
* 性能监控；pm2 monit
* pm2启动进程：fork与cluster启动模式；child_process.fork（单实例, 单机node集群）与cluster（调用fork）（多实例）的区别

https://gugiegie.gitee.io/frontend/frontend/advance/nodejs.html#_7-koa%E4%B8%AD%E9%97%B4%E4%BB%B6%E5%8E%9F%E7%90%86%E4%BA%86%E8%A7%A3%E5%90%97
https://gugiegie.gitee.io/frontend/frontend/basic/write.html

https://github.com/chyingp/nodejs-learning-guide/blob/master/%E6%A8%A1%E5%9D%97/cluster.md