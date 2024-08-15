
## MVVM

> MVVM和MVC的区别；ViewModel存在目的在于抽离Controller中展示的业务逻辑；MVVM通过数据来显示视图层而不是节点操作


MVVM 由以下三个内容组成

- View：界面
- Model：数据模型
- ViewModel：作为桥梁负责沟通 View 和 Model

在 JQuery 时期，如果需要刷新 UI 时，需要先取到对应的 DOM 再更新 UI，这样数据和业务的逻辑就和页面有强耦合。

在 MVVM 中，最核心的也就是数据双向绑定，例如 Angluar 的脏数据检测，Vue 中的数据劫持。

`MVVM 到底是什么？与其专注于说明 MVVM 的来历，不如让我们看一个典型的应用是如何构建的，并从那里了解 MVVM：`

<img :src="$withBase('/image/vue/mvvm1.png')" alt="foo">

这是一个典型的 MVC 设置。Model 呈现数据，View 呈现用户界面，而 View Controller 调节它两者之间的交互。

虽然 View 和 View Controller 是技术上不同的组件，但它们几乎总是手牵手在一起，成对的。

可以尝试将它们联系：

<img :src="$withBase('/image/vue/mvc.png')" alt="foo">

在典型的 MVC 应用里，许多逻辑被放在 View Controller 里。它们中的一些确实属于 View Controller，但更多的是所谓的“表示逻辑（presentation logic）”。

以 MVVM 属术语来说，就是那些将 Model 数据转换为 View 可以呈现的东西的事情，例如将一个 NSDate 转换为一个格式化过的 NSString。

我们的图解里缺少某些东西，那些使我们可以把所有表示逻辑放进去的东西。我们打算将其称为 “View Model” —— 它位于 View/Controller 与 Model 之间：

<img :src="$withBase('/image/vue/mvvm.png')" alt="foo">

这个图解准确地描述了什么是 MVVM：一个 MVC 的增强版，我们正式连接了视图和控制器，并将表示逻辑从 Controller 移出放到一个新的对象里，即 View Model。

##  v-if和v-show

**v-show和v-if**

1. `v-if`: 真正的条件渲染。false，`不在dom中`。
2. `v-show`: 一直在dom中，只是用css的display属性进行切换（`存在于html结构中，但是未用css进行渲染`）。存在dom结构中
3. `display:none`时，不在render（渲染树）树中。

**visibility：hidden和display：none**

`display: none`: 标签不会出现在页面上（尽管你仍然可以通过dom与它进行交互）。其它标签不会为它分配空间。
`visibility:hidden`:  标签会出现在页面上，只是看不见而已。其它标签会为它分配空间。


## 组件里的 data 必须是一个函数返回的对象，而不能就只是一个对象
当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，**从而返回初始数据的一个全新副本数据对象**。

如果需要，可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到深拷贝的原始数据对象。

## 组件通信

### props emit
父传子：props
子传父：emit

`问题：多级嵌套组件`

### provide / inject
这对选项需要一起使用，以允许一个祖先组件向其所有子孙后代注入一个依赖，不论组件层次有多深，并在其上下游关系成立的时间里始终生效。

element-ui的button组件, 部分源码
```javascript
// Button 组件核心源码
export default {
    name: 'ElButton',
    // 通过 inject 获取 elForm 以及 elFormItem 这两个组件
    inject: {
        elForm: {
            default: ''
        },
        elFormItem: {
            default: ''
        }
    },
    // ...
    computed: {
        _elFormItemSize() {
            return (this.elFormItem || {}).elFormItemSize;
        },
        buttonSize() {
            return this.size || this._elFormItemSize || (this.$ELEMENT || {}).size;
        },
        //...
    },
    // ...
};
```

`问题：不能够实现子组件向祖先组件传递数据`

### `$attrs`  `$listeners`
上述的`provide`和`inject`实现了多层级组件数据的传输，但是`不能够实现子组件向祖先组件传递数据`，如果要实现子传祖，可以使用`$ attrs和$ listeners`


### Vuex
vuex单独用一篇文章分析

### EventBus
对于一些没有必要引进vuex的项目，可考虑

