# 异步编程

主要是了解我们常用的，发送异步请求的内容

## 并发concurrency和并行parallelism
**并发**
并发是宏观概念，我分别有任务 A 和任务 B，在一段时间内通过任务间的切换完成了这两个任务，这种情况就可以称之为并发。（可以不同时）

**并行**
并行是微观概念，假设 CPU 中存在两个核心，那么我就可以同时完成任务 A、B。同时完成多个任务的情况就可以称之为并行。（同时）

## ajax
**基础**
发送异步请求

**创建过程**
1. 创建XMLHttpRequest对象,也就是创建一个异步调用对象.

2. 创建一个新的HTTP请求,并指定该HTTP请求的方法、URL及验证信息（xhr.open(method, url, true/false)）.

3. 设置响应HTTP请求状态变化的函数.(onreadystatechange,readyState==4,status==200)

4. 发送HTTP请求.(xhr.send(method, url, true/false))

5. 获取异步调用返回的数据.

6. 使用JavaScript和DOM实现局部刷新.

```javascript
method
var xhr;
if (window.XMLHttpRequest)
  {// code for IE7+, Firefox, Chrome, Opera, Safari
  xhr=new XMLHttpRequest();
  }
else
  {// code for IE6, IE5
  xhr=new ActiveXObject("Microsoft.XMLHTTP");
  }
xhr.onreadystatechange=function()
  {
  if (xhr.readyState==4 && xhr.status==200)
    {
    document.getElementById("txtHint").innerHTML=xhr.responseText;
    }
  }
xhr.open("GET","gethint.asp?q="+str,true);
if(method === 'post') {
    xhr.send(data);
} else {
    xhr.send();
}
}
```

**AJAX的工作原理**

Ajax的工作原理相当于在用户和服务器之间加了—个中间层(AJAX引擎),使用户操作与服务器响应异步化。　Ajax的原理简单来说通过XmlHttpRequest对象来向服务器发异步请求，从服务器获得数据，然后用javascript来操作DOM而更新页面。

**ajax优缺点**

优点：无刷新更新数据，异步与服务器通信，前后端负载均衡

缺点：

- ajax干掉了Back和history功能，对浏览器机制的破坏
- 对搜索引擎支持较弱
- 违背了URI和资源定位的初衷

## callback hell 

```javascript
ajax(url, () => {
    // 处理逻辑
    ajax(url1, () => {
        // 处理逻辑
        ajax(url2, () => {
            // 处理逻辑
        })
    })
})
```



地狱的根本问题就是：
* 嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身
* 嵌套函数一多，就很难处理错误

## Promise
::: tip
Promise 的特点是什么，分别有什么优缺点？什么是 Promise 链？Promise 构造函数执行和 then 函数执行有什么区别？ 
:::

1. Promise意为承诺，有三种状态
  * `pending`(等待)
  * `resolve`(完成)
  * `reject`(拒绝)

2. Promise从`pending`变成为`resolve`或者`reject`就不能更改状态了
```javascript
new Promise((resolve, reject) => {
  resolve('success')
  // 无效
  reject('reject')
})
```

3. Promise的构造函数是立即执行的
```javascript
new Promise((resolve, reject) => {
  console.log('new Promise')
  resolve('success')
})
console.log('finifsh')
// new Promise -> finifsh
```

4. Promise 实现了链式调用，也就是说每次调用 `then` 之后返回的都是一个 Promise，并且是**一个全新的 Promise**，原因也是因为状态不可变。如果你在 then 中 使用了 return，那么 return 的值会被 Promise.resolve() 包装
```javascript
Promise.resolve(1)
  .then(res => {
    console.log(res) // => 1
    return 2 // 包装成 Promise.resolve(2)
  })
  .then(res => {
    console.log(res) // => 2
  })
```

**常用方法**
`Promise.all()`.

将多个 Promise 实例，包装成一个新的 Promise 实例。如果参数中 promise 有一个失败（rejected），此实例回调失败（reject），失败原因的是第一个失败 promise 的结果

