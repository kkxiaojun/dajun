# 浏览器工作原理
## 进程与线程
**并发**

并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。（可以不同时）

**并行**

并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。（同时）


::: tip
进程与线程的区别？
:::

可以看看`windows`系统的任务管理器 ：

<img :src="$withBase('/image/javascript/jincheng.png')" alt="foo">

讲到线程，那么肯定也得说一下进程。本质上来说，两个名词都是 CPU **工作时间片**的一个描述。

* 进程描述了 CPU 在**运行指令及加载和保存上下文所需的时间**，放在应用上来说就代表了一个程序。
* 线程是依附于进程的，而进程中使用多线程并行处理能提升运算效率。
* 线程是进程中的更小单位，描述了执行一段指令所需的时间。

总结来说，进程和线程之间的关系：

1. 进程中的任意一线程执行出错，都会导致整个进程的崩溃。
2. 线程之间共享进程的数据
3. 当一个进程关闭之后，操作系统会回收进程所占用的内存。
4. 进程间相互隔离（解决但进程浏览器不稳定的问题）


<img :src="$withBase('/image/browser/browser.png')" alt="foo">

从图中可以看出，最新的 Chrome 浏览器包括：1 个浏览器（Browser）主进程、1 个 GPU 进程、1 个网络（NetWork）进程、多个渲染进程和多个插件进程。

下面我们来逐个分析下这几个进程的功能。

1. **浏览器进程**。主要负责界面显示、用户交互、子进程管理，同时提供存储等功能。
2. **渲染进程**。核心任务是将 HTML、CSS 和 JavaScript 转换为用户可以与之交互的网页，排版引擎 Blink 和 JavaScript 引擎 V8 都是运行在该进程中，默认情况下，Chrome 会为每个 Tab 标签创建一个渲染进程。出于安全考虑，渲染进程都是运行在**沙箱模式**（可以把沙箱看成是操作系统给进程上了一把锁，沙箱里面的程序可以运行，但是不能在你的硬盘上写入任何数据，也不能在敏感位置读取任何数据，例如你的文档和桌面）下。
3. **GPU 进程**。其实，Chrome 刚开始发布的时候是没有 GPU 进程的。而 GPU 的使用初衷是为了实现 3D CSS 的效果，只是随后网页、
Chrome 的 UI 界面都选择采用 GPU 来绘制，这使得 GPU 成为浏览器普遍的需求。最后，Chrome 在其多进程架构上也引入了 GPU 进程。
4. **网络进程**。主要负责页面的网络资源加载，之前是作为一个模块运行在浏览器进程里面的，直至最近才独立出来，成为一个单独的进程。
5. **插件进程**。主要是负责插件的运行，因插件易崩溃，所以需要通过插件进程来隔离，以保证插件进程崩溃不会对浏览器和页面造成影响。

关键词：
IPC（Inter-Process Communication）：进程间通信
SOA（Services Oriented Architecture）:面向服务的架构

解析一下：进程和线程的区别？
进程和线程的区别(顺便把Chrome为什么从单进程转成多进程架构说了一下)

知道哪些进程间通信(IPC)的方式？ (主从式、会话式、消息-邮箱机制、管道、共享内存、Unix  Domain Socket，然后跟他讲我看过 Chromium IPC 的源码，内核里面把以前的 ChannelPosix 换成了 ChannelMojo，从而达到线程安全的目的，顺便解释了下线程安全)


## 如何保证页面文件被完整送达浏览器
在网络中，一个文件通常会被拆分为很多**数据包**来进行传输，而数据包在传输过程中又有很大概率丢失或者出错。**那么如何保证页面文件能被完整地送达浏览器呢？**

**示例1: IP：把数据包送达目的主机**
<img :src="$withBase('/image/browser/IP.png')" alt="foo">

**示例2: UDP：把数据包送达目的主机**
<img :src="$withBase('/image/browser/UDP.png')" alt="foo">

**示例3: TCP：把数据包送达目的主机**
<img :src="$withBase('/image/browser/TCP.png')" alt="foo">

## requestAnimationFrame
分离图层做动画有什么好处

css3  GPU加速
will-change

## 渲染机制
<font color=red>从输入 URL 到页面渲染经历了什么？(DNS 解析过程（用了什么算法），HTML词法分析和语法分析，CSS解析， 合成图层、合成线程调用光栅化线程池，生成位图后浏览器进程间通信过程，显卡缓存与显示器的关系)</font>

浏览器的渲染机制一般分为以下几个步骤

1. 处理 HTML 并构建 DOM 树。
2. 处理 CSS 构建 CSSOM 树。
3. 将 DOM 与 CSSOM 合并成一个渲染树。
4. 根据渲染树来布局，计算每个节点的位置。
5. 调用 GPU 绘制，合成图层，显示在屏幕上。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042733.png)