事件总线：`EventBus`可以用来很方便的实现兄弟组件和跨级组件的通信，但是使用不当时也会带来很多问题(`vue是单页应用，如果你在某一个页面刷新了之后，与之相关的EventBus会被移除，这样就导致业务走不下去`)；所以适合逻辑并不复杂的小页面，逻辑复杂时还是建议使用vuex
```javascript
class EventBus{
    constructor(){
        // 一个map，用于存储事件与回调之间的对应关系
        this.event=Object.create(null);
    };
    //注册事件
    on(name,fn){
        if(!this.event[name]){
            //一个事件可能有多个监听者
            this.event[name]=[];
        };
        this.event[name].push(fn);
    };
    //触发事件
    emit(name,...args){
        //给回调函数传参
        this.event[name]&&this.event[name].forEach(fn => {
            fn(...args)
        });
    };
    //只被触发一次的事件
    once(name,fn){
        //在这里同时完成了对该事件的注册、对该事件的触发，并在最后取消该事件。
        const cb=(...args)=>{
            //触发
            fn(...args);
            //取消
            this.off(name,fn);
        };
        //监听
        this.on(name,cb);
    };
    //取消事件
    off(name,offcb){
        if(this.event[name]){
            let index=this.event[name].findIndex((fn)=>{
                return offcb===fn;
            })
            this.event[name].splice(index,1);
            if(!this.event[name].length){
                delete this.event[name];
            }
        }
    }
}
```

