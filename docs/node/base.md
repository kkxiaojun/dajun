## koa2 和 express

1. express 是大而全有路由等，koa2 小而精通过中间件
2. koa2 能使用 async await，express 不能
3. koa2 有洋葱模型和 context 上下文，express 没有

## 中间件机制和洋葱模型

中间件原理：

koa 把很多 async 函数组成一个处理链，每个 async 函数都可以做一些自己的事情，然后用 await next() 来调用下一个 async 函数。我们把每个 async 函数称为 middleware，这些 middleware 可以组合起来，完成很多有用的功能。

实现一个 koa 框架需要实现四个大模块，分别是：

1. 封装 node http server、创建 Koa 类构造函数

2. 构造 request、response、context 对象

3. 中间件机制和剥洋葱模型（compose）的实现

4. 错误捕获和错误处理

https://juejin.cn/post/6844903709592256525#heading-8

原理：compose([fn1,fn2,fn3..]) 转成 fn1(fn2(fn3()))

koa 中间件的实现

```javascript
function log(ctx) {
  console.log(ctx.method, ctx.header.host + ctx.url)
}
module.exports = function() {
  return async function(ctx, next) {
    log(ctx)
    await next()
  }
}
```

## 实现一个函数 compose([fn1,fn2,fn3..]) 转成 fn1(fn2(fn3()))

函数式实现

```javascript
function compose(...funcs) {
  const len = funcs.length
  if (len === 0) {
    return (arg) => arg
  }
  if (len === 1) {
    return funcs[0]
  }
  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

面向过程实现：

```javascript
const compose = function(...args) {
  let length = args.length
  let count = length - 1
  let result
  return function f1(...arg1) {
    result = args[count].apply(this, arg1)
    if (count <= 0) {
      count = length - 1
      return result
    }
    count--
    return f1.call(null, result)
  }
}
```

## koa2 和 egg 的区别

- egg 是在 koa2 上的封装
- egg 有 controller，service，router
- egg 约定了文件目录结构

## TypeScript

- 接口;对值所具有的结构进行类型检查
- 枚举;定义一些带名字的常量
- 泛型;使用泛型来创建可重用的组件，一个组件可以支持多种类型的数据

## NODE.js 流

Node.js 的 stream 模块 提供了构建所有流 API 的基础。 所有的流都是 EventEmitter 的实例

相对于使用其他的数据处理方法，流基本上提供了两个主要优点：

1. 内存效率: 无需加载大量的数据到内存中即可进行处理。
2. 时间效率: 当获得数据之后即可立即开始处理数据，这样所需的时间更少，而不必等到整个数据有效负载可用才开始。

readFile 读取整个 readStringFile 读取一小块

## 难题-面试-内存暴涨

升级配置将 2 核 4g 升级至 4 核 8g，再继续查问题

https://zhuanlan.zhihu.com/p/76250769

1. 分析火焰图：v8-profiler-node8，bluebird（生成火焰图）
2. 生成 profile，导入 devtool
3. ab 压测，给服务压力
4. 导入；Chrome 自带了分析 CPU profile 日志的工具
5. completeMany ，mongoose 出问题

## 如何分析内存泄漏

内存泄漏的几种情况：

1. 全局变量
2. 闭包
3. 事件监听（Node.js 的事件监听也可能出现的内存泄漏。例如对同一个事件重复监听，忘记移除（removeListener），将造成内存泄漏。这种情况很容易在复用对象上添加事件时出现）

分析：
将 `heapdump` 引入代码中，使用 `heapdump.writeSnapshot` 就可以打印内存快照了了。为了减少正常变量的干扰，可以在打印内存快照之前会调用主动释放内存的 gc() 函数（启动时加上 --expose-gc 参数即可开启）

通过内存快照找到数量不断增加的对象，找到增加对象是被谁给引用，找到问题代码

https://zhuanlan.zhihu.com/p/25736931

## 鉴权

## session 鉴权机制

用户信息存放于服务端的 session 中，客户端 cookie 中存储 session id，每次请求会带上 cookie，从而服务端可以通过 session id 获取服务端 session 的用户信息，从而进行验证。

## token 鉴权机制

http 请求需要手动传输 token （正确登录后给予的令牌），服务端根据 token 获取用户的信息，完成鉴权

## JSON Web Token（缩写 JWT）

服务器认证以后，生成一个 JSON 对象，发回给用户，就像下面这样：

```javascript
eyJhbGciOiJIUzI1NiJ9
  .eyJkYXRhIjoiSlRKbnN2ZXZsSWxSbUZYOVU1UWxEUVc5L3M2Tnd5Mmd6OG1jWCtmMUR4d2k5OXgwNWRudEJPOHdEdCtEZ0JNdHhHUUR0UXd5ZHBvY0FmQTJ2aWF6aFBLSEVCVHBRTFVFVW1TcTVza29KZFpoSFZ0QXdLMmg3NzJWSUhMK3d5VHlld0pCbVdBQXVkS1NUNWZZcW5lRkNlS05MczN4ZFVBbkh2YmNaWUk4VWp3eDRkOHVPNmVjRC84YWxmdFB2NXdXQS9ncCttS2ZNQS9XVFdEb3J4Sjdhdz09IiwiZXhwIjoxNjMwODQxNTM4fQ
  .XPqZWHFgaFQp_0pW1Z4a2 - GMTJmMeiaJOqJllNZlrXM
