# Vue
## Vue生命周期,各阶段做了什么
<img :src="$withBase('/image/vue/vue-lifecycle.png')" alt="foo">

### `beforeCreate`、`created`
::: tip
`beforeCreate`、`created`声明周期是在初始化的时候，在`_init`中执行
:::

<img :src="$withBase('/image/vue/vue-init.png')" alt="foo">

具体代码在`vue/src/core/instance/init.js`中
```javascript
Vue.prototype._init = function() {
      // expose real self
    //...
    vm._self = vm
    initLifecycle(vm) // 初始化生命周期
    initEvents(vm) // 初始化事件
    initRender(vm)
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm) // 初始化props，methods，data，computed等
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    // ...
}
```
1. `beforeCreate`. 不能用props，methods，data，computed等。
2. `initState`. 初始化props，methods，data，computed等。
3. `created`. 此时已经有，props，methods，data，computed等，要用data属性则可以在这里调用。

在这俩个钩子函数执行的时候，并没有渲染 DOM，所以我们也不能够访问 DOM，一般来说，如果组件在加载的时候需要和后端有交互，放在这俩个钩子函数执行都可以，如果是需要访问 props、data 等数据的话，就需要使用 created 钩子函数。

### `beforeMount`、`mounted`
在挂载开始之前被调用：相关的 render 函数首次被调用。

**该钩子在服务器端渲染期间不被调用。**

```javascript
export function mountComponent (
  vm: Component,
  el: ?Element,
  hydrating?: boolean
): Component {
  vm.$el = el
  if (!vm.$options.render) {
    vm.$options.render = createEmptyVNode
    if (process.env.NODE_ENV !== 'production') {
      /* istanbul ignore if */
      // ...
    }
  }
  callHook(vm, 'beforeMount')

  let updateComponent
  /* istanbul ignore if */
  if (process.env.NODE_ENV !== 'production' && config.performance && mark) {
    updateComponent = () => {
      // ...
      vm._update(vnode, hydrating)
      // ...
    }
  } else {
    updateComponent = () => {
      vm._update(vm._render(), hydrating)
    }
  }

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, null, true /* isRenderWatcher */)
  hydrating = false

  // manually mounted instance, call mounted on self
  // mounted is called for render-created child components in its inserted hook
  if (vm.$vnode == null) {
    vm._isMounted = true
    callHook(vm, 'mounted')
  }
  return vm
}
```
在执行 `vm._render()` 函数渲染 VNode 之前，执行了 `beforeMount` 钩子函数，在执行完 `vm._update()` 把 VNode patch 到真实 DOM 后，执行 `mounted` 钩子。


### `beforeUpdate`、`updated`
`beforeUpdate` 和 `updated` 的钩子函数执行时机都应该是在数据更新的时候
```javascript
  Vue.prototype._update = function (vnode: VNode, hydrating?: boolean) {
    const vm: Component = this
    if (vm._isMounted) {
      callHook(vm, 'beforeUpdate')
    }
    const prevEl = vm.$el
    const prevVnode = vm._vnode
    const prevActiveInstance = activeInstance
    activeInstance = vm
    vm._vnode = vnode
    // ...
  }
```
这里有个细节是`_isMounted`, 表示要在`mounted`之后才执行`beforeUpdate`

至于`updated`则表示，当这个钩子被调用时，组件 DOM 已经更新，所以你现在可以执行依赖于 DOM 的操作

### `actived`、`deactivated`
`activated` 和 `deactivated` 钩子函数是专门为 keep-alive 组件定制的钩子

1. `activated`是`keep-alive` 组件激活时调用。
2. `deactivated`是`keep-alive` 组件销毁时调用。

### `beforeDestroy`、`destroyed`
`beforeDestroy` 和 `destroyed` 钩子函数的执行时机在组件销毁的阶段

```javascript
  Vue.prototype.$destroy = function () {
    const vm: Component = this
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy')
    vm._isBeingDestroyed = true
    // remove self from parent
    const parent = vm.$parent
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm)
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown()
    }
    let i = vm._watchers.length
    while (i--) {
      vm._watchers[i].teardown()
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--
    }
    // call the last hook...
    vm._isDestroyed = true
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null)
    // fire destroyed hook
    callHook(vm, 'destroyed')
    // turn off all instance listeners.
    vm.$off()
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null
    }
  }
}
```

### `errorCaptured`
当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