在构建 CSSOM 树时，会阻塞渲染，直至 CSSOM 树构建完成。并且构建 CSSOM 树是一个十分消耗性能的过程，所以应该尽量保证层级扁平，减少过度层叠，越是具体的 CSS 选择器，执行速度越慢。

当 HTML 解析到 script 标签时，会暂停构建 DOM，完成后才会从暂停的地方重新开始。也就是说，如果你想首屏渲染的越快，就越不应该在首屏就加载 JS 文件。并且 CSS 也会影响 JS 的执行，只有当解析完样式表才会执行 JS，所以也可以认为这种情况下，CSS 也会暂停构建 DOM。

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042734.png)

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042735.png)

### Load 和 DOMContentLoaded 区别

Load 事件触发代表页面中的 DOM，CSS，JS，图片已经全部加载完毕。

DOMContentLoaded 事件触发代表初始的 HTML 被完全加载和解析，不需要等待 CSS，JS，图片加载。

### 图层

一般来说，可以把普通文档流看成一个图层。特定的属性可以生成一个新的图层。**不同的图层渲染互不影响**，所以对于某些频繁需要渲染的建议单独生成一个新图层，提高性能。**但也不能生成过多的图层，会引起反作用。**

通过以下几个常用属性可以生成新图层

- 3D 变换：`translate3d`、`translateZ`
- `will-change`
- `video`、`iframe` 标签
- 通过动画实现的 `opacity` 动画转换
- `position: fixed`

### 重绘（Repaint）和回流（Reflow）

重绘和回流是渲染步骤中的一小节，但是这两个步骤对于性能影响很大。

- 重绘是当节点需要更改外观而不会影响布局的，比如改变 `color` 就叫称为重绘
- 回流是布局或者几何属性需要改变就称为回流。

回流必定会发生重绘，重绘不一定会引发回流。回流所需的成本比重绘高的多，改变深层次的节点很可能导致父节点的一系列回流。

所以以下几个动作可能会导致性能问题：

- 改变 window 大小
- 改变字体
- 添加或删除样式
- 文字改变
- 定位或者浮动
- 盒模型

很多人不知道的是，重绘和回流其实和 Event loop 有关。

1. 当 Event loop 执行完 Microtasks 后，会判断 document 是否需要更新。因为浏览器是 60Hz 的刷新率，每 16ms 才会更新一次。
2. 然后判断是否有 `resize` 或者 `scroll` ，有的话会去触发事件，所以 `resize` 和 `scroll` 事件也是至少 16ms 才会触发一次，并且自带节流功能。
3. 判断是否触发了 media query
4. 更新动画并且发送事件
5. 判断是否有全屏操作事件
6. 执行 `requestAnimationFrame` 回调
7. 执行 `IntersectionObserver` 回调，该方法用于判断元素是否可见，可以用于懒加载上，但是兼容性不好
8. 更新界面
9. 以上就是一帧中可能会做的事情。如果在一帧中有空闲时间，就会去执行 `requestIdleCallback` 回调。

以上内容来自于 [HTML 文档](https://html.spec.whatwg.org/multipage/webappapis.html#event-loop-processing-model)

### 减少重绘和回流

- 使用 `translate` 替代 `top`

  ```html
  <div class="test"></div>
  <style>
  	.test {
  		position: absolute;
  		top: 10px;
  		width: 100px;
  		height: 100px;
  		background: red;
  	}
  </style>
  <script>
  	setTimeout(() => {
          // 引起回流
  		document.querySelector('.test').style.top = '100px'
  	}, 1000)
  </script>
  ```

- 使用 `visibility` 替换 `display: none` ，因为前者只会引起重绘，后者会引发回流（改变了布局）

- 把 DOM 离线后修改，比如：先把 DOM 给 `display:none` (有一次 Reflow)，然后你修改100次，然后再把它显示出来

- 不要把 DOM 结点的属性值放在一个循环里当成循环里的变量

  ```js
  for(let i = 0; i < 1000; i++) {
      // 获取 offsetTop 会导致回流，因为需要去获取正确的值
      console.log(document.querySelector('.test').style.offsetTop)
  }
  ```

- 不要使用 table 布局，可能很小的一个小改动会造成整个 table 的重新布局

- 动画实现的速度的选择，动画速度越快，回流次数越多，也可以选择使用 `requestAnimationFrame`

- CSS 选择符从右往左匹配查找，避免 DOM 深度过深

- 将频繁运行的动画变为图层，图层能够阻止该节点回流影响别的元素。比如对于 `video` 标签，浏览器会自动将该节点变为图层。

  ![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042737.png)