# AST
实现一个编译器：https://wl05.github.io/tech/javascript/ast/#%E5%AE%9E%E7%8E%B0%E4%B8%80%E4%B8%AA%E7%AE%80%E5%8D%95%E7%9A%84js%E7%BC%96%E8%AF%91%E5%99%A8
https://zhuanlan.zhihu.com/p/137509746
## 编译器的基本流程和原理
1. parse
  - 词法分析 token 数据
  - 语法分析： token 数组，转成 ast；目标是生成ast
2. transform, 增删改查，生成新的ast
3. code generate

# es6 如何转化为 es5

ES6 转 ES5 目前行业标配是用 Babel，转换的大致流程如下：

1. 解析：可以使用 `@babel/parser` 的 `parse` 方法，将代码字符串解析成 `AST；`
2. 转换：按一定的规则转换、修改 AST(常见的比如转 jsx, S6 转 ES5 都是在这一步进行操作)；
3. 生成：使用 `@babel/core` 的 `transformFromAstSync` 方法，对 AST 进行处理，将其转成 ES5 并生成相应的代码字符串。(可能还需要使用 `@babel/traverse` 来获取依赖文件等)

如果不用工具，纯人工的话，就是使用或自己写各种 polyfill(垫片) 了。

# 白屏产生的原因, 兼容性处理（css, js）

## 1. 低版本浏览器的语法和api（检测api）; 如：Array.isArray()

1. eslint-plugin-es (检测语法)
2. eslint-plugin-compat（can i use, 数据库），检测浏览器api

## 2. 关于polyfill 垫片(检测css兼容性，js兼容性)
https://github.com/pigcan/blog/issues/26

- babel，在 @babel/preset-env 中使用 core-js 3 作为垫片
    @babel/preset-env（解决api和语法问题）
    @babel/plugin-transform-runtime(解决全局污染问题)

- postcss 使用 autoprefixer 作为垫片;PostCSS Autoprefixer时，你需要在配置文件中设置Browserslist

- browserslist 的原理: browserslist 根据正则解析查询语句，对浏览器版本数据库 caniuse-lite 进行查询，返回所得的浏览器版本列表 caniuse-lite（项目控制台，经常会让你升级caniuse-lite的提示，就是这个原因）

## 3. es-check, 检测语法问题(检测语法，const, let);android 5.0问题

  es-check:
    - fast-glob,获取目标文件
    - acorn.js解析源码（ecmaVersion，指定要解析的版本），生成ast，并捕获解析错误
    - 判断是否存在错误，输出
    - 单文件多次检测（对AST直接进行节点遍历（`acorn-walk`），然后分别检测每个节点对应的代码是否合法）;https://borninsummer.com/files/2018/11/acorn.js-intro.pdf
    - sourcemap解析

  acorn.js实际应用
   - acorn-walk 遍历ast, ast => 代码: escodegen
   - webpack用acorn.js作为基础的parser库
   - ESM 中的相对路径 => 绝对路径

   https://juejin.cn/post/7253331974051823675

# babel配置相关
解析说明：https://github.com/pigcan/blog/issues/26


 - @babel/preset-env 主要做的是转换 JavaScript 最新的 Syntax（指的是 const let ... 等）， 而作为可选项 preset-env 也可以转换 JavaScript 最新的 API （指的是比如 数组最新的方法 filter 、includes，Promise 等等）
 - 

使用:
https://juejin.cn/post/6844904055005773831#heading-8
https://segmentfault.com/a/1190000020237817

##  babel 插件原理：

执行流程：

1. 词法分析 token 数据
2. 语法分析： token 数组，转成 ast；目标是生成ast
3. visitor(Path);(当 Babel 处理一个节点时，是以访问者的形式获取节点信息，并进行相关操作，这种方式是通过一个 visitor 对象来完成的)
4. AST 到源代码

https://juejin.cn/post/6844903746804137991

## 如何写一个babel插件(具体到关键代码和api，hh)

- 自动国际化

借助工具查看ast：astexplorer.net

中文类型对应ast的type：
1. StringLiteral 这也是最多的（let text = "中文"）
2. JSXText 这种最简单；（<div>哈哈</div>）
3. TemplateLiteral；模板字符串