## v-if和v-show

**v-show和v-if**

`v-if`: 真正的条件渲染。false，不在dom中。
`v-show`: 一直在dom中，只是用css的display属性进行切换（存在于html结构中，但是未用css进行渲染）。存在dom结构中，`display:none`时，不在render（渲染树）树中。

**visibility：hidden和display：none**

`display: none`: 标签不会出现在页面上（尽管你仍然可以通过dom与它进行交互）。其它标签不会为它分配空间。
`visibility:hidden`:  标签会出现在页面上，只是看不见而已。其它标签会为它分配空间。


## 组件里的 data 必须是一个函数返回的对象，而不能就只是一个对象
当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果** data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象**！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，**从而返回初始数据的一个全新副本数据对象**。

如果需要，可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到深拷贝的原始数据对象。

## computed，和 data、methods、watch
`computed`

1. 当且仅当计算属性依赖的 data 改变时才会自动计算
2. 有缓存

`methods`

1. 每当触发重新渲染时，调用方法将总会再次执行函数。
2. 无缓存

`watch`

1. 当需要在数据变化时执行异步或开销较大的操作时，这个方式是最有用的。
```javascript
```


## nextTick原理
整体过程：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019101517412329.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvcGVfSXQ=,size_16,color_FFFFFF,t_70)
**Vue的nextTick**
在用Vue写业务代码的时候，遇到过好几次都需要更新数据后重新渲染Dom，当然考虑用`nextTick`实现，借此机会，学习`nextTick`的原理。

Vue中`nextTick`的解析
> 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后立即使用这个方法，获取更新后的 DOM。

用法：
```javascript
// 修改数据
vm.msg = 'Hello'
// DOM 还没有更新
Vue.nextTick(function () {
  // DOM 更新了
})

// 作为一个 Promise 使用 (2.1.0 起新增，详见接下来的提示)
Vue.nextTick()
  .then(function () {
    // DOM 更新了
  })
```

先看看源码（`vue/src/core/util/next-tick.js`）中的`nextTick`的实现过程:
1. push `callbacks`
2. 加`pending`,`pending`此处相当于一个锁,保证执行顺序不错乱
3. `Promise.then`

```javascript
export function nextTick (cb?: Function, ctx?: Object) {
  let _resolve
  callbacks.push(() => {
    if (cb) {
      try {
        cb.call(ctx)
      } catch (e) {
        handleError(e, ctx, 'nextTick')
      }
    } else if (_resolve) {
      _resolve(ctx)
    }
  })
  // 检查上一个异步任务队列（即名为callbacks的任务数组）是否派发和执行完毕了。pending此处相当于一个锁
  if (!pending) {
    // 若上一个异步任务队列已经执行完毕，则将pending设定为true（把锁锁上）
    pending = true
    // 是否要求一定要派发为macro-task
    if (useMacroTask) {
      macroTimerFunc()
    } else {
      // 如果不是，则全部为micro-task
      microTimerFunc()
    }
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(resolve => {
      _resolve = resolve
    })
  }
}
```
可以看到，在nextTick中

Vue 在内部对异步队列尝试使用原生的 `Promise.then`实现。
执行环境不支持，则会采用 `setTimeout(fn, 0)` 代替。具体的实现看一下 `macroTimerFunc()` 和 `microTimerFunc()` 两个方法：

对于`macro-task`与`micro-task`：
> 就是以前(<2.4版本)我们总是使用microtask，不过他的优先级太高会导致一些问题（比如插入一些顺序执行的事件处理之中），但是完全使用macrotask也有一些麻烦，所以我们现在默认使用microtask，在需要的时候再强制使用macrotask。

为什么默认使用microtask呢，原因如下：
<font color=red>task 被推入 macro 队列。但因为 script 脚本本身是一个 macro 任务，所以本次执行完 script 脚本之后，下一个步骤就要去处理 micro 队列了，再往下就去执行了一次 render。所以在macro-task中执行渲染是正确的选择，可以减少一次渲染。</font>

接下来，看看 `microTimerFunc`:
1. 支持`Promise`则用`Promise.then`添加`flushCallbacks`
2. 不支持`Promise`则用设置为`macro-task`
```javascript
let microTimerFunc
let macroTimerFunc
// Determine microtask defer implementation.
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  // 用Promise实现
  const p = Promise.resolve()
  microTimerFunc = () => {
    p.then(flushCallbacks)
    // in problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) setTimeout(noop)
  }
} else {
  // 不兼容Promise，则设置为macro-task
  // fallback to macro
  microTimerFunc = macroTimerFunc
}
```

