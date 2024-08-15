# webpack优化
## tree shaking
1. 虽然生产模式下默认开启，但是由于经过 babel 编译全部模块被封装成 IIFE
2. IIFE 存在副作用无法被 tree-shaking 掉
3. 需要配置 { module: false } 和 sideEffects: false
4. rollup 和 webpack 的 shaking 程度不同，以一个 Class 为例子


## webpack-dev-server 的 HMR 实现原理

1. webpack watch; webpack-dev-middleware监控代码的编译、打包、放入内存，通知webpack
2. devServer.watchContentBase  浏览器刷新
3. sock.js 建立 websocket长连接，监听模块变化，传递新模块的hash值
4. HotModuleReplacement.runtime 接收到hash值，先请求hash列表，jsonp拉取最新代码块
5. HotModulePlugin将对比新旧模块，分析依赖，更新模块
6. 失败后，回退到 live reload 浏览器刷新


注意： webpack-hot-middleware：EventSource

https://zhuanlan.zhihu.com/p/30669007?group_id=911546876953591808

## 打包优化

打包体积优化：webpack-bundle-analyzer 分析打包后体积分析


1. tree-shaking；Tree Shaking 指基于 ES Module 进行静态分析，通过 AST 将用不到的函数进行移除，从而减小打包体积。（json, lodash-es）
2. 缩小编译范围，减少不必要的编译工作，即 modules、mainFields、noParse、includes、exclude、alias等。
3. 通过 externals 配置来提取常用库，引用cdn。
4. 使用缓存和dllplugin, `hard-source-webpack-plugin`。
5. `webpack-parallel-uglify-plugin`和`happypack`多核构建项目。


JS 和 CSS 的Tree-Shaking 怎么配置：
（mini-css-extract-plugin单独抽离css， purifycss-webpack（支持css tree shaking的插件），
https://juejin.im/post/5e85ec79e51d4547153d0738

## webpack构建流程

Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

1. 初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
2. 开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
3. 确定入口：根据配置中的 entry 找出所有的入口文件；
4. 编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
5. 完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
6. 输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
7. 输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
8. 在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
## webpack5

> Webpack5 模块联邦让 Webpack 达到了线上 Runtime 的效果，让代码直接在项目间利用 CDN 直接共享，不再需要本地安装 Npm 包、构建再发布了！

`Federated Module`

1. 模块联邦提供了可以在当前应用中远程加载其他服务器上应用的能力;
## sourcemap
:::tip
Source Map,顾名思义，是保存源代码映射关系的文件
:::

1. 将输出文件中每个字符位置对应在输入文件名中的原位置保存起来，并一一进行映射;
2. 优化手段1:不要输出文件中的行号(用；代替);
3. 优化手段2：提取输入文件名；
4. 优化手段3: 可符号化字符的提取（image，只需存个索引）；
5. 优化手段5: VLQ（Variable-length quantity）编码, base64编码优化；