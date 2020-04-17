## 基础知识点（一）

### 基本类型

::: tip
涉及的内容：基本类型与引用类型有什么不同，null是对象不？
:::

在JS中，存在6中原始值，分别是：
* `boolean`
* `null`
* `undefined`
* `string`
* `number`
* `symbol`

其中 JS 的 `number` 类型是浮点类型的，在使用中会遇到某些 Bug，比如 `0.1 + 0.2 !== 0.3`，但是这一块的内容会在进阶部分讲到。`string` 类型是不可变的，无论你在 `string` 类型上调用何种方法，都不会对值有改变。

另外对于 `null` 来说，很多人会认为他是个对象类型，其实这是错误的。

<font color=red>原因： 虽然 `typeof null` 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。</font>

其实，根据以下代码也能判断，❌`null`不是对象
```javascript
null instanceof Object
// false
```



**基本类型是按值访问的。**

* 基本类型的值是不可变的。（具体的理解就是，如果重新赋值，会开辟新的栈内存）

```javascript
var str = "123hello321";
str.toUpperCase();     // 123HELLO321
console.log(str);      // 123hello321
```



* 变量是存储在Stack中的。

```javascript
var a,b;
a = "zyj";
b = a;
console.log(a);   // zyj
console.log(b);   // zyj
a = "呵呵";       // 改变 a 的值，并不影响 b 的值
console.log(a);   // 呵呵
console.log(b);   // zyj
```

图解如下：栈内存中包括了变量的标识符和变量的值

<img :src="$withBase('/image/javascript/js-heap.png')" alt="foo">

### 引用类型

除过上面的 6 种基本数据类型外，剩下的就是引用类型了，统称为 `Object 类型`。细分的话，有：`Object 类型`、`Array 类型`、`Date 类型`、`RegExp 类型`、`Function 类型` 等。



**引用类型的值是按引用访问的。**

* 引用类型的值是可变的。

```javascript
var obj = {name:"zyj"};   // 创建一个对象
obj.name = "percy";       // 改变 name 属性的值
obj.age = 21;             // 添加 age 属性
obj.giveMeAll = function(){
  return this.name + " : " + this.age;
};                        // 添加 giveMeAll 方法
obj.giveMeAll();
```

* 引用类型的比较是引用的比较。

```javascript
var obj1 = {};    // 新建一个空对象 obj1
var obj2 = {};    // 新建一个空对象 obj2
console.log(obj1 == obj2);    // false
console.log(obj1 === obj2);   // false
```

因为 obj1 和 obj2 分别引用的是存放在堆内存中的2个不同的对象，故变量 obj1 和 obj2 的值（引用地址）也是不一样的！

* 引用类型的值是保存在堆内存（Heap）中的对象（Object）
  与其他编程语言不同，JavaScript 不能直接操作对象的内存空间（堆内存）。

图解如下：

- 栈内存中保存了变量标识符和指向堆内存中该对象的指针
- 堆内存中保存了对象的内容

<img :src="$withBase('/image/javascript/js-stack.png')" alt="foo">

### typeof vs instanceof
::: tip
typeof 是否能正确判断类型？instanceof 能正确判断对象的原理是什么？
:::

`typeof`。只能识别值类型和函数，不能识别引用类型。

```javascript
typeof undefined // undefined

typeof 123 // number

typeof 'rty' // string

typeof true // boolean

typeof null // object

typeof {} // object

typeof [] // object

typeof console.log // function
```

`typeof` 对于对象来说，除了函数都会显示 `object`，所以说 `typeof` 并不能准确判断变量到底是什么类型。

```javascript
typeof [] // 'object'
typeof {} // 'object'
```

判断一个对象的正确类型，可以使用 `instanceof`，因为内部机制是通过原型链来判断的，在后面的章节中我们也会自己去实现一个 `instanceof`。

> instanceof, 用来判断某个构造函数的 prototype 属性所指向的对象是否存在于另外一个要检测对象的原型链上

