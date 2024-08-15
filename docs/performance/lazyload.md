# 懒加载
:::tip
图片懒加载是一种可是范围内的网页优化技术。图片作为一种网络资源，在被请求时也与普通静态资源一样，将占用网络资源，而一次性将整个页面的所有图片加载完，将大大增加页面的首屏加载时间。为了解决这种问题，通过前后端配合，使图片仅在浏览器当前视窗内出现时才加载该图片，达到减少首屏图片请求数的技术就被称为“图片懒加载”。
:::

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3478532a43a94aa6b92c80e590dcdf56~tplv-k3u1fbpfcp-zoom-1.image)

效果
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e250ba9c80314d6ea9b9b277a65fda16~tplv-k3u1fbpfcp-zoom-1.image)
## 三种方案介绍
### 1. 浏览器原生loading
`loading` 属性允许浏览器推迟加载屏幕外的 image 和 iframe 直到用户将页面滚动到它们附近。loading 支持三个值：

* `lazy`：延迟加载。
* `eager`：立即加载。
* `auto`：由浏览器来决定是否延迟加载。

<font color=red>一行代码搞定</font>

```javascript
<!-- 可视范围内加载 -->
<img src="./demo.png" loading="lazy" alt="demo" />

<!-- 立即加载图片 -->
<img src="./demo.png" loading="eager" alt=".."/>

<!-- 浏览器决定是否延迟加载图片 -->
<img src="./demo.png" loading="auto" alt=".."/>

<!-- iframe -->
<iframe src="player.html" loading="lazy"></iframe>

```

**注意:** 需要设置图片的宽度和高度
```
img {
	width: 300px;
    height: 300px;
}
```
**敲重点：兼容性，基本上除了chrome，都不兼容😭**

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e8a09292eb2c4519b19bf264d66f9069~tplv-k3u1fbpfcp-zoom-1.image)

### 2. getBoundingClientRect + data-src
**核心代码：判断可视范围的条件：**`rect.top < document.documentElement.clientHeight`

```javascript
 const rect = imageElement.getBoundingClientRect() // 出现在视窗的时候加载图片         
if(rect.top < document.documentElement.clientHeight) {    }
```

`rect.bottom`与`rect.right`和`position`的`right`和`heingt`有所不同

![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/56794fc03ae24ecabf94d2db0de6bc5d~tplv-k3u1fbpfcp-zoom-1.image)

1. img标签的src设置缩略图或者不设置src，然后自定义一个属性。值为真正的图片或者原图的地址，并且定义一个类名，表示该图片是需要懒加载的（比如下面例子的lazy-image）, 在可视范围内取设置data-src为img.src：
```javascript
<img data-src="demo1.png" class="lazy-image"/> 


// css部分 
.lazy-image { 
    background: url('../loading.gif') no-repeat center; 
}
```

**2. 页面加载完后，我们需要获取所有需要懒加载的图片的元素集合，判断是否在可视区域，如果是在可视区域的话，设置元素的src属性值为真正图片的地址。**


```javascript
  // getBoundingClientRect 方案
  initImageShow() {
    // 需要懒加载的图片集合
    let len = this.lazyImages.length
    for (let i = 0; i < len; i++) {
      const lazyImage = this.lazyImages[i]
      const rect = lazyImage.getBoundingClientRect()
      // 图片出现在视窗的时候加载图片
      if (rect.top < document.documentElement.clientHeight) {
        // 真实地址
        lazyImage.src = lazyImage.dataset.src
        // 移除掉已显示
        this.lazyImages.splice(i, 1)
        len--
        i--
        // 如果全部都加载完 则去掉滚动事件监听
        if (this.lazyImages.length === 0) {
          document.removeEventListener('scroll', this._throttleFn)
        }
      }
    }
  }
```

### 3. 视窗IntersectionObserver API
判断是否在可视区域内，也可以直接用`IntersectionObserver`

```javascript
  // IntersectionObserver 方案
  initObserverShow() {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        // 如果元素可见
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          // 设置img的真实图片地址data-src
          lazyImage.src = lazyImage.dataset.src
          lazyObserver.unobserve(lazyImage)
        }
      })
    })
    // 监听每一个lazeImage
    this.lazyImages.forEach(function(lazyImage) {
      lazyObserver.observe(lazyImage)
    })
  }
```
再看看浏览器兼容性，不考虑IE基本没啥问题

![](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e12c47a49e5a4155abbba3c7a34b26d6~tplv-k3u1fbpfcp-zoom-1.image)

## 造轮子应用