特点：
1. 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled
2. 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected

`Promise.race()`
方法返回一个 promise，一旦迭代器中的某个promise解决或拒绝，返回的 promise就会解决或拒绝。 

<font color=red> Promise.race 的一般使用场景是给 Promise 设置一个 timeout/deadline </font>

```javascript
function timeoutPromise(delay) {
    return new Promise( function(resolve,reject){
        setTimeout( function(){
            reject( "Timeout!" );
        }, delay );
    } );
}

Promise.race( [
    foo(),
    timeoutPromise( 3000 )
] )
.then(function(){}, function(err){});
```

`Promise.allSettled()`

方法返回一个在所有给定的promise已被决议或被拒绝后决议的promise，并带有一个对象数组，每个对象表示对应的promise结果。


前面都是在讲述 Promise 的一些优点和特点，其实它也是存在一些缺点的，比如无法取消 Promise，错误需要通过回调函数捕获。

## 实现一个promise

## fetch
1. fetch 不会发送 cookies。除非你使用了credentials 的初始化选项。
2. 为了让浏览器发送包含凭据的请求（即使是跨域源），要将credentials: 'include'添加到传递给 fetch()方法的init对象。
## Generator

::: tip

Generator 是什么？

:::

`Generator` 算是 ES6 中难理解的概念之一了，`Generator` 最大的特点就是可以控制函数的执行。在这一小节中我们不会去讲什么是 `Generator`，而是把重点放在 `Generator` 的一些容易困惑的地方。

```javascript
function *foo(x) {
  let y = 2 * (yield (x + 1))
  let z = yield (y / 3)
  return (x + y + z)
}
let it = foo(5)
console.log(it.next())   // => {value: 6, done: false}
console.log(it.next(12)) // => {value: 8, done: false}
console.log(it.next(13)) // => {value: 42, done: true}
```

你也许会疑惑为什么会产生与你预想不同的值，接下来就让我为你逐行代码分析原因

- 首先 `Generator` 函数调用和普通函数不同，它会返回一个迭代器
- 当执行第一次 `next` 时，传参会被忽略，并且函数暂停在 `yield (x + 1)` 处，所以返回 `5 + 1 = 6`
- 当执行第二次 `next` 时，传入的参数等于上一个 `yield` 的返回值，如果你不传参，`yield` 永远返回 `undefined`。此时 `let y = 2 * 12`，所以第二个 `yield` 等于 `2 * 12 / 3 = 8`
- 当执行第三次 `next` 时，传入的参数会传递给 `z`，所以 `z = 13, x = 5, y = 24`，相加等于 `42`

你也许会疑惑为什么会产生与你预想不同的值，接下来就让我为你逐行代码分析原因

- 首先 `Generator` 函数调用和普通函数不同，它会返回一个迭代器
- 当执行第一次 `next` 时，传参会被忽略，并且函数暂停在 `yield (x + 1)` 处，所以返回 `5 + 1 = 6`
- 当执行第二次 `next` 时，传入的参数等于上一个 `yield` 的返回值，如果你不传参，`yield` 永远返回 `undefined`。此时 `let y = 2 * 12`，所以第二个 `yield` 等于 `2 * 12 / 3 = 8`
- 当执行第三次 `next` 时，传入的参数会传递给 `z`，所以 `z = 13, x = 5, y = 24`，相加等于 `42`

```javascript
function *fetch() {
    yield ajax(url, () => {})
    yield ajax(url1, () => {})
    yield ajax(url2, () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
```

## 实现一个简版的generator自动执行函数
::: tip
 Generator 函数的自动执行需要一种机制，即当异步操作有了结果，能够自动交回执行权。
::: 

而两种方法可以做到这一点。

（1）回调函数。将异步操作进行包装，暴露出回调函数，在回调函数里面交回执行权。

（2）Promise 对象。将异步操作包装成 Promise 对象，用 then 方法交回执行权。