具体理解可以看看这篇文章
[Vue组件数据通讯新姿势：$attrs 和 $listeners](https://www.codercto.com/a/62224.html#:~:text=%E5%AE%98%E6%96%B9%E8%A7%A3%E9%87%8A%E7%9A%84%E5%B7%B2%E7%BB%8F%E9%9D%9E%E5%B8%B8%E7%9A%84%E6%B8%85%E6%A5%9A%E4%BA%86%E3%80%82.%20%E4%BA%8B%E5%AE%9E%E4%B8%8A%EF%BC%8C%E4%BD%A0%E5%8F%AF%E4%BB%A5%E6%8A%8A%20%24attrs%20%E5%92%8C%20%24listeners%20%E6%AF%94%E4%BD%9C%E4%B8%A4%E4%B8%AA%E9%9B%86%E5%90%88%EF%BC%8C%E5%85%B6%E4%B8%AD%20%24attrs%20%E6%98%AF%E4%B8%80%E4%B8%AA%E5%B1%9E%E6%80%A7%E9%9B%86%E5%90%88%EF%BC%8C%E8%80%8C,%EF%BC%89%20%EF%BC%8C%E4%B8%80%E8%88%AC%E7%94%A8%E5%9C%A8%E5%AD%90%E7%BB%84%E4%BB%B6%E7%9A%84%E5%AD%90%E5%85%83%E7%B4%A0%E4%B8%8A%EF%BC%9B%20%24listeners%20%E6%98%AF%E4%B8%80%E4%B8%AA%E5%AF%B9%E8%B1%A1%EF%BC%8C%E9%87%8C%E9%9D%A2%E5%8C%85%E5%90%AB%E4%BA%86%E4%BD%9C%E7%94%A8%E5%9C%A8%E8%BF%99%E4%B8%AA%E7%BB%84%E4%BB%B6%E4%B8%8A%E7%9A%84%E6%89%80%E6%9C%89%E7%9B%91%E5%90%AC%E5%99%A8%EF%BC%8C%E9%85%8D%E5%90%88%20v-on%20%E5%B0%86%E6%89%80%E6%9C%89%E4%BA%8B%E4%BB%B6%E7%9B%91%E5%90%AC%E5%99%A8%E6%8C%87%E5%90%91%E8%BF%99%E4%B8%AA%E7%BB%84%E4%BB%B6%E7%9A%84%E6%9F%90%E4%B8%AA%E7%89%B9%E5%AE%9A%E7%9A%84%E5%AD%90%E5%85%83%E7%B4%A0%EF%BC%88%20%E7%9B%B8%E5%BD%93%E4%BA%8E%E5%AD%90%E7%BB%84%E4%BB%B6%E7%BB%A7%E6%89%BF%E7%88%B6%E7%BB%84%E4%BB%B6%E7%9A%84%E4%BA%8B%E4%BB%B6%20%EF%BC%89%E3%80%82.)

## Vue生命周期,各阶段做了什么

<img :src="$withBase('/image/vue/vue-lifecycle.png')" alt="foo">

### `beforeCreate`、`created`
::: tip
`beforeCreate`、`created`生命周期是在初始化的时候，在`_init`中执行
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

在`beforeCreate`、`initState`这俩个钩子函数执行的时候，并没有渲染 DOM，所以我们也不能够访问 DOM，一般来说，如果组件在加载的时候需要和后端有交互，放在这俩个钩子函数执行都可以，如果是需要访问 props、data 等数据的话，就需要使用 created 钩子函数。

### `beforeMount`、`mounted`
::: tip
挂载是指将编译完成的HTML模板挂载到对应虚拟dom
:::

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
`beforeDestroy` 钩子函数的执行时机是在 `$destroy` 函数执行最开始的地方，接着执行了一系列的销毁动作，包括从 `parent` 的 `$children` 中删掉自身，删除 `watcher`，当前渲染的 VNode 执行销毁钩子函数等，执行完毕后再调用 `destroy` 钩子函数。

在 `$destroy` 的执行过程中，它又会执行 `vm.__patch__(vm._vnode, null)` 触发它子组件的销毁钩子函数，这样一层层的递归调用，所以 `destroy` 钩子函数执行顺序是先子后父，和 `mounted` 过程一样。

#### `actived`、`deactivated`
`activated` 和 `deactivated` 钩子函数是专门为 keep-alive 组件定制的钩子

1. `activated`是`keep-alive` 组件激活时调用。
2. `deactivated`是`keep-alive` 组件销毁时调用。

### `errorCaptured`
当捕获一个来自子孙组件的错误时被调用。此钩子会收到三个参数：错误对象、发生错误的组件实例以及一个包含错误来源信息的字符串。此钩子可以返回 false 以阻止该错误继续向上传播。

## new Vue发生了什么
1. 调用_init合并配置，初始化生命周期，初始化事件中心，初始化渲染，初始化 data、props、computed、watcher 等等
2. 通过 `Object.defineProperty` 设置 `setter` 与 `getter` 函数，用来实现响应式以及依赖收集

## 响应式原理

当创建 Vue 实例时,vue 会遍历 data 选项的属性,利用 Object.defineProperty 为属性添加 getter 和 setter 对数据的读取进行劫持（getter 用来依赖收集,setter 用来派发更新）,并且在内部追踪依赖,在属性被访问和修改时通知变化。

在Vue中，`每个组件实例会有相应的 watcher 实例,会在组件渲染的过程中记录依赖的所有数据属性（进行依赖收集,还有 computed watcher,user watcher 实例）,之后依赖项被改动时,setter 逻辑会通知依赖与此 data 的 watcher 实例重新计算（派发更新）,从而使它关联的组件重新渲染。————这是一个典型的观察者模式`

一句话总结:
vue.js 采用数据劫持结合发布-订阅模式,通过 Object.defineproperty 来劫持各个属性的 setter,getter,在数据变动时发布消息给订阅者,触发响应的监听回调

**Vue.js 是采用数据劫持结合发布者 - 订阅者模式的方式，通过 Object.defineProperty() 来劫持各个属性的 setter，getter，在数据变动时发布消息给订阅者，触发相应的监听回调。主要分为以下几个步骤：（1）需要 observe 的数据对象进行递归遍历，包括子属性对象的属性，都加上 setter 和 getter 这样的话，给这个对象的某个值赋值，就会触发 setter，那么就能监听到了数据变化（2）compile 解析模板指令，将模板中的变量替换成数据，然后初始化渲染页面视图，并将每个指令对应的节点绑定更新函数，添加监听数据的订阅者，一旦数据有变动，收到通知，更新视图。（3）Watcher 订阅者是 Observer 和 Compile 之间通信的桥梁，主要做的事情是: ①在自身实例化时往属性订阅器 (dep) 里面添加自己 ②自身必须有一个 update()方法 ③待属性变动 dep.notice()通知时，能调用自身的 update()方法，并触发 Compile 中绑定的回调，则功成身退。（4）MVVM 作为数据绑定的入口，整合 Observer、Compile 和 Watcher 三者，通过 Observer 来监听自己的 model 数据变化，通过 Compile 来解析编译模板指令，最终利用 Watcher 搭起 Observer 和 Compile 之间的通信桥梁，达到数据变化 -> 视图更新；视图交互变化 (input) -> 数据 model 变更的双向绑定效果。**


### 核心角色
* Observer（监听器）：给对象添加getter和setter，用于依赖搜集和派发更新。不仅是一个数据监听器，也是发布者；
* Watcher（订阅者）：observer 把数据转发给了真正的订阅者——watcher对象。watcher 接收到新的数据后，会去更新视图。watcher实例分为渲染watcher(render watcher), computed watcher, 侦听器user watcher。维护了一个deps（用于收集依赖）的实例数组。二次依赖收集时，cleanupDeps 在每次添加完新的订阅，会移除掉旧的订阅的deps；
* compile（编译器）：MVVM 框架特有的角色，负责对每个节点元素指令进行扫描和解析，指令的数据初始化、订阅者的创建这些“杂活”也归它管；
* Dep：用于收集当前响应式对象的依赖关系，每个响应式对象都有一个Dep实例（里边subs是Watcher实例数组），数据变更触发setter逻辑时，通过`dep.notify()`(遍历subs，调用每个Watcher的update()方法)通知各个Watcher

`核心角色的关系如下:`
<img :src="$withBase('/image/vue/model1.png')" alt="foo">

### 核心代码
`实现observer`
```javascript
// 遍历对象
function observer(target) {
  // target是对象，则遍历
  if (target && typeof target === 'object') {
    Object.keys(target).forEach(key => {
      defineReactive(target, key, target[key])
    })
  }
}

// 用defineProperty监听当前属性
function defineReactive(target, key, val) {
  const dep = new Dep()
  // 递归
  observer(val)
  Object.defineProperty(target, key, {
    // 可枚举
    enumerable: true,
    // 不可配置
    configurable: false,
    get: function() {
      return val
    },
    set: function(value) {
      console.log(val, value)
      val = value
    }
  })
}
```
`实现dep`订阅者
```javascript
class Dep {
  constructor() {
    // 初始化订阅队列
    this.subs = []
  }
  // 增加订阅
  addSub(sub) {
    this.subs.push(sub)
  }
  // 通知订阅者
  notify() {
    this.subs.forEach(sub => {
      sub.update()
    })
  }
}
```

`订阅者Dep里的subs数组是Watcher实例`

`实现Watcher类`
```javascript
class Watcher {
  constructor() {}
  update() {
    // 更新视图
  }
}
```

改写 defineReactive 中的 setter 方法，在监听器里去通知订阅者了：
```javascript
// 用defineProperty监听当前属性
function defineReactive(target, key, val) {
  const dep = new Dep()
  // 递归
  observer(val)
  Object.defineProperty(target, key, {
    // 可枚举
    enumerable: true,
    // 不可配置
    configurable: false,
    get: function() {
      return val
    },
    set: function(value) {
      console.log(val, value)
      dep.notify()
    }
  })
}
```

### Watcher和Dep的关系
watcher 中实例化了 dep 并向 dep.subs 中添加了订阅者, dep 通过 notify 遍历了 dep.subs 通知每个 watcher 更新。

### computed 和 watch
computed 本质是一个惰性求值的观察者。

computed 内部实现了一个惰性的 watcher,也就是 computed watcher,computed watcher 不会立刻求值,同时持有一个 dep 实例。
其内部通过 this.dirty 属性标记计算属性是否需要重新求值。

当 computed 的依赖状态发生改变时,就会通知这个惰性的 watcher,
computed watcher 通过 this.dep.subs.length 判断有没有订阅者,
有的话,会重新计算,然后对比新旧值,如果变化了,会重新渲染。 (Vue 想确保不仅仅是计算属性依赖的值发生变化，而是当计算属性最终计算的值发生变化时才会触发渲染 watcher 重新渲染，本质上是一种优化。)

没有的话,仅仅把 this.dirty = true。 (当计算属性依赖于其他数据时，属性并不会立即重新计算，只有之后其他地方需要读取属性的时候，它才会真正计算，即具备 lazy（懒计算）特性。)

`区别`

computed 计算属性 : 依赖其它属性值,并且 computed 的值有缓存,只有它依赖的属性值发生改变,下一次获取 computed 的值时才会重新计算 computed 的值。

watch 侦听器 : 更多的是「观察」的作用,无缓存性,类似于某些数据的监听回调,每当监听的数据变化时都会执行回调进行后续操作。


### 依赖收集
1. initState时，对computed属性初始化时，触发`computed Watcher`依赖收集
2. initState时，对watch属性初始化时，触发`user Watcher`依赖收集
3. render()的过程，触发`render watcher`依赖收集
4. re-render时，vm.render()再次执行，会移除subs的订阅，重新赋值

### 派发更新
1. 组件中，对响应式的数据进行了修改，触发setter的逻辑
2. 调用dep.notity()
3. 遍历dep.subs(Watcher 实例)，调用每个Watcehr 的 update()
4. update()过程，又利用了队列做了进一步优化，在 nextTick 后执行所有 watcher 的 run，最后执行它们的回调函数。

## nextTick 的原理
假如我在一个for循环中改变当前组件依赖的数据，改变一万次，会有什么效果？(讲到批量更新和 nextTick 原理)
整体过程：
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019101517412329.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvcGVfSXQ=,size_16,color_FFFFFF,t_70)

