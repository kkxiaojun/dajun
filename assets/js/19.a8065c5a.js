(window.webpackJsonp=window.webpackJsonp||[]).push([[19],{216:function(t,e,v){"use strict";v.r(e);var _=v(0),n=Object(_.a)({},(function(){var t=this,e=t.$createElement,v=t._self._c||e;return v("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[v("p",[t._v("HTTP长连接和短连接这个说法是有有问题的。应该是TCP（传输层协议）连接。")]),t._v(" "),v("ol",[v("li",[t._v("http是应用层协议。应该是http请求/http响应")]),t._v(" "),v("li",[t._v("http1.0默认的是短连接，http1.1后默认的是长连接")])]),t._v(" "),v("p",[v("strong",[t._v("TCP长连接")]),t._v("\ntcp建立一次连接后不关闭（具体的时间长短，是可以在header当中进行设置的，也就是所谓的超时时间）。web中的js,css，html都是可以缓存的")]),t._v(" "),v("p",[v("strong",[t._v("TCP短连接")]),t._v("\ntcp每次建立连接后，请求完成，连接关闭。下次传输连接需要再次建立。")]),t._v(" "),v("h3",{attrs:{id:"http-首部"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#http-首部"}},[t._v("#")]),t._v(" HTTP 首部")]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("通用字段")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("作用")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Cache-Control")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("控制缓存的行为")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Connection")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("浏览器想要优先使用的连接类型，比如  "),v("code",[t._v("keep-alive")])])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Date")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("创建报文时间")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Pragma")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("报文指令")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Via")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("代理服务器相关信息")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Transfer-Encoding")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("传输编码方式")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Upgrade")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("要求客户端升级协议")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Warning")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("在内容中可能存在错误")])])])]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("请求字段")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("作用")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Accept")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("能正确接收的媒体类型")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Accept-Charset")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("能正确接收的字符集")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Accept-Encoding")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("能正确接收的编码格式列表")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Accept-Language")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("能正确接收的语言列表")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Expect")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("期待服务端的指定行为")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("From")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("请求方邮箱地址")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Host")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("服务器的域名")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("If-Match")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("两端资源标记比较")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("If-Modified-Since")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("本地资源未修改返回 304（比较时间）")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("If-None-Match")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("本地资源未修改返回 304（比较标记）")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("User-Agent")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("客户端信息")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Max-Forwards")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("限制可被代理及网关转发的次数")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Proxy-Authorization")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("向代理服务器发送验证信息")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Range")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("请求某个内容的一部分")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Referer")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("表示浏览器所访问的前一个页面")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("TE")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("传输编码方式")])])])]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("响应字段")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("作用")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Accept-Ranges")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("是否支持某些种类的范围")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Age")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("资源在代理缓存中存在的时间")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("ETag")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("资源标识")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Location")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("客户端重定向到某个 URL")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Proxy-Authenticate")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("向代理服务器发送验证信息")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Server")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("服务器名字")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("WWW-Authenticate")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("获取资源需要的验证信息")])])])]),t._v(" "),v("table",[v("thead",[v("tr",[v("th",{staticStyle:{"text-align":"center"}},[t._v("实体字段")]),t._v(" "),v("th",{staticStyle:{"text-align":"center"}},[t._v("作用")])])]),t._v(" "),v("tbody",[v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Allow")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("资源的正确请求方式")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Content-Encoding")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("内容的编码格式")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Content-Language")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("内容使用的语言")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Content-Length")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("request body 长度")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Content-Location")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("返回数据的备用地址")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Content-MD5")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("Base64加密格式的内容 MD5检验值")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Content-Range")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("内容的位置范围")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Content-Type")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("内容的媒体类型")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Expires")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("内容的过期时间")])]),t._v(" "),v("tr",[v("td",{staticStyle:{"text-align":"center"}},[t._v("Last_modified")]),t._v(" "),v("td",{staticStyle:{"text-align":"center"}},[t._v("内容的最后修改时间")])])])]),t._v(" "),v("p",[t._v("PS：缓存相关已在别的模块中写完，你可以 "),v("router-link",{attrs:{to:"/Performance/performance-ch.html#缓存"}},[t._v("阅读该小节")])],1),t._v(" "),v("h2",{attrs:{id:"dns"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#dns"}},[t._v("#")]),t._v(" DNS")]),t._v(" "),v("p",[t._v("DNS 的作用就是通过域名查询到具体的 IP。")]),t._v(" "),v("p",[t._v("因为 IP 存在数字和英文的组合（IPv6），很不利于人类记忆，所以就出现了域名。你可以把域名看成是某个 IP 的别名，DNS 就是去查询这个别名的真正名称是什么。")]),t._v(" "),v("p",[t._v("在 TCP 握手之前就已经进行了 DNS 查询，这个查询是操作系统自己做的。当你在浏览器中想访问 "),v("code",[t._v("www.google.com")]),t._v(" 时，会进行一下操作：")]),t._v(" "),v("ol",[v("li",[t._v("操作系统会首先在本地缓存中查询")]),t._v(" "),v("li",[t._v("没有的话会去系统配置的 DNS 服务器中查询")]),t._v(" "),v("li",[t._v("如果这时候还没得话，会直接去 DNS 根服务器查询，这一步查询会找出负责 "),v("code",[t._v("com")]),t._v(" 这个一级域名的服务器")]),t._v(" "),v("li",[t._v("然后去该服务器查询 "),v("code",[t._v("google")]),t._v(" 这个二级域名")]),t._v(" "),v("li",[t._v("接下来三级域名的查询其实是我们配置的，你可以给 "),v("code",[t._v("www")]),t._v(" 这个域名配置一个 IP，然后还可以给别的三级域名配置一个 IP")])]),t._v(" "),v("p",[t._v("以上介绍的是 DNS 迭代查询，还有种是递归查询，区别就是前者是由客户端去做请求，后者是由系统配置的 DNS 服务器做请求，得到结果后将数据返回给客户端。")]),t._v(" "),v("p",[t._v("PS：DNS 是基于 UDP 做的查询。")]),t._v(" "),v("h2",{attrs:{id:"从输入-url-到页面加载完成的过程"}},[v("a",{staticClass:"header-anchor",attrs:{href:"#从输入-url-到页面加载完成的过程"}},[t._v("#")]),t._v(" 从输入 URL 到页面加载完成的过程")]),t._v(" "),v("p",[t._v("这是一个很经典的面试题，在这题中可以将本文讲得内容都串联起来。")]),t._v(" "),v("ol",[v("li",[t._v("首先做 DNS 查询，如果这一步做了智能 DNS 解析的话，会提供访问速度最快的 IP 地址回来")]),t._v(" "),v("li",[t._v("接下来是 TCP 握手，应用层会下发数据给传输层，这里 TCP 协议会指明两端的端口号，然后下发给网络层。网络层中的 IP 协议会确定 IP 地址，并且指示了数据传输中如何跳转路由器。然后包会再被封装到数据链路层的数据帧结构中，最后就是物理层面的传输了")]),t._v(" "),v("li",[t._v("TCP 握手结束后会进行 TLS 握手，然后就开始正式的传输数据")]),t._v(" "),v("li",[t._v("数据在进入服务端之前，可能还会先经过负责负载均衡的服务器，它的作用就是将请求合理的分发到多台服务器上，这时假设服务端会响应一个 HTML 文件")]),t._v(" "),v("li",[t._v("首先浏览器会判断状态码是什么，如果是 200 那就继续解析，如果 400 或 500 的话就会报错，如果 300 的话会进行重定向，这里会有个重定向计数器，避免过多次的重定向，超过次数也会报错")]),t._v(" "),v("li",[t._v("浏览器开始解析文件，如果是 gzip 格式的话会先解压一下，然后通过文件的编码格式知道该如何去解码文件")]),t._v(" "),v("li",[t._v("文件解码成功后会正式开始渲染流程，先会根据 HTML 构建 DOM 树，有 CSS 的话会去构建 CSSOM 树。如果遇到 "),v("code",[t._v("script")]),t._v(" 标签的话，会判断是否存在 "),v("code",[t._v("async")]),t._v(" 或者 "),v("code",[t._v("defer")]),t._v(" ，前者会并行进行下载并执行 JS，后者会先下载文件，然后等待 HTML 解析完成后顺序执行，如果以上都没有，就会阻塞住渲染流程直到 JS 执行完毕。遇到文件下载的会去下载文件，这里如果使用 HTTP 2.0 协议的话会极大的提高多图的下载效率。")]),t._v(" "),v("li",[t._v("初始的 HTML 被完全加载和解析后会触发 "),v("code",[t._v("DOMContentLoaded")]),t._v(" 事件")]),t._v(" "),v("li",[t._v("CSSOM 树和 DOM 树构建完成后会开始生成 Render 树，这一步就是确定页面元素的布局、样式等等诸多方面的东西")]),t._v(" "),v("li",[t._v("在生成 Render 树的过程中，浏览器就开始调用 GPU 绘制，合成图层，将内容显示在屏幕上了")])])])}),[],!1,null,null,null);e.default=n.exports}}]);