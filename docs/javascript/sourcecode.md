## 源码实现
### call、aplly、bind 实现
::: tip
call、aplly、bind 本质都是改变 this 的指向，不同点 call、aplly 是直接调用函数，bind 是返回一个新的函数。call 跟 aplly 就只有参数上不同。
:::

#### call、apply

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
  for (let index = 1; index < arguments.length; index++) {
    args.push('arguments[' + index + ']')
  }
  var result = eval('context.fn(' + args + ')')
  delete context.fn
  return result
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

#### bind
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

### new 实现
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

```javascript

```
### class 实现继承
### async/await 实现
### reduce 实现
### 实现一个双向数据绑定
### instanceof 实现
### Array.isArray 实现
### Object.create 的基本实现原理
### getOwnPropertyNames 实现
### promise 实现
### 手写一个防抖/节流函数
### 柯里化函数的实现
### 手写一个深拷贝