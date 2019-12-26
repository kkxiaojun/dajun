# webpack

## 基础篇-webpack的基础认识
webpack 本质上是一个打包工具，它会根据代码的内容解析模块依赖，帮助我们把多个模块的代码打包。借用 webpack 官网的图片：

<img :src="$withBase('/image/webpack/webpack.png')" alt="foo">

### loader
loader 用于对模块的**源代码进行转换**。loader 可以使你在 import 或"加载"模块时预处理文件。<font color=red>(webpack默认只识别js结尾的文件,当遇到其他格式的文件后,webpack并不知道如何去处理。这时候就要用loader了)</font>

举个例子，在没有添加额外插件的情况下，webpack 会默认把所有依赖打包成 js 文件，如果入口文件依赖一个 .hbs 的模板文件以及一个 .css 的样式文件，那么我们需要 handlebars-loader 来处理 .hbs 文件，需要 css-loader 来处理 .css 文件（这里其实还需要 style-loader），最终把不同格式的文件都解析成 js 代码，以便打包后在浏览器中运行。

loader 模块需要导出为一个函数，并且使用 Node.js 兼容的 JavaScript 编写。
### plugins
插件是 webpack 的支柱功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！

**插件目的在于解决 loader 无法实现的其他事。**

webpack 插件是一个具有 apply 属性的 JavaScript 对象。apply 属性会被 webpack compiler 调用，并且 compiler 对象可在整个编译生命周期访问。

ConsoleLogOnBuildWebpackPlugin.js
```javascript
const pluginName = 'ConsoleLogOnBuildWebpackPlugin';

class ConsoleLogOnBuildWebpackPlugin {
    apply(compiler) {
        compiler.hooks.run.tap(pluginName, compilation => {
            console.log("webpack 构建过程开始！");
        });
    }
}
```

### 简单的webpack配置
webpack 运行时默认读取项目下的 `webpack.config.js` 文件作为配置。

所以我们在项目中创建一个 `webpack.config.js` 文件：

```javascript
const path = require('path')
const UglifyPlugin = require('uglifyjs-webpack-plugin')

module.exports = {
  entry: './src/index.js',

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src')
        ],
        use: 'babel-loader',
      },
    ],
  },

  // 代码模块路径解析的配置
  resolve: {
    modules: [
      "node_modules",
      path.resolve(__dirname, 'src')
    ],

    extensions: [".wasm", ".mjs", ".js", ".json", ".jsx"],
  },

  plugins: [
    // 使用 uglifyjs-webpack-plugin 来压缩 JS 代码
    new UglifyPlugin()
  ]
}

```

## 基础篇-前端基本开发环境的搭建

**在日常工作中的使用：**

- 构建我们发布需要的 HTML、CSS、JS 文件, 主要用的plugin和loader：mini-css-extract-plugin、html-webpack-plugin
- 使用 CSS 预处理器来编写样式
- 压缩JS
- 处理和压缩图片
- 使用 Babel 来支持 ES 新特性
- 本地提供静态服务以方便开发调试

### 关联HTML（`html-webpack-plugin`）
::: tip
简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。
:::
主要有三个作用：
1. 为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题。
2. 可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口。
3. 将HTML引用路径和我们的构建结果关联起来。


**先安装html-webpack-plugin**

`npm install --save-dev html-webpack-plugin`

然后加入webpack配置中：

```javascript
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'dist/index.html', // 配置文件模板
    })
  ]
}

```

**通过 html-webpack-plugin 就可以将我们的页面和构建 JS 关联起来**

更多的配置，官网参考文档[https://github.com/jantimon/html-webpack-plugin](https://github.com/jantimon/html-webpack-plugin)

### 构建CSS环境
上一章说明过，webpack 会默认把所有依赖打包成 js 文件。需要借助`loader`对文件进行**源代码进行转换**。

需要用到的loader是：
  * `css-loader`
  * `mini-css-extract-plugin`,将css单独剥离出来

安装：

```javascript
npm i css-loader mini-css-extract-plugin --save-dev
```

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.css/,
        include: [
          path.resolve(__dirname, 'style'),
        ],
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
    ],
    plugins: [
      new MiniCssExtractPlugin()
    ]
  }
}
```

<font color=red>不用`extract-text-webpack-plugin`的原因：`extract-text-webpack-plugin`默认安装的版本是3.x.x，还不支持webpack的4.x版本</font>

### 增加CSS预处理（sass,less,style）
::: tip
预处理器功能强大，开发中经常使用以下特性：变量（variables），代码混合（ mixins），嵌套（nested rules）以及 代码模块化(Modules)。
:::
接下来安装sass预处理器，官网参考文档[https://www.webpackjs.com/loaders/sass-loader/](https://www.webpackjs.com/loaders/sass-loader/)

安装 `npm install sass-loader node-sass webpack --save-dev`

`node-sass` 和 `webpack` 是 `sass-loader` 的 `peerDependency`，因此能够精确控制它们的版本。

```javascript
module.exports = {
    ...
    module: {
        rules: [
          {
            test: /\.scss$/,
            use: [
              {
                loader: MiniCssExtractPlugin.loader
              },
              'css-loader',
              'sass-loader'
            ]
          }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin()
    ]
};
```

### 处理JS文件
主要是进行js文件的压缩

这里使用`uglifyjs-webpack-plugin`，官方文档[https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/](https://www.webpackjs.com/plugins/uglifyjs-webpack-plugin/)

安装`npm i uglifyjs-webpack-plugin --save-dev`

```javascript
module.exports = {
    module: {}
    plugins: [
    // 压缩js代码
    new UglifyPlugin()
    ]
}
```

<font color=red>`uglifyjs-webpack-plugin`不支持ES6，可以用`terser-webpack-plugin`替代</font>


### 处理图片文件
前边已经对css进行处理了，但是对于样式文件`url()`中的`jpg/png/gig`等是无法处理的，这里时候就需要用到另外的loader处理了。

`url-loader` 功能类似于 `file-loader`，但是在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。

```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 // 在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
            }
          }
        ]
      }
    ]
  }
}
```

**loader将图片处理成`base64`的格式**

### Babel支持JavaScript新特性
由于`ES6、ES7`的新特性，我们需要采用转义才能在项目中更好地支持。

`npm i babel-loader --save-dev`

```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /\.js?/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, 'js'), // js 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader',
      },
    ],
  },
}
```

### `webpack-dev-server`构建本地静态服务
开发的过程中，实时查看效果[https://www.webpackjs.com/configuration/dev-server/](https://www.webpackjs.com/configuration/dev-server/)

安装`webpack-dev-server`

配置`scripts`脚本
```javascript
// package.json
  "scripts": {
    "start": "webpack-dev-server --inline --progress --mode development", // 这里会涉及很多配置参数，具体的可以看官网文档
    "build": "webpack --mode production"
  }
```
这里对于`webpack-dev-server`先做简单的配置，后面用单独的章节了解熟悉。

**最后webpack的配置**
```javascript
// 路径解析
const path = require('path')

// 压缩JavaScript文件, uglifyjs-webpack-plugin不支持ES6语法
const terserWebpackPlugin = require('terser-webpack-plugin')

// 简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 
// 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。

const HtmlWebpackPlugin = require('html-webpack-plugin')

// - css-loader 负责解析 CSS 代码，主要是为了处理 CSS 中的依赖，例如 `@import` 和 `url()` 等引用外部文件的声明；
// - style-loader 会将 css-loader 解析的结果转变成 JS 代码，运行时动态插入 `style` 标签来让 CSS 代码生效。
// extract-text-webpack-plugin将css单独剥离出来,替换插件（optimize-css-assets-webpack-plugin，mini-css-extract-plugin）
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  entry: {
    index: ['./src/js/index.js'],
    vendors: ["./src/js/vendors.js"]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.js$/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, './src/js'), // js 目录下的才需要经过 babel-loader 处理
        ],
        use: {
          loader: 'babel-loader'
          // options: {
          //   // babel-preset-env 会是一个更好的选择，babel-preset-env 可以根据配置的目标浏览器或者运行环境来自动将ES2015+的代码转换为es5。
          //   presets: ['@babel/preset-env']
          // }
        }
      },      
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192 // 在文件大小（单位 byte）低于指定的限制时，可以返回一个 DataURL。
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'index.html', // 配置文件模板
    }),
    // 压缩js代码
    new terserWebpackPlugin({
      cache: true,
      parallel: true
    }),
    // extract css into its own file
    // Error contenthash not implemented with webpack > 4.3.0
    // 1. yarn upgrade extract-text-webpack-plugin@next
    // 2. 采用 mini-css-extract-plugin
    new MiniCssExtractPlugin({
      // 因为webpack4.3包含了contenthash这个关键字，所以ExtractTextPlugin中不能使用contenthash
      // 使用md5:contenthash:hex:8代替contenthash
      // github issue https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/765
      filename: 'css/[name].[contenthash].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    })
  ]
}

