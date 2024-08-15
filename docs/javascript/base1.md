# 必知知识库
## src与href的区别
src 用于替换当前元素，href 用于在当前文档和引用资源之间确立联系。
（1）src，src 是 source 的缩写，指向外部资源的位置，指向的内容将会嵌入到文档中当前标签所在位置；在请求 src 资源时会将其指向的资源下载并应用到文档内，例如 js 脚本，img 图片和 frame 等元素。当浏览器解析到该元素时，会暂停其他资源的下载和处理，直到将该资源加载、编译、执行完毕，图片和框架等元素也如此，类似于将所指向资源嵌入当前标签内。这也是为什么将js 脚本放在底部而不是头部。（2）href，href 是 Hypertext Reference 的缩写，指向网络资源所在位置，建立和当前元素（锚点）或当前文档（链接）之间的链接，浏览器会识别该文档为 css 文件，就会并行下载资源并且不会停止对当前文档的处理。 这也是为什么建议使用 link 方式来加载 css，而不是使用@import 方式。

## for of for in 区别

`for in`

以任意顺序遍历一个对象的可枚举属性 (opens new window)。遍历数组时，key 为数组下标字符串；遍历对象，key 为对象字段名

1. for in 迭代顺序依赖于执行环境，不一定保证顺序
2. for in 不仅会遍历当前对象，还包括原型链上的可枚举属性
3. for in 没有 break 中断
4. for in 不适合遍历数组，主要应用为对象

`for of`

- for of 有与 for in 一样的简洁语法（这也是两者容易混乱的点），但没有 for in 的缺点
- for of 保证顺序且不会仅遍历当前对象
- for of 可与 break，continue，return 配合

## this
1. reference 只存在于规范中的类型
2. GetValue 从 Reference 类型获取对应值的方法
::: tip

如何正确判断 this？箭头函数的 this 是什么？

:::

`this`是很容易混淆的，我们先来看看几个函数的调用场景

```javascript
function foo() {
  console.log(this.a)
}
var a = 1
foo()

const obj = {
  a: 2,
  foo: foo
}
obj.foo()

const c = new foo()

() => {
  console.log('箭头函数)
}
```

**接下来一个个分析上面的几个场景：**

1. 直接`foo`调用，函数的`this`就是`window`，（注意：`use strict`下是`undefined`）。
2. 对于`obj.foo()`，只要记住谁调用了函数，谁就是`this`。所以这个场景下，函数中的`this`就是`obj`。(延伸：o.obj.foo(), 看 foo 的上下文)
3. 对于`new`，`this`肯定是绑定在`c`上，不会变。
4. 箭头函数。不绑定`this`。另外对箭头函数使用 `bind` 这类函数是无效的。

**最后是 bind、apply 等改变上下文的 API**，`this`永远由第一次`bind`决定

但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里

优先级：

1. `new`
2. `bind`等
3. `obj.foo`
4. `foo`调用

ps: <font color=red>匿名函数 this 指向 window</font>

## 问题总结

1. null 是对象吗？

虽然 `typeof null` 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

`null instanceof Object`为`false`也能证明`null`不是对象。

2. 基本类型与引用类型有什么不同？

   1. 基本类型存储的是值，引用类型存储的是地址（指针）。

   2. 基本类型的值是不可变的（重新赋值会开辟新的内存空间），引用类型的值是可变的。

   3. 值类型。<font color=red>栈内存</font>(栈是为执行线程留出的内存空间,栈附属于线程，因此当线程结束时栈被回收)

   4. 引用类型(对象、数组、函数)。<font color=red>堆内存</font>（堆（heap）是为动态分配预留的内存空间,堆通常通过运行时在应用程序启动时被分配，当应用程序（进程）退出时被回收）。

3. `this`的几种调用方式。
   1. 直接`foo`调用，函数的`this`就是`window`。
   2. 对于`obj.foo()`，只要记
      住谁调用了函数，谁就是`this`。所以这个场景下，函数中的`this`就是`obj`。
   3. 对于`new`，`this`肯定是绑定在`c`上，不会变。
   4. 箭头函数。不绑定`this`。另外对箭头函数使用 `bind` 这类函数是无效的。
   5. `bind、apply、call`。`this`永远由第一次`bind`决定。

## a == 1 && a == 2 && a == 3 可能为 true 吗？

```javascript
const a = {
  value: 1,
  toString: function() {
    return a.value++
  },
}
console.log(a == 1 && a == 2 && a == 3) // true
```