### Promise获取每一步的结果
```javascript
// generator的自动执行机制

function fet(name) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve({
        name: name
      })
    })
  })
}

function* gen() {
  let i = yield fet('kk')
  let j = yield fet('kcy')
  let k = yield fet('lds')
}

let g = gen()
let result = g.next()
console.log('result---', result)

// 为了获取每一步的结果

result.value.then(data => {
  console.log('data', data)
  return data
})
.then(res => {
  return g.next().value
})
.then(data => {
  console.log('data1', data)
})
.then(res => {
  return g.next().value
})
.then(data => {
  console.log('data2', data)
})

```

### 递归获取
```javascript
// 用递归实现
function run(gen) {
  let g = gen()
  function next() {
    let result = g.next()
    if (result.done) {
      return
    }
    result.value.then(data => {
      console.log('data-11', data)
      next()
    }).then(data => {
    })
  }
  next()
}

run(gen)

// 同步的情况
function run(gen) {
  var g = gen();

  function next(data) {
      var result = g.next(data);

      if (result.done) return;

      result.value(next);
  }

  next();
}

run(gen)
```
### run启动器函数 

```javascript
// 进一步封装
// 第一版
function run(gen) {
  var gen = gen();

  function next(data) {
      var result = gen.next(data);
      if (result.done) return;

      if (isPromise(result.value)) {
          result.value.then(function(data) {
              next(data);
          });
      } else {
          result.value(next)
      }
  }

  next()
}

function isPromise(obj) {
  return 'function' == typeof obj.then;
}

module.exports = run;
```
优化
```javascript
// 第二版
function run(gen) {
    var gen = gen();

    return new Promise(function(resolve, reject) {

        function next(data) {
            try {
                var result = gen.next(data);
            } catch (e) {
                return reject(e);
            }

            if (result.done) {
                return resolve(result.value)
            };

            var value = toPromise(result.value);

            value.then(function(data) {
                next(data);
            }, function(e) {
                reject(e)
            });
        }

        next()
    })

}

function isPromise(obj) {
    return 'function' == typeof obj.then;
}

function toPromise(obj) {
    if (isPromise(obj)) return obj;
    if ('function' == typeof obj) return thunkToPromise(obj);
    return obj;
}

function thunkToPromise(fn) {
    return new Promise(function(resolve, reject) {
        fn(function(err, res) {
            if (err) return reject(err);
            resolve(res);
        });
    });
}

module.exports = run;
```


## async 及 await

其实async函数的原理，就是将Generator函数和自动执行器，包装在一个函数里

```javascript
async function fn(args) {
  // ...
}

// 等同于
function fn(args) {
  return spawn(function* () {
    // ...
  });
}
```

spawn 函数指的是自动执行器，就比如说 co。

再加上 async 函数返回一个 Promise 对象，你也可以理解为 async 函数是基于 Promise 和 Generator 的一层封装。



**一个函数如果加上 `async` ，那么该函数就会返回一个 `Promise`**

```javascript
async function test() {
  return "1"
}
console.log(test()) // -> Promise {<resolved>: "1"}
```

`async` 就是将函数返回值使用 `Promise.resolve()` 包裹了下，和 `then` 中处理返回值一样，并且 `await` 只能配套 `async` 使用

```javascript
async function test() {
  let value = await sleep()
}
```

`async` 和 `await` 可以说是异步终极解决方案了，相比直接使用 `Promise` 来说，优势在于处理 `then` 的调用链，能够更清晰准确的写出代码，毕竟写一大堆 `then` 也很恶心，并且也能优雅地解决回调地狱问题。当然也存在一些缺点，因为 `await` 将异步代码改造成了同步代码，如果多个异步代码没有依赖性却使用了 `await` 会导致性能上的降低。

```javascript
async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch(url)
  await fetch(url1)
  await fetch(url2)
}
```



下面来看一个使用 `await` 的例子：

```javascript
let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
```

对于以上代码你可能会有疑惑，让我来解释下原因