### LazyLoad Class
```javascript
export default class LazyImage {
  constructor(selector) {
    // 图片列表（nodeList）类数组
    this.lazyImages = Array.from(document.querySelectorAll(selector))
    this.init()
  }
  init() {
    // IntersectionObserver 判断图片是否出现在可视区域内
    if (!('IntersectionObserver' in window)) {
      this.initObserverShow()
    } else {
      this.initImageShow()
      // 添加节流函数
      this._throttleFn = this.throttle(this.initImageShow)
      document.addEventListener('scroll', this._throttleFn)
    }
  }
  
  // getBoundingClientRect 方案
  initImageShow() {
    let len = this.lazyImages.length
    for (let i = 0; i < len; i++) {
      const lazyImage = this.lazyImages[i]
      const rect = lazyImage.getBoundingClientRect()
      // 图片出现在视窗的时候加载图片
      if (rect.top < document.documentElement.clientHeight) {
        // 真实地址
        lazyImage.src = lazyImage.dataset.src
        // 移除掉已显示
        this.lazyImages.splice(i, 1)
        len--
        i--
        // 如果全部都加载完 则去掉滚动事件监听
        if (this.lazyImages.length === 0) {
          document.removeEventListener('scroll', this._throttleFn)
        }
      }
    }
  }

  // IntersectionObserver 方案
  initObserverShow() {
    const lazyObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry, index) => {
        // 如果元素可见
        if (entry.isIntersecting) {
          const lazyImage = entry.target
          // 设置img的真实图片地址data-src
          lazyImage.src = lazyImage.dataset.src
          lazyObserver.unobserve(lazyImage)
        }
      })
    })
    // 监听每一个lazeImage
    this.lazyImages.forEach(function(lazyImage) {
      lazyObserver.observe(lazyImage)
    })
  }

  /**
   * 
   * @param {function} func 
   * @param {*Number} delay 
   * @param {*Number} immediate 
   */
  throttle(func, delay = 15, immediate = 30) {
    let timeout = null
    let context = this
    return function() {
      let args = arguments
      timeout && clearTimeout(timeout)
      // 是否立即执行
      if (immediate) {
        // 已执行，则delay秒后才执行，清除timeout
        let callNow = !timeout
        timeout = setTimeout(function(){
          timeout = null
        }, delay)
        callNow && func.apply(context, args)
      } else {
        timeout = setTimeout(function() {
          func.apply(context, args)
        }, delay)
      }
    }
  }
}

```

使用
```javascript
<img class="lazy-image" :data-src="item" alt="..." />

new LazyImage('.lazy-image')
```
`.lazy-image`可设置背景loading

### Vue指令v-lazy
`lazyImage.js`

```javascript
// 引入默认图片
import loadingImg from '@/assets/loading.gif'
let timer = null

// 创建一个监听器
const observer = new IntersectionObserver((entries) => {
  // entries是所有被监听对象的集合
  entries.forEach(entry => {
    // 当被监听元素到临界值且未加载图片时触发。
    console.log('entry.target', entry.target.isLoaded)
    if (entry.isIntersecting || entry.intersectionRatio > 0) {
      if (!entry.target.isLoaded) {
        const lazyImage = entry.target
        // 设置img的真实图片地址data-src
        lazyImage.src = lazyImage.dataSrc
        observer.unobserve(lazyImage)
      }
    }
  })
})

export default {
  // insert bind
  // 共同点： dom插入都会调用，bind在inserted之前
  // 不同点：
  //     bind 时父节点为 null
  //     inserted 时父节点存在。
  //     bind是在dom树绘制前调用，inserted在dom树绘制后调用
  
  // inserted时元素已经插入页面，能够直接获取到dom元素的位置信息
  inserted(el, binding, vnode) {
    clearTimeout(timer)
    // 初始化时展示默认图片
    el.src = loadingImg
    // 将需要加载的图片地址绑定在dom上
    el.dataSrc = binding.value
    
    observer.observe(el)
    // 在组件卸载的时候停止监听
    const vm = vnode.context
    timer = setTimeout(() => {
      vm.$on('hook:beforeDestroy', () => {
        observer.disconnect()
      })
    }, 20)
  },
  // 图片更新触发
  update(el, binding) {
    el.isLoaded = false
    el.dataSrc = binding.value
  }
}


```

**使用**
```javascript
Vue.directive('imgLazy', lazyImage)

<img class="lazy-image" v-imgLazy="item" alt="..." />
```

## 参考链接
1. [https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver](https://developer.mozilla.org/zh-CN/docs/Web/API/IntersectionObserver)

2. [http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html](http://www.ruanyifeng.com/blog/2016/11/intersectionobserver_api.html)