```

## 基础篇-loader和plugin的详细配置
前面已经配置了基本的`loader`和`plugin`，但是`loader`和`plugin`的配置内容还有很多详细的内容，这里主要记录常用的配置内容。

### 配置loader
`webpack` 的 `loader` 用于处理不同的文件类型，对模块的源代码进行转换。在实际的项目中使用时，遇到的情况会比较多，这里将详细讲解`loader`的配置

例子：
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.jsx$/, // 支持 js 和 jsx
        include: [
          path.resolve(__dirname, './src/js'), // js 目录下的才需要经过 babel-loader 处理
        ],
        loader: 'babel-loader'
      }
    ]
  }
}
```
### 模块规则
1. **module.rules**
创建模块时，匹配请求的规则数组。这些规则能够修改模块的创建方式。这些规则能够对模块(module)应用 loader，或者修改解析器(parser)。

2. **Rule**
每个规则可以分为三部分 - 条件(condition)，结果(result)和嵌套规则(nested rule)。

3. **Rule 条件**
条件有两种输入值：

* resource：请求文件的绝对路径。它已经根据 resolve 规则解析。

* issuer: 被请求资源(requested the resource)的模块文件的绝对路径。是导入时的位置。

例如: 从 app.js 导入 './style.css'，resource 是 /path/to/style.css. issuer 是 /path/to/app.js。

在规则中，属性 test, include, exclude 和 resource 对 resource 匹配，并且属性 issuer 对 issuer 匹配。

当使用多个条件时，所有条件都匹配。

4. **Rule结果**
规则结果只在规则条件匹配时使用。

规则有两种输入值：

应用的 loader：应用在 resource 上的 loader 数组。
Parser 选项：用于为模块创建解析器的选项对象。
这些属性会影响 loader：loader, options, use。

也兼容这些属性：query, loaders。

enforce 属性会影响 loader 种类。不论是普通的，前置的，后置的 loader。

parser 属性会影响 parser 选项。
```javascript
  // 关于模块配置
  rules: [
    // 模块规则（配置 loader、解析器等选项）
    {
      test: /\.jsx?$/,
      include: [
        path.resolve(__dirname, "app")
      ],
      exclude: [
        path.resolve(__dirname, "app/demo-files")
      ],
      // 这里是匹配条件，每个选项都接收一个正则表达式或字符串
      // test 和 include 具有相同的作用，都是必须匹配选项
      // exclude 是必不匹配选项（优先于 test 和 include）
      // 最佳实践：
      // - 只在 test 和 文件名匹配 中使用正则表达式
      // - 在 include 和 exclude 中使用绝对路径数组
      // - 尽量避免 exclude，更倾向于使用 include
      issuer: { test, include, exclude },
      // 标识应用这些规则，即使规则覆盖（高级选项）
      loader: "babel-loader",
      // 应该应用的 loader，它相对上下文解析
      options: {
        presets: ["es2015"]
      },
      // loader 的可选项
    },
    {
      test: /\.html$/,
      use: [
        // 应用多个 loader 和选项
        "htmllint-loader",
        {
          loader: "html-loader",
          options: {
            /* ... */
          }
        }
      ]
      },
```
### 规则条件

*   `test` 匹配特定条件
*   `include` 匹配特定路径
*   `exclude` 排除特定路径

总结：
1. 在 `include` 和 `exclude` 中使用绝对路径数组
2. 尽量避免 `exclude`，更倾向于使用 `include`


### 配置plugin
::: tip
插件是 webpack 的 支柱 功能。webpack 自身也是构建于，你在 webpack 配置中用到的相同的插件系统之上！插件目的在于解决 loader 无法实现的其他事。
:::
对于插件的配置，这里主要介绍几个常用的插件


#### extract-text-webpack-plugin与mini-css-extract-plugin
`extract-text-webpack-plugin`和`mini-css-extract-plugin`是可以提取CSS到单独的文件中。它创建了一个CSS文件/ JS文件包含CSS。

```javascript
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // 涉及到内容装转换
          },
          'css-loader'
        ]
      }
    ]
  }
  plugins: [
    // extract css into its own file
    // Error contenthash not implemented with webpack > 4.3.0
    // 1. yarn upgrade extract-text-webpack-plugin@next
    // 2. 采用 mini-css-extract-plugin
    new MiniCssExtractPlugin({
      // 因为webpack4.3包含了contenthash这个关键字，所以ExtractTextPlugin中不能使用contenthash
      // 使用md5:contenthash:hex:8代替contenthash
      // github issue https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/765
      filename: 'css/[name].[contenthash].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    })
  ]
```
这俩个插件的作用是相同的，至于为什么选择`mini-css-extract-plugin`?

<font color=red>不用`extract-text-webpack-plugin`的原因：`extract-text-webpack-plugin`默认安装的版本是3.x.x，还不支持webpack的4.x版本</font>

关于`webpack`中`hash`相关的详细内容，请移步[重学webpack之原理篇（二）：hash+chunkhash+contenthash](重学webpack之原理篇（二）：hash+chunkhash+contenthash)

#### hard-source-webpack-plugin
`hard-source-webpack-plugin`是对于构建的module进行缓存，二次构建的时候，提升构建速度
```javascript
  plugins: [
    new HardSourceWebpackPlugin({
      // cacheDirectory是在高速缓存写入。默认情况下，将缓存存储在node_modules下的目录中，因此如 
      // 果清除了node_modules，则缓存也是如此
      cacheDirectory: 'node_modules/.cache/hard-source/[confighash]',
      // Either an absolute path or relative to webpack's options.context.
      // Sets webpack's recordsPath if not already set.
      recordsPath: 'node_modules/.cache/hard-source/[confighash]/records.json',
      // configHash在启动webpack实例时转换webpack配置，并用于cacheDirectory为不同的webpack配 
      // 置构建不同的缓存
      configHash: function(webpackConfig) {
        // node-object-hash on npm can be used to build this.
        return require('node-object-hash')({sort: false}).hash(webpackConfig);
      },
      // 当加载器，插件，其他构建时脚本或其他动态依赖项发生更改时，hard-source需要替换缓存以确保输 
      // 出正确。environmentHash被用来确定这一点。如果散列与先前的构建不同，则将使用新的缓存
      environmentHash: {
        root: process.cwd(),
        directories: [],
        files: ['package-lock.json', 'yarn.lock'],
      }
    })
  ]
```