```javascript
const Person = function() {}
const p1 = new Person()
p1 instanceof Person // true

var str = 'hello world'
str instanceof String // false

var str1 = new String('hello world')
str1 instanceof String // true
```

对于基本类型来说，你想直接通过 `instanceof` 来判断类型是不行的。

### 类型转换

首先我们要知道，在 JS 中类型转换只有三种情况，分别是：

- 转换为`Boolean`
- 转换为`Number`
- 转换为string

转换表格

<img :src="$withBase('/image/javascript/translate.webp')" alt="foo">



#### 转Boolean

在条件判断时，除了 `undefined`， `null`， `false`， `NaN`， `''`， `0`， `-0`，其他所有值都转为 `true`，包括所有对象。

#### 对象转基本类型

对象在转换类型的时候，会调用内置的 `[[ToPrimitive]]` 函数，对于该函数来说，算法逻辑一般来说如下：

- 如果已经是原始类型了，那就不需要转换了
- 调用 `x.valueOf()`，如果转换为基础类型，就返回转换的值
- 调用 `x.toString()`，如果转换为基础类型，就返回转换的值
- 如果都没有返回原始类型，就会报错

当然你也可以重写 `Symbol.toPrimitive` ，该方法在转原始类型时调用优先级最高。

```javascript
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  },
  [Symbol.toPrimitive]() {
    return 2
  }
}
1 + a // => 3
```

#### 四则运算

**加法运算符**不同于其他几个运算符，它有以下几个特点：

- 运算中其中一方为字符串，那么就会把另一方也转换为字符串。
- 如果一方不是字符串或者数字，那么会将它转换为数字或者字符串。

```javascript
1 + '1' // '11'
true + true // 2
4 + [1,2,3] // "41,2,3"  [1,2,3].toString() => 1,2,3
```

另外对于加法还需要注意这个表达式 `'a' + + 'b'`

```javascript
'a' + + 'b' // -> "aNaN"
```

因为 `+ 'b'` 等于 `NaN`，所以结果为 `"aNaN"`，你可能也会在一些代码中看到过 `+ '1'` 的形式来快速获取 `number` 类型。

那么对于**除了加法的运算符**来说，只要其中一方是数字，那么另一方就会被转为数字

```javascript
4 * '3' // 12
4 * [] // 0
4 * [1, 2] // NaN
```

> 全局属性 **NaN** 的值表示不是一个数字（Not-A-Number）。

#### 比较运算符

1. 如果是对象，就通过 `toPrimitive` 转换对象
2. 如果是字符串，就通过 `unicode` 字符索引来比较

```
let a = {
  valueOf() {
    return 0
  },
  toString() {
    return '1'
  }
}
a > -1 // true
```

在以上代码中，因为 `a` 是对象，所以会通过 `valueOf` 转换为原始类型再比较值。

#### 逻辑运算符

* &&：第一个值为false则输出第一个值，否则输出第二个值

* ||：第一个值为true则输出第一个值，否则输出第二个值

```javascript
console.log( 5 && 4 );//当结果为真时，返回第二个为真的值4 
console.log( 0 && 4 );//当结果为假时，返回第一个为假的值0 
console.log( 5 || 4 );//当结果为真时，返回第一个为真的值5 
console.log( 0 || 0 );//当结果为假时，返回第二个为假的值0
```

### this

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
2. 对于`obj.foo()`，只要记住谁调用了函数，谁就是`this`。所以这个场景下，函数中的`this`就是`obj`。(延伸：o.obj.foo(), 看foo的上下文)
3. 对于`new`，`this`肯定是绑定在`c`上，不会变。
4. 箭头函数。不绑定`this`。另外对箭头函数使用 `bind` 这类函数是无效的。



**最后是bind、apply等改变上下文的API**，`this`永远由第一次`bind`决定