- 首先函数 `b` 先执行，在执行到 `await 10` 之前变量 `a` 还是 0，因为 `await` 内部实现了 `generator` ，`generator` 会保留堆栈中东西，所以这时候 `a = 0` 被保存了下来
- 因为 `await` 是异步操作，后来的表达式不返回 `Promise` 的话，就会包装成 `Promise.reslove(返回值)`，然后会去执行函数外的同步代码
- 同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 `a = 0 + 10`

上述解释中提到了 `await` 内部实现了 `generator`，其实 `await` 就是 `generator` 加上 `Promise` 的语法糖，且内部实现了自动执行 `generator`。如果你熟悉 co 的话，其实自己就可以实现这样的语法糖。

## websoket
> WebSocket 使用ws或wss协议，Websocket是一个持久化的协议，相对于HTTP这种非持久的协议来说。WebSocket API最伟大之处在于服务器和客户端可以在给定的时间范围内的任意时刻，**相互**推送信息。WebSocket并不限于以Ajax(或XHR)方式通信，因为Ajax技术需要客户端发起请求，而WebSocket服务器和客户端可以彼此相互推送信息；XHR受到域的限制，而WebSocket允许跨域通信。它实现了浏览器与服务器的全双工通信，扩展了浏览器与服务端的通信功能，使服务端也能主动向客户端发送数据。

与ajax的区别：

1. 本质不同
ajax，即异步JavaScript和XML，是一种创建交互式网页应用的网页开发技术；
webSocket是HTML5一种新的协议，实现了浏览器与服务器全双工通信。其本质是先通过HTTP/HTTPS协议进行握手后创建一个用于交换数据的TCP连接，服务端与客户端通过此TCP连接进行实时通信。

2. 生命周期不同
websocket建立的是长连接，在一个会话中一直保持连接；而ajax是短连接，数据发送和接收完成后就会断开连接。

3. 适用范围不同
websocket一般用于前后端实时数据交互；而ajax前后端非实时数据交互。

4. 发起人不同
ajax技术需要客户端发起请求(自己请求回来的数据用户自己看)；而websocket服务器和客户端可以相互推送信息(用户A请求返回来的东西A用户可以看B用户也可以看；如果是属于公共的那大家都可以看)。

## Event loop

关于Event loop，我在想，为什么么要了解呢，发现其实在很多地方都有应用，比如说：面试中，vue的`nextTick()`等。借此机会了解一下详细内容

### 执行栈

> 栈（stack）又名堆栈，它是一种运算受限的线性表。遵循FILO(先进后出)的原则。