#### JS运行机制

JS 执行是单线程的，它是基于事件循环的。事件循环大致分为以下几个步骤:

1. 所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
2. 主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
3. 一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
4. 主线程不断重复上面的第三步。

主线程的执行过程就是一个 tick，而所有的异步结果都是通过 “任务队列” 来调度。 消息队列中存放的是一个个的任务（task）。 规范中规定 task 分为两大类，分别是 macro task 和 micro task，并且每个 macro task 结束后，都要清空所有的 micro task。

```javascript
for (macroTask of macroTaskQueue) {  
  // 1. Handle current MACRO-TASK  
  handleMacroTask();  
  // 2. Handle all MICRO-TASK  
  for (microTask of microTaskQueue) {    
    handleMicroTask(microTask);  
}}
```

在浏览器环境中 :

常见的 macro task 有 setTimeout、MessageChannel、postMessage、setImmediate

常见的 micro task 有 MutationObsever 和 Promise.then

#### 异步更新队列

例题解答：number` 会被不停地进行 `++` 操作，不断地触发它对应的 `Dep` 中的 `Watcher` 对象的 `update` 方法。然后最终 `queue` 中因为对相同 `id` 的 `Watcher` 对象进行了筛选（过滤），从而 `queue` 中实际上只会存在一个 `number` 对应的 `Watcher` 对象。在下一个 tick 的时候（此时 `number` 已经变成了 1000），触发 `Watcher` 对象的 `run` 方法来更新视图，将视图上的 `number` 从 0 直接变成 1000。

如果同一个 watcher 被多次触发，只会被推入到队列中一次。这种在缓冲时去除重复数据对于避免不必要的计算和 DOM 操作是非常重要的。

Vue 在内部对异步队列尝试使用原生的 Promise.then、MutationObserver 和 setImmediate，如果执行环境不支持，则会采用 setTimeout(fn, 0) 代替。

<font color=red>在 vue2.5 的源码中，macrotask 降级的方案依次是：setImmediate、MessageChannel、setTimeout</font>

vue 的 nextTick 方法的实现原理:

1. vue 用异步队列的方式来控制 DOM 更新和 nextTick 回调先后执行
2. microtask 因为其高优先级特性，能确保队列中的微任务在一次事件循环前被执行完毕
3. 考虑兼容问题,vue 做了 microtask 向 macrotask 的降级方案

## Vue 的响应式对数组是如何处理

1. 对数组中所有能改变数组自身的方法，如 push、pop 等这些方法进行重写。
2. 然后手动调用 `dep.notify()`, 通知 `render watcher`, 执行 update


##  computed 属性为什么能够在依赖改变的时候，自己发生变化
<img :src="$withBase('/image/vue/computed.png')" alt="foo">

computed 和 watch 公用一个 Watcher 类，在 computed 的情况下有一个 deps 。 Vue 在二次收集依赖时用 cleanupDeps 在每次添加完新的订阅，会移除掉旧的订阅

## defineProperty有什么缺点
在对一些属性进行操作时，使用这种方法无法拦截，

比如**通过下标方式修改数组数据**或者**给对象新增属性**，这都不能触发组件的重新渲染，因为 Object.defineProperty 不能拦截到这些操作。更精确的来说，对于数组而言，大部分操作都是拦截不到的，**只是 Vue 内部通过重写函数的方式解决了这个问题**。

在 Vue3.0 中已经不使用这种方式了，而是通过使用 Proxy 对对象进行代理，从而实现数据劫持。

使用Proxy 的好处是它可以完美的监听到任何方式的数据改变，唯一的缺点是兼容性的问题，因为 Proxy 是 ES6 的语法。

## 为什么在 Vue3.0 采用了 Proxy,抛弃了 Object.defineProperty

1. Object.defineProperty 本身有一定的监控到数组下标变化的能力, 但是在 Vue 中,从性能/体验的性价比考虑,尤大大就弃用了这个特性(Vue 为什么不能检测数组变动 )。为了解决这个问题,经过 vue 内部处理后可以使用以下几种方法来监听数组
```javascript
push();
pop();
shift();
unshift();
splice();
sort();
reverse();
```
2. Object.defineProperty 只能劫持对象的属性,因此我们需要对每个对象的每个属性进行遍历。`如果属性值也是对象那么需要深度遍历, 显然如果能劫持一个完整的对象是才是更好的选择`。  
3. Proxy 可以劫持整个对象,并返回一个新的对象。Proxy 不仅可以代理对象,还可以代理数组。还可以代理动态增加的属性。

## Vue 中的 key 到底有什么用
::: tip
key 是给每一个 vnode 的唯一 id,依靠 key,我们的 diff 操作可以更准确、更快速 (对于简单列表页渲染来说 diff 节点也更快,但会产生一些隐藏的副作用,比如可能不会产生过渡效果,或者在某些节点有绑定数据（表单）状态，会出现状态错位。
:::

diff 算法的过程中,先会进行新旧节点的首尾交叉对比,当无法匹配的时候会用新节点的 key 与旧节点进行比对,从而找到相应旧节点

更准确 : 因为带 key 就不是就地复用了,在 sameNode 函数 a.key === b.key 对比中可以避免就地复用的情况。所以会更加准确,如果不加 key,会导致之前节点的状态被保留下来,会产生一系列的 bug。

更快速 : key 的唯一性可以被 Map 数据结构充分利用,相比于遍历查找的时间复杂度 O(n),Map 的时间复杂度仅仅为 O(1)

## Vue组件的渲染过程
1. 把模板编译为render函数；调用 Vue.compile 函数,生成 render 函数字符串 ,编译过程如下:
   * parse 函数解析 template,生成 ast(抽象语法树)
   * optimize 函数优化静态节点 (标记不需要每次都更新的内容,diff 算法会直接跳过静态节点,从而减少比较的过程,优化了 patch 的性能)
   * generate 函数生成 render 函数字符串

2. 调用 new Watcher 函数,监听数据的变化,当数据发生变化时; Render 函数执行生成 vnode 对象
3. 调用 patch 方法,对比新旧 vnode 对象,通过 DOM diff 算法,($mount)添加、修改、删除真正的 DOM 元素。

## keep-alive 的实现原理和缓存策略
```javascript
export default {
  name: "keep-alive",
  abstract: true, // 抽象组件属性 ,它在组件实例建立父子关系的时候会被忽略,发生在 initLifecycle 的过程中
  props: {
    include: patternTypes, // 被缓存组件
    exclude: patternTypes, // 不被缓存组件
    max: [String, Number] // 指定缓存大小
  },

  created() {
    this.cache = Object.create(null); // 缓存
    this.keys = []; // 缓存的VNode的键
  },

  destroyed() {
    for (const key in this.cache) {
      // 删除所有缓存
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted() {
    // 监听缓存/不缓存组件
    this.$watch("include", val => {
      pruneCache(this, name => matches(val, name));
    });
    this.$watch("exclude", val => {
      pruneCache(this, name => !matches(val, name));
    });
  },

  render() {
    // 获取第一个子元素的 vnode
    const slot = this.$slots.default;
    const vnode: VNode = getFirstComponentChild(slot);
    const componentOptions: ?VNodeComponentOptions =
      vnode && vnode.componentOptions;
    if (componentOptions) {
      // name不在inlcude中或者在exlude中 直接返回vnode
      // check pattern
      const name: ?string = getComponentName(componentOptions);
      const { include, exclude } = this;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode;
      }

      const { cache, keys } = this;
      // 获取键，优先获取组件的name字段，否则是组件的tag
      const key: ?string =
        vnode.key == null
          ? // same constructor may get registered as different local components
            // so cid alone is not enough (#3269)
            componentOptions.Ctor.cid +
            (componentOptions.tag ? `::${componentOptions.tag}` : "")
          : vnode.key;
      // 命中缓存,直接从缓存拿vnode 的组件实例,并且重新调整了 key 的顺序放在了最后一个
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      }
      // 不命中缓存,把 vnode 设置进缓存
      else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        // 如果配置了 max 并且缓存的长度超过了 this.max，还要从缓存中删除第一个
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }
      // keepAlive标记位
      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0]);
  }
};
```
### 原理
1. 获取 keep-alive 包裹着的第一个子组件对象及其组件名

2. 根据设定的 include/exclude（如果有）进行条件匹配,决定是否缓存。不匹配,直接返回组件实例

3. 根据组件 ID 和 tag 生成缓存 Key,并在缓存对象中查找是否已缓存过该组件实例。如果存在,直接取出缓存值并更新该 key 在 this.keys 中的位置(更新 key 的位置是实现 LRU 置换策略的关键)

4. 在 this.cache 对象中存储该组件实例并保存 key 值,之后检查缓存的实例数量是否超过 max 的设置值,超过则根据 LRU 置换策略删除最近最久未使用的实例（即是下标为 0 的那个 key）

5. 最后组件实例的 keepAlive 属性设置为 true,这个在渲染和执行被包裹组件的钩子函数会用到

### 缓存策略
LRU （Least Recently Used）缓存策略：从内存中找出最久未使用的数据置换新的数据。

核心思想是“如果数据最近被访问过，那么将来被访问的几率也更高。

最常见的实现是使用一个链表保存缓存数据，详细算法实现如下：

1. 新数据插入到链表头部；
2. 每当缓存命中（即缓存数据被访问），则将数据移到链表头部；
3. 链表满的时候，将链表尾部的数据丢弃；

## vue 的性能优化
1. cache函数，利用闭包缓存

2. 二次依赖收集时，cleanupDeps, 剔除上一次存在但本次渲染不存在的依赖

3. traverse,处理深度监听数据，解除循环引用

4. 编译优化阶段，optimize的主要作用是标记 static 静态节点

5. keep-alive组件利用lRU缓存淘汰

6. 异步组件，分两次渲染


## Vue2.0引入虚拟 DOM 的目的是什么

[Vue 为什么要用虚拟 DOM (Virtual DOM)](https://learnku.com/articles/50487)

1. 可以接受 Parser 解析转化，抽象了原本的渲染过程，实现了跨平台的能力。
2. 跨平台的能力。渲染到 DOM 以外的平台, 实现 SSR、同构渲染这些高级特性。

## 说一说Vue diff
### 过程

1. 先同级比较再比较子节点

2. 先判断一方有子节点和一方没有子节点的情况。如果新的一方有子节点，旧的一方没有，相当于新的子节点替代了原来没有的节点；同理，如果新的一方没有子节点，旧的一方有，相当于要把老的节点删除。

3. 再来比较都有子节点的情况，这里是diff的核心。首先会通过判断两个节点的key、tag、isComment、data同时定义或不定义以及当标签类型为input的时候type相不相同来确定两个节点是不是相同的节点，如果不是的话就将新节点替换旧节点。

4. 如果是相同节点的话才会进入到patchVNode阶段。在这个阶段核心是采用<font color=red>双指针</font>的算法，同时从新旧节点的两端进行比较，在这个过程中，会用到模版编译时的静态标记配合key来跳过对比静态节点，如果不是的话再进行其它的比较。

举例说明：

```javascript
// old arr
["a", "b", "c", "d", "e", "f", "g", "h"]
// new arr
["a", "b", "d", "f", "c", "e", "x", "y", "g", "h"]
```
1. 从头到尾开始比较，[a,b]是sameVnode，进入patch，到 [c] 停止;

2. 从尾到头开始比较，[h,g]是sameVnode，进入patch，到 [f] 停止;

3. 判断旧数据是否已经比较完毕，多余的说明是新增的，需要mount(本例中没有)

4. 判断新数据是否已经比较完毕，多余的说明是删除的，需要unmount(本例中没有)

5. patchVNode阶段。在这个阶段核心是采用<font color=red>双指针</font>的算法，同时从新旧节点的两端进行比较，在这个过程中，会用到模版编译时的静态标记配合key来跳过对比静态节点，如果不是的话再进行其它的比较。


缺点：因为采用的是同级比较，所以如果发现本级的节点不同的话就会将新节点之间替换旧节点，不会再去比较其下的子节点是否有相同

### vue2、vue3和react比较
**Vue2、Vue3**

Vue3.x借鉴了ivi算法和inferno算法。

它在创建VNode的时候就确定了其类型，以及在mount/patch的过程中采用位运算来判断一个VNode的类型，在这个基础之上再配合核心的Diff算法，使得性能上较Vue2.x有了提升

**vue 和 react**

相同是都是用同层比较，不同是 vue使用双指针比较，react 是用 key 集合级比较

## 实现一个MVVM
**想完成这个过程，我们需要：**

1. 收集视图依赖了哪些数据
2. 感知被依赖数据的变化
3. 数据变化时，自动“通知”需要更新的视图部分，并进行更新

这个过程换成对应的技术概念就是：

1. 依赖收集(getter)
2. 数据劫持 / 数据代理(proxy defineProperry)
3. 发布订阅模式(dep, watcher)


**数据劫持与代理**

Object.defineProperty 实现。这个方法可以定义数据的 getter 和 setter

proxy

**发布订阅**
```javascript
class Notify {
  constructor() {
    this.subscribers = []
  }
  add(handler) {
    this.subscribers.push(handler)
  }
  emit() {
    this.subscribers.forEach(subscriber => subscriber())
  }
}

