## 专题

### 按需引入方案

一个组件库会提供很多的组件，有时候用户只想使用其中的部分组件，那么在打包时，未使用的组件就应该被过滤，减小打包之后的体积。实现按需引入组件的思路有两种：

1. 第一种是每个组件单独打包，以组件为单位生成多个模块，也就是多个js文件。使用时引入哪个组件就加载对应的文件(`element  babel-plugin-component`)。

2. 第二种是用es6模块化标准编写组件，所有的组件打包成一个es模块，利用export导出多个接口。使用时import部分组件，然后打包时利用tree shaking特性将没有import的组件消除。

### JS的加载方式

* 正常模式：
  
  ```
  <script src="index.js"></script>
  ```

这种情况下 JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。

* async 模式：
  
  ```
  <script async src="index.js"></script>
  ```

async 模式下，JS 不会阻塞浏览器做任何其它的事情。它的加载是异步的，当它加载结束，JS 脚本会**立即执行**。（有什么要注意的，有依赖项未下载执行，会报错，webpack怎么处理，依赖未准备好时，webpack打包时的入口代码index.js不会执行）

* defer 模式：
  
  ```
  <script defer src="index.js"></script>
  ```

defer 模式下，JS 的加载是异步的，执行是**被推迟的**. defer脚本会在文档渲染完毕后，DOMContentLoaded事件调用前, 执行 defer 的 JS 文件才会开始依次执行。

从应用的角度来说，一般当我们的脚本与 DOM 元素和其它脚本之间的依赖关系不强时，我们会选用 async；当脚本依赖于 DOM 元素和其它脚本的执行结果时，我们会选用 defer。

通过审时度势地向 script 标签添加 async/defer，我们就可以告诉浏览器在等待脚本可用期间不阻止其它的工作，这样可以显著提升性能。

特点：

1. 我们可以认为是将外链的js放在了页面底部。js的加载不会阻塞页面的渲染和资源的加载。
2. , 执行 defer 的 JS 文件才会开始依次执行。有序

总结：都是异步加载，有执行顺序要求用defer，，没有用async,  在next.js中，framework.js, main.js, app.js, wallet.js就是需要用defer, 保证执行顺序

### 数组去重

1. indexOf
   
   ```javascript
   /**
   * @param {Array} arr
   * 数组去重indexOf、includes
   * 时间复杂度O(n^2)
   */
   var repeatArr = function(arr) {
   var newArr = []
   for (var i = 0; i < arr.length; i++) {
    if (newArr.indexOf(arr[i]) === -1) {
      newArr.push(arr[i])
    }
   }
   return newArr
   };
   ```

2. 对象属性Object， key只能是字符串，会有bug
   
   ```javascript
   /**
   * @param {Array} arr
   * 数组去重
   * 时间复杂度O(n)
   */
   var repeatArr = function(arr) {
   var obj = {}
   var newArr = []
   for (let i = 0; i < arr.length; i++) {
    if (!obj[arr[i]]) {
      newArr.push(arr[i])
      obj[arr[i]] = 1
    } else {
      obj[arr[i]]++
    }
   }
   return newArr
   };
   ```

console.log('repeatArr:', repeatArr([1,2,1, true, 'true']))
// [1, 2, true] 把true和'true'都当成string处理了

```
3. Map，  key可以是任意类型
```javascript
/**
 * @param {Array} arr
 * 数组去重
 * 时间复杂度O(n)
 */
var repeatArr = function(arr) {
  var objMap = new Map()
  var newArr = []
  for (let i = 0; i < arr.length; i++) {
    if (!objMap.has(arr[i])) {
      newArr.push(arr[i])
      objMap.set(arr[i], true)
    }
  }
  return newArr
};
console.log('repeatArr:', repeatArr([1,2,1, true, 'true']))
// [1, 2, true, "true"]
```

4. Set
   
   ```
   [...new Set(arr)]
   ```

Array.from(new Set(arr))

```
5. hasOwnProperty
```javascript
let unique = arr => {
  let obj = {}
    return ary.filter(function (item,index,a) {
        // item : 数组每一个成员
        // index: 成员对应的索引
        // a : 整个数组
        // hasOwnProperty来校验的该属性是否出现过；
        return  obj.hasOwnProperty(typeof item+item)?false:obj[typeof item+item]=true;
        if(obj.hasOwnProperty(typeof item+item)){
            return false
        }else{
            obj[typeof item+item]=true;
            return true;
        }
    })
}
```