​		执行栈是计算机科学中存储有关正在运行的子程序的消息的栈。经常被用于存放子程序的**返回地址**。在调用任何子程序时，主程序都必须暂存子程序运行完毕后应该返回到的地址。因此，如果被调用的子程序还要调用其他的子程序，其自身的返回地址就必须存入执行栈，在其自身运行完毕后再行取回。在[递归](https://baike.baidu.com/item/递归)程序中，每一层次递归都必须在执行栈上增加一条地址，因此如果程序出现无限递归（或仅仅是过多的递归层次），执行栈就会产生[栈溢出](https://baike.baidu.com/item/栈溢出)。

::: tip

栈溢出

:::

​		堆栈溢出（stack overflow）在计算机科学中是指使用过多的内存时导致调用堆栈产生的溢出[1]。**堆栈溢出的产生是由于过多的函数调用，导致调用堆栈无法容纳这些调用的返回地址**，一般在递归中产生。堆栈溢出很可能由无限递归（Infinite recursion）产生，但也可能仅仅是过多的堆栈层级。

在开发中，大家也可以在报错中找到执行栈的痕迹

<img :src="$withBase('/image/javascript/stack-error.png')" alt="foo">

递归中的栈溢出

<img :src="$withBase('/image/javascript/stack-error-1.png')" alt="foo">

### 浏览器中的Event Loop

<img :src="$withBase('/image/javascript/nextTick.png')" alt="foo">

::: tip

`Event Loop`即事件循环，是指浏览器或`Node`的一种解决`javaScript`单线程运行时不会阻塞的一种机制，也就是我们经常使用**异步**的原理。

:::

了解了执行栈，当我们执行 JS 代码的时候其实就是往执行栈中推入函数，那么遇到异步代码的时候该怎么办？其实当遇到异步的代码时，会被**挂起**并在需要执行的时候加入到 Task（有多种 Task） 队列中。一旦执行栈为空，Event Loop 就会从 Task 队列中拿出需要执行的代码并放入执行栈中执行，所以本质上来说 JS 中的异步还是同步行为。

<img :src="$withBase('/image/javascript/event-loop-2.png')" alt="foo">


JavaScript 中所有任务分为同步任务和异步任务：

* 同步任务是指：当前主线程将要消化执行的任务，这些任务一起形成执行栈（execution context stack）
* 异步任务是指：不进入主线程，而是进入任务队列（task queue），即不会马上进行的任务。

不同的任务源会被分配到不同的 Task 队列中，任务源可以分为 **微任务**（microtask） 和 **宏任务**（macrotask）。在 ES6 规范中，microtask 称为 `jobs`，macrotask 称为 `task`。下面来看以下代码的执行顺序：

```javascript
console.log('script start')

async function async1() {
  await async2()
  console.log('async1 end')
}
async function async2() {
  console.log('async2 end')
}
async1()

setTimeout(function() {
  console.log('setTimeout')
}, 0)

new Promise(resolve => {
  console.log('Promise')
  resolve()
})
  .then(function() {
    console.log('promise1')
  })
  .then(function() {
    console.log('promise2')
  })

console.log('script end')
// script start => async2 end => Promise => script end => promise1 => promise2 => async1 end => setTimeout
```

首先先来解释下上述代码的 `async` 和 `await` 的执行顺序。当我们调用 `async1` 函数时，会马上输出 `async2 end`，并且函数返回一个 `Promise`，接下来在遇到 `await`的时候会就让出线程开始执行 `async1` 外的代码，所以我们完全可以把 `await` 看成是**让出线程**的标志。



然后当同步代码全部执行完毕以后，就会去执行所有的异步代码，那么又会回到 `await` 的位置执行返回的 `Promise` 的 `resolve` 函数，这又会把 `resolve` 丢到微任务队列中，接下来去执行 `then` 中的回调，当两个 `then` 中的回调全部执行完毕以后，又会回到 `await` 的位置处理返回值，这时候你可以看成是 `Promise.resolve(返回值).then()`，然后 `await` 后的代码全部被包裹进了 `then` 的回调中，所以 `console.log('async1 end')` 会优先执行于 `setTimeout`。



如果你觉得上面这段解释还是有点绕，那么我把 `async` 的这两个函数改造成你一定能理解的代码：

```javascript
new Promise((resolve, reject) => {
  console.log('async2 end')
  // Promise.resolve() 将代码插入微任务队列尾部
  // resolve 再次插入微任务队列尾部
  resolve(Promise.resolve())
}).then(() => {
  console.log('async1 end')
})
```


js是单线程的，非阻塞的
**事件循环就是通过异步执行任务的方法来解决单线程的弊端的。**

1. 一开始整个脚本作为一个宏任务执行
2. 执行过程中同步代码直接执行，宏任务进入宏任务队列，微任务进入微任务队列
3. 当前宏任务执行完出队，读取微任务列表，有则依次执行，直到全部执行完
4. 执行浏览器 UI 线程的渲染工作
5. 检查是否有 Web Worker 任务，有则执行
6. 执行完本轮的宏任务，回到第 2 步，继续依此循环，直到宏任务和微任务队列都为空



所以以上代码虽然 `setTimeout` 写在 `Promise` 之前，但是因为 `Promise` 属于微任务而 `setTimeout` 属于宏任务，所以会有以上的打印。



微任务包括 `process.nextTick` ，`promise` ，`MutationObserver`。



宏任务包括 `script` ， `setTimeout` ，`setInterval` ，`setImmediate` ，`I/O` ，`UI rendering`。



这里很多人会有个误区，认为微任务快于宏任务，其实是错误的。因为宏任务中包括了 `script` ，浏览器会**先执行一个宏任务**，接下来有异步代码的话才会先执行微任务。

### Node中的Event Loop

### 内存泄漏
1. 滥用全局变量：直接用全局变量赋值，在函数中滥用this指向全局对象
2. 不销毁定时器和回调
3. DOM引用不规范，很多时候, 我们对 Dom 的操作, 会把 Dom 的引用保存在一个数组或者 Map 中，往往无法对其进行内存回收，ES6中引入 WeakSet 和 WeakMap 两个新的概念, 来解决引用造成的内存回收问题. WeakSet 和 WeakMap 对于值的引用可以忽略不计, 他们对于值的引用是弱引用,内存回收机制, 不会考虑这种引用. 当其他引用被消除后, 引用就会从内存中被释放.
4. 滥用闭包

## JS 思考题

之前我们通过了七个章节来学习关于 JS 这部分的内容，那么接下来，会以几道思考题的方式来确保大家理解这部分的内容。

这种方式不仅能加深你对知识点的理解，同时也能帮助你串联起多个碎片知识点。一旦你拥有将多个碎片知识点串联起来的能力，在面试中就不会经常出现一问一答的情况。如果面试官的每个问题你都能引申出一些相关联的知识点，那么面试官一定会提高对你的评价。

> 思考题一：JS 分为哪两大类型？都有什么各自的特点？你该如何判断正确的类型？

首先这几道题目想必很多人都能够很好的答出来，接下来就给大家一点思路讲出与众不同的东西。

**思路引导：**

1. 对于原始类型来说，你可以指出 `null` 和 `number` 存在的一些问题。对于对象类型来说，你可以从垃圾回收的角度去切入，也可以说一下对象类型存在深浅拷贝的问题。
2. 对于判断类型来说，你可以去对比一下 `typeof` 和 `instanceof` 之间的区别，也可以指出 `instanceof` 判断类型也不是完全准确的。

以上就是这道题目的回答思路，当然不是说让大家完全按照这个思路去答题，而是存在一个意识，当回答面试题的时候，尽量去引申出这个知识点的某些坑或者与这个知识点相关联的东西。

> 思考题二：你理解的原型是什么？

**思路引导：**

起码说出原型小节中的总结内容，然后还可以指出一些小点，比如并不是所有函数都有 `prototype` 属性，然后引申出原型链的概念，提出如何使用原型实现继承，继而可以引申出 ES6 中的 `class` 实现继承。

> 思考题三：bind、call 和 apply 各自有什么区别？

**思路引导：**

首先肯定是说出三者的不同，如果自己实现过其中的函数，可以尝试说出自己的思路。然后可以聊一聊 `this` 的内容，有几种规则判断 `this` 到底是什么，`this` 规则会涉及到 `new`，那么最后可以说下自己对于 `new` 的理解。

> 思考题四：ES6 中有使用过什么？

**思路引导：**

这边可说的实在太多，你可以列举 1 - 2 个点。比如说说 `class`，那么 `class` 又可以拉回到原型的问题；可以说说 `promise`，那么线就被拉到了异步的内容；可以说说 `proxy`，那么如果你使用过 Vue 这个框架，就可以谈谈响应式原理的内容；同样也可以说说 `let` 这些声明变量的语法，那么就可以谈及与 `var` 的不同，说到提升这块的内容。

> 思考题五：JS 是如何运行的？

**思路引导：**

这其实是很大的一块内容。你可以先说 JS 是单线程运行的，这里就可以说说你理解的线程和进程的区别。然后讲到执行栈，接下来的内容就是涉及 Eventloop 了，微任务和宏任务的区别，哪些是微任务，哪些又是宏任务，还可以谈及浏览器和 Node 中的 Eventloop 的不同，最后还可以聊一聊 JS 中的垃圾回收。

如何让你自己的回答充满思考与总结？