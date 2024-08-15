# 类型之问
## 类型介绍

::: tip
涉及的内容：基本类型与引用类类型有什么不同，null是对象不？
:::

在JS中，存在6种基本类型，分别是：
* `boolean`
* `null`
* `undefined`
* `string`
* `number`
* `symbol`

::: tip
BigInt 是一个内置的对象，它提供了了一种方式来表示所有大于 2^53 的数字，也就是 JavaScript 原始类型 Number 能够能够可靠表示的最大数字。
:::

解决的问题：在 JavaScript 中，语言所能够保证“安全”（精确）地进行计算的最大整数是 2^53 - 1 ，也就是 9007199254740991 （常量<font color=red> Number.MAX_SAFE_INTEGER</font>）超过了这个数值，JS 就会产生一些意想不到的问题。**BigInt 解决的只是整数计算的精度问题**

```javascript
const theBiggestInt = 9007199254740991n;

const alsoHuge = BigInt(9007199254740991);
// ↪ 9007199254740991n
```

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

### 内置对象
**构造器内置对象**
* Object
* Boolean
* String
* Number
* Function
* Array
* RegExp
* Date
* Error

****
* Math
* JSON
* 全局对象
    * NaN
    * parseInt
    * encodeURIComponent

## 类型判断
**`typeof`**

::: tip
typeof 是否能正确判断类型？
:::

`typeof`。只能识别值类型和函数，不能识别引用类型。

```javascript
typeof undefined // undefined

typeof 123 // number

typeof 'rty' // string

typeof true // boolean

typeof Symbol('aaa') // symbol

typeof null // object

typeof {} // object

typeof [] // object

typeof console.log // function
```
<font color=red>结论：使用 typeof 可以准确判断出除 null 以外的基本类型，以及 function 类型、symbol 类型；null 会被 typeof 判断为 object。</font>

**`instanceof`**

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

 **constructor 和 Object.prototype.toString 判断类型**

使用 Object.prototype.toString 判断类型，我们称之为“万能方法”，“终极方法”：

```javascript
console.log(Object.prototype.toString.call(1)) 
// [object Number]

console.log(Object.prototype.toString.call('lucas')) 
// [object String]

console.log(Object.prototype.toString.call(undefined)) 
// [object Undefined]

console.log(Object.prototype.toString.call(true)) 
// [object Boolean]

console.log(Object.prototype.toString.call({})) 
// [object Object]

console.log(Object.prototype.toString.call([])) 
// [object Array]

console.log(Object.prototype.toString.call(function(){})) 
// [object Function]

console.log(Object.prototype.toString.call(null)) 
// [object Null]

console.log(Object.prototype.toString.call(Symbol('lucas'))) 
// [object Symbol]
```

constructor 可以查看目标的构造函数

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

## 类型转换


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

## 四则运算

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

### 比较运算符

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

### 逻辑运算符

* &&：第一个值为false则输出第一个值，否则输出第二个值

* ||：第一个值为true则输出第一个值，否则输出第二个值

```javascript
console.log( 5 && 4 );//当结果为真时，返回第二个为真的值4 
console.log( 0 && 4 );//当结果为假时，返回第一个为假的值0 
console.log( 5 || 4 );//当结果为真时，返回第一个为真的值5 
console.log( 0 || 0 );//当结果为假时，返回第二个为假的值0
```