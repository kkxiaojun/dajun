# 源码实现
## call、aplly、bind 实现
::: tip
call、aplly、bind 本质都是改变 this 的指向，不同点 call、aplly 是直接调用函数，bind 是返回一个新的函数。call 跟 aplly 就只有参数上不同。
:::

### call、apply

call的实现
[参考链接https://github.com/mqyqingfeng/Blog/issues/11](https://github.com/mqyqingfeng/Blog/issues/11)

实现步骤 1. 改变this指向 2. 可以传参

1. 改变`this`指向问题
可以通过`this`的调用方式改变，将函数设置为obj的属性
```javascript
var obj = {
  value: 1,
  fn: function() {
    console.log(this.value)
  }
}
obj.fn() // 1
```
原理：
1. 将函数设置为对象的属性
2. 执行函数
3. 删除属性

实现过程：

第一步：改变this指向
```javascript
Object.prototype.call2 = function(context) {
  console.log('arguments', arguments)
  context.fn = this
  context.fn()
  delete context.fn
}
bar.call2(foo)
```

第二步: 可以传参数
```javascript
Object.prototype.call3 = function(context) {
  console.log('arguments1', arguments)
  let args = []
  for (let index = 1; index < arguments.length; index++) {
    args.push('arguments['+index+']')
  }
  // ES6实现  args = arguments.slice(1)   context.fn(...args)
  console.log('args:', args.toString())
  context.fn = this
  eval('context.fn(' + args +')')
  // args会自动调用toString()
  // context.fun(argument[1], argument[2])
  delete context.fn
}
// bar.call3(foo, 'name', 'age')
```

第三步：1.可以传null(指向window) 2. 函数可以有返回值
```javascript
Object.prototype.call4 = function(context) {
  context = context || window
  context.fn = this
  var args = []
  for (var index = 1; index < arguments.length; index++) {
    args.push('arguments[' + index + ']')
  }
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
}
```

`ES6`
```javascript
  Object.prototype.call2 = function(context) {
    context.fn = this || window
    var args = Array.prototype.slice.call(arguments, 1)
    context.fn(...args)
    delete context.fn
  }
```

apply实现
```javascript
var none = {
  value: [1,2,3]
}
function aaa() {
  console.log('args', arguments)
  console.log('apply-value', this.value)
}
// apply实现
Function.prototype.apply1= function (context, arr) {
    var context = Object(context) || window;
    context.fn = this;

    var result;
    if (!arr) {
        result = context.fn();
    }
    else {
        var args = [];
        for (var i = 0, len = arr.length; i < len; i++) {
            args.push('arr[' + i + ']');
        }
        result = eval('context.fn(' + args + ')')
        // ES6实现  args = arguments[1]   context.fn(...args)
    }

    delete context.fn
    return result;
}
aaa.apply1(none, ['瞎搞','瞎搞1', '瞎搞2'])
```

ES6
```javascript
    Object.prototype.apply1 = function(context, arr) {
      context.fn = this || window
      let result = null
      if (!arr) {
        result = context.fn()
      } else {
        result = context.fn(...arr)
      }
      delete context.fn
      return result
    }
```
### bind
::: tip
bind() 方法会创建一个新函数。当这个新函数被调用时，bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数。(来自于 MDN )
:::

1. 返回一个新函数
2. 可以传入参数

```javascript
Function.prototype.mybind = function(context) {
  var self = this
  // 获取参数
  var args = Array.prototype.slice.call(arguments, 1)
  return function() {
    // bind返回函数的传参
    var innerArgs = Array.prototype.slice.call(arguments)
    return self.apply(context, args.concat(innerArgs))
  }
}
```
::: tip
一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。
::: 

```javascript
Function.prototype.mybind = function(context) {
  // 非函数
  if (typeof this !== "function") {
    throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
  }
  var self = this;
  // 获取参数
  var args = Array.prototype.slice.call(arguments, 1);
  // 参考new的实现原理，新建一个函数，避免影响其它new的对象
  var fnop = function() {};
  var fBound = function() {
    // bind返回函数的传参
    var innerArgs = Array.prototype.slice.call(arguments);
    return self.apply(this instanceof fnop ? this : context, args.concat(innerArgs));
  }
  fnop.prototype = this.prototype;
  fBound.prototype = new fnop();
  return fBound;
}
```

测试`mybind`
```javascript
const bar = function() {
  console.log(this.name, arguments);
};

bar.prototype.name = 'bar';

const foo = {
  name: 'foo'
};

const bound = bar.mybind(foo, 22, 33, 44);
new bound(); // bar, [22, 33, 44]
bound(); // foo, [22, 33, 44]
```

## new 实现
::: tip
我们需要知道当 `new` 的时候做了什么事情
:::

1. 创建一个空的`JavaScript`对象obj。
2. 链接obj（即设置对象的构造函数）到另一个对象上。
3. 将obj作为this的上下文。
4. 如果该函数没有返回对象，则返回创建的新对象。
```javascript
  function myNew() {
    // 创建新对象
    let obj = {}
    
    // 获取外部传入的构造器 
    console.log('arguments', arguments)
    let Constructor = Array.prototype.shift.call(arguments)
    console.log('Constructor:', Constructor)

    // 实现继承，实例可以访问构造器上的属性（形成原型链）
    obj.__proto__ = Constructor.prototype
    
    // obj的作为this的上下文
    let objNew = Constructor.apply(obj, arguments)

    // 如果构造器函数返回的是对象，则返回这个对象，否则返回创建的obj
    return typeof objNew === 'obj' ? Constructor : obj
  }
```

## Object.assign
::: tip
Object.assign() 方法用于将所有**可枚举属性**的值从一个或多个源对象复制到目标对象。**它将返回目标对象**。
:::

1. 核心代码是用`for in`遍历每个属性，
2. 注意<font color=red>writable: true, enumerable: false, configurable: true</font>
```javascript
  Object.defineProperty(Object, 'assign1', {
    value: function assign1(target, varArgs) {
      'user strict';
      if (target == null) {
        throw new TypeError('Cannot convert undefined or null to object');
      }
      var to = Object(target);
      for (var index = 1; index < arguments.length; index++) {
        var nextSource = arguments[index];
        for (var key in nextSource) {
          // // Avoid bugs when hasOwnProperty is shadowed
          if (Object.prototype.hasOwnProperty.call(nextSource, key)) {
            to[key] = nextSource[key]
          }
        }
      }
      return to
    },
    writable: true,
    configurable: true
  })
```
## 手写一个防抖函数
1. window 的 resize、scroll
2. mousedown、mousemove
3. keyup、keydown

::: tip
尽管触发事件，但是我一定在事件触发 n 秒后才执行，如果你在一个事件触发的 n 秒内又触发了这个事件，那我就以新的事件的时间为准，n 秒后才执行，总之，就是要等你触发完事件 n 秒内不再触发事件，我才执行，真是任性呐!
:::

**第一版，解决this和参数**
```javascript
    // 第一版
    function debounce(func, wait) {
      let timeout = null
      return function() {
        let context = this
        let args = arguments
        clearTimeout(timeout)
        timeout = setTimeout(function() {
          func.apply(context, args)
        }, wait)
      }
    }
```

**第二版，立即执行**

```javascript
    // 第二版-立即执行
    function debounce1(func, wait, immediate) {
      let timeout = null
      return function() {
        let context = this
        let args = arguments
        timeout && clearTimeout(timeout)
        if (immediate) {
          console.log('immediate:', timeout)
          // 已执行，则两秒后才执行，清除timeout
          let callNow = !timeout
          timeout = setTimeout(function(){
            timeout = null
          }, wait)
          callNow && func.apply(context, args)
        } else {
          timeout = setTimeout(function() {
            func.apply(context, args)
          }, wait)
        }
      }
    }
```

## 手写一个节流函数

::: tip
持续触发事件，每隔一段时间，只执行一次事件
:::

```javascript
    // 节流-时间戳版本
    function throttle(func, wait) {
      let pretime = 0
      let context
      let args
      return function() {
        context = this
        args = arguments
        let now = +new Date()
        if (now - pretime > wait) {
          func.apply(context, args)
          pretime = now
        }
      }
    }

    // 节流-定时器
    function throttle1(func, wait) {
      let context
      let timeout
      let args
      return function() {
        context = this
        args = arguments
        if (!timeout) {
          timeout = setTimeout(function() {
            timeout = null
            func.apply(context, args)
          }, wait)
        }
      }
    }
```

## reduce 实现
::: tip
reduce() 方法对数组中的每个元素执行一个由您提供的reducer函数(升序执行)，将其结果汇总为单个返回值。
:::

reducer 函数接收4个参数:

1. Accumulator (acc) (累计器)
2. Current Value (cur) (当前值)
3. Current Index (idx) (当前索引)
4. Source Array (src) (源数组)

```javascript
arr.reduce(callback(accumulator, currentValue[, index[, array]])[, initialValue])
```

```javascript
  Array.prototype.reduce1 = function (callback, initValue) {
    // 调用的array
    let curArr = this
    // 上一次的返回值
    let returnValue
    // 起点
    let startIndex

    // 空数组-并且有初始值
    if(curArr.length === 0) {
      return initValue
    }

    // 判断是否有传第二个参数（初始值）
    returnValue = typeof initValue === 'undefined' ? curArr[0] : initValue
    
    // 初始迭代位置
    startIndex = typeof initValue === 'undefined' ? 1 : 0
    
    for (let index = startIndex; index < curArr.length; index++) {
      returnValue = callback(returnValue, curArr[index], index, curArr)
    }

    return returnValue
  }
```
### reduce实现promise顺序执行
```javascript
  const f1 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('f1 running')
      resolve(1)
    })
  })

  const f2 = () => new Promise((resolve, reject) => {
    setTimeout(() => {
      console.log('f2 running')
      resolve(1)
    })
  })

  const fnArray = [f1, f2]

  function runQueuePromise(arr, initValue) {
    return arr.reduce((preChain, curFunction) => preChain.then(curFunction), Promise.resolve(initValue))
  }

  runQueuePromise(fnArray, 'initvalue')

```

### reduce实现pipe

reduce 的另外一个典型应用可以参考函数式方法 pipe 的实现：pipe(f, g, h) 是一个 curry 化函数，它返回一个新的函数，这个新的函数将会完成 (...args) => h(g(f(...args))) 的调用。即 pipe 方法返回的函数会接收一个参数，这个参数传递给 pipe 方法第一个参数，以供其调用。

```javascript
const pipe = (...functions) => input => functions.reduce(
    (f1, f2) => f2(f1),
    input
)

const newPipe = pipe(fn1, fn2)
console.log('pipe:', newPipe('1'))

const pipeAll = (...funcs) => (input) => funcs.reduce((res, cb) => cb && cb(res), input)

```

### reduce实现compose
compose 其实和前面提到的 pipe 一样，就是执行一连串不定长度的任务（方法），比如：

```javascript
let funcs = [fn1, fn2, fn3, fn4]
let composeFunc = compose(...funcs)
composeFunc(args)
fn1(fn2(fn3(fn4(args))))

// compose
fn1(fn2(fn3(fn4(args))))

// pipe
fn4(fn3(fn2(fn1(args))))
```

面向过程的实现：递归
```javascript
  function compose(...args) {
    // 函数数组长度。闭包变量函数数组长度以及遍历索引
    let len = args.length
    // 需要执行的函数个数：总数 - 1（第一次进来，已执行一个）
    let total = len - 1
    // 闭包变量储存结果 result
    let result

    return function fn(...args1) {
      // 从右往左执行函数
      result = args[total].apply(this, args1)
      // 函数数组执行完毕
      if (total <= 0) {
        total = len - 1
        return total
      }
      total--
      return fn.call(null, result)
    }
  }

var step1 = (...args) => 1
let step2 = (val) => val + 2
let step3 = (val) => val + 3
let step4 = (val) => val + 4
const fn = [step4, step3, step2, step1]
const composeFn = compose(...fn)
composeFn()
```

函数式实现：

```javascript
f1 = (...arg) => step2.call(null, init.apply(null, arg))
f2 = (...arg) => step3.call(null, f1.apply(null, arg))
f3 = (...arg) => step4.call(null, f2.apply(null, arg))

const _pipe = (f, g) => (...arg) => g.call(null, f.apply(null, arg))
const compose = (...args) => args.reverse().reduce(_pipe, args.shift())
```

redux版本

```javascript
// Redux 版本
function compose(...funcs) {
    if (funcs.length === 0) {
        return arg => arg
    }

    if (funcs.length === 1) {
        return funcs[0]
    }

    return funcs.reduce((a, b) => (...args) => a(b(...args)))
}
```

```javascript
  const compose = (...args) => x => args.reduceRight((res, cb) => cb(res), x);
```

## instanceof原理
```javascript
  function myInstanceOf( leftValue, rightValue) {
    if (typeof leftValue !== 'object' || leftValue === null) {
      return false
    }

    let leftProto = leftValue.__proto__
    let rightPrototype = rightValue.prototype
    while(true) {
      if (!leftProto) {
        return false
      }
      if (leftProto === rightPrototype) {
        return true
      }
      leftProto = leftProto.__proto__
    }
  }
```

## 实现一个双向数据绑定

## Array.isArray 实现

## Object.create 的基本实现原理

## getOwnPropertyNames 实现

## 数组中的高阶函数实现
### map 
### reducer
### push pop
### filter
### splice
### sort