```javascript
let value = 0
Object.defineProperty(window, 'a', {
  get: function() {
    return ++value
  },
})

console.log(a == 1 && a == 2 && a == 3) // true
```

## == vs ===

::: tip
用法：何时使用==和===？除了（obj.a == null ,jquery 源码写法）其它均用===
:::

解析：

1. 对于 === 来说，就是判断两者类型和值是否相同。
2. 对于==，只判断值是否相同。

## 0.1 + 0.2 != 0.3

先说原因，因为 JS 采用 IEEE 754 双精度版本（64 位），并且只要采用 IEEE 754 的语言都有该问题。

我们都知道计算机是通过二进制来存储东西的，那么 `0.1` 在二进制中会表示为

```javascript
// (0011) 表示循环
0.1 = 2 ^ (-4 * 1.10011(0011))
```

我们可以发现，`0.1` 在二进制中是无限循环的一些数字，其实不只是 `0.1`，其实很多十进制小数用二进制表示都是无限循环的。这样其实没什么问题，<font color=red>但是 JS 采用的浮点数标准却会裁剪掉我们的数字。</font>

IEEE 754 双精度版本（64 位）将 64 位分为了三段

- 第一位用来表示符号
- 接下去的 11 位用来表示指数
- 其他的位数用来表示有效位，也就是用二进制表示 `0.1` 中的 `10011(0011)`

那么这些循环的数字被裁剪了，就会出现精度丢失的问题，也就造成了 `0.1` 不再是 `0.1` 了，而是变成了 `0.100000000000000002`

```javascript
0.100000000000000002 === 0.1 // true
```

那么同样的，`0.2` 在二进制也是无限循环的，被裁剪后也失去了精度变成了 `0.200000000000000002`

```javascript
0.1 + 0.2 === 0.30000000000000004 // true
```

那么说完了为什么，最后来说说怎么解决这个问题吧。其实解决的办法有很多，这里我们选用原生提供的方式来最简单的解决问题

```javascript
parseFloat((0.1 + 0.2).toFixed(10)) === 0.3 // true
```

## setTimeout 的延时为何做不到精确

先看一下代码：

```javascript
var startTime = new Date()
setTimeout(function() {
  console.log('date-----------------', new Date() - startTime)
}, 100)

veryLongTask()
function veryLongTask() {
  for (let i = 0; i < 100000; i++) {
    console.log(i)
  }
}
```

`打印的是多少取决于后面同步执行的js需要占用多少时间`

veryLongTask 运行结束，才轮到`setTimeout`它执行。具体可了解 Event Loop 的运行机制

解决方案：

1. webworker
2.

## 闭包

**定义和理解**
::: tip
函数 A 内部有一个函数 B，函数 B 能访问函数 A 的变量，函数 B 就是闭包
:::

```javascript
function A() {
  let a = 10
  function B() {
    return a
  }
  let result = B()
  console.log('result:', result)
}
```

在 JS 中闭包的意义就是让我们可以间接访问函数内部的变量。

::: tip
**经典题目**
:::

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

`setTimeout` 是个异步函数，所以会先把循环全部执行完毕，这时候 i 就是 6 了，所以会输出一堆 6。

**解决方法**

1. 采用闭包
2. 使用`setTimeout`的第 3 个参数
3. 用`let`（推荐）

方法一： 使用闭包

```javascript
for (var i = 1; i <= 5; i++) {
  ;(function(j) {
    setTimeout(function timer() {
      console.log(j)
    }, j * 1000)
  })(i)
}
```

方法二： 使用`setTimeout`的第 3 个参数

```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(
    function timer(j) {
      console.log(j)
    },
    i * 1000,
    i
  )
}
```

方法三： `let`

```javascript
for (let i = 1; i <= 5; i++) {
  setTimeout(function timer() {
    console.log(i)
  }, i * 1000)
}
```

总结：

<font color=red>闭包产生的本质就是，当前环境中存在指向父级作用域的引用。</font>

使用场景

1. 函数防抖
2. 使用闭包设计实现单例模式
3. 为多个组件独立属性，例如在闭包中进行 id 的累加
4. 设置私有变量
5. 解决经典问题 for 循环和 setTimeout

使用闭包需要注意什么

闭包有三个特性：

1. 函数嵌套函数；

2. 内部函数使用外部函数的参数和变量；