但是可能会发生多个规则同时出现的情况，这时候不同的规则之间会根据优先级最高的来决定 `this` 最终指向哪里

优先级：
1. `new`
2. `bind`等
3. `obj.foo`
4. `foo`调用

###  问题总结

1. null是对象吗？

 虽然 `typeof null` 会输出 object，但是这只是 JS 存在的一个悠久 Bug。在 JS 的最初版本中使用的是 32 位系统，为了性能考虑使用低位存储变量的类型信息，000 开头代表是对象，然而 null 表示为全零，所以将它错误的判断为 object 。虽然现在的内部类型判断代码已经改变了，但是对于这个 Bug 却是一直流传下来。

`null instanceof Object`为`false`也能证明`null`不是对象。

2. 基本类型与引用类型有什么不同？

   1. 基本类型存储的是值，引用类型存储的是地址（指针）。

   2. 基本类型的值是不可变的（重新赋值会开辟新的内存空间），引用类型的值是可变的。

   3. 值类型。<font color=red>栈内存</font>(栈是为执行线程留出的内存空间,栈附属于线程，因此当线程结束时栈被回收)

   4. 引用类型(对象、数组、函数)。<font color=red>堆内存</font>（堆（heap）是为动态分配预留的内存空间,堆通常通过运行时在应用程序启动时被分配，当应用程序（进程）退出时被回收）。

3. `this`的几种调用方式。
    1. 直接`foo`调用，函数的`this`就是`window`。
    2. 对于`obj.foo()`，只要记住谁调用了函数，谁就是`this`。所以这个场景下，函数中的`this`就是`obj`。
    3. 对于`new`，`this`肯定是绑定在`c`上，不会变。
    4. 箭头函数。不绑定`this`。另外对箭头函数使用 `bind` 这类函数是无效的。
    5. `bind、apply、call`。`this`永远由第一次`bind`决定。

## 基础知识点（二）
### == vs ===
::: tip
用法：何时使用==和===？除了（obj.a == null ,jquery源码写法）其它均用===
:::

解析：
1. 对于 === 来说，就是判断两者类型和值是否相同。
2. 对于==，只判断值是否相同。

### 0.1 + 0.2  != 0.3

先说原因，因为 JS 采用 IEEE 754 双精度版本（64位），并且只要采用 IEEE 754 的语言都有该问题。

我们都知道计算机是通过二进制来存储东西的，那么 `0.1` 在二进制中会表示为

```javascript
// (0011) 表示循环
0.1 = 2^-4 * 1.10011(0011)
```

我们可以发现，`0.1` 在二进制中是无限循环的一些数字，其实不只是 `0.1`，其实很多十进制小数用二进制表示都是无限循环的。这样其实没什么问题，<font color=red>但是 JS 采用的浮点数标准却会裁剪掉我们的数字。</font>

IEEE 754 双精度版本（64位）将 64 位分为了三段

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



### 闭包

**定义和理解**
::: tip
函数A内部有一个函数B，函数B能访问函数A的变量，函数B就是闭包
:::
```javascript
function A() {
  let a = 10
  function B() {
    return a
  }
  let result = B()
  console.log('result:',result)
}
```

在JS中闭包的意义就是让我们可以间接访问函数内部的变量。

:::
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
2. 使用`setTimeout`的第3个参数
3. 用`let`（推荐）

方法一： 使用闭包

```javascript
for (var i = 1; i <= 5; i++) {
  (function(j){setTimeout(function timer() {
    console.log(j)
  }, j * 1000)})(i)
}
```

方法二： 使用`setTimeout`的第3个参数
```javascript
for (var i = 1; i <= 5; i++) {
  setTimeout(function timer(j) {
    console.log(j)
  }, i * 1000, i)
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

### 浅拷贝
1. `Object.assign()`
2. 展开运算符`...`

`Object.assign()`
```javascript
  let a = {
    name: 'hualala'
  }
  let b = Object.assign({}, a)
  a.name = 'hualala-go'
  console.log(b.name) // hualala
