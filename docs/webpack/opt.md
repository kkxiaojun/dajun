# webpack优化
## tree shaking
1. 虽然生产模式下默认开启，但是由于经过 babel 编译全部模块被封装成 IIFE
2. IIFE 存在副作用无法被 tree-shaking 掉
3. 需要配置 { module: false } 和 sideEffects: false
4. rollup 和 webpack 的 shaking 程度不同，以一个 Class 为例子


webpack-dev-server跨域原理
webpack-dev-server 的 HMR 实现原理
体积：讲了一下 tree-shaking 了解
打包速度：cache-loader、dll、多线程


JS 和 CSS 的Tree-Shaking 怎么配置：
（mini-css-extract-plugin单独抽离css， purifycss-webpack（支持css tree shaking的插件），
https://juejin.im/post/5e85ec79e51d4547153d0738