3. 参数和变量不会被垃圾回收机制回收;

所以可以看到它的缺点：

1. 常驻内存，增加内存使用量；

2. 使用不当造成内存泄漏。

因此我们在使用时需要注意不用的变量要及时的清理掉。

## 浅拷贝

1. `Object.assign()`
2. 展开运算符`...`
3. `slice`

`Object.assign()`

```javascript
let a = {
  name: 'hualala',
}
let b = Object.assign({}, a)
a.name = 'hualala-go'
console.log(b.name) // hualala
```

展开运算符`...`

```javascript
let a = {
  name: 'hualala',
}
let b = { ...a }
a.name = 'hualala-go'
console.log(b.name) // hualala
```

浅拷贝的问题： 对象里边存在对象，拷贝出问题

```javascript
let a = {
  age: 25,
  jobs: {
    first: 'huahua',
  },
}
let b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first) // native
```

实现一个浅拷贝：

```javascript
// 只能拷贝对象
const shallowClone = function(obj) {
  if (typeof obj !== 'object') {
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

## 深拷贝

1. `JSON.parse(JSON.stringfy(obj))`

但是该方法也是有局限性的：

- 会忽略 undefined
- 会忽略 symbol
- 不能序列化函数
- 不能解决循环引用的对象
- 不能正确处理 new Date()
- 不能处理正则

当然你可能想自己来实现一个深拷贝，但是其实实现一个深拷贝是很困难的，需要我们考虑好多种边界情况，
比如原型链如何处理、DOM 如何处理等等, 推荐使用`lodash`

实现：

```javascript
;`JSON.parse( JSON.stringify(arr) )`

const deepClone = function(obj) {
  if (typeof obj !== 'object') {
    return
  }
  let newObj = obj instanceof Array ? [] : {}
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      newObj[key] =
        typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]
    }
  }
  return newObj
}
```

## 数组扁平化

### 递归

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

### toString

如果数组的元素都是数字，那么我们可以考虑使用 toString 方法，因为

```javascript
;[1, [2, [3, 4]]].toString() // "1,2,3,4"
```

```javscript
// 方法2
var arr = [1, [2, [3, 4]]];

function flatten(arr) {
    return arr.toString().split(',').map(function(item){
        return +item
    })
}

console.log(flatten(arr))
```

### reduce

```javascript
// 方法3
var arr = [1, [2, [3, 4]]]

function flatten(arr) {
  return arr.reduce(function(prev, next) {
    return prev.concat(Array.isArray(next) ? flatten(next) : next)
  }, [])
}

console.log(flatten(arr))
```

### 扩展运算符...

```javascript
// 方法4
var arr = [1, [2, [3, 4]]]

function flatten(arr) {
  while (arr.some((item) => Array.isArray(item))) {
    arr = [].concat(...arr)
  }
  return arr
}

console.log(flatten(arr))
```

## 原型

输入

```javascript
let obj = {}
```

<img :src="$withBase('/image/javascript/prototype1.png')" alt="foo">

会发现每个 JS 对象都有 `__proto__` 属性，这个属性指向了原型。这个属性在现在来说已经不推荐直接去使用它了，这只是浏览器在早期为了让我们访问到内部属性 [[prototype]] 来实现的一个东西。

`constructor`里边有个`prototype`属性，这个属性对应的值和先前我们在`__proto__`中的一样。

结论：
原型的`constructor`属性指向构造函数，构造函数通过`prototype`属性指回原型。

<img :src="$withBase('/image/javascript/prototype.png')" alt="foo">

## new

**描述 new 一个对象的例子**

1. 创建一个空的简单 JavaScript 对象（即`{}`）。
2. 链接该对象（即设置该对象的构造函数）到另一个对象。
3. 将步骤 1 新创建的对象作为 this 的上下文。
4. 如果该函数没有返回对象，则返回 this。

注意：

```javascript
function Foo() {
  this.user = 'Lucas'
  const o = {}
  return o
}
const instance = new Foo()
console.log(instance.user)
```

`undefined`

```javascript
function Foo() {
  this.user = 'Lucas'
  return 1
}
const instance = new Foo()
console.log(instance.user)
```

`Lucas`

> 结论：如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。

详解

```javascript
function objectFactory() {

    var obj = new Object(),

    Constructor = [].shift.call(arguments);

    obj.__proto__ = Constructor.prototype;

    var ret = Constructor.apply(obj, arguments);

    return typeof ret === 'object' ? ret : obj;

};
}
```

## 继承

在 JS 中，`class`只是语法糖并不存在类

```javascript
class Car {}
Car instanceof Function // true
```

### 原型链

```javascript
function Parent() {
  this.parentName = 'kk'
}