### 类数组

::: tip
arguments 是一个对应于传递给函数的参数的**类数组对象**。所有（非箭头）函数中都可用的局部变量.
:::

它类似于Array，但除了length属性和索引元素之外没有任何Array属性。例如，它没有 pop 方法。但是它可以被转换为一个真正的Array：

```javascript
var args = Array.prototype.slice.call(arguments);
var args = [].slice.call(arguments);

// ES2015
const args = Array.from(arguments);
const args = [...arguments];
```

对参数使用 `typeof`

```javascript
console.log(typeof arguments);    // 'object'
```

### 类型判断

**`typeof`**

`Undefined、Null、Boolean、Number、String、Object、fetch`

检测结果

`undefined、object、boolean、number、string、object、function`

<font color=red>不能检测</font>`Array、Function、Date、RegExp、Error`等

**`Object.prototype.toString`**

当 toString 方法被调用的时候，下面的步骤会被执行：

1. 如果 this 值是 undefined，就返回 [object Undefined]
2. 如果 this 的值是 null，就返回 [object Null]
3. 让 O 成为 ToObject(this) 的结果
4. 让 class 成为 O 的内部属性 [[Class]] 的值
5. 最后返回由 "[object " 和 class 和 "]" 三个部分组成的字符串

<font color=red>用 Object.prototype.toString 会返回一个由 "[object " 和 class 和 "]" 组成的字符串，而 class 是要判断的对象的内部属性</font>

```javascript
// 以下是11种：
var number = 1;          // [object Number]
var string = '123';      // [object String]
var boolean = true;      // [object Boolean]
var und = undefined;     // [object Undefined]
var nul = null;          // [object Null]
var obj = {a: 1}         // [object Object]
var array = [1, 2, 3];   // [object Array]
var date = new Date();   // [object Date]
var error = new Error(); // [object Error]
var reg = /a/g;          // [object RegExp]
var func = function a(){}; // [object Function]

function checkType() {
  for (var i = 0; i < arguments.length; i++) {
      console.log(Object.prototype.toString.call(arguments[i]))
  }
}

checkType(number, string, boolean, und, nul, obj, array, date, error, reg, func)
```

### 深浅拷贝

**浅拷贝**
数组：`concat 和 slice `

ES6:  `Object.assing()`

实现：

```javascript
// 只能拷贝对象
const shallowClone = function(obj) {
  if(typeof obj !== 'object') {
    return
  }
  let newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = obj[key]
    }
  }
  return newObj
}
```

**深拷贝**
`JSON.parse( JSON.stringify(arr) )`

```javascript
const deepClone = function(obj) {
  if(typeof obj !== 'object') {
    return
  }
  let newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}
```

### 数组扁平化

#### ES6

```
ary = ary.flat(Infinity);
```

#### 递归

我们最一开始能想到的莫过于循环数组元素，如果还是一个数组，就递归调用该方法：

```javascript
  const flatten = function(arr) {
    let result = []
    let len = arr.length
    for (let i = 0; i < len; i++) {
      if (Array.isArray(arr[i])) {
        flatten(arr[i])
      } else {
       result.push(arr[i])
      }
    }
  }
```

#### toString

如果数组的元素都是数字，那么我们可以考虑使用 toString 方法，因为

```javascript
[1, [2, [3, 4]]].toString() // "1,2,3,4"
```

```javascript
// 方法2
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    return arr.toString().split(',').map(function(item){
        return +item
    })
}

console.log(flatten(arr))
```

#### reduce

```javascript
// 方法3
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

console.log(flatten(arr))
```

#### 扩展运算符...

```javascript
// 方法4
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    while (arr.some(item => Array.isArray(item))) {
        arr = [].concat(...arr);
    }
    return arr;
}

console.log(flatten(arr))
```

