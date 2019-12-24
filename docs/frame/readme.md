# 框架通识
## Vue
### Vue拷问

#### Vue生命周期,各阶段做了什么
<img :src="$withBase('/image/vue/vue-lifecycle.png')" alt="foo">

1. `beforeCreate`、`created`声明周期是在初始化的时候，在`_init`中执行

<img :src="$withBase('/image/vue/vue-init.png')" alt="foo">

具体代码在`vue/src/core/instance/init.js`中
```javascript
Vue.prototype._init = function() {
      // expose real self
    //...
    vm._self = vm
    initLifecycle(vm) // 初始化生命周期
    initEvents(vm) // 初始化事件
    initRender(vm) // 初始化渲染VNODE
    callHook(vm, 'beforeCreate')
    initInjections(vm) // resolve injections before data/props
    initState(vm) // 初始化props，methods，data，computed等
    initProvide(vm) // resolve provide after data/props
    callHook(vm, 'created')
    // ...
}
```

`beforeMount`

`mounted`

`beforeUpdate`

`updated`

`actived`

`deactivated`

`beforeDestroy`

`destroyed`

`errorCaptured`

#### v-if和v-show

#### 为什么 SFC 里的 data 必须是一个函数返回的对象，而不能就只是一个对象
当一个组件被定义，data 必须声明为返回一个初始数据对象的函数，因为组件可能被用来创建多个实例。如果** data 仍然是一个纯粹的对象，则所有的实例将共享引用同一个数据对象**！通过提供 data 函数，每次创建一个新实例后，我们能够调用 data 函数，**从而返回初始数据的一个全新副本数据对象**。

如果需要，可以通过将 vm.$data 传入 JSON.parse(JSON.stringify(...)) 得到深拷贝的原始数据对象。

#### 介绍一下computed，和 data、methods、watch 的异同
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


#### nextTick()原理

#### keep-alive原理

#### 响应式原理