Parent.prototype.getName = function() {
  return this.parentName
}

function Child() {}

Child.prototype = new Parent()

let child = new Child()
console.log(child.getName())
```

**问题**

引用类型的属性被所有实例共享：

```javascript
function Parent() {
  this.names = ['kk', 'oo']
}

function Child() {}

Child.prototype = new Parent()

var child1 = new Child()

child1.names.push('11')

console.log(child1.names) // ["kk", "oo", "11"]

var child2 = new Child()

console.log(child2.names) // ["kk", "oo", "11"]
```

### 借用构造函数(经典继承)

```javascript
function Parent() {
  this.names = ['kevin', 'daisy']
}

function Child() {
  // call 方式绑定this，由第一次绑定决定
  Parent.call(this)
}

var child1 = new Child()

child1.names.push('yayu')

console.log(child1.names) // ["kevin", "daisy", "yayu"]

var child2 = new Child()

console.log(child2.names) // ["kevin", "daisy"]
```

优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参

例子：

```javascript
function Parent(name) {
  this.name = name
}

function Child(name) {
  Parent.call(this, name)
}

var child1 = new Child('kevin')

console.log(child1.name) // kevin

var child2 = new Child('daisy')

console.log(child2.name) // daisy
```

缺点：

方法都在构造函数中定义，每次创建实例都会创建一遍方法。

### 组合继承（原型链和构造函数）

原型链继承和经典继承双剑合璧。

使用原型链实现对**原型属性和方法**的继承，而通过借用构造函数来实现对**实例属性**的继承

```javascript
function Parent(value) {
  this.val = value
}
Parent.prototype.getValue = function() {
  console.log(console.log(this.val))
}
function Child(value) {
  Parent.call(this, value)
}
Child.prototype = new Parent()
child.getValue() // 1
child instanceof Parent // true
```

组合继承的方式核心是在子类的构造函数中通过 `Parent.call(this)` 继承父类的属性，然后改变子类的原型为 `new Parent()` 来继承父类的函数。

优点：

这种继承方式优点在于构造函数可以传参，不会与父类引用属性共享，可以复用父类的函数

缺点：

在继承父类函数的时候调用了父类构造函数，导致子类的原型上多了不需要的父类属性，存在内存上的浪费。

### 原型式继承

```javascript
function createObj(o) {
  function F() {}
  F.prototype = o
  return new F()
}
```

ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

### 寄生式继承

创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做**增强对象**，最后返回对象。

```javascript
function createObj(o) {
  var clone = Object.create(o)
  clone.sayName = function() {
    console.log('hi')
  }
  return clone
}
```

缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

### 寄生组合式继承

这种继承方式对组合继承进行了优化，组合继承缺点在于继承父类函数时调用两次构造函数

组合继承：

```javascript
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.getName = function() {
  console.log(this.name)
}

function Child(name, age) {
  // 第二次调用构造函数
  Parent.call(this, name)
  this.age = age
}

// 第一次调用构造函数
Child.prototype = new Parent()

var child1 = new Child('kevin', '18')

console.log(child1)
```

我们只需要优化掉这点就行了。

```javascript
function Parent(name) {
  this.name = name
  this.colors = ['red', 'blue', 'green']
}

Parent.prototype.getName = function() {
  console.log(this.name)
}

function Child(name, age) {
  Parent.call(this, name)
  this.age = age
}

// 关键的三步
var F = function() {}

F.prototype = Parent.prototype

Child.prototype = new F()

var child1 = new Child('kevin', '18')

console.log(child1)
```

优化：

```javascript
function object(o) {
  function F() {}
  F.prototype = o
  return new F()
}

function prototype(child, parent) {
  var prototype = object(parent.prototype)
  prototype.constructor = child
  child.prototype = prototype
}