## 基础篇-webpack-dev-server浅析
`webpack-dev-server`是webpack官方提供的一个小型`Express`服务器。使用它可以为webpack打包生成的资源文件提供web服务。[webpack-dev-server官方文档](https://webpack.docschina.org/configuration/dev-server/)


我们日常开发时可以使用它来调试前端代码。可以实时监听代码文件变化，从而提高开发效率。

### 目前使用webpack的模式
图片

### webpack-dev-server的使用

项目中只需要配置`hot: true, // 是否热更新`即可开启`Hot Module Replacemen`即热模块替换
```javascript
var path = require('path');

module.exports = {
  //...
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true, // Gzip压缩
    quiet: true, // necessary for FriendlyErrorsPlugin
    port: PORT, // 端口
    host: 'localhost', // 域名
    open: true, // 自动开启浏览器
    hot: true, // 是否热更新
    proxy: {
      // 开启代理
      '/sys': {
        target: 'http://test.com',
        changeOrigin: true
      },      
      '/transfer': {
        target: 'http://10.10.119.207:8004',
        changeOrigin: true
      }
    }
  }
};
```
### webpack-dev-server的配置
**Proxy**
`proxy`即代理，这开发中，可以方便我们进行项目的调试。
```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        pathRewrite: {'^/api' : ''}
      }
    }
  }
};
```

<font color=red>需要注意的是，如果要运行在 HTTPS 上，且使用了无效证书的后端服务器。需要设置`secure: false`</font>
```javascript
module.exports = {
  //...
  devServer: {
    proxy: {
      '/api': {
        target: 'https://other-server.example.com',
        secure: false // 
      }
    }
  }
};
```
**HistoryApiFallback**
当使用 HTML5 History API 时，任意的 404 响应都可能需要被替代为 index.html。·devServer.historyApiFallback· 默认禁用。通过传入以下启用：
```javascript
module.exports = {
  //...
  devServer: {
    historyApiFallback: true
  }
};
```
具体的使用如下：

`webpack.config.js`
```javascript
module.exports = {
    entry: "./src/app/index.js",
    output: {
        path: path.resolve(__dirname, 'build'),
        publicPath: 'build',
        filename: 'bundle-main.js'
    },
    devServer: {
        historyApiFallback:{
            index:'build/index.html'
        },
    },
    //...
};
```
**Live reload**
`Live reload`监控文件的变化，然后通知浏览器端刷新页面。
<font color=red>缺点：</font>
live reload 工具并不能够保存应用的状态（states），当刷新页面后，应用之前状态丢失，还是上文中的例子，点击按钮出现弹窗，当浏览器刷新后，弹窗也随即消失，要恢复到之前状态，还需再次点击按钮。而 webapck HMR 则不会刷新浏览器，而是运行时对模块进行热替换，保证了应用状态不会丢失，提升了开发效率。

**HRM**
`Hot Module Replacement`（以下简称 HMR）是 `webpack` 发展至今引入的最令人兴奋的特性之一 ，当你对代码进行修改并保存后，webpack 将对代码重新打包，并将新的模块发送到浏览器端，浏览器通过新的模块替换老的模块，这样在不刷新浏览器的前提下就能够对应用进行更新。例如，在开发 Web 页面过程中，当你点击按钮，出现一个弹窗的时候，发现弹窗标题没有对齐，这时候你修改 CSS 样式，然后保存，在浏览器没有刷新的前提下，标题样式发生了改变。感觉就像在 `Chrome` 的开发者工具中直接修改元素样式一样。



**GZIP**
在开发环境中启用`GZIP压缩`，只需要设置`compress: true`即可
```javascript
module.exports = {
  //...
  devServer: {
    compress: true
  }
};
```

但是如果要在打包的时候使用`GZIP`，则需要用到插件`compression-webpack-plugin`
```javascript
  const CompressionWebpackPlugin = require('compression-webpack-plugin')

  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
```

关于`GZIP`的详细内容可以看[重学webpack之优化篇（三）：http压缩之Gzip](重学webpack之优化篇（三）：http压缩之Gzip)
**Before/after**
在服务内部的所有其他中间件之前(`after`即之后)， 提供执行自定义中间件的功能。 这可以用来配置自定义处理程序，例如：
```javascript
module.exports = {
  //...
  devServer: {
    before: function(app, server) {
      app.get('/some/path', function(req, res) {
        res.json({ custom: 'response' });
      });
    }
  }
};
```

示例代码传送[https://github.com/kkxiaojun/webpack-again](https://github.com/kkxiaojun/webpack-again)


## 基础篇-配置开发、测试和生产环境
### 为什么要区分配置
development(开发环境) 和 production(生产环境) 这两个环境下的构建目标存在着巨大差异。在开发环境中，我们需要：强大的 source map 和一个有着 live reloading(实时重新加载) 或 hot module replacement(热模块替换) 能力的 localhost server。而生产环境目标则转移至其他方面，关注点在于压缩 bundle、更轻量的 source map、资源优化等，通过这些优化方式改善加载时间。由于要遵循逻辑分离，我们通常建议为每个环境编写彼此独立的 webpack 配置。

### `webpack-merge`根据不同环境，分离配置文件
虽然，以上我们将生产环境和开发环境做了略微区分，但是，请注意，我们还是会遵循不重复原则(Don't repeat yourself - DRY)，保留一个 "common(通用)" 配置。为了将这些配置合并在一起，我们将使用一个名为 webpack-merge 的工具。此工具会引用 "common" 配置，因此我们不必再在环境特定(environment-specific)的配置中编写重复代码。

我们先从安装 webpack-merge 开始，并将之前指南中已经成型的那些代码进行分离： 

项目
webpack-environment
```javascript
│  index.html
│  package-lock.json
│  package.json
│
├─config
│      dev.env.js
│      prod.env.js
│      webpack.common.js
│      webpack.dev.js
│      webpack.prod.js
│
├─dist
│      bundle.js
│      index.html
│
└─src
        index.js
```

`webpack.common.js`
```javascript
// 路径解析
const path = require('path')
const webpack = require('webpack')
// 简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 
// 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: {
    index: './src/index.js'
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html', // 配置输出文件名和路径
      template: 'index.html', // 配置文件模板
    })
  ]
}

```

`webpack.dev.js`
```javascript
// 路径解析
const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const webpack = require('webpack')
const env = require('./dev.env')
// 简化了HTML文件的创建，以便为你的webpack包提供服务。这对于在文件名中包含每次会随着编译而发生变化哈希的 webpack bundle 尤其有用。 
// 你可以让插件为你生成一个HTML文件，使用lodash模板提供你自己的模板，或使用你自己的loader。

const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'inline-source-map',
  plugins: [
    // 允许在编译时(compile time)配置的全局常量
    new webpack.DefinePlugin({
      'process.env': env
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    compress: true, // Gzip压缩
    port: 8080, // 端口
    host: 'localhost',
    open: true, // 自动开启浏览器
    hot: true, // 是否热更新
  }
})

```

`webpack.prod.js`
```javascript
const webpack = require('webpack')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const prod = require('./prod.env')
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // 允许在编译时(compile time)配置的全局常量
    new webpack.DefinePlugin({
      'process.env': prod
    })
  ]
})

```
`package.json`
```javascript
{
  "name": "webpack-dev-server",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "dev": "webpack-dev-server --inline --progress --config config/webpack.dev.js",
    "build": "webpack --progress --config config/webpack.prod.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "html-webpack-plugin": "^3.2.0",
    "webpack": "^4.41.2",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.9.0",
    "webpack-merge": "^4.2.2"
  }
}
```

### `webpack.DefinePlugin`编译时(compile time)配置全局常量

可以看到项目的整体目录：
```javascript
│  index.html
│  package-lock.json
│  package.json
│
├─config
│      dev.env.js
│      prod.env.js
│      webpack.common.js
│      webpack.dev.js
│      webpack.prod.js
│
├─dist
│      bundle.js
│      index.html
│
└─src
        index.js
```

`config`目录下有`dev.env.js、prod.env.js`两个目录，用于编译时(compile time)配置全局常量

具体的作用是：

**例如：我们经常需要在开发环境使用开发环境的`URL`, 生成环境使用生产环境的`URL`**

借助`webpack.DefinePlugin`（允许在编译时(compile time)配置的全局常量）即可实现
```javascript
const prod = require('./prod.env')
module.exports = merge(common, {
  mode: 'production',
  plugins: [
    // 允许在编译时(compile time)配置的全局常量
    new webpack.DefinePlugin({
      'process.env': prod
    })
  ]
})
```
`prod.env.js`的内容
```javascript
'use strict'
module.exports = {
  NODE_ENV: '"production"',
  // 生产环境地址
  BASE_API: '"http://production.com"'
}

```

`dev.env.js`的内容
```javascript
'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // 开发环境地址
  BASE_API: '"http://development.com"'
})
```

结合`axios`即可有如下配置：
```javascript
// 创建axios实例
const service = axios.create({
  baseURL: process.env.BASE_API
})
```

这样，我们开发环境和生产环境就分离了。

示例代码传送[https://github.com/kkxiaojun/webpack-again](https://github.com/kkxiaojun/webpack-again)

## 优化篇-优化静态资源
### 图片资源
**对于项目中的图片资源，我们主要从两方面进行优化：**

1. 对资源进行压缩，减少体积。
2. 减少请求的数量，降低服务器压力。

**对资源进行压缩，减少体积**，我们使用对应的loader进行处理。

使用`file-loader` 来处理图片文件
```javascript
module.exports = {
  // ...
  module: {
    rules: [
      {
        test: /.*\.(gif|png|jpe?g|svg|webp)$/i,
        use: [
          {
            loader: 'file-loader',
            options: {}
          },
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: { // 压缩 jpeg 的配置
                progressive: true,
                quality: 65
              },
              optipng: { // 使用 imagemin-optipng 压缩 png，enable: false 为关闭
                enabled: false,
              },
              pngquant: { // 使用 imagemin-pngquant 压缩 png
                quality: '65-90',
                speed: 4
              },
              gifsicle: { // 压缩 gif 的配置
                interlaced: false,
              },
              webp: { // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
                quality: 75
              },
          },
        ],
      },
    ],
  },
}
```
当我们要将一些图片转换为base64 uri，减少http请求时，就可以用`url-loader`进行处理
`url-loader`
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src')],
        options: {
          limit: 10000, // 限制文件的最大大小
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
}
```

`CSS Sprites`相信大家都了解了，当我们的项目中，使用了大量的svg-icon时，可以用`svg-sprite-loader`进行处理：

`svg-sprite-loader`
```javascript
module.exports = {
  module: {
    rules: [
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        // 只对相应目录下的资源做处理
        include: [resolve('src/icons')],
        options: {}
      }
    ]
  }
}
```
### HTML模板
前面有讲到，我们会用`html-webpack-plugin`将`index.html`与打包后的进行关联，其实，`html-webpack-plugin`中还有提供输出配置`minify`：

当`mode`为`production`时，`minify`配置生效

`html-webpack-plugin`
```javascript
new HtmlWebpackPlugin({
  filename: 'index.html',
  template: 'index.html',
  inject: true,
  title: 'admin',
  minify: {
    // 合并空格
    collapseWhitespace: true,
    // 移除注解
    removeComments: true,
    // 移除多余的属性
    removeRedundantAttributes: true,
    // 移除脚本类型属性
    removeScriptTypeAttributes: true,
    // 移除样式类型属性
    removeStyleLinkTypeAttributes: true,
    // 使用简短的文档类型
    useShortDoctype: true
    // more options:
    // https://github.com/kangax/html-minifier#options-quick-reference
  }
}),
```

### CSS剥离与压缩
`extract-text-webpack-plugin`和`mini-css-extract-plugin`是可以提取CSS到单独的文件中。

```javascript
  module: {
    rules: [
      {
        test: /\.css/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader // 涉及到内容装转换
          },
          'css-loader'
        ]
      }
    ]
  }
  plugins: [
    // extract css into its own file
    // Error contenthash not implemented with webpack > 4.3.0
    // 1. yarn upgrade extract-text-webpack-plugin@next
    // 2. 采用 mini-css-extract-plugin
    new MiniCssExtractPlugin({
      // 因为webpack4.3包含了contenthash这个关键字，所以ExtractTextPlugin中不能使用contenthash
      // 使用md5:contenthash:hex:8代替contenthash
      // github issue https://github.com/webpack-contrib/extract-text-webpack-plugin/issues/765
      filename: 'css/[name].[contenthash].css',
      // Setting the following option to `false` will not extract CSS from codesplit chunks.
      // Their CSS will instead be inserted dynamically with style-loader when the codesplit chunk has been loaded by webpack.
      // It's currently set to `true` because we are seeing that sourcemaps are included in the codesplit bundle as well when it's `false`, 
      // increasing file size: https://github.com/vuejs-templates/webpack/issues/1110
      allChunks: true,
    })
  ]
```
这俩个插件的作用是相同的，至于为什么选择`mini-css-extract-plugin`?

<font color=red>不用`extract-text-webpack-plugin`的原因：`extract-text-webpack-plugin`默认安装的版本是3.x.x，还不支持webpack的4.x版本</font>

关于`webpack`中`hash`相关的详细内容，请移步[重学webpack之原理篇（二）：hash+chunkhash+contenthash](重学webpack之原理篇（二）：hash+chunkhash+contenthash)


### JavaScript
`webpack4.x`中已经可以将压缩的插件放置在`minimizer`中了。
用`UglifyJsPlugin`进行JS代码压缩
```javascript
module.exports = {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          },
          // 清除生产环境的控制台输出
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }  
        },
        sourceMap: config.build.productionSourceMap,
        cache: true,
        parallel: true
      }),
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin()
    ]
  }
})
```
### 关于代码分离
代码分离是 webpack 中最引人注目的特性之一。此特性能够把代码分离到不同的 bundle 中，然后可以按需加载或并行加载这些文件。
代码分离可以用于获取更小的 bundle，以及控制资源加载优先级，果使用合理，会极大影响加载时间。

常用的代码分离方法有三种：

1. 入口起点：使用 entry 配置手动地分离代码。
2. 防止重复：使用 SplitChunksPlugin 去重和分离 chunk。
3. 动态导入：通过模块中的内联函数调用来分离代码。

#### 入口起点
我们可以通过配置多个入口文件，从而进行代码分离
```javascript
module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: ['./src/main.js', './src/index.js']
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js'
  }
}
```

但是，这样做有两个缺点：
1. 如果入口 chunk 之间包含一些重复的模块，那些重复模块都会被引入到各个 bundle 中。
2. 这种方法不够灵活，并且不能将核心应用程序逻辑进行动态拆分代码。

关于模块重复的问题，可以用``解决

#### 防止重复
`optimization`中的`splitChunks`即可做到

注意：`splitChunks`是webpack4.x的解决方案，webpack3.x是用`CommonsChunkPlugin`插件

`webpack3.x`
```
 new webpack.optimize.CommonsChunkPlugin(options)