```

展开运算符`...`
```javascript
  let a = {
    name: 'hualala'
  }
  let b = {...a}
  a.name = 'hualala-go'
  console.log(b.name) // hualala
```

浅拷贝的问题： 对象里边存在对象，拷贝出问题
```javascript
let a = {
  age: 25,
  jobs: {
    first: 'huahua'
  }
}
let b = { ...a }
a.jobs.first = 'native'
console.log(b.jobs.first) // native
```

这时需要深拷贝的配合
### 深拷贝
1. `JSON.parse(JSON.stringfy(obj))`

但是该方法也是有局限性的：
* 会忽略 undefined
* 会忽略 symbol
* 不能序列化函数
* 不能解决循环引用的对象

当然你可能想自己来实现一个深拷贝，但是其实实现一个深拷贝是很困难的，需要我们考虑好多种边界情况，
比如原型链如何处理、DOM 如何处理等等, 推荐使用`lodash`

### 原型
输入
```javascript
let obj ={}
```

<img :src="$withBase('/image/javascript/prototype1.png')" alt="foo">

会发现每个 JS 对象都有 `__proto__` 属性，这个属性指向了原型。这个属性在现在来说已经不推荐直接去使用它了，这只是浏览器在早期为了让我们访问到内部属性 [[prototype]] 来实现的一个东西。

`constructor`里边有个`prototype`属性，这个属性对应的值和先前我们在`__proto__`中的一样。

结论：
原型的`constructor`属性指向构造函数，构造函数通过`prototype`属性指回原型。

<img :src="$withBase('/image/javascript/prototype.png')" alt="foo">




### new
**描述new一个对象的例子**
1. 创建一个空的简单JavaScript对象（即`{}`）。
2. 链接该对象（即设置该对象的构造函数）到另一个对象。
3. 将步骤1新创建的对象作为this的上下文。
4. 如果该函数没有返回对象，则返回this。

注意：
```javascript
function Foo(){
    this.user = "Lucas"
    const o = {}
    return o
}
const instance = new Foo()
console.log(instance.user)
```
`undefined`
```javascript
function Foo(){
    this.user = "Lucas"
    return 1
}
const instance = new Foo()
console.log(instance.user)
```
`Lucas`

> 结论：如果构造函数中显式返回一个值，且返回的是一个对象，那么 this 就指向这个返回的对象；如果返回的不是一个对象，那么 this 仍然指向实例。

详解
```javascript
function myNew(_constructor, arg) {
  // 第一步 1
  var obj = {};
  // 第二步 2
  obj._proto_ = _constructor.prototype;
  //把该对象的原型指向构造函数的原型对象，就建立起原型了：obj->Animal.prototype->Object.prototype->null
  return _constructor.call(obj, arg);
}
```
### 继承

在JS中，`class`只是语法糖并不存在类

```javascript
class Car {}
Car instanceof Function // true
```
#### 原型链

```javascript
function Parent() {
  this.parentName = 'kk'
}

Parent.prototype.getName = function() {
  return this.parentName
}

function Child() {

}

Child.prototype = new Parent()

let child = new Child()
console.log(child.getName())
```
**问题**

引用类型的属性被所有实例共享：

```javascript
function Parent () {
    this.names = ['kk', 'oo'];
}

function Child () {

}

Child.prototype = new Parent();

var child1 = new Child();

child1.names.push('11');

console.log(child1.names); // ["kk", "oo", "11"]

var child2 = new Child();

console.log(child2.names); // ["kk", "oo", "11"]
```

#### 借用构造函数(经典继承)
```javascript
function Parent () {
    this.names = ['kevin', 'daisy'];
}

function Child () {
    // call 方式绑定this，由第一次绑定决定
    Parent.call(this);
}

var child1 = new Child();

child1.names.push('yayu');

console.log(child1.names); // ["kevin", "daisy", "yayu"]

