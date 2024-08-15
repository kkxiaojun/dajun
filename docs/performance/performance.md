
# 网络层
### 增加dns-prefetch
浏览器的对网站的域名DNS解析查找流程大概如下：
![](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fb0f0e3417f742bd9daa8d08c556a5f8~tplv-k3u1fbpfcp-watermark.image)
带宽大的情况下影响是比较小的，但是移动端环境下，DNS 请求带宽非常小。针对该问题，项目采取预读取DNS方案，该方案能显著降低延迟，特别是移动端。

步骤一：用 meta 信息来告知浏览器，当前页面要做 DNS 预解析：

[https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control)
```javascript
<meta http-equiv="x-dns-prefetch-control" content="on" />
```
步骤二： header 中使用 link 标签来强制对 DNS 预解析

```javascript
<link rel="dns-prefetch" href="https://company.info.com/"> 
```

`注意点`：
 dns-prefetch 仅对跨域域上的 DNS查找有效

###  CDN 分发优化
CDN 的全称是 Content Delivery Network，即内容分发网络。

用户就近获取所需内容，降低网络拥塞，提高用户访问响应速度和命中率。

CDN获取的过程：
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/124a582f74044afcae159dc53c685faf~tplv-k3u1fbpfcp-watermark.image)

使用的**缓存策略**

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5d79dab1289d42ae86d00980152d35d1~tplv-k3u1fbpfcp-watermark.image)

结合`Vue-cli`项目中的`external`属性,增加后主要提高如下：

 1. 降低服务器的压力
 2. 地理位置上更接近用户，极大提升页面资源的响应速度 
 3. 不缓存html入口文件（特别是微信浏览器o(╥﹏╥)o），只缓存js、css的策略，避免资源不更新的同时，加快了部分资源的获取速度

上线H5资源需要根据不同区域，生成不同的dns-prefetch地址

### 跨域避免 option 请求
浏览器根据请求方法和请求头的特定字段，将请求做了一下分类，具体来说规则是这样，凡是满足下面条件的属于简单请求:

1. 请求方法为 `GET`、`POST` 或者 `HEAD`
2. 请求头的取值范围: `Accept`、`Accept-Language`、`Content-Language`、`Content-Type`(只限于三个值`application/x-www-form-urlencoded`、`multipart/form-data`、`text/plain`)
浏览器画了这样一个圈，在这个圈里面的就是简单请求, 圈外面的就是非简单请求，然后针对这两种不同的请求进行不同的处理。

非简单请求都会有一个预检请求



**自定义 header 发出预检请求至少会有耗时，将延长页面绘制时间。
最终解决方案：去除自定义header，修改为简单请求，避免该请求发出预检。**

### HTTP2.0
> 超文本传输协议第 2 版，最初命名为HTTP 2.0），简称为h2（基于 TLS/1.2 或以上版本的加密连接）或h2c（非加密连接）[1]，是HTTP协议的的第二个主要版本，使用于万维网。

HTTP2.0开启方式如下：
```javascript
server { 
 listen        443 **ssl** **http2**; 
  server_name   yourdomain;
  …… 
  ssl          on**;
  ……
}
```

开启http2监听

```javascript
listen 443 ssl http2;
```
多路复用代替原有的序列以及阻塞机制，使得多个资源可以在一个连接中并行下载，不受浏览器同一域名资源请求限制，提升整站的资源加载速度。

### 设置失败请求上限
场景：当与页面相关的某个服务突然挂了的情况，请求会一直重发

项目中借助`axios`配置重发次数，解决改问题