整体过程, 三件事情
1. 如果没有引入 translate 模块，就自动引入，并且生成唯一的标识符，不和作用域的其他声明冲突；（在 Program 的 enter 阶段判断，或者是在替换阶段）
2. 把字符串和模版字符串（以上说的3种类型）替换为 intl.t 的函数调用的形式；（ /*i18n-disable*/ 不想替换的，打标）
3. 把收集到的值收集起来，输出到一个资源文件中

注意事项：
1. 在 jsx 中，必须带 {}，{} 节点叫做 JSXExpressionContainer（ jsx 中的表达式容器，用于实现插值语法。）
2. 模版字符串中的表达式 ${} 要单独处理；（有的时候，确实不需要转换，我们可以支持通过注释来配置/*i18n-disable*/），判断是JSXAttribute还是模版字符串字面量（isTemplateLiteral）



# 总结：应该怎么配babel;

1. 适合业务开发；稳定的基础版本：设置为entry,将最低环境不支持的所有 polyfill 都引入到入口文件（缺点是；引入的polyfill是会污染全局的）

```js
{
  "presets": [
    [
      "@babel/preset-env",
      {
        "targets": {
          "chrome": "58" // 按自己需要填写
        },
        "useBuiltIns": "entry", // 如果能保证第三方库是有做好polyfill，可以用usage
        "corejs": {
          "version": 3,
          "proposals": true
        }
      }
    ]
  ],
  "plugins": []
}

import 'core-js/stable';
import 'regenerator-runtime/runtime';
// 入口文件代码

```

**如果是 Library 开发者：**

问题：针对项目，polyfill 会污染全局可以接受，但是作为 Library 我更希望它不会污染全局环境
`@babel/plugin-transform-runtime`插件实现的 polyfill 是不会影响全局的

```js
{
  "presets": [
    [
      "@babel/preset-env",
    ]
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime",
      {
        "corejs": {
          "version": 3,
          "proposals": true
        }
      }
    ]
  ]
}
```

## postcss-pxtorem,postcss原理
### postcss，对 CSS 进行处理，最终生成CSS

主要步骤：

解释：接收输入的css，将css内容处理成css抽象语法树。
转换：根据配置插件的顺序对树型结构的 AST 进行操作。
输出：最终将处理后获得的 AST S 对象输出为 css 文件。


### postcss-pxtorem, postcss的插件

- walkRules 遍历选择器节点
- walkDecls 遍历属性节点

```js
const postcss = require('postcss');

module.exports = postcss.plugin('postcss-pxtorem', (options = {}) => {
  const { rootValue = 16, unitPrecision = 5, propList = ['*'], selectorBlackList = [], replace = true, mediaQuery = false } = options;

  return (css) => {
    // css是，postcss经过处理后的css AST结构
    css.walkRules((rule) => {
      rule.walkDecls((decl) => {
        const { prop, value } = decl;

        // 检查属性是否在配置的propList中
        if (!propList.includes(prop)) {
          return;
        }

        // 检查选择器是否在配置的selectorBlackList中
        if (selectorBlackList.some((selector) => rule.selector.includes(selector))) {
          return;
        }

        // 检查值是否包含像素单位
        if (value.includes('px')) {
          const remValue = parseFloat(value) / rootValue;

          // 根据unitPrecision舍入rem值
          const roundedRemValue = remValue.toFixed(unitPrecision);

          // 替换像素值为rem值
          const remDeclaration = value.replace(/(\d*\.?\d+)px/g, `${roundedRemValue}rem`);

          // 替换或插入新的声明
          if (replace) {
            decl.value = remDeclaration;
          } else {
            rule.insertAfter(decl, { prop, value: remDeclaration });
          }
        }
      });
    });

    if (mediaQuery) {
      css.walkAtRules('media', (rule) => {
        rule.params = rule.params.replace(/(\d*\.?\d+)px/g, ($0, $1) => {
          const remValue = parseFloat($1) / rootValue;
          const roundedRemValue = remValue.toFixed(unitPrecision);
          return `${roundedRemValue}rem`;
        });
      });
    }
  };
});
```




掘金小册子
https://juejin.cn/book/6946117847848321055/section/6951617082454704162
滴滴的方案：
https://github.com/didi/di18n