```

以后，用户与服务端通信的时候，都要发回这个 JSON 对象。服务器完全只靠这个对象认定用户身份。为了防止用户篡改数据，服务器在生成这个对象的时候，会加上签名

JWT 的三个部分依次如下:

1. Header（头部）
2. Payload（负载）
3. Signature（签名）

## OAuth 2.0

参考微信授权

1. 第三方发起微信授权登录请求，微信用户允许授权第三方应用后，微信会拉起应用或重定向到第三方网站，并且带上授权临时票据 code 参数；

2. 通过 code 参数加上 AppID 和 AppSecret 等，通过 API 换取 access_token；

3. 通过 access_token 进行接口调用，获取用户基本数据资源或帮助用户实现基本操作

https://zhuanlan.zhihu.com/p/25736931

**code的作用**
出于安全原因。
1. 服务器生成的临时Authorization Code必须是一次有效
2. 获取access_token，这样access_token就不用放在url返回

## 微前端

生命周期：
获取子应用入口（boostrap、mount、unmount）

qiankun2.0 以组件的方式使用微应用`loadMicroApp`

沙箱实现原理

1. genSandbox 内部的沙箱主要是通过是否支持 window.Proxy 分为 LegacySandbox 和 SnapshotSandbox 两种

2. LegacySandbox 的沙箱隔离是通过激活沙箱时还原子应用状态，卸载时还原主应用状态（子应用挂载前的全局状态）实现的

3. ProxySandbox 是一种新的沙箱模式，目前用于多实例模式的状态隔离。完全隔离了对 window 对象的操作，也解决了快照模式中子应用运行期间仍然会对 window 造成污染的问题。

4. SnapshotSandbox 的沙箱环境主要是通过激活时记录 window 状态快照，在关闭时通过快照还原 window 对象来实现的。

## webpack5

> Webpack5 模块联邦让 Webpack 达到了线上 Runtime 的效果，让代码直接在项目间利用 CDN 直接共享，不再需要本地安装 Npm 包、构建再发布了！

`Federated Module`

`Module Federation` 使 JavaScript 应用得以从另一个 JavaScript 应用中动态地加载代码 —— 同时共享依赖

## vue3

1. Vue Composition API 围绕一个新的组件选项 setup 而创建。setup() 为 Vue 组件提供了状态、计算值、watcher 和生命周期钩子。
2. 响应式原理;proxy
   3 diff 改进;vue3 新增了静态标记（patchflag）与上次虚拟节点对比时，只对比带有 patch flag 的节点（动态数据所在的节点）；可通过 flag 信息得知当前节点要对比的具体内容

## 端到端测试

https://vue3js.cn/docs/zh/guide/testing.html#%E6%8E%A8%E8%8D%90-2

`Puppeteer`

`TestCafe`

## SSR

https://ssr.vuejs.org/zh/guide/data.html#%E6%95%B0%E6%8D%AE%E9%A2%84%E5%8F%96%E5%AD%98%E5%82%A8%E5%AE%B9%E5%99%A8-data-store

优化实践：
https://zhuanlan.zhihu.com/p/338475340

https://blog.csdn.net/vivo_tech/article/details/111476114

## 异常捕获

常见异常类型：

- JS 语法错误
- AJAX 请求异常
- 静态资源加载异常
- Promise 异常
- 跨域 script error
- 崩溃和卡顿

处理方式：

1. `try catch`，只能捕获同步异常，不能捕获语法错误
2. `window.onerror`, 异步，`uncaughtException node`
3. `window.addEventListener`,资源异常
4. `unhandledrejection`, promise 异常

https://juejin.cn/post/6844903709323837454
https://juejin.cn/post/6844903953319067655

## 项目简述

牛人总结：https://cloud.tencent.com/developer/article/1624658

面试总结（项目细节被忽略掉了，该打）

1. 自己讲海报项目时，没有讲出

   背景、遇到的具体代码层面的问题、html2canvas 为什么不用怎么解决；解决方案：重新组织语言，并且输出文档

html2canvas 的问题：

1. 跨域（useCORS:true）
2. html2canvas 触发时重新加载页面的所有静态资源（除 js）
3. text-shadow 不生效，html2canvas 库确实解析了阴影样式，但是并没有绘制，只是当做变量存起来了。
4. transform 的 rotate

问项目的技术难点：
html2canvans 源码层面：解决问题

1. html2canvas 确实处理了 text-shadow，但是没有正确的处理小数，导致最后文本阴影没有显示出来
2. underline 太细，html2canvas 使用的是固定值，而不是跟随文本样式变化而变化；添加了 lineWidth 变量，设置为文本的 1/10，大小基本合适，可以按照现实显示的情况进行调整

https://blog.csdn.net/SDUST_JSJ/article/details/78122610

quill 编辑器，自定义功能，解决问题，定义行高，定义 link

https://juejin.cn/post/6844903841587019789

https://blog.csdn.net/weixin_43873114/article/details/103883515

大文件上传 node.js
https://mp.weixin.qq.com/s/mkE741COF6BvTlcl3dqemg
https://juejin.cn/post/6844904046436843527

pupteer 的优点：

1. 无兼容性问题
2. 不依赖环境
3. 服务端生成，做缓存，cdn，redis

脚手架：具像化

1. 基础配置有什么；合并 webpack 配置；提供模板
2. 基本内容有什么；微信 jssdk，适配方案，react，vue，移动端，
3. 怎么写一个脚手架；

微前端：

沙箱原理

qiankun 基本过程

商城类：长列表渲染，虚拟列表

优化：dom 层，懒加载

vue 层：数据静态化（beforeCreated 里，不放在 data），curlist 动态化

### 海报项目背景

1. 用户端分享海报，家长和学员进行转介绍，带来流量和例子

项目问题：

1. 代码复用性；Node 端统一处理，无须重复编码

初始方案存在的问题：`html2canvas`

1. 跨域（useCORS:true）; nginx proxypass， base64，proxy 配置
2. text-shadow 不生效，（看源码）html2canvas 确实处理了 text-shadow，但是没有正确的处理小数，导致最后文本阴影没有显示出来
3. transform 的 rotate
4. underline 太细; (看源码)html2canvas 使用的是固定值，而不是跟随文本样式变化而变化；lineWidth 变量，设置为文本的 1/10，大小基本合适

寻找另外的解决方案：
`pupteer`
生成页面的屏幕截图或 pdf

自动化提交表单、模拟键盘输入、自动化单元测试等

1. 无兼容性问题
2. 不依赖环境
3. 服务端生成，做缓存，cdn，redis（原因：内存数据库，做缓存）mongoDB，存储在磁盘上

借助 Node.js 库 Puppeteer 的截屏功能（PuppeteerProvider.snapshot），使用方只需传入海报图片的 html，海报渲染服务绘制一张对应的图片作为返回结果。一个绘制请求时，首先看之前是否已经绘制过相同的海报了，如果绘制过，就直接从 Redis 里取出海报图片的 CDN 地址。如果海报未曾绘制过，则先调用 HeadlessChrome 来绘制海报，绘制完后上传到 CDN，最后 CDN 上传完后返回 CDN 地址

优化点(内存、CPU)：

1. Chromium 启动项；

```javascript