### iframe优缺点

iframe 元素会创建包含另外一个文档的内联框架（即行内框架）。
优点：（1）用来加载速度较慢的内容（如广告）（2）使脚本可以并行下载（3）可以实现跨子域通信            
缺点：（1）iframe 会阻塞主页面的 onload 事件（2）无法被一些搜索引擎索识别（3）会产生很多页面，不容易管理

### 浏览器产生乱码的原因

产生乱码的原因：
（1）网页源代码是gbk的编码，而内容中的中文字是utf-8编码的，这样浏览器打开即会出现html乱码，反之也会出现乱码；
（2）html网页编码是gbk，而程序从数据库中调出呈现是utf-8编码的内容也会造成编码乱码；
（3）浏览器不能自动检测网页编码，造成网页乱码。
解决办法：
（1）使用软件编辑HTML网页内容；
（2）如果网页设置编码是gbk，而数据库储存数据编码格式是UTF-8，此时需要程序查询数据库数据显示数据前进行程序转码；
（3）如果浏览器浏览时候出现网页乱码，在浏览器中找到转换编码的菜单进行转换。

### 渐进增强与优雅降级

（1）渐进增强（progressive enhancement）：
主要是针对低版本的浏览器进行页面重构，保证基本的功能情况下，再针对高级浏览器进行效果、交互等方面的改进和追加功能，以达到更好的用户体验。
（2）优雅降级 graceful degradation： 一开始就构建完整的功能，然后再针对低版本的浏览器进行兼容。

两者区别：
（1）优雅降级是从复杂的现状开始的，并试图减少用户体验的供给；而渐进增强是从一个非常基础的，能够起作用的版本开始的，并在此基础上不断扩充，以适应未来环境的需要；
（2）降级（功能衰竭）意味着往回看，而渐进增强则意味着往前看，同时保证其根基处于安全地带。“优雅降级”观点认为应该针对那些最高级、最完善的浏览器来设计网站。而将那些被认为“过时”或有功能缺失的浏览器下的测试工作安排在开发周期的最后阶段，并把测试对象限定为主流浏览器（如 IE、Mozilla 等）的前一个版本。 在这种设计范例下，旧版的浏览器被认为仅能提供“简陋却无妨 (poor, but passable)” 的浏览体验。可以做一些小的调整来适应某个特定的浏览器。但由于它们并非我们所关注的焦点，因此除了修复较大的错误之外，其它的差异将被直接忽略。“渐进增强”观点则认为应关注于内容本身。内容是建立网站的诱因，有的网站展示它，有的则收集它，有的寻求，有的操作，还有的网站甚至会包含以上的种种，但相同点是它们全都涉及到内容。这使得“渐进增强”成为一种更为合理的设计范例。这也是它立即被 Yahoo 所采纳并用以构建其“分级式浏览器支持 (Graded Browser Support)”策略的原因所在。

### 为什么有时候人们用translate来改变位置而不是定位

translate()是transform的⼀个值。改变transform或opacity不会触发浏览器重新布局（reflow）或重绘（repaint），只会触发复合（compositions）。⽽改变绝对定位会触发重新布局，进⽽触发重绘和复合。transform使浏览器为元素创建⼀个 GPU 图层，但改变绝对定位会使⽤到 CPU。 因此translate()更⾼效，可以缩短平滑动画的绘制时间。

⽽translate改变位置时，元素依然会占据其原始空间，绝对定位就不会发⽣这种情况。

### vue双向数据绑定的原理

**Vue.js 是采用数据劫持结合发布者 - 订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。**

主要分为以下几个步骤：
（1）需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化
（2）compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。
（3）Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是: ①在自身实例化时往属性订阅器 (dep) 里面添加自己 ②自身必须有一个 update()方法 ③待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。
（4）MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化 (input) -> 数据 model 变更的双向绑定效果。

### computed和watch的区别