再看看`macroTimerFunc`实现过程：`setImmediate->MessageChannel->setTimeout(fn,0)`
1. 是setImmediate，则`setImmediate(flushCallbacks)`
2. 用`MessageChannel`对回调进行排队
3. 最后用`setTimeout(flushCallbacks, 0)`代替

```javascript
let microTimerFunc
let macroTimerFunc
// Determine (macro) task defer implementation.
// Technically setImmediate should be the ideal choice, but it's only available
// in IE. The only polyfill that consistently queues the callback after all DOM
// events triggered in the same loop is by using MessageChannel.
/* istanbul ignore if */
if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // 先用 setImmediate，该方法用来把一些需要长时间运行的操作放在一个回调函数里，在浏览器完成后面的其他语句后，就立刻执行这个回调函数。
  // 该特性是非标准的，请尽量不要在生产环境中使用它！兼容性还很不好
  macroTimerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else if (typeof MessageChannel !== 'undefined' && (
  isNative(MessageChannel) ||
  // PhantomJS
  MessageChannel.toString() === '[object MessageChannelConstructor]'
)) {
  const channel = new MessageChannel()
  const port = channel.port2
  channel.port1.onmessage = flushCallbacks
  macroTimerFunc = () => {
    port.postMessage(1)
  }
} else {
  // 以上均不支持，则用setTimeout代替
  /* istanbul ignore next */
  macroTimerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}
```

最后，可以看到，`microTimerFunc`和`macroTimerFunc`都用了`flushCallbacks`这个方法，再仔细看看这个方法：
主要是对当前 callbacks 数组的任务进行派发（丢进 micro 或 macro 队列）和执行
```javascript
function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
    copies[i]()
  }
}
```
## keep-alive

`<keep-alive>` 组件是一个抽象组件，它的实现通过自定义 `render` 函数并且利用了插槽，并且知道了 `<keep-alive>` 缓存 `vnode`，了解组件包裹的子元素——也就是插槽是如何做更新的。且在 `patch` 过程中对于已缓存的组件不会执行 mounted，所以不会有一般的组件的生命周期函数但是又提供了 `activated` 和 `deactivated`钩子函数。另外我们还知道了 `<keep-alive>` 的 `props` 除了 `include` 和 `exclude` 还有文档中没有提到的 `max`，它能控制我们缓存的个数。

## 响应式原理
1. Vue遍历所有的data属性，并用Object.defineProperty把这些属性转化为getter（进行依赖收集）和setter（观察者，在数据变更的时候通知订阅者更新视图），Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是为什么 Vue 不支持 IE8 以及更低版本浏览器
2. 每个组件实例都有相应的watcher实例对象，它会在组建渲染过程中把属性记录为依赖，之后当依赖项的setter被调用时，会通知watcher重新计算，从而使它关联的组件得以更新 

**检测变化的注意事项**
1. 受现代JavaScript的影响（Object.observe已被废弃），Vue无法检测到对象属性的添加和删除。**Vue在初始化实例时对data里面的属性进行getter和setter转化**，所以属性必须在data对象里才能让Vue转化它，这样它才是响应式的

2. Vue不允许在已经创建的实例上动态地添加新的根级别响应属性，但是可以使用Vue.set(Object, key, value)方法添加到嵌套的对象上

```javascript
Vue.set(vm.Prop, 'a', 2)
this.$set(vm.Prop, 'a', 2)

// 向已有对象添加新的属性
Object.assign({}, vm.Prop, {a: 2, b: 3})
```

**dependencies**
当对data上的对象进行修改值的时候会触发它的setter，那么取值的时候自然就会触发getter事件，所以我们只要在最开始进行一次render，此时，可以利用getter将data收集到Dep的subs中去。在对data中的数据进行修改的时候setter只会触发Dep的subs的函数。

**为什么要收集依赖**
```javascript
new Vue({
    template: 
        `<div>
            <span>text1:</span> {{text1}}
            <span>text2:</span> {{text2}}
        <div>`,
    data: {
        text1: 'text1',
        text2: 'text2',
        text3: 'text3'
    }
});
```
当text3改变的时候，还是会触发setter方法，导致重新执行渲染，这是不正确的。
