## css的加载会阻塞DOM树的解析和渲染吗
> 如果css加载不阻塞DOM树渲染的话，那么当css加载完之后，DOM树可能又得重新重绘或者回流了，这就造成了一些没有必要的损耗。
    
css的加载不会阻塞DOM树的解析，会阻塞DOM树的渲染

## 事件委托和事件冒泡

事件委托即事件代理，顾名思义，“事件代理”即是把原本需要绑定在子元素的响应事件委托给父元素，让父元素担当事件监听的职务。事件代理的原理是DOM元素的事件冒泡。

## src、href、link的区别

href(Hypertext Reference)：超文本引用，常用的标签有link、a等，用来链接引用的外部资源。在当前元素或者当前文档和由当前属性定义的需要的锚点或资源之间定义一个链接或者关系，如：
```
<link href="style.css" rel="stylesheet">
```

src(source)：引入资源，引入的src的内容是页面必不可少的一部分。引入的内容会嵌入当前资源到当前文档元素定义的位置，常用的有：img、script、iframe等。如：
```
<script src="script.js"></script>
```

link：HTML外部资源链接元素 (<link>) 规定了当前文档与外部资源的关系。

## css权重规则

1. !important关键字、内联样式
2. id 选择器
3. 类选择器、属性选择器、伪类选择器
```javascript
.demo {}
[type="text"] {}
div:hover {}
div:first-child {}
```
4. 元素和伪元素
```
::after
::before
::first-letter
::first-line
::selecton
```

## 解决css全局污染有哪些办法

### 1. CSS Modules
1. 局部作用域。css的规则都是全局的，产生局部作用域的唯一方法，就是使用一个独一无二的class名字
2. Webpack 的css-loader插件。`style-loader!css-loader?modules`后面的`modules`参数表示打开CSS Modules功能
3. css-loader默认的哈希算法是`[hash:base64]`

## session、token、JWT鉴权

## 怎么判断浏览器是否支持webp， webp优点

[https://zhuanlan.zhihu.com/p/70519620](https://zhuanlan.zhihu.com/p/70519620)

```javascript
const supportWebP = (function () {
  var canvas = typeof document === 'object' ? document.createElement('canvas') : {}
  canvas.width = canvas.height = 1
  return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false
})()
```

## Axios拦截器的原理（如何拦截fetch的请求和响应）

`request.use`把拦截器的回调，放到发送请求的promise之前，先执行。
`response.use`把拦截器的回调，放到发送请求的promise之后，后执行。

## 如何使用调试面板分析页面卡顿
https://www.cnblogs.com/imwtr/p/10428819.html#top

https://www.cnblogs.com/LuckyWinty/p/12272718.html

https://juejin.cn/post/6844903651262070791

## SPA路由的实现方式有哪些
1. `vue-router`使用Vue应用程序时，您必须设置一个配置文件（即`router.js`），然后将所有路由手动添加到该文件中。
2. `Nuxt.js vue-router`根据pages 目录中提供的Vue文件自动为您生成配置。这意味着您无需再编写路由器配置！Nuxt.js还为您提供了所有路线的自动代码拆分功能。

原理：引入了glob库对page下的文件进行遍历，跟据文件名生成 routes，webpack构建生成`routes.js`文件

## 重绘和回流的区别是什么？如何降低重绘和回流的影响

## 项目构建速度优化的通用策略

## V8下的垃圾回收机制

## Event Loop？调用堆栈和任务队列之间有什么区别

## 简述浏览器缓存策略

## H5离线包的原理

### H5离线包的原理
https://help.aliyun.com/document_detail/59594.html
我们可以先将页面需要的静态资源打包并预先加载到客户端的安装包中，当用户安装时，再将资源解压到本地存储中，当 WebView 加载某个 H5 页面时，拦截发出的所有 http 请求，查看请求的资源是否在本地存在，如果存在则直接返回资源。

### 离线包怎么更新
https://v2ex.com/t/632891

通过管理后台配置，记录所有相关离线包信息集合，版本字段更新

main 的版本比本地对应离线包的版本大时，会从离线包平台下载最新的版

### 客户端根据什么拦截静态资源请求
```javascript
{
  "version": 1,
  "items": [
    {
      "packageId": "mwbp",
      "version": 1,
      "remoteUrl": "http://122.51.132.117/js/app.67073d65.js",
      "path": "js/app.67073d65.js",
      "mimeType": "application/javascript"
    }
}
```
其中 remoteUrl 是该资源在静态资源服务器的地址，path 则是在客户端本地的相对路径（通过拦截该资源对应的服务端请求，并根据相对路径从本地命中相关资源然后返回）


https://v2ex.com/t/632891
https://ask.csdn.net/questions/6130824
## js bridge通信原理

JS 调用 Native 通信大致有三种方法：

1. 拦截 Schema（iframe.src）；缺点：调用时延比较高 200 - 400ms，在安卓上表现明显；URL scheme 长度有限,不支持同步返回结果
2. Native 注入 API 的方式；注入 JS 上下文（过 WebView 向 JS 的上下文注入对象和方法，可以让 JS 直接调用原生。）

Native to Web 接口

Native 调用 JS 一般就是直接 JS 代码字符串，有些类似我们调用 JS 中的 eval 去执行一串代码。一般有 evaluateJavascript 等几种方法 