// 当我们使用的时候：
prototype(Child, Parent)
```

使用`Object.create()`

```javascript
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true,
  },
})
```

### Class 继承

在 ES6 中，我们可以使用 `class` 去实现继承，并且实现起来很简单

```javascript
class Parent {
  constructor(value) {
    this.val = value
  }
  getValue() {
    console.log(this.val)
  }
}
class Child extends Parent {
  constructor(value) {
    super(value)
    this.val = value
  }
}
let child = new Child(1)
child.getValue() // 1
child instanceof Parent // true
```

`class` 实现继承的核心在于使用 `extends` 表明继承自哪个父类，并且在子类构造函数中必须调用 `super`，因为这段代码可以看成 `Parent.call(this, value)`。

当然了，之前也说了在 JS 中并不存在类，`class` 的本质就是函数。

## 函数式编程
### 函数科里化
柯里化是一种将使用多个参数的一个函数转换成一系列使用一个参数的函数的技术

这样理解柯里化 ：用闭包把参数保存起来，当参数的数量足够执行函数了，就开始执行函数

### 函数式编程
1. 拥抱纯函数，隔离副作用
2. 函数式一等公民
3. 避免对状态的改变（不可变值）
#### 纯函数与副作用

1. 纯函数，对于相同的输入，总会有相同的输出（有且仅有显式数据流）
2. 执行过程中，没有语义上副作用

副作用：除了计算外，还干其它的事情、

为什么非纯不可：副作用，隐式数据流

#### 一等公民

> 头等函数的核心特征是“可以被当做变量一样用”

- 可以被当作参数传递给其他函数
- 可以作为另一个函数的返回值
- 可以被赋值给一个变量

#### 不可变数据
1. 拷贝(数据量大，冗余字段多)
2. 类似immutable.js不可变值；比如git的commit(Git 快照保存文件索引，而不会保存文件本身,这是持久化数据结构的核心思想)
3. immutable.js，字典树存储数据(immutable-js 使用了另一套数据结构的 API ，与我们的常见操作有些许不同，它将所有的原生数据类型（Object， Array等）都会转化成 immutable-js 的内部对象（Map，List 等），并且任何操作最终都会返回一个新的 immutable 的值。)
4. immer.js,使用原生数据结构, API少，使用了一个 ES6 的新特性 Proxy 对象


**设计思路**：

- 对于 Immutable.js 来说，它通过构建一套原生 JS 无法支持的 Trie 数据结构，最终实现了树节点的按需创建。
- 对于 Immer.js 来说，它借助 Proxy 的 getter 函数实现了按需代理，借助 Proxy 的 setter 函数实现了对象属性的按需拷贝。

性能监控的真像，对于设计思路来说，性能监控的真像

### compose/pipe

```js
    function add4(num) {
      return num + 4
    }  

    function multiply3(num) {
      return num*3
    }  

    function divide2(num) {
      return num/2
    }
    const pipeAll = (...funcs) => (input) => funcs.reduce((res, cb) => cb && cb(res), input)
    const composeAll = (...funcs) => (input) => funcs.reduceRight((res, cb) => cb && cb(res), input)  
```

### 函数式思想在React中的应用

**1. 数据驱动视图**
```js
  UI = render(data)
  UI = f(data)
