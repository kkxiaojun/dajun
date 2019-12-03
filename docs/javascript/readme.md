# JavaScript
<img :src="$withBase('/image/javascript/js.png')" alt="foo">

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

1. 直接`foo`调用，函数的`this`就是`window`。
2. 对于`obj.foo()`，只要记住谁调用了函数，谁就是`this`。所以这个场景下，函数中的`this`就是`obj`。
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

会发现每个 JS 对象都有 `__proto__` 属性，这个属性指向了原型。这个属性在现在来说已经不推荐直接去使用它了，这只是浏览器在早期为了让我们访问到内部属性 [[prototype]] 来实现的一个东西。

`constructor`里边有个`prototype`属性，这个属性对应的值和先前我们在`__proto__`中的一样。

结论：
原型的`constructor`属性指向构造函数，构造函数通过`prototype`属性指回原型。

图片 [https://www.processon.com/diagraming/5ac1a2c9e4b0cf24e962e62d](https://www.processon.com/diagraming/5ac1a2c9e4b0cf24e962e62d)




### `new`的过程发生了什么
**描述new一个对象的例子**
1、创建一个空对象，并且this变量引用该对象，同时继承了该函数的原型（实例对象通过__proto__属性指向原型对象；obj.__proto__ = Base.prototype;） 2、属性和方法被加入到 this 引用的对象中。

```javascript
1. 创建一个空的简单JavaScript对象（即`{}`）。
2. 链接该对象（即设置该对象的构造函数）到另一个对象。
3. 将步骤1新创建的对象作为this的上下文。
4. 如果该函数没有返回对象，则返回this。

function Food(){
    this.cai = cai;
    // return this // 默认有这一行
}
```

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
## ES6

ES6， 全称 ECMAScript 6.0 ，是 JavaScript 的下一个版本标准，2015.06 发版。

ES6 主要是为了解决 ES5 的先天不足，比如 JavaScript 里并没有类的概念，但是目前浏览器的 JavaScript 是 ES5 版本，大多数高版本的浏览器也支持 ES6，不过只实现了 ES6 的部分特性和功能。



例如箭头函数(arrow functions)和简单的字符串插值(string interpolation),大到烧脑的新概念,例如代理(proxy)和生成器(generators) 等，经常使用，才更熟悉。



### let与const和块级作用域

#### es5的特点

* var 与 function 存在变量提升
* var 只会提前声明，function 既声明又定义
* 在全局作用域下，使用 var 和 function 声明的变量会给 window 增加属性

#### es6的特点

**let**

- 使用 let 没有变量提升
- 不可以重复声明：即在`let a = 1`之后，不可以再`let a = 2`
- 不会给 window 增加属性

**const**

- 没有变量提升
- 不可以重复声明
- 不会给 window 增加属性
- const 定义变量，一旦声明必须赋值
- const 定义的是一个常量，不可以重新赋值

#### 解决的痛点

1. 块级作用域
2. 不存在变量提升（减少运行时错误，防止变量声明前就使用这个变量）

<img :src="$withBase('/image/es6/let.jpg')" alt="foo">
<img :src="$withBase('/image/es6/const.jpg')" alt="foo">

### 字符串的扩展

常用方法

1. includes   

2. startWith

3. endWith

4. repeat

5. padStart、padEnd（在 ECMAScript 2017 中首次被定义。）
  ```javascript
  // 日期补全
  let month = String(new Date().getMonth() + 1).padStart(2, '0');
  ```

   ```javascript
   var str = "222";
   str.repeat(2); // 222222
   ```

   

**模版字符串**：${}

### 数组的扩展

1. 数组的转换：Array.from(),Array.of()      去重，转换累数组

2. 查找数组：find(),findIndex(),includes(),(解决es5的indexOf不能发现NaN的不足)

3. 遍历：entries,keys,values 

   ```javascript
   var arr = ['a', 'b', 'c'];
   var iterator = arr.keys();
   
   console.log(iterator.next()); // { value: 0, done: false }
   console.log(iterator.next()); // { value: 1, done: false }
   console.log(iterator.next()); // { value: 2, done: false }
   console.log(iterator.next()); // { value: undefined, done: true }
   ```

   

4. 数组空位：指数组的某一位置好没有任何值

**解决的痛点**：

includes(),(解决es5的**indexOf**不能发现**NaN**的不足

<img :src="$withBase('/image/es6/Array.jpg')" alt="foo">



### 解构赋值

1. 数组的解构赋值

   ```javascript
   let arr = [1,2,3,4];
   let [a,b,c,d] = arr;
   console.log(a,b,c,d);// 打印出每个值
   ```

2. 对象的解构赋值

   ```javascript
   let {name:name,age:age}={name:"Cyan",age:19};
   // 等价于
   let {name,age} = {name:"Aqing",age:20};
   ```

3. 扩展运算符

   ```javascript
   ...
   
   [...arr1,...arr2]
   ```

<img :src="$withBase('/image/es6/jiegou.jpg')" alt="foo">

### 函数的扩展

1. 参数解构赋值。

   ```javascript
   function fn(x="A",y="C") {
     console.log(x + y);
   }
   ```

2. 参数作用域

   ```javascript
   let a = 1, b = 2;
   function fn1(x = m,y = n) {
     // 私有作用域：私有变量 x,y
     // 进入函数时先给形参赋值，发现无私有变量m跟n，遂找到全局的
     console.log(x);
     console.log(y);
     let m = "kkkk"; // 改用var 结果与let一样
     let n = "ES6";
   }
   fn1(); // 1 2
   fn1(100); // 100 2 说明默认值用的是全局的
   ```

3. 箭头函数

   ```javascript
   let fn = (x, y) => {}
   
   // 箭头函数this指向
   let obj = {
     fn:function () {let f = () => {console.log(this);};
     f();
    }
   };
   obj.fn(); // {fn: ƒ}
   
   // 箭头函数没有arguments
   let f1 = (...arg)=>{
     // console.log(arguments);
     console.log(arg);
   };
   // f1(1,23);//报错：arguments is not defined
   f1(1,2,3); // [1, 2, 3]
   ```

   注意的问题：

   - 若函数体只有一行代码的话，就可以省略`{}`，若只有一个参数，就可以省略小括号。
   - 通常函数当做参数的时候(回调函数)使用箭头函数
   - 箭头函数没有this指向，它里面的this是上一级的作用域
   - 箭头函数没有arguments
   - 箭头函数不可以用作构造函数 因为不可以使用new执行

<img :src="$withBase('/image/es6/function.jpg')" alt="foo">

### 对象的扩展

1. 简洁写法

   ```javascript
   let name = 'liuyi', age = 20;
   let obj = {name, age};
   console.log(obj); // {name: "liuyi", age: 20}
   ```

   

2. Object.is(),与===的区别

3. Object.assign()。。。获取当前行的数据后（row的数据如果改变了，会影响表格的数据源）

4. 遍历

   ```javascript
   console.log(Object.keys(obj)); // ["name", "age"]
   
   // 经常看到一些代码
   Object.keys(obj).forEach(item => {})
   
   
   console.log(Object.values(obj)); // ["liuyi", 20]
   
   
   
   console.log(Object.entries(obj)); // [Array(2), Array(2)]  展开后0:(2) ["name", "liuyi"]   1:(2) ["age", 20]
   ```

5. 对象的get与set函数.  对象属性的设置与获取都会触发它内置的set与get函数，我们也可以显式控制这两个函数 

   ```javascript
   let obj = {
     _name:"liuyi",
     get name(){
       // 只要通过obj获取name属性就会触发这个函数
       // 可以通过return 返回值
       console.log(1);
       return this._name;
     },
     set name(val){
       // 只要通过obj给name属性设置值就会触发set函数
       console.log(2);
       // val：设置的值
       this._name = val;
     }
   };
   
   // Vue中的计算属性，直接赋值会warning
   ```

<img :src="$withBase('/image/es6/object.jpg')" alt="foo">

### Promise

- Promise的实例分为三个状态，一开始的状态就是pending（等待）状态，一旦new后，立马执行函数。
- 执行函数的顺序：new Promise中的代码 ===> 当前队列中的同步代码 ===> then(异步)里面的回调函数
- Promise的实例另外两个状态是：reslove（成功）、reject（失败），他们在代码中是具体的两个用作回调的函数。
- 实例使用`.then`来调用reslove或者reject函数，若成功，then方法里执行的函数就是resolve，失败执行的就是reject。

```javascript
let pro1 = new Promise((resolve,reject)=>{
  //如果在new Promise中有错误，那么会直接执行then中的第二个回调函数，并且把错误信息传给函数
  resolve("success");
  reject("error");
});

//then方法有两个回调函数
pro1.then((res)=>{
  console.log(res);
  }, (e)=>{
  //失败的回调
  console.log(e);
}); // 成功打印出了success，如果我们把resolve函数注释掉，那么就会打印e

console.log("因为then方法是异步的，所以不会等待，跳过直接进行这里的代码,所以这里先执行");
```

<img :src="$withBase('/image/es6/promise.jpg')" alt="foo">

### Symbol，Set，Map

1. Set去重

   ```javascript
   Array.from(new Set(arr))
   
   [...new Set(arr)]
   ```

2. map.提供了“值-值”对应，更完善

<img :src="$withBase('/image/es6/set.jpg')" alt="foo">
<img :src="$withBase('/image/es6/map.jpg')" alt="foo">

### Class

#### 定义类

类实际上是个“特殊的函数”，就像你能够定义的函数声明和函数表达式一样，类语法有两个组成部分：类表达式和类声明

**类声明**

```javascript
class Car {
  constructor(color, size) {
    this.color = color;
    this.size = size;
  }
}
```

**类表达式**

```javascript
/* 匿名类 */ 
let Car = class {
  constructor(height, width) {
    this.height = height;
    this.width = width;
  }
};

/* 命名的类 */ 
let Car = class Rectangle {
  constructor(color, size) {
    this.color = color;
    this.size = size;
  }
};
```

#### 构造函数

`constructor`方法是一个特殊的方法，这种方法用于创建和初始化一个由`class`创建的对象。一个类只能拥有一个名为 “constructor”的特殊方法。

能用`super` 关键字来调用一个父类的构造函数

#### 原型方法

```javascript
class Count {
    // constructor
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
    // Getter
    get sum() {
        return this.mul()
    }
    // Method
    mul() {
        return this.x * this.y;
    }
}
const mul = new Rectangle(10, 10);

console.log(mul.sum);
// 100
```

#### 静态方法

```javascript
class Point {
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }

    static distance(a, b) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;

        return Math.hypot(dx, dy);
    }
}

const p1 = new Point(5, 5);
const p2 = new Point(10, 10);

console.log(Point.distance(p1, p2));
```



### 总结

目前常用的有

1. let const
2. Array.includes()
3. Object.assign()
4. 扩展运算符。[...arr1,...arr2]合并数组
5. Array.from(new Set(arr))，[...new Set(arr)] 数组去重
6. Object.keys(),Object.values()



还有Proxy，Iterator，Generator等，未完，下一期


