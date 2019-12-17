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
`expires`是http1.0 提出的


```javascript
expires: Wed, 16 Dec 2020 11:37:13 GMT
```

#### 协商缓存