var child2 = new Child();

console.log(child2.names); // ["kevin", "daisy"]
```

优点：

1.避免了引用类型的属性被所有实例共享

2.可以在 Child 中向 Parent 传参

例子：
```javascript
function Parent (name) {
    this.name = name;
}

function Child (name) {
    Parent.call(this, name);
}

var child1 = new Child('kevin');

console.log(child1.name); // kevin

var child2 = new Child('daisy');

console.log(child2.name); // daisy
```

缺点：

方法都在构造函数中定义，每次创建实例都会创建一遍方法。

#### 组合继承（原型链和构造函数）

原型链继承和经典继承双剑合璧。

使用原型链实现对**原型属性和方法**的继承，而通过借用构造函数来实现对**实例属性**的继承


```javascript
function Parent(value) {
    this.val = value
}
Parent.prototype.getValue = function (){
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

#### 原型式继承
```javascript
function createObj(o) {
    function F(){}
    F.prototype = o;
    return new F();
}
```
ES5 Object.create 的模拟实现，将传入的对象作为创建的对象的原型。

缺点：

包含引用类型的属性值始终都会共享相应的值，这点跟原型链继承一样。

#### 寄生式继承
创建一个仅用于封装继承过程的函数，该函数在内部以某种形式来做**增强对象**，最后返回对象。
```javascript
function createObj (o) {
    var clone = Object.create(o);
    clone.sayName = function () {
        console.log('hi');
    }
    return clone;
}
```
缺点：跟借用构造函数模式一样，每次创建对象都会创建一遍方法。

#### 寄生组合式继承
这种继承方式对组合继承进行了优化，组合继承缺点在于继承父类函数时调用两次构造函数

组合继承：
```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    // 第二次调用构造函数
    Parent.call(this, name);
    this.age = age;
}

// 第一次调用构造函数
Child.prototype = new Parent();

var child1 = new Child('kevin', '18');

console.log(child1)
```

我们只需要优化掉这点就行了。
```javascript
function Parent (name) {
    this.name = name;
    this.colors = ['red', 'blue', 'green'];
}

Parent.prototype.getName = function () {
    console.log(this.name)
}

function Child (name, age) {
    Parent.call(this, name);
    this.age = age;
}

// 关键的三步
var F = function () {};

F.prototype = Parent.prototype;

Child.prototype = new F();


var child1 = new Child('kevin', '18');

console.log(child1);
```

优化：
```javascript
function object(o) {
    function F() {}
    F.prototype = o;
    return new F();
}

function prototype(child, parent) {
    var prototype = object(parent.prototype);
    prototype.constructor = child;
    child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```

使用`Object.create()`
```javascript
Child.prototype = Object.create(Parent.prototype, {
  constructor: {
    value: Child,
    enumerable: false,
    writable: true,
    configurable: true
  }
})
```


#### Class继承

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

## 进阶模块
### 模块化
使用一个技术肯定是有原因的，那么使用模块化可以给我们带来以下好处
* 解决命名冲突
* 提供复用性
* 提高代码可维护性

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
  a: 1
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
  a: 1
}
// or
exports.a = 1
// 这里其实是包裹了一层立即执行函数，避免污染全局作用域
// 重要的是module,module是NODE的独有的一个变量