```

**2. 组件设计：组件即函数**

**3. react hooks**
逻辑和视图耦合的问题

### redux
- 纯函数 reducer
- 不可变数据原则
- 中间件，函数科里化的过程
- 函数组合，compose

### rxjs 响应式编程
RxJS 是一个在 JavaScript 中实现响应式编程的库，它利用可观察序列（Observable）来表达异步数据流，并通过一系列的操作符（Operators）来对这些数据流进行转换、筛选和组合，最终实现业务逻辑。





## 按需引入

### 方案

一个组件库会提供很多的组件，有时候用户只想使用其中的部分组件，那么在打包时，未使用的组件就应该被过滤，减小打包之后的体积。实现按需引入组件的思路有两种：

1. 第一种是每个组件单独打包，以组件为单位生成多个模块，也就是多个 js 文件。使用时引入哪个组件就加载对应的文件(`element babel-plugin-component`)。

2. 第二种是用 es6 模块化标准编写组件，所有的组件打包成一个 es 模块，利用 export 导出多个接口。使用时 import 部分组件，然后打包时利用 tree shaking 特性将没有 import 的组件消除。

### webpack 的按需加载的实现

webpack 提供了两种动态加载的语法。

1. 使用符合 ECMAScript 提案 的 import() 语法 来实现动态导入。
2. require.ensure。

import() 会返回一个 promise，在代码中所有被 import()的模块，都将打成一个单独的包，在浏览器运行到这一行代码时，就会自动请求这个资源，实现动态加载。

** 使用 import()时应该注意以下几点： **

1. import()时可以通过注释语法 import(/chunkName/'qqapi').then()来定义异步加载模块打包出来的 chunkName,否则会默认以 id 作为 chunkName

2. 当 bundle 中已经以同步方式引入模块后，import()将不会再被 webpack 单独打包出 js 文件，可以认为是按需加载无效了

### JS 的加载方式

- 正常模式：

  ```
  <script src="index.js"></script>

  ```

这种情况下 JS 会阻塞浏览器，浏览器必须等待 index.js 加载和执行完毕才能去做其它事情。

- async 模式：

  ```
  <script async src="index.js"></script>

  ```

async 模式下，JS 不会阻塞浏览器做任何其它的事情。它的加载是异步的，当它加载结束，JS 脚本会**立即执行**。

- defer 模式：

  ```
  <script defer src="index.js"></script>

  ```

defer 模式下，JS 的加载是异步的，执行是**被推迟的**. defer 脚本会在文档渲染完毕后，DOMContentLoaded 事件调用前, 执行 defer 的 JS 文件才会开始依次执行。

从应用的角度来说，一般当我们的脚本与 DOM 元素和其它脚本之间的依赖关系不强时，我们会选用 async；当脚本依赖于 DOM 元素和其它脚本的执行结果时，我们会选用 defer。

通过审时度势地向 script 标签添加 async/defer，我们就可以告诉浏览器在等待脚本可用期间不阻止其它的工作，这样可以显著提升性能。  


defer 和 async属性都是去异步加载外部的JS脚本文件，它们都不会阻塞页面的解析，
其区别如下：
1. normal; 解析道标签，立刻pending，并且下载且执行
2. defer；解析到标签开始异步下载，继续解析完成后开始执行（不会阻塞主线程），有序
3. async；解析到标签开始异步下载，下载完成之后立即执行

使用async要注意什么：

## 进程间通信

1. 管道；（父子进程、兄弟进程之间）
2. FIFO：（无关的进程之间）
3. 消息队列
4. 信号量
5. 共享内存

## 模块化

### 简介

使用一个技术肯定是有原因的，那么使用模块化可以给我们带来以下好处

- 解决命名冲突
- 提供复用性
- 提高代码可维护性

**立即执行函数**
在早期，使用立即执行函数实现模块化是常见的手段，通过函数作用域解决了命名冲突、污染全局作用域的问题

**AMD 和 CMD**

1. 对于依赖的模块，AMD 是提前执行，CMD 是延迟执行.不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。
2. CMD 推崇依赖就近，AMD 推崇依赖前置

```javascript
// AMD
define(['./a', './b'], function(a, b) {
  // 加载模块完毕可以使用
  a.do()
  b.do()
})
// CMD
define(function(require, exports, module) {
  // 加载模块
  // 可以把 require 写在函数体的任意地方实现延迟加载
  var a = require('./a')
  a.doSomething()
})
```

**COMMONJS**
CommonJS 最早是 Node 在使用，目前也仍然广泛使用，比如在 Webpack 中你就能见到它，当然目前在 Node 中的模块管理已经和 CommonJS 有一些区别了。

```javascript
// a.js
module.exports = {
  a: 1,
}
// or
exports.a = 1

var module = require('./a.js')
module.a // a
```

**require**

```javascript
// a.js
module.exports = {
  a: 1,
}
// or
exports.a = 1
// 这里其实是包裹了一层立即执行函数，避免污染全局作用域
// 重要的是module,module是NODE的独有的一个变量

// module的基本实现
var module = {
  id: '', // 唯一标识，require引入的时候需要知道的
  exports: {}, // 空对象
}

// module和module.exports用法相同的原因
var exports = module.exports
var load = function(load) {
  // 需要导出的内容
  var a = 2
  module.exports = a
  return module.exports
}
```

注意：`exports` 和 `module.exports` 用法相似，但是不能对 `exports` 直接赋值。因为`exports`和`module.exports`拥有同一块内存地址，直接对`exports`赋值，将导致两者指向不同的内存地址，导致后续不同步。

**ES Module**
ES6 模块的设计思想，是尽量的**静态化**，使得编译时就能确定模块的依赖关系，以及输入和输出的变量。CommonJS 和 AMD 模块，都只能在运行时确定这些东西。比如，CommonJS 模块就是对象，输入时必须查找对象属性。

```javascript
let { a, b, c } = require('./a.js')

