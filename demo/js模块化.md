# 模块化
1. 深入模块化
2. 转向框架：react、vue，如何实现模块化的细节（把全局的框架、window以参数传入，保证模块的纯净），框架的特征原理
3. 转向设计模式（迭代器、适配器）

### Common.js 和 ES6 module 区别

1. commonJs 是被加载的时候运行(运行时加载)，ES6 Module 是编译的时候运行（编译时加载（好处：可做 Tree-shaking 优化））
2. commonJs 输出的是**值的浅拷贝**，**ES6 Module 输出值的引用**
3. webpack 对于 ES 模块/CommonJS 模块的实现，是基于自己实现的 webpack_require，所以代码能跑在浏览器中。
4. webpack 的按需加载实现（Webpack 支持定义分割点`Code Splitting`, 通过 require.ensure 进行按需加载）。（**webpack 异步加载模块实现流程跟 jsonp 基本一致**）