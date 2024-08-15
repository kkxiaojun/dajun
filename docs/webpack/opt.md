# webpack 优化

## tree shaking

1. 虽然生产模式下默认开启，但是由于经过 babel 编译全部模块被封装成 IIFE
2. IIFE 存在副作用无法被 tree-shaking 掉
3. 需要配置 { module: false } 和 sideEffects: false
4. rollup 和 webpack 的 shaking 程度不同，以一个 Class 为例子

webpack-dev-server 跨域原理
webpack-dev-server 的 HMR 实现原理
体积：讲了一下 tree-shaking 了解
打包速度：cache-loader、dll、多线程

JS 和 CSS 的 Tree-Shaking 怎么配置：
（mini-css-extract-plugin 单独抽离 css， purifycss-webpack（支持 css tree shaking 的插件），
https://juejin.im/post/5e85ec79e51d4547153d0738

## plugin

https://github.com/boycgit/demos/tree/master/dynamic-entry

webpack 多入口构建，实现动态 entry

1. 我们像平常那样创建单入口文件配置文件
2. 依据 webpack(config) 获取 compiler 实例；
3. 然后调用 compiler.apply(new SingleEntryPlugin(process.cwd(),...); 新增一个构建入口
4. 通知 webpack 让新入口生效

