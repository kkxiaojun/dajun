# 浏览器相关
## 事件机制
### 事件触发三阶段

事件触发有三个阶段

1. `window` 往事件触发处传播，遇到注册的捕获事件会触发（事件捕获）
2. 传播到事件触发处时触发注册的事件（处于目标阶段）
3. 从事件触发处往 `window` 传播，遇到注册的冒泡事件会触发（事件冒泡）

<font color=red>事件触发一般来说会按照上面的顺序进行，但是也有特例，如果给一个目标节点同时注册冒泡和捕获事件，事件触发会按照注册的顺序执行。</font>

```js
// 以下会先打印冒泡然后是捕获
node.addEventListener('click',(event) =>{
	console.log('冒泡')
},false);
node.addEventListener('click',(event) =>{
	console.log('捕获 ')
},true)
```

### 注册事件
```javascript
target.addEventListener(type, listener[, options]);
```

通常我们使用 `addEventListener` 注册事件，该函数的第三个参数可以是布尔值，也可以是对象。对于布尔值 `useCapture` 参数来说，该参数默认值为 `false` 。`useCapture` 决定了注册的事件是捕获事件还是冒泡事件。对于对象参数来说，可以使用以下几个属性

- `capture`:  Boolean，表示 listener 会在该类型的事件捕获阶段传播到该 EventTarget 时触发。
- `once`:  Boolean，表示 listener 在添加之后最多只调用一次。如果是 true， listener 会在其被调用之后自动移除。
- `passive`: Boolean，设置为true时，表示 listener 永远不会调用 preventDefault()。如果 listener 仍然调用了这个函数，客户端将会忽略它并抛出一个控制台警告。

一般来说，我们只希望事件只触发在目标上，这时候可以使用 `stopPropagation` 来阻止事件的进一步传播。通常我们认为 `stopPropagation` 是用来阻止事件冒泡的，其实该函数也可以阻止捕获事件。`stopImmediatePropagation` 同样也能实现阻止事件，但是还能阻止该事件目标执行别的注册事件。

```js
node.addEventListener('click',(event) =>{
	event.stopImmediatePropagation()
	console.log('冒泡')
},false);
// 点击 node 只会执行上面的函数，该函数不会执行
node.addEventListener('click',(event) => {
	console.log('捕获 ')
},true)
```

### 事件代理

如果一个节点中的子节点是动态生成的，那么子节点需要注册事件的话应该注册在父节点上

```html
<ul id="ul">
	<li>1</li>
    <li>2</li>
	<li>3</li>
	<li>4</li>
	<li>5</li>
</ul>
<script>
  let ul = document.querySelector('#ul')
	ul.addEventListener('click', (event) => {
		console.log(event.target);
	})
</script>
```

事件代理的方式相对于直接给目标注册事件来说，有以下优点

- 节省内存
- 不需要给子节点注销事件
## 跨域相关

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
**cookie**
**Storage**
**indexedDB**


