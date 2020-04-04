## 源码实现
### call、aplly、bind 实现
::: tip
call、aplly、bind 本质都是改变 this 的指向，不同点 call、aplly 是直接调用函数，bind 是返回一个新的函数。call 跟 aplly 就只有参数上不同。
:::

#### bind
1. 箭头函数的 this 永远指向它所在的作用域
2. 函数作为构造函数用 new 关键字调用时，不应该改变其 this 指向，因为 new绑定 的优先级高于 显示绑定 和 硬绑定

```javascript
Function.prototype.mybind = function(thisArg) {
    if (typeof this !== 'function') {
      throw TypeError("Bind must be called on a function");
    }
    // 拿到参数，为了传给调用者
    const args = Array.prototype.slice.call(arguments, 1),
      // 保存 this
      self = this,
      // 构建一个干净的函数，用于保存原函数的原型
      nop = function() {},
      // 绑定的函数
      bound = function() {
        // this instanceof nop, 判断是否使用 new 来调用 bound
        // 如果是 new 来调用的话，this的指向就是其实例，
        // 如果不是 new 调用的话，就改变 this 指向到指定的对象 o
        return self.apply(
          this instanceof nop ? this : thisArg,
          args.concat(Array.prototype.slice.call(arguments))
        );
      };

    // 箭头函数没有 prototype，箭头函数this永远指向它所在的作用域
    if (this.prototype) {
      nop.prototype = this.prototype;
    }
    // 修改绑定函数的原型指向
    bound.prototype = new nop();

    return bound;
  }
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