'–disable-gpu'
,
'–disable-dev-shm-usage'
,
'–disable-setuid-sandbox'
,
'–no-first-run'
,

'–no-sandbox'
,

'–no-zygote'
,

'–single-process
```

2. 执行流程，最开始我们是每次绘制都会用单独一个浏览器，也就是一对一，这个在压测的时候发现 CPU 和内存飙升，最后我们改用了复用浏览器标签的方式，每次绘制新建一个标签来绘制。

3. 刷新机制，刷新浏览器实例；防止在某些特殊情况不能关闭掉浏览器，导致内存无法释放的情况。

### 微前端项目

背景：因为历史原因，每个业务都是独立的，都有一个 html 入口，所以当用户在这个大平台上使用这十多个业务的时候，每当切换系统时，页面都会刷新，体验很差；在开发层面，这十多个业务又有太多共同之处，每次修改成本都很高。

各微应用（OA 系统、CRM 系统、CMS 系统、直播后台、...）之间独立，没有统一的访问入口和配置管理，各应用之间隔离，数据通信麻烦；开发体验不好；

https://juejin.cn/post/6844903943873675271

整体流程：

1. 加载子应用资源
2. 执行 render 插入 dom
3. createSandboxContainer
4. 创建生命周期
5. 执行子应用脚本，获取自应用入口（boostrap、mount、unmout）挂在windows上面
6. 导出生命周期到 single-spa

子应用接入：

1. webpack.config 配置 output umd
2. devServer，Access-control-Allow-Origin，disableHostCheck
3. nginx，Acccess-Control-Allow-Origin，Access-Control-Allow-Credentials
4. src 目录新增*webpack_public_path* = window._INJECTED_PUBLIC_PATH_BY_QIANKUN_

优化点：
`System.js`

1. 一次引入所有 CDN 资源，可能子项目 A 用得到这些，但子项目 B 用不到这些，而我只访问了子项目 B 而已，这样不就多加载了无用的资源?
   systemjs 只是在加载 index.html 时注册了这些 CDN 地址，不会直接去加载，当子项目里用到的时候，systemjs 会接管模块引入，systemjs 会去上面注册的 map 中查找匹配的模块，就再动态去加载资源。这样就避免了不同子项目在这套架构下产生的多余加载。

看 systemjs 源码会发现它重新定义了 require 和 define 方法，所以它能接管 externals 的外部引入过程。

2. 父应用和子应用的样式隔离 sandbox: { strictStyleIsolation?: boolean }；样式隔离（约定，第三方库用 less-loader：modifyVars，修改前缀）

3. 如何保障原来的应用运行正常？window.\__POWERED_BY_QIANKUN_

不足：

1. 因为多个 vue 实例在同一个 document 里，需要避免全局变量污染、全局监听污染、样式污染等，需要制定接入规范。
2. 使用了 external 抽离公共模块(比如 Vue、Vue-router 等)后，构造函数(或者 Class)的污染也需要避免，比如 Vue.mixin、Vue.components、Vue.use 等等都需要做一些额外的工作去避免它们产生冲突。
3. 样式隔离（约定，第三方库用 less-loader：modifyVars，修改前缀）；shadow dom（封装，一个隐藏的、独立的 DOM 附加到一个元素上）；

沙箱实现原理：页面上多个子应用会造成 全局变量等 Js 冲突，Css&DOM 冲突：样式文件相互影响

1. genSandbox 内部的沙箱主要是通过是否支持 window.Proxy 分为 LegacySandbox 和 SnapshotSandbox 两种

2. LegacySandbox 的沙箱隔离是通过激活沙箱时还原子应用状态，卸载时还原主应用状态（子应用挂载前的全局状态）实现的

3. ProxySandbox 是一种新的沙箱模式，目前用于多实例模式的状态隔离。完全隔离了对 window 对象的操作，也解决了快照模式中子应用运行期间仍然会对 window 造成污染的问题。

4. SnapshotSandbox 的沙箱环境主要是通过激活时记录 window 状态快照，在关闭时通过快照还原 window 对象来实现的。

### SSR

https://zhuanlan.zhihu.com/p/338475340

基本原理介绍：

1. `entry-client.js`;客户端 entry 只需创建应用程序，并且将其挂载到 DOM 中
2. `entry-server.js`;服务器 entry 使用 default export 导出函数，并在每次渲染中重复调用此函数。
3. 数据预取和状态（只有 beforeCreate 和 created 会在服务器端渲染 (SSR) 过程中被调用）；在 entry-server.js 中，我们可以通过路由获得与 router.getMatchedComponents() 相匹配的组件，如果组件暴露出 asyncData，我们就调用这个方法。然后我们需要将解析完成的状态，附加到渲染上下文(render context)中。

**优化**

原因：

1. SPA 会把所有 JS 整体打包，无法忽视的问题就是文件太大，导致渲染前等待很长时间。特别是网速差的时候，让用户等待白屏结束并非一个很好的体验。
2. 更好的搜索引擎优化(SEO)

方案：Vue 官方推荐的 Nuxt.js 框架

个实践过程中，主要遇到的一些挑战：

性能：如何进行性能优化，提升(每秒查询率)，节约服务器资源?

创建组件实例和虚拟 DOM 节点的开销，与基于字符串拼接的模板引擎的性能相差很大，在高并发情况下，服务器响应会变慢，极大的影响用户体验，因此必须进行性能优化。

1. 页面缓存： 在创建 render 实例时利用 LRU-Cache 来缓存渲染好的 html，当再有请求访问该页面时，直接将缓存中的 html 字符串返回；
2. 根目录创建 serverMiddleware/pageCache.js
3. 组件缓存： 将渲染后的组件 DOM 存入缓存，定时刷新，有效期内取缓存中 DOM。主要适用于重复使用的组件，多用于列表，例如商品列表

`nuxt.config.js`

```javascript
const LRU = require('lru-cache')
module.exports = {
  render: {
    bundleRenderer: {
      cache: LRU({
        max: 1000, // 最大的缓存个数
        maxAge: 1000 * 60 * 5, // 缓存5分钟
      }),
    },
  },
}
```

缓存组件增加 name 及 serverCacheKey 作为唯一键值：

```javascript
export default {
  name: 'productList',
  props: ['productId'],
  serverCacheKey: (props) => props.productId,
}
```

容灾：如何做好容灾处理，实现自动降级？

1. Node 服务器上启动一个服务，用来监测 Node 进程的 CPU 和内存使用率（io.sockets 监听事件，os-utils 获取数据），设定一个阈值，当达到这个阈值时，停止 SSR，直接将 CSR 的入口文件 index.html 返回，实现降级。
2. 单次访问，nginx 降级配置；

```javascript
  location / {
      proxy_pass Node服务器地址;
      proxy_intercept_errors on;
      error_page 408 500 501 502 503 504 =200 @spa_page;
  }

  location @spa_page {
      rewrite ^/*  /spa/200.html break;
      proxy_pass  静态服务器;
  }
```

3. 指定渲染方式；在 url 中增加参数 isCsr=true，Nginx 层对参数 isCsr 进行拦截，如果带上该参数，指向 CSR，否则指向 SSR；这样就可以通过 url 参数配置来进行页面分流，减轻 Node 服务器压力。

日志：如何接入日志，方便问题定位？

日志组件基于 log4js 封装，对接公司的日志中心

监控：如何对 Node 服务进行监控？
`Easy-Monitor`

部署：如何打通公司 CI/CD 流程，实现自动化部署？

基于公司的 CI/CD，我们实现了 Docker 部署和 Shell 脚本部署两种自动化部署方案。

### 工程化方面

1. 埋点 SDK
2. 异常上报、监控 sentry
3. jenkins gitlab webhook 构建
4. npm 私库和 npm 发包流程 verdaccio
5. vuepress 知识库

重点：性能优化（h5、ssr）、前端监控（sentry）
