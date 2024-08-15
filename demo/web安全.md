# web安全
1. 同源策略，https
 - 若请求链接中的协议、主机名、端口、方法等任何一个不一样，都是不同源请求
 - 具体来讲，同源策略主要表现在 DOM、Web 数据和网络这三个层面(例如Cookie，DOM和Javascript命名空间)。
 - https在HTTP和TCP的传输中建立了一个安全层，利用对称加密和非对称加密结合数字证书认证的方式，让传输过程的安全性大大提高

2. xss 跨站脚本攻击

- 存储型XSS是最常见的XSS攻击，主要通过输入框、富文本等组件输入一些恶意的脚本代码，存储到服务端之后，当其他用户打开页面加载该脚本时便出现攻击行为
- 反射型XSS是需要用户点击黑客提供的恶意链接，该恶意链接会在跳转到正常页面的同时执行黑客脚本
- DOM型XSS存在于一些第三方插件中,文档型的 XSS 攻击并不会经过服务端，而是作为中间人的角色，在数据传输过程劫持到网络数据包，然后修改里面的 html 文档！(这样的劫持方式包括WIFI路由器劫持或者本地恶意软件等。)

防范：
  - 对于XSS的防范主要是防范持久型XSS，在页面的输入框和富文本提交时对字符串做过滤处理，同时在页面中只对可信的HTML文本做解析
  - csp
  - HttpOnly, 不让读取cookies

React 在渲染 HTML 内容和渲染 DOM 属性时都会将 "'&<> 这几个字符进行转义，转义部分源码如下：

```js
  '<'.charCodeAt()
  case 60: // <
        escape = '&lt;';
```
csp
- 内容安全策略，可以在HTML中的meta标签或者服务端返回的http res header `Content-Secrity-Policy`头中进行设置
- 可以指定资源的请求域、资源的加载方式等

```js
 <meta http-equiv="Content-Security-Policy" content="default-src 'self' *.mailsite.com; img-src *">
```
建议集成到cli里边，避免遗漏


设置，nginx或者是服务端
```
add_header Content-Security-Policy "指令";
```

3. csrf跨站请求伪造
跨站请求伪造，当用户在正常的网站登录之后，由于**同源请求会默认携带Cookie**，因此黑客可以在自己的网站中向正常网站发送伪造请求来冒充用户自己的操作

- 攻击方式主要包含通过标签的src属性、href属性以及form的action属性等，通常是伪造GET请求
- 防范方式包含使用POST请求处理资源、服务端验证请求的Referer,Origin、禁止第三方网站请求携带Cookie（SameSite）以及最后在请求时增加csrftoken字段做校验

4. sql注入
通过操作输入来修改SQL语句

- 验证用户输入：验证用户输入的数据，确保其符合预期格式，避免非法字符等。
- 转义特殊字符：在使用用户输入的数据构造 SQL 语句时，对特殊字符进行转义，以防止注入。