let notify = new Notify()

notify.add(() => {
    console.log('emit here')
})

notify.emit()
// emit here
```

## vue3
### vue3优化
1. 更好的代码管理方式：monorepo；（vue2托管在src，依据功能拆分出compiler、core等；vue3采用monorepo，package 有各自的 API、类型定义和测试。这样使得模块拆分更细）
2. 有类型的 JavaScript：TypeScript；vue2（Flow）
3. tree-shaking；tree-shaking 依赖 ES2015 模块语法的静态结构（即 import 和 export），通过编译阶段的静态分析，找到没有引入的模块并打上标记。
4. 数据劫持优化；
    * defineProperty（不能检测对象属性的添加和删除 $set 和 $delete）；深层嵌套
    * Proxy劫持整个对象；深层嵌套：getter 中去递归响应式

5. 编译优化；Vue.js 将 vnode 更新性能由与模版整体大小相关提升为与动态内容的数量相关
6. Composition API；
    * 优化逻辑的组织；某个逻辑关注点相关的代码全都放在一个函数里；
    * 优化逻辑复用；mixins（命名冲突和数据来源不清晰）

### 组件的实现

## vuex原理
vuex说白了，就是一个vue的插件。

要实现的就是Vue.use(Vuex)，这是vue安装插件的机制，需要Vuex对外暴露一个install方法，会把Vue传递给install这个函数
### 1. 插件机制
暴露install方法，并在Vue.prototype上挂载$store

```javascript
class Store {
  constructor() {
    this.name = 'dajun'
  }
}