```

`webpack4.x`
```javascript
 const path = require('path');

  module.exports = {
    mode: 'development',
    entry: {
      index: './src/index.js',
      another: './src/another-module.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    optimization: {
      splitChunks: {
        chunks: 'all', // chunks 代码公共的部分分离出来成为一个单独的文件
      }
    }
  };
```

更详细的配置内容：

```javascript
optimization: {
    minimize: env === 'production' ? true : false, // 开发环境不压缩
    splitChunks: {
        chunks: "async", // 共有三个值可选：initial(初始模块)、async(按需加载模块)和all(全部模块)
        minSize: 30000, // 模块超过30k自动被抽离成公共模块
        minChunks: 1, // 模块被引用>=1次，便分割
        maxAsyncRequests: 5,  // 异步加载chunk的并发请求数量<=5
        maxInitialRequests: 3, // 一个入口并发加载的chunk数量<=3
        name: true, // 默认由模块名+hash命名，名称相同时多个模块将合并为1个，可以设置为function
        automaticNameDelimiter: '~', // 命名分隔符
        cacheGroups: { // 缓存组，会继承和覆盖splitChunks的配置
            default: { // 模块缓存规则，设置为false，默认缓存组将禁用
                minChunks: 2, // 模块被引用>=2次，拆分至vendors公共模块
                priority: -20, // 优先级
                reuseExistingChunk: true, // 默认使用已有的模块
            },
            vendors: {
                test: /[\\/]node_modules[\\/]/, // 表示默认拆分node_modules中的模块
                priority: -10
            }
        }
    }
}
```

plitChunks是拆包优化的重点，如果你的项目中包含 element-ui 等第三方组件（组件较大），建议单独拆包，如下所示:
```javascript
splitChunks: {
    // ...
    cacheGroups: {    
        elementUI: {
            name: "chunk-elementUI", // 单独将 elementUI 拆包
            priority: 10, // 权重需大于其它缓存组
            test: /[\/]node_modules[\/]element-ui[\/]/
        }
    }
}
```
#### 动态导入
使用ECMAScript的 `import()`, webpack 会自动处理使用该语法编写的模块。

```javascript
// import 作为一个方法使用，传入模块名即可，返回一个 promise 来获取模块暴露的对象
// 注释 webpackChunkName: "lodash" 指定 chunk 的名称，输出文件时有用
import(/* webpackChunkName: "lodash" */ 'lodash').then((_) => { 
  console.log(_.lash([1, 2, 3])) // 打印 3
})

```

`vue-router`中也有类似的应用：
有时候我们想把某个路由下的所有组件都打包在同个异步块 (chunk) 中。只需要使用 命名 chunk，一个特殊的注释语法来提供 chunk name (需要 Webpack > 2.4)。
```javascript
const Foo = () => import(/* webpackChunkName: "group-foo" */ './Foo.vue')
const Bar = () => import(/* webpackChunkName: "group-foo" */ './Bar.vue')
const Baz = () => import(/* webpackChunkName: "group-foo" */ './Baz.vue')
```

## 优化篇-优化配置提高构建速度
**此优化配置的文章是基于webpack4.x的版本**
::: tip
webpack4.x
:::

在webpack4中，一些默认插件由 optimization 配置替代了，如下：

* CommonsChunkPlugin废弃，由 optimization.splitChunks 和 optimization.runtimeChunk 替代，前者拆分代码，后者提取runtime代码。原来的CommonsChunkPlugin产出模块时，会包含重复的代码，并且无法优化异步模块，minchunks的配置也较复杂，splitChunks解决了这个问题；另外，将 optimization.runtimeChunk 设置为true（或{name: “manifest”}），便能将入口模块中的runtime部分提取出来。
* NoEmitOnErrorsPlugin 废弃，由 optimization.noEmitOnErrors 替代，生产环境默认开启。
* NamedModulesPlugin 废弃，由 optimization.namedModules 替代，生产环境默认开启。
* ModuleConcatenationPlugin 废弃，由 optimization.concatenateModules 替代，生产环境默认开启。
* optimize.UglifyJsPlugin 废弃，由 optimization.minimize 替代，生产环境默认开启。

**optimization 还提供了如下默认配置：**

```javascript
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        libs: {
          name: 'chunk-libs',
          test: /[\\/]node_modules[\\/]/,
          priority: 10,
          chunks: 'initial' // 只打包初始时依赖的第三方
        },
        elementUI: {
          name: 'chunk-elementUI', // 单独将 elementUI 拆包
          priority: 20, // 权重要大于 libs 和 app 不然会被打包进 libs 或者 app
          test: /[\\/]node_modules[\\/]element-ui[\\/]/
        }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          mangle: {
            safari10: true
          },
          // 清除生产环境的控制台输出
          compress: {
            warnings: false,
            drop_debugger: true,
            drop_console: true
          }  
        },
        sourceMap: config.build.productionSourceMap,
        cache: true,
        parallel: true
      }),
    ]
  }
```
更多关于webpack4.x中splitChunks的内容，需要的可以查看官网文档了解。[https://webpack.js.org/plugins/split-chunks-plugin/](https://webpack.js.org/plugins/split-chunks-plugin/)
### webpack优化方案
1. 缩小编译范围，减少不必要的编译工作，即 modules、mainFields、noParse、includes、exclude、alias等。
2. 通过 externals 配置来提取常用库，引用cdn。
3. 使用缓存和dllplugin。
4. webpack-parallel-uglify-plugin和happypack多核构建项目。

### 缩小编译范围，减少不必要的编译工作
缩小编译范围，减少不必要的编译工作，即 modules、mainFields、noParse、includes、exclude、alias等。
```javascript
const resolve = dir => path.join(__dirname, '..', dir);

