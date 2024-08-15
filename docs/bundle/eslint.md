## 如何写一个eslint插件

https://obkoro1.com/web_accumulate/accumulate/tool/ESLint%E6%8F%92%E4%BB%B6.html#rule%E5%AE%8C%E6%95%B4%E6%96%87%E4%BB%B6

## ESLint的运行原理
1. 将代码解析成AST;ESLint使用JavaScript解析器Espree把JS代码解析成AST。

2. 深度遍历AST，监听匹配过程。(在拿到AST之后，ESLint会以"从上至下"再"从下至上"的顺序遍历每个选择器两次。)

3. 触发监听选择器的rule回调;在深度遍历的过程中，生效的每条规则都会对其中的某一个或多个选择器进行监听，每当匹配到选择器，监听该选择器的rule，都会触发对应的回调。