对于Computed：
（1）它支持缓存，只有依赖的数据发生了变化，才会重新计算
（2）不支持异步，当Computed中有异步操作时，无法监听数据的变化
（1）computed的值会默认走缓存，计算属性是基于它们的响应式依赖进行缓存的，也就是基于data声明过，或者父组件传递过来的props中的数据进行计算的。
（2）如果一个属性是由其他属性计算而来的，这个属性依赖其他的属性，一般会使用computed
（3）如果computed属性的属性值是函数，那么默认使用get方法，函数的返回值就是属性的属性值；在computed中，属性有一个get方法和一个set方法，当数据发生变化时，会调用set方法。

对于Watch：
（1）它不支持缓存，数据变化时，它就会触发相应的操作
（2）支持异步监听
（3）监听的函数接收两个参数，第一个参数是最新的值，第二个是变化之前的值
（4）当一个属性发生变化时，就需要执行相应的操作   监听数据必须是data中声明的或者父组件传递过来的props中的数据，当发生变化时，会触发其他操作，函数有两个的参数：
  （1）immediate：组件加载立即触发回调函数
  （2）deep：深度监听，发现数据内部的变化，在复杂数据类型中使用，例如数组中的对象发生变化。需要注意的是，deep为true，就可以监测到对象中每个属性的变化，它会一层层遍历，给这个对象的所有属性都加上这个监听器。当想要执行异步或者昂贵的操作以响应不断的变化时，就需要使用watch。总结：

  （1）computed 计算属性 : 依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。
  （2）watch 侦听器 : 更多的是观察的作用，无缓存性，类似于某些数据的监听回调，每当监听的数据变化时都会执行回调进行后续操作。 
  运用场景： 
  （1）当需要进行数值计算,并且依赖于其它数据时，应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都要重新计算。 
  （2）当需要在数据变化时执行异步或开销较大的操作时，应该使用 watch，使用 watch 选项允许执行异步操作 ( 访问一个 API )，限制执行该操作的频率，并在得到最终结果前，设置中间状态。这些都是计算属性无法做到的。

### nextTick原理及应用

Vue 的 nextTick 其本质是对 JavaScript 执行原理 EventLoop 的一种应用。nextTick 的核心是利用了如 Promise 、MutationObserver、setImmediate、setTimeout的原生 JavaScript 方法来模拟对应的微/宏任务的实现，本质是为了利用 JavaScript 的这些异步回调任务队列来实现 Vue 框架中自己的异步回调队列。nextTick 不仅是 Vue 内部的异步队列的调用方法，同时也允许开发者在实际项目中使用这个方法来满足实际应用中对 DOM 更新数据时机的后续逻辑处理。nextTick 是典型的将底层 JavaScript 执行原理应用到具体案例中的示例，
引入异步更新队列机制的原因∶
（1）如果是同步更新，则多次对一个或多个属性赋值，会频繁触发 UI/DOM 的渲染，可以减少一些无用渲染
（2）同时由于 VirtualDOM 的引入，每一次状态发生变化后，状态变化的信号会发送给组件，组件内部使用 VirtualDOM 进行计算得出需要更新的具体的 DOM 节点，然后对 DOM 进行更新操作，每次更新状态后的渲染过程需要更多的计算，而这种无用功也将浪费更多的性能，所以异步渲染变得更加至关重要。Vue采用了数据驱动视图的思想，但是在一些情况下，仍然需要操作DOM。

有时候，可能遇到这样的情况，DOM1的数据发生了变化，而DOM2需要从DOM1中获取数据，那这时就会发现DOM2的视图并没有更新，这时就需要用到了nextTick了。由于Vue的DOM操作是异步的，所以，在上面的情况中，就要将DOM2获取数据的操作写在$nextTick中。所以，在以下情况下，会用到nextTick：（1）在数据变化后执行的某个操作，而这个操作需要使用随数据变化而变化的DOM结构的时候，这个操作就需要方法在nextTick()的回调函数中。（2）在vue生命周期中，如果在created()钩子进行DOM操作，也一定要放在nextTick()的回调函数中。因为在created()钩子函数中，页面的DOM还未渲染，这时候也没办法操作DOM，所以，此时如果想要操作DOM，必须将操作的代码放在nextTick()的回调函数中。