// 等同于
let obj = require('./a.js')
let a = obj.a,
  b = obj.b,
  c = obj.c
```

上面代码的实质是整体加载 a 模块（即加载 a.js 的所有方法），生成一个对象（obj），然后再从这个对象上面读取 3 个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过 import 命令输入。

```javascript
let { a, b, c } = require('./a.js')
```

### Common.js 和 ES6 module 区别

1. commonJs 是被加载的时候运行(运行时加载)，ES6 Module 是编译的时候运行（编译时加载（好处：可做 Tree-shaking 优化））
2. commonJs 输出的是**值的浅拷贝**，**ES6 Module 输出值的引用**
3. webpack 对于 ES 模块/CommonJS 模块的实现，是基于自己实现的 webpack_require，所以代码能跑在浏览器中。
4. webpack 的按需加载实现（Webpack 支持定义分割点`Code Splitting`, 通过 require.ensure 进行按需加载）。（**webpack 异步加载模块实现流程跟 jsonp 基本一致**）

### tree shaking

::: tip
移除 JavaScript 上下文中的未引用代码
:::

1. 虽然`production`模式下默认开启，但是由于经过 babel 编译全部模块被封装成 IIFE(立即执行函数)
2. IIFE 存在副作用（主要是 babel 的锅）可能无法被 tree-shaking
3. 需要设置`package.json` 的 `sideEffects`

### rollup 与 webpack

rollup

1. 它支持**导出 ES 模块的包**。
2. 它支持**程序流分析**，能更加正确的判断项目本身的代码是否有副作用。

webpack

1. 适合应用程序

### 经典题目

::: tip
此题涉及的知识点众多，包括变量定义提升、this 指针指向、运算符优先级、原型、继承、全局变量污染、对象属性及原型属性优先级等等。
:::

```javascript
function Foo() {
  getName = function() {
    alert(1)
  }
  return this
}
Foo.getName = function() {
  alert(2)
}
Foo.prototype.getName = function() {
  alert(3)
}
var getName = function() {
  alert(4)
}
function getName() {
  alert(5)
}

//请写出以下输出结果：
Foo.getName()
getName()
Foo().getName()
getName()
new Foo.getName()
new Foo().getName()
new new Foo().getName()
```

**第一问**
先看此题的上半部分做了什么，首先定义了一个叫 Foo 的函数，之后为 Foo 创建了一个叫 getName 的静态属性存储了一个匿名函数，之后为 Foo 的原型对象新创建了一个叫 getName 的匿名函数。之后又通过函数变量表达式创建了一个 getName 的函数，最后再声明一个叫 getName 函数。

第一问的 Foo.getName 自然是访问 Foo 函数上存储的静态属性，自然是 2，没什么可说的。

**第二问**
第二问，直接调用 getName 函数。既然是直接调用那么就是访问当前上文作用域内的叫 getName 的函数，所以跟 1 2 3 都没什么关系。此题有无数面试者回答为 5。此处有两个坑，一是变量声明提升，二是函数表达式。

::: tip
变量声明提升,即所有声明变量或声明函数都会被提升到当前函数的顶部。
:::

函数声明被对象字面量覆盖

最终输出 4

**第三问**
简单的讲，this 的指向是由所在函数的调用方式决定的。而此处的直接调用方式，this 指向 window 对象。

遂 Foo 函数返回的是 window 对象，相当于执行 window.getName() ，而 window 中的 getName 已经被修改为 alert(1)，所以最终会输出 1

**第四问**
直接调用 getName 函数，相当于 window.getName() ，因为这个变量已经被 Foo 函数执行时修改了，遂结果与第三问相同，为 1

**第五问**
::: tip
() > . > new
:::

此处考察的是 js 的运算符优先级问题

```javascript
new Foo.getName()
```

弹出 2

**第六问**
::: tip
在传统语言中，构造函数不应该有返回值，实际执行的返回值就是此构造函数的**实例化对象**。
:::

```javascript
new Foo().getName()
```

输出 3

**第七问**
最终结果为 3

实际上这里成员访问的优先级是最高的，因此先执行了 .getName，但是在进行左侧取值的时候， new Foo() 可以理解为两种运算：new 带参数（即 new Foo()）和函数调用（即 先 Foo() 取值之后再 new），而 new 带参数的优先级是高于函数调用的，因此先执行了 new Foo()，或得 Foo 类的实例对象，再进行了成员访问 .getName。