```javascript
axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
    var config = err.config;
    // If config does not exist or the retry option is not set, reject
    if(!config || !config.retry) return Promise.reject(err);
    
    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0;
    
    // Check if we've maxed out the total number of retries
    if(config.__retryCount >= config.retry) {
        // Reject with the error
        return Promise.reject(err);
    }
    
    // Increase the retry count
    config.__retryCount += 1;
    
    // Create new promise to handle exponential backoff
    var backoff = new Promise(function(resolve) {
        setTimeout(function() {
            resolve();
        }, config.retryDelay || 1);
    });
    
    // Return the promise in which recalls axios to retry the request
    return backoff.then(function() {
        return axios(config);
    });
});
```

```javascript
axios.get('/some/endpoint', { retry: 5, retryDelay: 1000 })
    .then(function(res) {
        console.log('success', res.data);
    })
    .catch(function(err) {
        console.log('failed', err);
    });
```
参考：[https://github.com/axios/axios/issues/164](https://github.com/axios/axios/issues/164)

## 静态资源优化
### 图片懒加载
图片懒加载是一种很好的优化网页或应用的方式，它能够在用户滚动页面时自动获取更多的数据，新获取的图片不会影响到页面呈现，同时视口外的图片有可能永远不需要被加载，能够极大的节约用户流量以及服务器资源。'

懒加载的一般形式表现为：

1. 打开首页，滑动页面
2. 懒加载图片展示默认图
3. 默认图替换为真实图片

vue技术栈选择vue-lazyload 去支撑位组件的图片来加载：

* 对 vue 的原生支持，平台扩展后所有组件都可使用
* 方便快捷的指令式开发，img 标签的 src 改为 v-lazy 就可以实现图片懒加载
* 功能符合预期，支持背景图片懒加载，支持图片 url 动态修改为 webp

### 代码文件
1. 第三方方使用的公共库，可以采用cdn方式引入，减少打包后项目js的体积。项目中是结合Vue的externals
做配置;

2. `code spliting`拆包优化
```javascript
 .optimization.splitChunks({
    chunks: 'all',
    cacheGroups: {
      libs: {
        name: 'chunk-libs',
        test: /[\\/]node_modules[\\/]/,
        priority: 10,
        chunks: 'initial' // only package third parties that are initially dependent
      },
      commons: {
        name: 'chunk-commons',
        test: resolve('src/components'), // can customize your rules
        minChunks: 3, //  minimum common number
        priority: 5,
        reuseExistingChunk: true
      }
    }
  })
```
### 图片资源优化
WebP 的优势体现在它具有更优的图像数据压缩算法，能带来更小的图片体积，而且拥有肉眼识别无差异的图像质量；同时具备了无损和有损的压缩模式、Alpha 透明以及动画的特性，在 JPEG 和 PNG 上的转化效果都相当优秀、稳定和统一。

根据公司目前Vue为主的技术栈，选择vue-lazyload，主要增加了以下两点：

1. 实现一个`v-webp`指令，用于支持webp的图片
2. 支持图片 url 动态修改为 webp

webp的兼容性判断：采用的是canvas的方案
```javascript
const supportWebP = (function () {
  var canvas = typeof document === 'object' ? document.createElement('canvas') : {}
  canvas.width = canvas.height = 1
  return canvas.toDataURL ? canvas.toDataURL('image/webp').indexOf('image/webp') === 5 : false
})()
```

因为项目中是vue技术栈，所以可以写个指令`v-webp`使用指令获取图片URL
```javascript
bind: function (el, binding) {
  if (el.tagName.toLowerCase() === 'img' && el.src && el.src.indexOf('data:image') === -1 && supportWebP) {
    // 通过 src 属性获取 img 元素关联的图片地址
    var _src = el.src
    // ... 对img的后续处理
  }
}
```

## GZIP 
**Gzip**是若干种[文件压缩](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E5%8E%8B%E7%BC%A9)[程序](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BA%8F)的简称，通常指[GNU计划](https://zh.wikipedia.org/wiki/GNU%E8%A8%88%E5%8A%83)的实现，此处的gzip代表GNU zip。也经常用来表示gzip这种文件格式。


nginx中有关gzip的配置项如下：
 

1、gzip on|off：**默认off

开启或者关闭gzip模块

2、gzip_comp_level 4：**默认1，建议选择为4

gzip压缩比/压缩级别，压缩级别 1-9，级别越高压缩率越大，压缩时间越长，消耗CPU也越大。

3、gzip_min_length  1k：**默认0，不管页面多大都压缩

设置允许压缩的页面最小字节数，页面字节数从header头中的Content-Length中进行获取。

建议设置成大于1k的字节数，小于1k可能会越压越大。 即: gzip_min_length 1024

4、gzip_static on|off：**默认off

gzip_static是nginx对于静态文件的处理模块，可以读取预先压缩的gz文件，多与构建时压缩同时使用，详见下节构建时压缩介绍

5、**gzip_types** 

6、更多配置信息参考：**[Nginx的gzip](https://www.cnblogs.com/caonima-666/p/8436005.html)


目前主要讲的gzip压缩优化，就是通过gzip这个压缩程序，对资源进行压缩，从而降低请求资源的文件大小。
## 渲染
### 避免reflow
原理方面就不扯了，实践上的操作主要有：

1. 避免频繁使用 `style`，而是采用修改`class`的方式。
2. 使用`createDocumentFragment`进行批量的 `DOM` 操作。
3. 对于` resize、scroll` 等进行防抖/节流处理。
4. 添加 `will-change: tranform `，让渲染引擎为其单独实现一个图层，当这些变换发生时，仅仅只是利用合成线程去处理这些变换，而不牵扯到主线程，大大提高渲染效率。当然这个变化不限于`tranform`, 任何可以实现合成效果的 CSS 属性都能用`will-change`来声明。
### Vue优化
1. 合理使用 v-show 和 v-if，更新不是很频繁时可以使用 v-if，v-if 比较耗费性能，如果是频繁切换的场景就使用 v-show；
2. 合理使用 computed，计算属性会基于它们的响应式依赖进行缓存，只在相关响应式依赖发生改变时它们才会重新求值；
3. v-for 时加上 key，以及避免和 v-if 同时使用，因为 v-for 比 v-if 优先级更高，每次 v-for 时，v-if 都要重新计算一遍，这很浪费；
4. 自定义事件、DOM 事件、定时器等任务及时销毁（在 beforeDestory 中），避免内层泄露；
5. 合理的使用异步组件，只在需要的时候才从服务器加载模块，而且 Vue 异步组件被渲染时会把结果缓存起来供未来重渲染；
6. 合理的使用 keep-alive。对于不需要重新渲染的组件进行缓存，如多个静态 Tab 页的切换，可以用 keep-alive 包裹；

### 减少白屏时间
相比 Native 页面，H5 页面体验问题主要是：打开一个 H5 页面需要做一系列处理，会有一段白屏时间，体验糟糕。

白屏时间是指浏览器从响应用户输入网址地址，到浏览器开始显示内容的时间。

优化项：
1. 骨架屏，html直接渲染过渡效果；
2. 改造第三方 JS 引入顺序；（css的加载会阻塞DOM树渲染）
3. 使用 SplitChunksPlugin 拆分公共代码；
4. 使用动态 import，切分页面代码，减小首屏 JS 体积； 
5. 长列表优化
6. ssr，https://zhuanlan.zhihu.com/p/338475340

## 常用指标
* 页面加载时长
* 首屏加载时长
* Dom Ready 时长
* Dom Complete 时长
* 首页渲染时长
* 首页内容渲染时长
* 首页有效渲染时长

计算：用到performance api

白屏时间：

白屏时间 = 开始渲染时间（首字节时间+HTML 下载完成时间）= responseStart - navigationStart

首次渲染时长 = 全部事件注册时长 = loadEventEnd - navigationStart

页面绘制时间=获取数据到加载结束 = loadEventEnd - fetchEnd(自行记录)

## 上报方法
sendBeacon