### react.component和react.pureComponent的区别

PureComponent表示一个纯组件，可以用来优化React程序，减少render函数执行的次数，从而提高组件的性能。在React中，当prop或者state发生变化时，可以通过在shouldComponentUpdate生命周期函数中执行return false来阻止页面的更新，从而减少不必要的render执行。React.PureComponent会自动执行 shouldComponentUpdate。不过，pureComponent中的 shouldComponentUpdate() 进行的是浅比较，也就是说如果是引用数据类型的数据，只会比较不是同一个地址，而不会比较这个地址里面的数据是否一致。浅比较会忽略属性和或状态突变情况，其实也就是数据引用指针没有变化，而数据发生改变的时候render是不会执行的。如果需要重新渲染那么就需要重新开辟空间引用数据。PureComponent一般会用在一些纯展示组件上。使用pureComponent的好处：当组件更新时，如果组件的props或者state都没有改变，render函数就不会触发。省去虚拟DOM的生成和对比过程，达到提升性能的目的。这是因为react自动做了一层浅比较。

### http1.1和http2的区别

（1）二进制协议：HTTP/2 是一个二进制协议。在 HTTP/1.1 版中，报文的头信息必须是文本（ASCII 编码），数据体可以是文本，也可以是二进制。HTTP/2 则是一个彻底的二进制协议，头信息和数据体都是二进制，并且统称为"帧"，可以分为头信息帧和数据帧。 帧的概念是它实现多路复用的基础。
（2）多路复用：HTTP/2 实现了多路复用，HTTP/2 仍然复用 TCP 连接，但是在一个连接里，客户端和服务器都可以同时发送多个请求或回应，而且不用按照顺序一一发送，这样就避免了"队头堵塞"【1】的问题。
（3）数据流：HTTP/2 使用了数据流的概念，因为 HTTP/2 的数据包是不按顺序发送的，同一个连接里面连续的数据包，可能属于不同的请求。因此，必须要对数据包做标记，指出它属于哪个请求。HTTP/2 将每个请求或回应的所有数据包，称为一个数据流。每个数据流都有一个独一无二的编号。数据包发送时，都必须标记数据流 ID ，用来区分它属于哪个数据流。
（4）头信息压缩：HTTP/2 实现了头信息压缩，由于 HTTP 1.1 协议不带状态，每次请求都必须附上所有信息。所以，请求的很多字段都是重复的，比如 Cookie 和 User Agent ，一模一样的内容，每次请求都必须附带，这会浪费很多带宽，也影响速度。HTTP/2 对这一点做了优化，引入了头信息压缩机制。一方面，头信息使用 gzip 或 compress 压缩后再发送；另一方面，客户端和服务器同时维护一张头信息表，所有字段都会存入这个表，生成一个索引号，以后就不发送同样字段了，只发送索引号，这样就能提高速度了。
（5）服务器推送：HTTP/2 允许服务器未经请求，主动向客户端发送资源，这叫做服务器推送。使用服务器推送提前给客户端推送必要的资源，这样就可以相对减少一些延迟时间。这里需要注意的是 http2 下服务器主动推送的是静态资源，和 WebSocket 以及使用 SSE 等方式向客户端发送即时数据的推送是不同的。

### http状态码304是多了好，还是少了好

服务器为了提高网站访问速度，对之前访问的部分页面指定缓存机制，当客户端在此对这些页面进行请求，服务器会根据缓存内容判断页面与之前是否相同，若相同便直接返回304，此时客户端调用缓存内容，不必进行二次下载。
状态码304不应该认为是一种错误，而是对客户端有缓存情况下服务端的一种响应。

搜索引擎蜘蛛会更加青睐内容源更新频繁的网站。通过特定时间内对网站抓取返回的状态码来调节对该网站的抓取频次。若网站在一定时间内一直处于304的状态，那么蜘蛛可能会降低对网站的抓取次数。相反，若网站变化的频率非常之快，每次抓取都能获取新内容，那么日积月累，的回访率也会提高。产生较多304状态码的原因：
（1）页面更新周期长或不更新
（2）纯静态页面或强制生成静态html