// module的基本实现
var module = {
  id: '', // 唯一标识，require引入的时候需要知道的
  exports: {} // 空对象
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
let obj = require('./a.js');
let a = obj.a, b = obj.b, c = obj.c;
```

上面代码的实质是整体加载a模块（即加载a.js的所有方法），生成一个对象（obj），然后再从这个对象上面读取3个方法。这种加载称为“运行时加载”，因为只有运行时才能得到这个对象，导致完全没办法在编译时做“静态优化”。

ES6 模块不是对象，而是通过`export`命令显式指定输出的代码，再通过import命令输入。
```javascript
let { a, b, c } = require('./a.js')
```
### Common.js 和 ES6 module 区别
1. commonJs 是被加载的时候运行(运行时加载)，ES6 Module 是编译的时候运行（编译时加载（好处：可做Tree-shaking优化））
2. commonJs 输出的是**值的浅拷贝**，**ES6 Module 输出值的引用**
3. webpack 中的 `__webpack_require__` 对他们处理方式不同(common.js：实现exports和require，es6 module：通过实现自己的`__webpack_require`和`__webpack_exports__`装换成类似common.js的形式, 混用时，用`__webpack_require__n`)
4. webpack 的按需加载实现（Webpack支持定义分割点`Code Splitting`, 通过require.ensure进行按需加载）

### tree shaking
::: tip
移除 JavaScript 上下文中的未引用代码
:::

1. 虽然`production`模式下默认开启，但是由于经过 babel 编译全部模块被封装成 IIFE(立即执行函数)
2. IIFE 存在副作用（主要是babel的锅）可能无法被 tree-shaking
3. 需要设置`package.json` 的 `sideEffects`

### rollup与webpack
rollup
1. 它支持**导出ES模块的包**。
2. 它支持**程序流分析**，能更加正确的判断项目本身的代码是否有副作用。

webpack
1. 适合应用程序


### 经典题目
::: tip
此题涉及的知识点众多，包括变量定义提升、this指针指向、运算符优先级、原型、继承、全局变量污染、对象属性及原型属性优先级等等。
:::

```javascript
function Foo() {
    getName = function () { alert (1); };
    return this;
}
Foo.getName = function () { alert (2);};
Foo.prototype.getName = function () { alert (3);};
var getName = function () { alert (4);};
function getName() { alert (5);}

//请写出以下输出结果：
Foo.getName();
getName();
Foo().getName();
getName();
new Foo.getName();
new Foo().getName();
new new Foo().getName();
```

**第一问**
先看此题的上半部分做了什么，首先定义了一个叫Foo的函数，之后为Foo创建了一个叫getName的静态属性存储了一个匿名函数，之后为Foo的原型对象新创建了一个叫getName的匿名函数。之后又通过函数变量表达式创建了一个getName的函数，最后再声明一个叫getName函数。

第一问的 Foo.getName 自然是访问Foo函数上存储的静态属性，自然是2，没什么可说的。

**第二问**
第二问，直接调用 getName 函数。既然是直接调用那么就是访问当前上文作用域内的叫getName的函数，所以跟1 2 3都没什么关系。此题有无数面试者回答为5。此处有两个坑，一是变量声明提升，二是函数表达式。

::: tip
变量声明提升,即所有声明变量或声明函数都会被提升到当前函数的顶部。
:::

函数声明被对象字面量覆盖

最终输出4

**第三问**
简单的讲，this的指向是由所在函数的调用方式决定的。而此处的直接调用方式，this指向window对象。

遂Foo函数返回的是window对象，相当于执行 window.getName() ，而window中的getName已经被修改为alert(1)，所以最终会输出1

**第四问**
直接调用getName函数，相当于 window.getName() ，因为这个变量已经被Foo函数执行时修改了，遂结果与第三问相同，为1

**第五问**
::: tip
() > . > new
:::

此处考察的是js的运算符优先级问题

```javascript
new (Foo.getName)()
```
弹出2

**第六问**
::: tip
在传统语言中，构造函数不应该有返回值，实际执行的返回值就是此构造函数的**实例化对象**。
:::
```javascript
(new Foo()).getName()
```

输出3

**第七问**
最终结果为3

实际上这里成员访问的优先级是最高的，因此先执行了 .getName，但是在进行左侧取值的时候， new Foo() 可以理解为两种运算：new 带参数（即 new Foo()）和函数调用（即 先 Foo() 取值之后再 new），而 new 带参数的优先级是高于函数调用的，因此先执行了 new Foo()，或得 Foo 类的实例对象，再进行了成员访问 .getName。