function install(Vue) {
  Vue.prototype.$store = new Store()
}
export default { Store, install }
```
### 2. 传递store
`store`是通过`new Vue`传递进来的，我们需要使用mixin在beforeCreated来挂载，这样才能通过`this.$option`获取传递进来的store

```javascript
let Vue
class Store {
  constructor(options = {}) {
    this.name = 'dajun'
  }
}

// vue插件机制
let install = function (vue) {
  Vue = vue
  vue.mixin({
    beforeCreate() {
      // 根组件才有store
      if (this.$options && this.$options.store) {
        vue.prototype.$store = this.$options.store
      } else {
        // 子组件
        vue.prototype.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default {
  Store,
  install
}
```
### 3. state
单项数据渲染：单纯的传参

```javascript
class Store {
  constructor(options = {}) {
    this.state = options.state
  }
}
```
### 4. 响应式
比较简单的方式就是借助Vue的响应式

```javascript
let Vue
class Store {
  constructor(options = {}) {
    this.vm = new Vue({
      data:{
        state: options.state
      }
    })
  }
}

// vue插件机制
let install = function (vue) {
  Vue = vue
  vue.mixin({
    beforeCreate() {
      // 根组件才有store
      if (this.$options && this.$options.store) {
        vue.prototype.$store = this.$options.store
      } else {
        // 子组件
        vue.prototype.$store = this.$parent && this.$parent.$store
      }
    }
  })
}

export default {
  Store,
  install
}
```

### 5. getter
可以使用Object.defineProperty代理一个getter，获取getter的值，执行函数计算。最后挂载到$store.getters

```javascript
defineGetters(options) {
  this.getters = {}
  let getters = options.getters || {}
  Object.keys(getters).forEach(key=>{
      Object.defineProperty(this.getters, key, {
          get:()=>{
            console.log('this.state', this.state)
            return getters[key](this.state)
          }
      })
  })
}
```

```javascript
const vuexObj = new Vuex.Store({
  state: {
    num: 2
  },
  getters: {
    getNum(state) {
      return state.num + 1
    }
  },
  mutations: {},
  actives: {},
  modules: {}
})
```
### 6. mutation
参考一下`vuex`中`mutaion`的使用，只需要记录函数，commit的时候更新数据
```javascript
class Store {
  constructor(options = {}) {
    // 增加响应式
    this.vm = new Vue({
      data:{
        state: options.state
      }
    })
    // mutations
    this.defineMutations(options)
  }
  defineMutations(options) {
    this.mutations = {}
    let mutations = options.mutations || {}
    Object.keys(mutations).forEach(mutationName=>{
        this.mutations[mutationName] = (arg) => {
          mutations[mutationName](this.state, arg)
        }
    })
  }
  commit = (method, arg) => {
    console.log(`commit:mutations:${method}===>`, method)
    this.mutations[method](arg)
  }
  // 为了能直接访问state
  get state() {
    return this.vm.state
  }
}
```
### 7. action
action的实现，基本和mutation类似
```javascript
class Store {
  constructor(options = {}) {
    // 增加响应式
    this.vm = new Vue({
      data:{
        state: options.state
      }
    })
    // actions
    this.defineActions(options)
  }
  defineActions(opotions) {
    this.actions = {}
    let actions = opotions.actions
    Object.keys(actions).forEach(actionName => {
      this.actions[actionName] =(arg) => {
        // 箭头函数，不绑定this。这里this就是$store实例
        actions[actionName](this, arg)
      }
    })
  }
  dispatch(method, arg) {
    console.log(  `dispatch:actions:${method}===>`, method)
    this.actions[method](arg)
  }
  commit = (method, arg) => {
    console.log(`commit:mutations:${method}===>`, method)
    this.mutations[method](arg)
  }
  // 为了能直接访问state
  get state() {
    return this.vm.state
  }
}
```

注意点：
`{commit}` 就是对`this`，`store`实例的解构
## vue-router

VueRouter对不同模式的实现大致是这样的:

1. 首先根据mode来确定所选的模式，如果当前环境不支持history模式，会强制切换到hash模式；

2. 如果当前环境不是浏览器环境，会切换到abstract模式下。然后再根据不同模式来生成不同的history操作对象。


new Router过程
1. init 方法内的 app变量便是存储的当前的vue实例的this。
2. 将 app 存入数组apps中。通过this.app判断是实例否已经被初始化。
3. 通过history来确定不同路由的切换动作动作 history.transitionTo。
4. 通过 history.listen来注册路由变化的响应回调。

hash和history的区别

1. 最明显的是在显示上，hash模式的URL中会夹杂着#号，而history没有。
2. Vue底层对它们的实现方式不同。hash模式是依靠onhashchange事件(监听location.hash的改变)，而history模式是主要是依靠的HTML5 history中新增的两个方法，pushState()可以改变url地址且不会发送请求，replaceState()可以读取历史记录栈,还可以对浏览器记录进行修改。
3. 当真正需要通过URL向后端发送HTTP请求的时候，比如常见的用户手动输入URL后回车，或者是刷新(重启)浏览器，这时候history模式需要后端的支持。因为history模式下，前端的URL必须和实际向后端发送请求的URL一致，例如有一个URL是带有路径path的(例如www.lindaidai.wang/blogs/id)，如果后端没有对这个路径做处理的话，就会返回404错误。所以需要后端增加一个覆盖所有情况的候选资源，一般会配合前端给出的一个404页面。

`hashchange`

`popstate`

HTML5引入了history.pushState()和history.replaceState()




