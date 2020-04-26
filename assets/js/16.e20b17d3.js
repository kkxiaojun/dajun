(window.webpackJsonp=window.webpackJsonp||[]).push([[16],{218:function(t,v,_){"use strict";_.r(v);var e=_(0),r=Object(e.a)({},(function(){var t=this,v=t.$createElement,_=t._self._c||v;return _("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[_("h2",{attrs:{id:"http"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#http"}},[t._v("#")]),t._v(" HTTP")]),t._v(" "),_("p",[t._v("HTTP 协议是个无状态协议，不会保存状态。")]),t._v(" "),_("h3",{attrs:{id:"post-和-get-的区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#post-和-get-的区别"}},[t._v("#")]),t._v(" Post 和 Get 的区别")]),t._v(" "),_("p",[t._v("先引入副作用和幂等的概念。")]),t._v(" "),_("p",[t._v("副作用指对服务器上的资源做改变，搜索是无副作用的，注册是副作用的。")]),t._v(" "),_("p",[t._v("幂等指发送 M 和 N 次请求（两者不相同且都大于 1），服务器上资源的状态一致，比如注册 10 个和 11 个帐号是不幂等的，对文章进行更改 10 次和 11 次是幂等的。")]),t._v(" "),_("p",[t._v("在规范的应用场景上说，Get 多用于无副作用，幂等的场景，例如搜索关键字。Post 多用于副作用，不幂等的场景，例如注册。")]),t._v(" "),_("p",[t._v("在技术上说：")]),t._v(" "),_("ul",[_("li",[t._v("浏览器主动cache，而POST不会，除非手动设置")]),t._v(" "),_("li",[t._v("幂等。Get 多用于无副作用，幂等的场景。post有副作用")]),t._v(" "),_("li",[_("font",{attrs:{color:"red"}},[t._v("get产生一个TCP数据包，post产生两个")]),t._v("。（get：产生一个TCP数据包，浏览器会把http header和data一并发送出去，服务器响应200(返回数据)，post：产生两个TCP数据包，浏览器先发送header，服务器响应100 continue，浏览器再发送data，服务器响应200 ok(返回数据））")],1),t._v(" "),_("li",[t._v("安全性。 Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里，且会被浏览器保存历史纪录，Post 不会，但是在抓包的情况下都是一样的。因为："),_("font",{attrs:{color:"red"}},[t._v("HTTP本身是明文协议")])],1),t._v(" "),_("li",[t._v("URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的")]),t._v(" "),_("li",[t._v("Post 支持更多的编码类型且不对数据类型限制")])]),t._v(" "),_("h3",{attrs:{id:"常见状态码"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#常见状态码"}},[t._v("#")]),t._v(" 常见状态码")]),t._v(" "),_("p",[_("strong",[t._v("2XX 成功")])]),t._v(" "),_("ul",[_("li",[t._v("200 OK，表示从客户端发来的请求在服务器端被正确处理")]),t._v(" "),_("li",[t._v("204 No content，表示请求成功，但响应报文不含实体的主体部分")]),t._v(" "),_("li",[t._v("205 Reset Content，表示请求成功，但响应报文不含实体的主体部分，但是与 204 响应不同在于要求请求方重置内容")]),t._v(" "),_("li",[t._v("206 Partial Content，进行范围请求")])]),t._v(" "),_("p",[_("strong",[t._v("3XX 重定向")])]),t._v(" "),_("ul",[_("li",[t._v("301 moved permanently，永久性重定向，表示资源已被分配了新的 URL")]),t._v(" "),_("li",[t._v("302 found，临时性重定向，表示资源临时被分配了新的 URL")]),t._v(" "),_("li",[t._v("303 see other，表示资源存在着另一个 URL，应使用 GET 方法获取资源")]),t._v(" "),_("li",[t._v("304 not modified，表示服务器允许访问资源，但因发生请求未满足条件的情况")]),t._v(" "),_("li",[t._v("307 temporary redirect，临时重定向，和302含义类似，但是期望客户端保持请求方法不变向新的地址发出请求")])]),t._v(" "),_("p",[_("strong",[t._v("4XX 客户端错误")])]),t._v(" "),_("ul",[_("li",[t._v("400 bad request，请求报文存在语法错误")]),t._v(" "),_("li",[t._v("401 unauthorized，表示发送的请求需要有通过 HTTP 认证的认证信息")]),t._v(" "),_("li",[t._v("403 forbidden，表示对请求资源的访问被服务器拒绝")]),t._v(" "),_("li",[t._v("404 not found，表示在服务器上没有找到请求的资源")])]),t._v(" "),_("p",[_("strong",[t._v("5XX 服务器错误")])]),t._v(" "),_("ul",[_("li",[t._v("500 internal sever error，表示服务器端在执行请求时发生了错误")]),t._v(" "),_("li",[t._v("501 Not Implemented，表示服务器不支持当前请求所需要的某个功能")]),t._v(" "),_("li",[t._v("503 service unavailable，表明服务器暂时处于超负载或正在停机维护，无法处理请求")])])])}),[],!1,null,null,null);v.default=r.exports}}]);