module.exports = {
  context: path.resolve(__dirname, '../'),
  entry: {
    app: './src/main.js'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath:
      process.env.NODE_ENV === 'production'
        ? config.build.assetsPublicPath
        : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('src')
    }
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [
          resolve('src'),
          resolve('test'),
          resolve('node_modules/webpack-dev-server/client')
        ]
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [resolve('src/icons')],
        options: {
          symbolId: 'icon-[name]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        exclude: [resolve('src/icons')],
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      }
    ]
  }
```
### 通过 externals 配置来提取常用库，引用cdn
如果我们想引用一个库，但是又不想让webpack打包，并且又不影响我们在程序中以CMD、AMD或者window/global全局等方式进行使用，那就可以通过配置externals。这个功能主要是用在创建一个库的时候用的，但是也可以在我们项目开发中充分使用。
```javascript
externals:["React","jQuery"]
```
### dllplugin启用预编译

第三方库以 node\_modules 为代表，它们庞大得可怕，却又不可或缺。

处理第三方库的姿势有很多，其中，Externals 不够聪明，一些情况下会引发重复打包的问题；而 CommonsChunkPlugin 每次构建时都会重新构建一次 vendor；出于对效率的考虑，我们这里为大家推荐 DllPlugin。

DllPlugin 是基于 Windows 动态链接库（dll）的思想被创作出来的。这个插件会把第三方库单独打包到一个文件中，这个文件就是一个单纯的依赖库。**这个依赖库不会跟着你的业务代码一起被重新打包，只有当依赖自身发生版本变化时才会重新打包**。

用 DllPlugin 处理文件，要分两步走：

*   基于 dll 专属的配置文件，打包 dll 库
*   基于 webpack.config.js 文件，打包业务代码

**AutoDllPlugin：解放你的配置负担**
webpack插件`autodll-webpack-plugin`
```javascript
// 文件目录：configs/webpack.common.js

const path = require('path');
const AutoDllPlugin = require('autodll-webpack-plugin'); // 第 1 步：引入 DLL 自动链接库插件

module.exports = {
  // ......
  plugins: [
        // 第 2 步：配置要打包为 dll 的文件
        new AutoDllPlugin({
            inject: true, // 设为 true 就把 DLL bundles 插到 index.html 里
            filename: '[name].dll.js',
            context: path.resolve(__dirname, '../'), // AutoDllPlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
            entry: {
                react: [
                    'react',
                    'react-dom'
                ]
            }
        })
  ]
}
```

**抛弃 DLL：Vue & React 官方的共同选择**
wepack4已经抛弃了dll,vue-cli和react-create-app都抛弃了dll

更好用的插件
[HardSourceWebpackPlugin](https://github.com/mzgoddard/hard-source-webpack-plugin)

```
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  // ......
  plugins: [
    new HardSourceWebpackPlugin() // <- 直接加入这行代码就行
  ]
}
```


### Happypack——将 loader 由单进程转为多进程

大家知道，webpack 是单线程的，就算此刻存在多个任务，你也只能排队一个接一个地等待处理。这是 webpack 的缺点，好在我们的 CPU 是多核的，Happypack 会充分释放 CPU 在多核并发方面的优势，帮我们把任务分解给多个子进程去并发执行，大大提升打包效率。

HappyPack 的使用方法也非常简单，只需要我们把对 loader 的配置转移到 HappyPack 中去就好，我们可以手动告诉 HappyPack 我们需要多少个并发的进程：

```
const HappyPack = require('happypack')
// 手动创建进程池
const happyThreadPool =  HappyPack.ThreadPool({ size: os.cpus().length })

module.exports = {
  module: {
    rules: [
      ...
      {
        test: /\.js$/,
        // 问号后面的查询参数指定了处理这类文件的HappyPack实例的名字
        loader: 'happypack/loader?id=happyBabel',
        ...
      },
    ],
  },
  plugins: [
    ...
    new HappyPack({
      // 这个HappyPack的“名字”就叫做happyBabel，和楼上的查询参数遥相呼应
      id: 'happyBabel',
      // 指定进程池
      threadPool: happyThreadPool,
      loaders: ['babel-loader?cacheDirectory']
    })
  ],
}

```

### 构建结果体积压缩

#### 文件结构可视化，找出导致体积过大的原因

这里为大家介绍一个非常好用的包组成可视化工具——[webpack-bundle-analyzer](https://www.npmjs.com/package/webpack-bundle-analyzer)，配置方法和普通的 plugin 无异，它会以矩形树图的形式将包内各个模块的大小和依赖关系呈现出来，格局如官方所提供这张图所示：

![](https://user-gold-cdn.xitu.io/2018/9/14/165d838010b20a4c?w=908&h=547&f=gif&s=3663774)

在使用时，我们只需要将其以插件的形式引入：

```javascript
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
 
module.exports = {
  plugins: [
    new BundleAnalyzerPlugin()
  ]
}

```

## 优化篇-http压缩之Gzip

**Gzip**是若干种[文件压缩](https://zh.wikipedia.org/wiki/%E6%96%87%E4%BB%B6%E5%8E%8B%E7%BC%A9)[程序](https://zh.wikipedia.org/wiki/%E7%A8%8B%E5%BA%8F)的简称，通常指[GNU计划](https://zh.wikipedia.org/wiki/GNU%E8%A8%88%E5%8A%83)的实现，此处的gzip代表GNU zip。也经常用来表示gzip这种文件格式。



目前主要讲的gzip压缩优化，就是通过gzip这个压缩程序，对资源进行压缩，从而降低请求资源的文件大小。

### gzip简介



**示例**：csdn

在网络请求Network中，选择一个js或css，都能在Response Headers中找到 **content-encoding: gzip** 键值对，这就表示了这个文件是启用了gzip压缩的。
![在这里插入图片描述](https://img-blog.csdnimg.cn/2019090822573129.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvcGVfSXQ=,size_16,color_FFFFFF,t_70)

掘金：

![在这里插入图片描述](https://img-blog.csdnimg.cn/20190908225821250.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvcGVfSXQ=,size_16,color_FFFFFF,t_70)

淘宝网，等等



### demo演示

1. 建一个没有开启gzip的本地服务器，看看未开启gzip压缩这个文件是多大。

2. 用原生node写一个服务，目录和代码如下：

```javascript
const http = require("http");
const fs = require("fs");

const server = http.createServer((req, res) => {
  const rs = fs.createReadStream(`static${req.url}`); //读取文件流
  rs.pipe(res); //将数据以流的形式返回
  rs.on("error", err => {
    //找不到返回404
    console.log(err);
    res.writeHead(404);
    res.write("Not Found");
  });
});
//监听8080
server.listen(8080, () => {
  console.log("listen prot:8080");
});

```



用`node server.js`启动服务，访问[http://localhost:8080/target=http%3A%2F%2Flocalhost%3A8080%2Fvds.js)，网页会显示文件的内容，查看Network面版，会发现.js请求大小，和原始资源文件大小一致，Response Headers中也没有 **content-encoding: gzip** ，说明这是未经过gzip压缩的。



如何开启gzip呢，很简单，node为我们提供了zlib模块，直接使用就行，上面的代码简单修改一下就可以。

```javascript
const http = require("http");
const fs = require("fs");
const zlib = require("zlib"); // <-- 引入zlib块

const server = http.createServer((req, res) => {
  const rs = fs.createReadStream(`static${req.url}`);
  const gz = zlib.createGzip(); // <-- 创建gzip压缩
  rs.pipe(gz).pipe(res); // <-- 返回数据前经过gzip压缩
  rs.on("error", err => {
    console.log(err);
    res.writeHead(404);
    res.write("Not Found");
  });
});

server.listen(8080, () => {
  console.log("listen prot:8080");
});
```



运行这段代码，访问[http://localhost:8080/vds.js](https://link.juejin.im?target=http%3A%2F%2Flocalhost%3A8080%2Fvds.js)，会发现网页没有显示vds.js内容。

服务器设置：Response Headers里的 **content-encoding: gzip**。

我们最后修改一下代码，加一个请求头：

```javascript
const http = require("http");
const fs = require("fs");
const zlib = require("zlib"); 

const server = http.createServer((req, res) => {
  const rs = fs.createReadStream(`static${req.url}`);
  const gz = zlib.createGzip(); 
  res.setHeader("content-encoding", "gzip"); //添加content-encoding: gzip请求头。
  rs.pipe(gz).pipe(res); 
  rs.on("error", err => {
    console.log(err);
    res.writeHead(404);
    res.write("Not Found");
  });
});

