## 浏览器缓存
### 从性能优化的角度看缓存

### 强缓存、协商缓存
良好的缓存策略可以降低资源的重复加载提高网页的整体加载速度
通常浏览器缓存策略分为两种：强缓存和协商缓存

基本原理：
1. 浏览器加载资源时，根据http请求头部的`expires: Wed, 16 Dec 2020 11:37:13 GMT`和`cache-control: max-age=31536000`判断是否命中强缓存，命中则从浏览器缓存中获取缓存
2. 没有命中强缓存，则发送一个请求到服务器，通过`last-modified`和`etag`验证资源是否命中协商缓存, 如果命中（304）则返回请求信息，
   但不会返回这个资源数据，依然是从缓存中读取资源
3. 如果两者都没有命中，则从服务器端加载资源

**相同点**
都是从客户端缓存中加载资源，而不是从服务器中获取缓存

**不同点**
协商缓存有发送http请求，强缓存则没有

#### 强缓存 

**expires**
强缓存是通过`expires`和`cache-control`两种响应头实现
`expires`是http1.0 提出的一个设置过期头的`header`(现在基本上比较少用)，它描述的是一个绝对时间，由服务器返回。
`expires`受限于本地时间，更改了本地时间，可能会造成缓存失效

```javascript
expires: Wed, 16 Dec 2020 11:37:13 GMT
```

**cache-control**
cache-control是 HTTP / 1.1提出的，优先级高于`expires`, 表示相对时间
```javascript
cache-control: max-age=31536000
```
* `Cache-control: no-cache`实际上是可以存储在本地缓存区的，只是在与原始服务器进行新鲜度验证之前，缓存不能将其提供给客户端使用。
* `Cache-Control: no-store`才是真正的不缓存数据到本地。
* `Cache-Control: public`可以被所有用户缓存（多用户共享），包括终端和CDN等中间代理服务器。
* `Cache-Control: private`只能被终端浏览器缓存（而且是私有缓存），不允许中间代理服务器进行缓存。

#### 协商缓存
浏览器对资源的请求没有命中强缓存，就会发一个http请求到服务器，验证协商缓存是否命中，如果协商缓存命中，则http状态码为304

协商缓存是利用的是【Last-Modified，If-Modified-Since】和【ETag、If-None-Match】这两对Header来管理的

**【Last-Modified，If-Modified-Since】**
`Last-Modified` 表示本地文件最后修改日期，浏览器会在request header加上`If-Modified-Since`（上次返回的Last-Modified的值），询问服务器在该日期后资源是否有更新，有更新的话就会将新的资源发送回来

但是如果在本地打开缓存文件，就会造成 Last-Modified 被修改，所以在 HTTP / 1.1 出现了 ETag

当与 If-None-Match 一同出现时，它（If-Modified-Since）会被忽略掉，除非服务器不支持 If-None-Match。

**【ETag、If-None-Match】**
Etag就像一个指纹，资源变化都会导致ETag变化，跟最后修改时间没有关系，ETag可以保证每一个资源是唯一的

If-None-Match的header会将上次返回的Etag发送给服务器，询问该资源的Etag是否有更新，有变动就会发送新的资源回来

`etag`的优先级比`last-modified`高

### 数据存储：cookie、Storage、indexedDB

|     特性     |                   cookie                   |       localStorage       | sessionStorage |         indexDB          |
| :----------: | :----------------------------------------: | :----------------------: | :------------: | :----------------------: |
| 数据生命周期 |     一般由服务器生成，可以设置过期时间     | 除非被清理，否则一直存在 | 页面关闭就清理 | 除非被清理，否则一直存在 |
| 数据存储大小 |                     4K                     |            5M            |       5M       |           无限           |
| 与服务端通信 | 每次都会携带在 header 中，对于请求性能影响 |          不参与          |     不参与     |          不参与          |

从上表可以看到，`cookie` 已经不建议用于存储。如果没有大量数据存储需求的话，可以使用 `localStorage` 和 `sessionStorage` 。对于不怎么改变的数据尽量使用 `localStorage` 存储，否则可以用 `sessionStorage` 存储。

对于 `cookie`，我们还需要注意安全性。

|   属性    |                             作用                             |
| :-------: | :----------------------------------------------------------: |
|   value   | 如果用于保存用户登录态，应该将该值加密，不能使用明文的用户标识 |
| http-only |            不能通过 JS 访问 Cookie，减少 XSS 攻击            |
|  secure   |               只能在协议为 HTTPS 的请求中携带                |
| same-site |    规定浏览器不能在跨域请求中携带 Cookie，减少 CSRF 攻击     |

### Service Worker

> Service workers 本质上充当Web应用程序与浏览器之间的代理服务器，也可以在网络可用时作为浏览器和网络间的代理。它们旨在（除其他之外）使得能够创建有效的离线体验，拦截网络请求并基于网络是否可用以及更新的资源是否驻留在服务器上来采取适当的动作。他们还允许访问推送通知和后台同步API。

目前该技术通常用来做缓存文件，提高首屏速度，可以试着来实现这个功能。

```js
// index.js
if (navigator.serviceWorker) {
  navigator.serviceWorker
    .register("sw.js")
    .then(function(registration) {
      console.log("service worker 注册成功");
    })
    .catch(function(err) {
      console.log("servcie worker 注册失败");
    });
}
// sw.js
// 监听 `install` 事件，回调中缓存所需文件
self.addEventListener("install", e => {
  e.waitUntil(
    caches.open("my-cache").then(function(cache) {
      return cache.addAll(["./index.html", "./index.js"]);
    })
  );
});

// 拦截所有请求事件
// 如果缓存中已经有请求的数据就直接用缓存，否则去请求数据
self.addEventListener("fetch", e => {
  e.respondWith(
    caches.match(e.request).then(function(response) {
      if (response) {
        return response;
      }
      console.log("fetch source");
    })
  );
});
```

打开页面，可以在开发者工具中的 `Application` 看到 Service Worker 已经启动了![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042724.png)

在 Cache 中也可以发现我们所需的文件已被缓存

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042727.png)

当我们重新刷新页面可以发现我们缓存的数据是从 Service Worker 中读取的

![](https://yck-1254263422.cos.ap-shanghai.myqcloud.com/blog/2019-06-01-042730.png)