server.listen(8080, () => {
  console.log("listen prot:8080");
```

浏览器再请求到gzip压缩后的文件，会先解压处理一下再使用，这对于我们用户来说是无感知的，工作浏览器都在背后默默做了，我们只是看到网络请求文件的大小，比服务器上实际资源的大小小了很多。



###  nginx中有关gzip的配置项如下：
 

1、gzip on|off：**默认off

开启或者关闭gzip模块

2、gzip_comp_level 4：**默认1，建议选择为4

gzip压缩比/压缩级别，压缩级别 1-9，级别越高压缩率越大，压缩时间越长，消耗CPU也越大。

3、gzip_min_length  1k：**默认0，不管页面多大都压缩

设置允许压缩的页面最小字节数，页面字节数从header头中的Content-Length中进行获取。

建议设置成大于1k的字节数，小于1k可能会越压越大。 即: gzip_min_length 1024

4、gzip_static on|off：**默认off

gzip_static是nginx对于静态文件的处理模块，可以读取预先压缩的gz文件，多与构建时压缩同时使用，详见下节构建时压缩介绍

5、**gzip_types** 

6、更多配置信息参考：**[Nginx的gzip](https://www.cnblogs.com/caonima-666/p/8436005.html)



### gzip的注意点

前面说的哪些文件适合开启gzip压缩，哪些不适合是一个注意点。

还有一个注意点是，谁来做这个gzip压缩，我们的例子是在接到请求时，由node服务器进行压缩处理。这和express中使用compression中间件，koa中使用koa-compress中间件，nginx和tomcat进行配置都是一样的，这也是比较普遍的一种做法，由服务端进行压缩处理。

服务器了解到我们这边有一个 gzip 压缩的需求，它会启动自己的 CPU 去为我们完成这个任务。而压缩文件这个过程本身是需要耗费时间的，大家可以理解为我们以服务器压缩的时间开销和 CPU 开销（以及浏览器解析压缩文件的开销）为代价，省下了一些传输过程中的时间开销。

如果我们在构建的时候，直接将资源文件打包成gz压缩包，其实也是可以的，这样可以省去服务器压缩的时间，减少一些服务端的消耗。

比如我们在使用webpack打包工具的时候可以使用[compression-webpack-plugin](https://link.juejin.im?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcompression-webpack-plugin)插件，在构建项目的时候进行gzip打包，详细的配置使用可以去看插件的文档，非常简单。

### gzip在webpack中的应用

此例子是真实项目中的配置

#### 1 先安装compression-webpack-plugin插件（注意版本问题）



#### 2 Config/index.js中配置：

```javascript
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
```

#### 3 发布时在webpack.prod.conf.js中设置具体配置

```javascript
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  )
```

#### 4  nginx配置

```javascript
1、gzip on|off

5、gzip_types 
```


说明：`webpack-dev-server`中的`compress: true`就是指采用gzip压缩


### brotli压缩

谁在用：

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019090823005291.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvcGVfSXQ=,size_16,color_FFFFFF,t_70)

支持Brotli压缩算法的浏览器使用的内容编码类型为`br`，

Chrome浏览器请求头里`Accept-Encoding`的值：

```javascript
Accept-Encoding: gzip, deflate, sdch, br
```

如果服务端支持Brotli算法，则会返回以下的响应头：

```javascript
Content-Encoding: br
```

> 需要注意的是，只有在HTTPS的情况下，浏览器才会发送`br`这个Accept-Encoding。

## 优化篇-`hard-source-webpack-plugin`
### dll的概念: 其实是做缓存
 > 所谓动态链接，就是把一些经常会共享的代码制作成 DLL 档，当可执行文件调用到 DLL 档内的函数时，Windows 操作系统才会把 DLL 档加载存储器内，DLL 档本身的结构就是可执行档，当程序有需求时函数才进行链接。透过动态链接方式，存储器浪费的情形将可大幅降低。

将dll和缓存进行对比可以发现：

|缓存|DLL|
|--|--|
|把常用的文件存储到内存或硬盘中|把公共代码打包为dll文件放到硬盘中|
|再次打包时，直接取读取缓存|再次打包时，读取dll文件，不重新打包|
|加载时间减少|打包时间减少|


 个人理解的`dll`基本过程：
 
 1. 第一次`npm run`的时候，把请求的内容存储起来（存储在映射表中）
 
 2. 再次请求时，先从映射表中找，看请求的内容是否有缓存，有则加载缓存（类似浏览器的缓存策略，命中缓存），没有就正常打包。
 3.  直接从缓存中读取。

 ### dll的应用: 配置繁琐
 用 DllPlugin 处理文件，要分两步走：

1. 创建 webpack.dll.js 打包脚本
2. 配置`package.json`
3. 基于 dll 专属的配置文件，打包 dll 库


创建 dll 文件的打包脚本，目的是把vue打包成 dll 文件
```javascript
// 文件目录：configs/webpack.dll.js

'use strict';

const path = require('path');
const webpack = require('webpack');

module.exports = {
    mode: 'production',
    entry: {
        vue: ['vue'],
    },
    // 这个是输出 dll 文件
    output: {
        path: path.resolve(__dirname, '../dll'),
        filename: '_dll_[name].js',
        library: '_dll_[name]',
    },
    // 这个是输出映射表
    plugins: [
        new webpack.DllPlugin({ 
            name: '_dll_[name]', // name === output.library
            path: path.resolve(__dirname, '../dll/[name].manifest.json'),
        })
    ]
};
```
`package.json配置`
运行 npm run build:dll 就可以打包 dll 文件
```javascript
// package.json

{
  "scripts": {
    "build:dll": "webpack --config configs/webpack.dll.js",
  },
}
```

告诉 webpack 可以命中的 dll 文件进行关联
```javascript
// 文件目录：configs/webpack.common.js

const path = require('path');
const AddAssetHtmlPlugin = require('add-asset-html-webpack-plugin'); // 顾名思义，把资源加到 html 里，那这个插件把 dll 加入到 index.html 里
const webpack = require('webpack');
module.exports = {
  // ......
  plugins: [
    new webpack.DllReferencePlugin({
      // 注意: DllReferencePlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
      context: path.resolve(__dirname, '../'),
      manifest: path.resolve(__dirname, '../dll/vue.manifest.json'),
    }),
    new AddAssetHtmlPlugin({
      filepath: path.resolve(__dirname, '../dll/_dll_vue.js'),
    }),
  ]
}
```

### 优化一：AutoDllPlugin：减少配置
webpack插件`autodll-webpack-plugin`
```javascript
// 文件目录：configs/webpack.common.js

const path = require('path');
const AutoDllPlugin = require('autodll-webpack-plugin'); // 第 1 步：引入 DLL 自动链接库插件

module.exports = {
  // ......
  plugins: [
        // 第 2 步：配置要打包为 dll 的文件
        new AutoDllPlugin({
            inject: true, // 设为 true 就把 DLL bundles 插到 index.html 里
            filename: '[name].dll.js',
            context: path.resolve(__dirname, '../'), // AutoDllPlugin 的 context 必须和 package.json 的同级目录，要不然会链接失败
            entry: {
                vue: [
                    'vue'
                ]
            }
        })
  ]
}
```

### 优化二：抛弃 DLL，选择hard-source-webpack-plugin
从`vue-cli`和`create-react-app`中可以知道并没有实用dll，
是因为：
<font color=red>Webpack 4 的打包性能足够好的，dll继续维护的必要了。</font>

更好的代替者`DLL，选择hard-source-webpack-plugin`

直接上代码：
```javascript
const HardSourceWebpackPlugin = require('hard-source-webpack-plugin');

module.exports = {
  // ......
  plugins: [
    new HardSourceWebpackPlugin() // <- 直接加入这行代码就行
  ]
}
```
使用前：67s
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191022213012193.png)
使用后：5s
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191022213051127.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvcGVfSXQ=,size_16,color_FFFFFF,t_70)
效果是杠杆的

## 原理篇-`hash+chunkhash+contenthash`
> 确保浏览器选择更改的文件的简单方法是使用 output.filename替换。该[hash]置换可用于文件名中包含一个内置特定的哈希值，但它甚至更好使用[contenthash]替代这是一个文件的内容，这是每个资产不同的哈希值。

<font color=red>官方文档中有关其用途的简要说明, output-filename的描述:</font>
[https://www.webpackjs.com/configuration/output/#output-filename](https://www.webpackjs.com/configuration/output/#output-filename)
hash、chunkhash和contenthash

`hash`
::: tip
[hash] is replaced by the hash of the compilation（）. 代表的是cpmpilation的hash。
:::
compilation在项目中任何一个文件改动后就会被重新创建，然后webpack计算新的compilation的hash值，这个hash值便是hash。

`chunkhash`
::: tip
[chunkhash] is replaced by the hash of the chunk. chunk（模块）的hash
:::
代表的是chunk(模块)的hash值。

`contenthash`
插件`extract-text-webpack-plugin`引入的`contenthash`


|模板|描述|
|---|---|
|[hash]|是“为每个构建生成的唯一hash” |
|[chunkhash]| 是“基于每个块的内容”的hash” |
|[contenthash] | 是“为提取的内容生成的”。 在使用 ExtractTextWebpackPlugin(MiniCssExtractPlugin) 时，可以用 [contenthash] 来获取提取文件的 hash（既不是 [hash] 也不是 [chunkhash]）

在这想通过示例的方式进一步理解：
我在我的3个文件js目录：`index.js`，`index.css`，`vendors.js`

关于`webpack.config.js`的配置：

```javascript
entry: {
  index: ["./js/index.js", "./js/index.css"],
  vendors: ["./js/vendors.js"]
},
output: {
  filename: "[name].[hash].js"
}
plugins: [
  new MiniCssExtractPlugin({
    filename: "[name].[hash].css"
  })
]
```

因此，我有2个块名称，`index`和`vendors`，但是看起来该`index`块也将具有`css`内容，因为它`css`在数组中导入了一个文件。构建时，css将使用`MiniCssExtractPlugin`（在我的情况下）将零件导出到单独的文件，但`Webpack`知道这一点，`index.js`并且`index.css`属于同一块。

现在，让我们尝试使用不同的哈希类型来构建它。（filename相等地更改两个选项,`[hash][chunkhash]`）

**示例1：使用`hash`**

`webpack.config.js`配置(非完整)：
```javascript
entry: {
  index: ['./js/index.js', './style/style.css'],
  vendors: ["./js/vendors.js"]
},
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.[name].[hash].js'
}
plugins: [
  new MiniCssExtractPlugin({
    filename: "css/[name].[hash].css"
  })
]
```

![在这里插入图片描述](https://img-blog.csdnimg.cn/2019111216411276.png)
* 每个文件都具有相同的哈希值，因为它`[hash]`是基于我们使用的所有源文件生成的。
* 如果我重新运行该构建而<font color=red>不更改任何内容</font>，则生成的`[hash]`将保持不变。
* 如果我仅<font color=red>编辑一个文件</font>，则`[hash]`值将发生变化，并且所有生成捆绑的名称中都会包含此新`[hash]`。

**示例2：使用`chunkhash`**
`webpack.config.js`配置：
```javascript
entry: {
  index: ['./js/index.js', './js/index.css'],
  vendors: ["./js/vendors.js"]
},
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.[name].[chunkhash].js'
}
plugins: [
  new MiniCssExtractPlugin({
    filename: "css/[name].[chunkhash].css"
  })
]
```
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191112164125639.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvcGVfSXQ=,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20191112164146103.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2hvcGVfSXQ=,size_16,color_FFFFFF,t_70)
* 如图，第一个和第二个文件来自同index一块，因此它们的名称具有相同的`[hash]`。这是因为`[chunkhash]`是基于给定块的全部内容生成的。因此，如果我编辑`index.css`并重新构建，来自index块的文件将具有一个新的哈希，但来自`vendors`块的文件将保持与以前相同。

**示例3：使用`contenthash`**
`webpack.config.js`配置：
```javascript
entry: {
  index: ['./js/index.js', './js/index.css'],
  vendors: ["./js/vendors.js"]
},
output: {
  path: path.resolve(__dirname, 'dist'),
  filename: 'bundle.[name].[contenthash].js'
}
plugins: [
  new MiniCssExtractPlugin({
    filename: "css/[name].[contenthash].css"
  })
]
```

**每个生成的文件的名称都有一个唯一的哈希值，该哈希值是根据该文件的内容计算得出的。如果我进行更改，例如index.css重新构建，则仅生成的`index.css`将具有新的哈希。**



### vue-cli举例说明hash
vue-cli脚手架中webpack的配置文件`hash`, `build/webpack.base.conf.js`

vue-cli中，hash用于图片，音视频，和字体文件
```javascript
// hash(hash,jpg,mo4,txt)
{
test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
loader: 'url-loader',
options: {
    limit: 10000,
    name: utils.assetsPath('img/[name].[hash:7].[ext]')
}
},
{
test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
loader: 'url-loader',
options: {
    limit: 10000,
    name: utils.assetsPath('media/[name].[hash:7].[ext]')
}
},
{
test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
loader: 'url-loader',
options: {
    limit: 10000,
    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
}
})
{
test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
loader: 'url-loader',
options: {
    limit: 10000,
    name: utils.assetsPath('img/[name].[hash:7].[ext]')
}
},
{
test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
loader: 'url-loader',
options: {
    limit: 10000,
    name: utils.assetsPath('media/[name].[hash:7].[ext]')
}
},
{
test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
loader: 'url-loader',
options: {
    limit: 10000,
    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
}
}
```

**chunkhash**,`build/webpack.prod.conf.js`

chuunkhash主要用于js文件中
```javascript
// chunkhash,js
    filename: utils.assetsPath('js/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
```

**contenthash**：`build/webpack.prod.conf.js`

使用extract-text-webpack-plugin单独编译输出css文件。extract-text-webpack-plugin提供了另外一种hash值：`contenthash`

```javascript
    // extract css into its own file
    new ExtractTextPlugin({
      filename: utils.assetsPath('css/[name].[contenthash].css')
    }),
```

## 原理篇-webpack 内部工作流程

了解 webpack 整个基础工作流程，有助于我们解决日常使用 webpack 时遇到的一些问题，也有助于我们更好地理解 webpack loader 和 plugin 的使用。

抛开复杂的 loader 和 plugin 机制，webpack 本质上就是一个 JS Module Bundler，用于将多个代码模块进行打包，所以我们先撇开 webpack 错综复杂的整体实现，来看一下一个相对简单的 JS Module Bunlder 的基础工作流程是怎么样的，在了解了 bundler 如何工作的基础上，再进一步去整理 webpack 整个流程，将 loader 和 plugin 的机制弄明白。

> 以下内容将 module bundler 简称为 bundler。

### bundler 的基础流程

首先，bundler 从一个构建入口出发，解析代码，分析出代码模块依赖关系，然后将依赖的代码模块组合在一起，在 JavaScript bundler 中，还需要提供一些胶水代码让多个代码模块可以协同工作，相互引用。下边会举一些简单的例子来说明一下这几个关键的部分是怎么工作的。

首先是解析代码，分析依赖关系，对于 [ES6 Module](http://es6.ruanyifeng.com/#docs/module) 以及 [CommonJS Modules](http://www.commonjs.org/specs/modules/1.0/) 语法定义的模块，例如这样的代码：

```javascript
// entry.js
import { bar } from './bar.js'; // 依赖 ./bar.js 模块

// bar.js
const foo = require('./foo.js'); // 依赖 ./foo.js 模块

```

bundler 需要从这个入口代码（第一段）中解析出依赖 bar.js，然后再读取 bar.js 这个代码文件，解析出依赖 foo.js 代码文件，继续解析其依赖，递归下去，直至没有更多的依赖模块，最终形成一颗模块依赖树。

> 至于如何从 JavaScript 代码中解析出这些依赖，作者写过一篇文章，可以参考下：[使用 Acorn 来解析 JavaScript](https://juejin.im/post/582425402e958a129926fcb4)。

如果 foo.js 文件没有依赖其他的模块的话，那么这个简单例子的依赖树也就相对简单：`entry.js -> bar.js -> foo.js`，当然，日常开发中遇见的一般都是相当复杂的代码模块依赖关系。

分析出依赖关系后，bunlder 需要将依赖关系中涉及的所有文件组合到一起，但由于依赖代码的执行是有先后顺序以及会引用模块内部不同的内容，不能简单地将代码拼接到一起。webpack 会利用 JavaScript Function 的特性提供一些代码来将各个模块整合到一起，即是将每一个模块包装成一个 JS Function，提供一个引用依赖模块的方法，如下面例子中的 `__webpack__require__`，这样做，既可以避免变量相互干扰，又能够有效控制执行顺序，简单的代码例子如下：

```javascript
// 分别将各个依赖模块的代码用 modules 的方式组织起来打包成一个文件
// entry.js
modules['./entry.js'] = function() {
  const { bar } = __webpack__require__('./bar.js')
}

// bar.js
modules['./bar.js'] = function() {
  const foo = __webpack__require__('./foo.js')
};

// foo.js
modules['./foo.js'] = function() {
  // ...
}

// 已经执行的代码模块结果会保存在这里
const installedModules = {}

function __webpack__require__(id) {
  // ... 
  // 如果 installedModules 中有就直接获取
  // 没有的话从 modules 中获取 function 然后执行，将结果缓存在 installedModules 中然后返回结果
}

```

这只是 webpack 的实现方式的简单例子，[rollup](https://rollupjs.org/guide/en) 有另外的实现方式，并且笔者个人觉得 rollup 的实现方式比 webpack 要更加优秀一些，rollup 可以让你构建出来的代码量更少一点，有兴趣的同学可以看看这个文章：[Webpack and Rollup: the same but different](https://medium.com/webpack/webpack-and-rollup-the-same-but-different-a41ad427058c)，也可以使用 [rollup](https://rollupjs.org/guide/en) 来构建一个简单的例子，看看结果是什么样子的。

我们在介绍 bundler 的基础流程时，把各个部分的实现细节简化了，这有利于我们从整体的角度去看清楚整个轮廓，至于某一部分的具体实现，例如解析代码依赖，模块依赖关系管理，胶水代码的生成等，深入细节的话会比较复杂，这里不再作相关的展开。

### webpack 的结构

webpack 需要强大的扩展性，尤其是插件实现这一块，webpack 利用了 [tapable](https://github.com/webpack/tapable) 这个库（其实也是 webpack 作者开发的库）来协助实现对于整个构建流程各个步骤的控制。

关于这个库更多的使用内容可以去查看官方的文档：[tapable](https://github.com/webpack/tapable)，使用上并不算十分复杂，最主要的功能就是用来添加各种各样的钩子方法（即 Hook）。

webpack 基于 tapable 定义了主要构建流程后，使用 tapable 这个库添加了各种各样的钩子方法来将 webpack 扩展至功能十分丰富，同时对外提供了相对强大的扩展性，即 plugin 的机制。

在这个基础上，我们来了解一下 webpack 工作的主要流程和其中几个重要的概念。

*   Compiler，webpack 的运行入口，实例化时定义 webpack 构建主要流程，同时创建构建时使用的核心对象 compilation
*   Compilation，由 Compiler 实例化，存储构建过程中各流程使用到的数据，用于控制这些数据的变化
*   Chunk，即用于表示 chunk 的类，对于构建时需要的 chunk 对象由 Compilation 创建后保存管理
*   Module，用于表示代码模块的类，衍生出很多子类用于处理不同的情况，关于代码模块的所有信息都会存在 Module 实例中，例如 `dependencies` 记录代码模块的依赖等
*   Parser，其中相对复杂的一个部分，基于 [acorn](https://github.com/acornjs/acorn) 来分析 AST 语法树，解析出代码模块的依赖
*   Dependency，解析时用于保存代码模块对应的依赖使用的对象
*   Template，生成最终代码要使用到的代码模板，像上述提到的胶水代码就是用对应的 Template 来生成

> 官方对于 Compiler 和 Compilation 的定义是：
> 
> **compiler** 对象代表了完整的 webpack 环境配置。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
> 
> **compilation** 对象代表了一次资源版本构建。当运行 webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。一个 compilation 对象表现了当前的模块资源、编译生成资源、变化的文件、以及被跟踪依赖的状态信息。compilation 对象也提供了很多关键步骤的回调，以供插件做自定义处理时选择使用。

上述是 webpack 源码实现中比较重要的几个部分，webpack 运行的大概工作流程是这样的：

```
创建 Compiler -> 
调用 compiler.run 开始构建 ->
创建 Compilation -> 
基于配置开始创建 Chunk -> 
使用 Parser 从 Chunk 开始解析依赖 -> 
使用 Module 和 Dependency 管理代码模块相互关系 -> 
使用 Template 基于 Compilation 的数据生成结果代码

```

上述只是笔者理解中的大概流程，细节相对复杂，一方面是技术实现的细节有一定复杂度，另一方面是实现的功能逻辑上也有一定复杂度，深入介绍的话，篇幅会很长，并且可能效果不理想，当我们还没到了要去实现具体功能的时候，无须关注那么具体的实现细节，只需要站在更高的层面去分析整体的流程。

有兴趣探究某一部分实现细节的同学，可以查阅 webpack 源码，从 webpack 基础流程入手：[Compiler Hooks](https://github.com/webpack/webpack/blob/master/lib/Compiler.js#L29)。

> 这里提供的是 4.x 版本的源码 master 分支的链接地址，webpack 的源码相对难懂，如果是想要学习 bundler 的整个工作流程，可以考虑看阅读 [rollup](https://github.com/rollup/rollup) 的源码，可读性相对会好很多。

### 从源码中探索 webpack

webpack 主要的构建处理方法都在 `Compilation` 中，我们要了解 loader 和 plugin 的机制，就要深入 `Compilation` 这一部分的内容。

Compilation 的实现也是比较复杂的，`lib/Compilation.js` 单个文件代码就有近 2000 行之多，我们挑关键的几个部分来介绍一下。

#### addEntry 和 \_addModuleChain

`addEntry` 这个方法顾名思义，用于把配置的入口加入到构建的任务中去，当解析好 webpack 配置，准备好开始构建时，便会执行 `addEntry` 方法，而 `addEntry` 会调用 `_addModuleChain` 来为入口文件（入口文件这个时候等同于第一个依赖）创建一个对应的 `Module` 实例。

`_addModuleChain` 方法会根据入口文件这第一个依赖的类型创建一个 `moduleFactory`，然后再使用这个 `moduleFactory` 给入口文件创建一个 `Module` 实例，这个 `Module` 实例用来管理后续这个入口构建的相关数据信息，关于 `Module` 类的具体实现可以参考这个源码：[lib/Module.js](https://github.com/webpack/webpack/blob/master/lib/Module.js)，这个是个基础类，大部分我们构建时使用的代码模块的 `Module` 实例是 [lib/NormalModule.js](https://github.com/webpack/webpack/blob/master/lib/NormalModule.js) 这个类创建的。

我们介绍 `addEntry` 主要是为了寻找整个构建的起点，让这一切有迹可循，后续的深入可以从这个点出发。

#### buildModule

当一个 `Module` 实例被创建后，比较重要的一步是执行 `compilation.buildModule` 这个方法，这个方法主要会调用 `Module` 实例的 `build` 方法，这个方法主要就是创建 `Module` 实例需要的一些东西，对我们梳理流程来说，这里边最重要的部分就是调用自身的 [runLoaders](https://github.com/webpack/webpack/blob/master/lib/NormalModule.js#L218) 方法。

`runLoaders` 这个方法是 webpack 依赖的这个类库实现的：[loader-runner](https://github.com/webpack/loader-runner)，这个方法也比较容易理解，就是执行对应的 loaders，将代码源码内容一一交由配置中指定的 loader 处理后，再把处理的结果保存起来。

我们之前介绍过，webpack 的 loader 就是转换器，loader 就是在这个时候发挥作用的，至于 loader 执行的细节，有兴趣深入的同学可以去了解 [loader-runner](https://github.com/webpack/loader-runner) 的实现。

上述提到的 `Module` 实例的 `build` 方法在执行完对应的 loader，处理完模块代码自身的转换后，还有相当重要的一步是调用 [Parser](https://github.com/webpack/webpack/blob/master/lib/Parser.js) 的实例来解析自身依赖的模块，解析后的结果存放在 `module.dependencies` 中，首先保存的是依赖的路径，后续会经由 `compilation.processModuleDependencies` 方法，再来处理各个依赖模块，递归地去建立整个依赖关系树。

#### Compilation 的钩子

我们前边提到了 webpack 会使用 [tapable](https://github.com/webpack/tapable) 给整个构建流程中的各个步骤定义钩子，用于注册事件，然后在特定的步骤执行时触发相应的事件，注册的事件函数便可以调整构建时的上下文数据，或者做额外的处理工作，这就是 webpack 的 plugin 机制。

在 webpack 执行入口处 [lib/webpack.js](https://github.com/webpack/webpack/blob/master/lib/webpack.js#L35) 有这么一段代码：

```javascript
if (options.plugins && Array.isArray(options.plugins)) {
	for (const plugin of options.plugins) {
		plugin.apply(compiler); // 调用每一个 plugin 的 apply 方法，把 compiler 实例传递过去
	}
}

```

这个 plugin 的 `apply` 方法就是用来给 `compiler` 实例注册事件钩子函数的，而 `compiler` 的一些事件钩子中可以获得 `compilation` 实例的引用，通过引用又可以给 `compilation` 实例注册事件函数，以此类推，便可以将 plugin 的能力覆盖到整个 webpack 构建过程。

而关于这些事件函数的名称和定义可以查看官方的文档：[compiler 的事件钩子](https://doc.webpack-china.org/api/compiler/#%E4%BA%8B%E4%BB%B6%E9%92%A9%E5%AD%90) 和 [compilation 的事件钩子](https://doc.webpack-china.org/api/compilation/)。

后续的 15 小节会介绍如何编写 webpack plugin，可以将两部分的内容结合一下，来帮助理解 webpack plugin 的执行机制。

#### 产出构建结果

最后还有一个部分，即用 `Template` 产出最终构建结果的代码内容，这一部分不作详细介绍了，仅留下一些线索，供有兴趣继续深入的同学使用：

*   `Template` 基础类：[lib/Template.js](https://github.com/webpack/webpack/blob/master/lib/Template.js)
*   常用的主要 `Template` 类：[lib/MainTemplate.js](https://github.com/webpack/webpack/blob/master/lib/MainTemplate.js)
*   Compilation 中产出构建结果的代码：[compilation.createChunkAssets](https://github.com/webpack/webpack/blob/master/lib/Compilation.js#L1722)

这一部分内容的介绍就到这里了，对此部分内容有兴趣继续深入探索的同学，建议使用断点调试的方式，结合笔者介绍的这些内容，大致走一遍 webpack 的构建流程，会对这一部分的内容印象更加深刻，同时也可以通过断点更有针对性地了解某一部分的细节处理。

