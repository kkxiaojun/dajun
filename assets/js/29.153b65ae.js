(window.webpackJsonp=window.webpackJsonp||[]).push([[29],{229:function(_,v,t){"use strict";t.r(v);var a=t(0),e=Object(a.a)({},(function(){var _=this,v=_.$createElement,t=_._self._c||v;return t("ContentSlotsDistributor",{attrs:{"slot-key":_.$parent.slotKey}},[t("h1",{attrs:{id:"tcp"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tcp"}},[_._v("#")]),_._v(" TCP")]),_._v(" "),t("p",[_._v("先亮出这篇文章的思维导图:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/base.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("TCP 作为传输层的协议，是一个软件工程师素养的体现，也是面试中经常被问到的知识点。在此，我将 TCP 核心的一些问题梳理了一下，希望能帮到各位。")]),_._v(" "),t("h2",{attrs:{id:"_001-能不能说一说-tcp-和-udp-的区别？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_001-能不能说一说-tcp-和-udp-的区别？"}},[_._v("#")]),_._v(" 001. 能不能说一说 TCP 和 UDP 的区别？")]),_._v(" "),t("p",[_._v("首先概括一下基本的区别:")]),_._v(" "),t("p",[t("strong",[_._v("TCP 是一个面向连接的、可靠的、基于字节流的传输层协议。")])]),_._v(" "),t("p",[_._v("而"),t("strong",[_._v("UDP 是一个面向无连接的传输层协议。")]),_._v("(就这么简单，其它 TCP 的特性也就没有了)。")]),_._v(" "),t("p",[_._v("具体来分析，和 "),t("code",[_._v("UDP")]),_._v(" 相比，"),t("code",[_._v("TCP")]),_._v(" 有三大核心特性:")]),_._v(" "),t("ol",[t("li",[t("p",[t("strong",[_._v("面向连接")]),_._v("。所谓的连接，指的是客户端和服务器的连接，在双方互相通信之前，TCP 需要三次握手建立连接，而 UDP 没有相应建立连接的过程。")])]),_._v(" "),t("li",[t("p",[t("strong",[_._v("可靠性")]),_._v("。TCP 花了非常多的功夫保证连接的可靠，这个可靠性体现在哪些方面呢？一个是有状态，另一个是可控制。")])])]),_._v(" "),t("p",[_._v("TCP 会精准记录哪些数据发送了，哪些数据被对方接收了，哪些没有被接收到，而且保证数据包按序到达，不允许半点差错。这是"),t("strong",[_._v("有状态")]),_._v("。")]),_._v(" "),t("p",[_._v("当意识到丢包了或者网络环境不佳，TCP 会根据具体情况调整自己的行为，控制自己的发送速度或者重发。这是"),t("strong",[_._v("可控制")]),_._v("。")]),_._v(" "),t("p",[_._v("相应的，UDP 就是"),t("code",[_._v("无状态")]),_._v(", "),t("code",[_._v("不可控")]),_._v("的。")]),_._v(" "),t("ol",{attrs:{start:"3"}},[t("li",[t("strong",[_._v("面向字节流")]),_._v("。UDP 的数据传输是基于数据报的，这是因为仅仅只是继承了 IP 层的特性，而 TCP 为了维护状态，将一个个 IP 包变成了字节流。")])]),_._v(" "),t("h2",{attrs:{id:"_002-说说-tcp-三次握手的过程？为什么是三次而不是两次、四次？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_002-说说-tcp-三次握手的过程？为什么是三次而不是两次、四次？"}},[_._v("#")]),_._v(" 002: 说说 TCP 三次握手的过程？为什么是三次而不是两次、四次？")]),_._v(" "),t("h3",{attrs:{id:"真实握手"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#真实握手"}},[_._v("#")]),_._v(" 真实握手")]),_._v(" "),t("p",[t("strong",[_._v("前置知识点")])]),_._v(" "),t("ul",[t("li",[_._v("SYN(synchronous建立联机)")]),_._v(" "),t("li",[_._v("ACK(acknowledgement 确认)")]),_._v(" "),t("li",[_._v("ISN(Initial Sequence Number)")])]),_._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"custom-block-title"},[_._v("TIP")]),_._v(" "),t("p",[_._v("三次握手（Three-way Handshake）其实就是指建立一个TCP连接时，需要"),t("strong",[_._v("客户端和服务器总共发送3个包")]),_._v("。进行三次握手的主要作用就是为了"),t("strong",[_._v("确认双方的接收能力和发送能力")]),_._v("是否正常、指定自己的"),t("strong",[_._v("初始化序列号")]),_._v("为后面的可靠性传送做准备。实质上其实就是连接服务器指定端口，建立TCP连接，并"),t("strong",[_._v("同步连接双方的序列号和确认号")]),_._v("，交换TCP窗口大小信息。")])]),_._v(" "),t("p",[_._v("TCP 的三次握手，是需要确认双方的两样能力: "),t("code",[_._v("发送的能力")]),_._v("和"),t("code",[_._v("接收的能力")]),_._v("。于是便会有下面的三次握手的过程:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp1.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("从最开始双方都处于"),t("code",[_._v("CLOSED")]),_._v("状态。然后服务端开始监听某个端口，进入了"),t("code",[_._v("LISTEN")]),_._v("状态。")]),_._v(" "),t("ol",[t("li",[t("p",[_._v("客户端主动发起连接，发送 SYN , 自己变成了"),t("code",[_._v("SYN-SENT")]),_._v("状态。")])]),_._v(" "),t("li",[t("p",[_._v("服务端接收到，返回"),t("code",[_._v("SYN")]),_._v("和"),t("code",[_._v("ACK")]),_._v("(对应客户端发来的 SYN)，自己变成了"),t("code",[_._v("SYN-REVD")]),_._v("。")])]),_._v(" "),t("li",[t("p",[_._v("客户端再发送"),t("code",[_._v("ACK")]),_._v("给服务端，自己变成了"),t("code",[_._v("ESTABLISHED")]),_._v("状态；服务端收到"),t("code",[_._v("ACK")]),_._v("之后，也变成了"),t("code",[_._v("ESTABLISHED")]),_._v("状态。")])])]),_._v(" "),t("p",[_._v("另外需要提醒你注意的是，从图中可以看出，SYN 是需要消耗一个序列号的，下次发送对应的 ACK 序列号要加 1，为什么呢？只需要记住一个规则:")]),_._v(" "),t("blockquote",[t("p",[_._v("凡是需要对端确认的，一定消耗 TCP 报文的序列号。")])]),_._v(" "),t("p",[_._v("SYN 需要对端的确认， 而 ACK 并不需要，因此 SYN 消耗一个序列号而 ACK 不需要。")]),_._v(" "),t("h3",{attrs:{id:"为什么不是两次？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么不是两次？"}},[_._v("#")]),_._v(" 为什么不是两次？")]),_._v(" "),t("p",[_._v("根本原因: "),t("strong",[_._v("无法确认客户端的接收能力")]),_._v("。")]),_._v(" "),t("p",[_._v("分析如下:")]),_._v(" "),t("p",[_._v("如果是两次，你现在发了 SYN 报文想握手，但是这个包"),t("strong",[_._v("滞留")]),_._v("在了当前的网络中迟迟没有到达，"),t("font",{attrs:{color:"red"}},[_._v("TCP 以为这是丢了包")]),_._v("，于是重传，两次握手建立好了连接。")],1),_._v(" "),t("p",[_._v("看似没有问题，但是连接关闭后，如果这个"),t("strong",[_._v("滞留")]),_._v("在网路中的包到达了服务端呢？这时候由于是两次握手，服务端只要接收到然后发送相应的数据包，就默认"),t("strong",[_._v("建立连接")]),_._v("，但是现在客户端已经断开了。")]),_._v(" "),t("p",[_._v("看到问题的吧，这就带来了"),t("strong",[_._v("连接资源的浪费")]),_._v("。")]),_._v(" "),t("h3",{attrs:{id:"为什么不是四次？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么不是四次？"}},[_._v("#")]),_._v(" 为什么不是四次？")]),_._v(" "),t("p",[_._v("三次握手的目的是确认双方"),t("code",[_._v("发送")]),_._v("和"),t("code",[_._v("接收")]),_._v("的能力，那四次握手可以嘛？")]),_._v(" "),t("p",[_._v("当然可以，100 次都可以。但为了解决问题，三次就足够了，再多用处就不大了。")]),_._v(" "),t("h3",{attrs:{id:"三次握手过程中可以携带数据么？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#三次握手过程中可以携带数据么？"}},[_._v("#")]),_._v(" 三次握手过程中可以携带数据么？")]),_._v(" "),t("p",[_._v("第三次握手的时候，可以携带。前两次握手不能携带数据。")]),_._v(" "),t("p",[_._v("如果前两次握手能够携带数据，那么一旦有人想攻击服务器，那么他只需要在第一次握手中的 SYN 报文中放大量数据，那么服务器势必会消耗更多的"),t("strong",[_._v("时间")]),_._v("和"),t("strong",[_._v("内存空间")]),_._v("去处理这些数据，增大了服务器被攻击的风险。")]),_._v(" "),t("p",[_._v("第三次握手的时候，客户端已经处于"),t("code",[_._v("ESTABLISHED")]),_._v("状态，并且已经能够确认服务器的接收、发送能力正常，这个时候相对安全了，可以携带数据。")]),_._v(" "),t("h3",{attrs:{id:"同时打开会怎样？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#同时打开会怎样？"}},[_._v("#")]),_._v(" 同时打开会怎样？")]),_._v(" "),t("p",[_._v("如果双方同时发 "),t("code",[_._v("SYN")]),_._v("报文，状态变化会是怎样的呢？")]),_._v(" "),t("p",[_._v("这是一个可能会发生的情况。")]),_._v(" "),t("p",[_._v("状态变迁如下:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp2.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("在发送方给接收方发"),t("code",[_._v("SYN")]),_._v("报文的同时，接收方也给发送方发"),t("code",[_._v("SYN")]),_._v("报文，两个人刚上了!")]),_._v(" "),t("p",[_._v("发完"),t("code",[_._v("SYN")]),_._v("，两者的状态都变为"),t("code",[_._v("SYN-SENT")]),_._v("。")]),_._v(" "),t("p",[_._v("在各自收到对方的"),t("code",[_._v("SYN")]),_._v("后，两者状态都变为"),t("code",[_._v("SYN-REVD")]),_._v("。")]),_._v(" "),t("p",[_._v("接着会回复对应的"),t("code",[_._v("ACK + SYN")]),_._v("，这个报文在对方接收之后，两者状态一起变为"),t("code",[_._v("ESTABLISHED")]),_._v("。")]),_._v(" "),t("p",[_._v("这就是同时打开情况下的状态变迁。")]),_._v(" "),t("h2",{attrs:{id:"_003-说说-tcp-四次挥手的过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_003-说说-tcp-四次挥手的过程"}},[_._v("#")]),_._v(" 003: 说说 TCP 四次挥手的过程")]),_._v(" "),t("h3",{attrs:{id:"过程拆解"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#过程拆解"}},[_._v("#")]),_._v(" 过程拆解")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp3.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("刚开始双方处于"),t("code",[_._v("ESTABLISHED")]),_._v("状态。")]),_._v(" "),t("p",[_._v("客户端要断开了，向服务器发送 "),t("code",[_._v("FIN")]),_._v(" 报文，在 TCP 报文中的位置如下图:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp4.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("发送后客户端变成了"),t("code",[_._v("FIN-WAIT-1")]),_._v("状态。注意, 这时候客户端同时也变成了"),t("code",[_._v("half-close(半关闭)")]),_._v("状态，即无法向服务端发送报文，只能接收。")]),_._v(" "),t("p",[_._v("服务端接收后向客户端确认，变成了"),t("code",[_._v("CLOSED-WAIT")]),_._v("状态。")]),_._v(" "),t("p",[_._v("客户端接收到了服务端的确认，变成了"),t("code",[_._v("FIN-WAIT2")]),_._v("状态。")]),_._v(" "),t("p",[_._v("随后，服务端向客户端发送"),t("code",[_._v("FIN")]),_._v("，自己进入"),t("code",[_._v("LAST-ACK")]),_._v("状态，")]),_._v(" "),t("p",[_._v("客户端收到服务端发来的"),t("code",[_._v("FIN")]),_._v("后，自己变成了"),t("code",[_._v("TIME-WAIT")]),_._v("状态，然后发送 ACK 给服务端。")]),_._v(" "),t("p",[_._v("注意了，这个时候，客户端需要等待足够长的时间，具体来说，是 2 个 "),t("code",[_._v("MSL")]),_._v("("),t("code",[_._v("Maximum Segment Lifetime，报文最大生存时间")]),_._v("), 在这段时间内如果客户端没有收到服务端的重发请求，那么表示 ACK 成功到达，挥手结束，否则客户端重发 ACK。")]),_._v(" "),t("h3",{attrs:{id:"等待-2msl-的意义"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#等待-2msl-的意义"}},[_._v("#")]),_._v(" 等待 2MSL 的意义")]),_._v(" "),t("p",[_._v("如果不等待会怎样？")]),_._v(" "),t("p",[_._v("如果不等待，客户端直接跑路，当服务端还有很多数据包要给客户端发，且还在路上的时候，若客户端的端口此时刚好被新的应用占用，那么就接收到了无用数据包，造成数据包混乱。所以，最保险的做法是等服务器发来的数据包都死翘翘再启动新的应用。")]),_._v(" "),t("p",[_._v("那，照这样说一个 MSL 不就不够了吗，为什么要等待 2 MSL?")]),_._v(" "),t("ul",[t("li",[_._v("1 个 MSL 确保四次挥手中主动关闭方最后的 ACK 报文最终能达到对端")]),_._v(" "),t("li",[_._v("1 个 MSL 确保对端没有收到 ACK 重传的 FIN 报文可以到达")])]),_._v(" "),t("p",[_._v("这就是等待 2MSL 的意义。")]),_._v(" "),t("h3",{attrs:{id:"为什么是四次挥手而不是三次？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#为什么是四次挥手而不是三次？"}},[_._v("#")]),_._v(" 为什么是四次挥手而不是三次？")]),_._v(" "),t("p",[_._v("因为服务端在接收到"),t("code",[_._v("FIN")]),_._v(", 往往不会立即返回"),t("code",[_._v("FIN")]),_._v(", 必须等到服务端所有的报文都发送完毕了，才能发"),t("code",[_._v("FIN")]),_._v("。因此先发一个"),t("code",[_._v("ACK")]),_._v("表示已经收到客户端的"),t("code",[_._v("FIN")]),_._v("，延迟一段时间才发"),t("code",[_._v("FIN")]),_._v("。这就造成了四次挥手。")]),_._v(" "),t("p",[_._v("如果是三次挥手会有什么问题？")]),_._v(" "),t("p",[_._v("等于说服务端将"),t("code",[_._v("ACK")]),_._v("和"),t("code",[_._v("FIN")]),_._v("的发送合并为一次挥手，这个时候长时间的延迟可能会导致客户端误以为"),t("code",[_._v("FIN")]),_._v("没有到达客户端，从而让客户端不断的重发"),t("code",[_._v("FIN")]),_._v("。")]),_._v(" "),t("h3",{attrs:{id:"同时关闭会怎样？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#同时关闭会怎样？"}},[_._v("#")]),_._v(" 同时关闭会怎样？")]),_._v(" "),t("p",[_._v("如果客户端和服务端同时发送 FIN ，状态会如何变化？如图所示:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp5.png"),alt:"foo"}}),_._v(" "),t("h2",{attrs:{id:"_004-说说半连接队列和-syn-flood-攻击的关系"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_004-说说半连接队列和-syn-flood-攻击的关系"}},[_._v("#")]),_._v(" 004: 说说半连接队列和 SYN Flood 攻击的关系")]),_._v(" "),t("p",[_._v("三次握手前，服务端的状态从"),t("code",[_._v("CLOSED")]),_._v("变为"),t("code",[_._v("LISTEN")]),_._v(", 同时在内部创建了两个队列："),t("strong",[_._v("半连接队列")]),_._v("和"),t("strong",[_._v("全连接队列")]),_._v("，即"),t("strong",[_._v("SYN 队列")]),_._v("和"),t("strong",[_._v("ACCEPT 队列")]),_._v("。")]),_._v(" "),t("h3",{attrs:{id:"半连接队列"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#半连接队列"}},[_._v("#")]),_._v(" 半连接队列")]),_._v(" "),t("p",[_._v("当客户端发送"),t("code",[_._v("SYN")]),_._v("到服务端，服务端收到以后回复"),t("code",[_._v("ACK")]),_._v("和"),t("code",[_._v("SYN")]),_._v("，状态由"),t("code",[_._v("LISTEN")]),_._v("变为"),t("code",[_._v("SYN_RCVD")]),_._v("，此时这个连接就被推入了"),t("strong",[_._v("SYN 队列")]),_._v("，也就是"),t("strong",[_._v("半连接队列")]),_._v("。")]),_._v(" "),t("h3",{attrs:{id:"全连接队列"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#全连接队列"}},[_._v("#")]),_._v(" 全连接队列")]),_._v(" "),t("p",[_._v("当客户端返回"),t("code",[_._v("ACK")]),_._v(", 服务端接收后，三次握手完成。这个时候连接等待被具体的应用取走，在被取走之前，它会被推入另外一个 TCP 维护的队列，也就是"),t("strong",[_._v("全连接队列(Accept Queue)")]),_._v("。")]),_._v(" "),t("h3",{attrs:{id:"syn-flood-攻击原理"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#syn-flood-攻击原理"}},[_._v("#")]),_._v(" SYN Flood 攻击原理")]),_._v(" "),t("p",[_._v("SYN Flood 属于典型的 DoS/DDoS 攻击。其攻击的原理很简单，就是用客户端在短时间内伪造大量不存在的 IP 地址，并向服务端疯狂发送"),t("code",[_._v("SYN")]),_._v("。对于服务端而言，会产生两个危险的后果:")]),_._v(" "),t("ol",[t("li",[t("p",[_._v("处理大量的"),t("code",[_._v("SYN")]),_._v("包并返回对应"),t("code",[_._v("ACK")]),_._v(", 势必有大量连接处于"),t("code",[_._v("SYN_RCVD")]),_._v("状态，从而占满整个"),t("strong",[_._v("半连接队列")]),_._v("，无法处理正常的请求。")])]),_._v(" "),t("li",[t("p",[_._v("由于是不存在的 IP，服务端长时间收不到客户端的"),t("code",[_._v("ACK")]),_._v("，会导致服务端不断重发数据，直到耗尽服务端的资源。")])])]),_._v(" "),t("h3",{attrs:{id:"如何应对-syn-flood-攻击？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#如何应对-syn-flood-攻击？"}},[_._v("#")]),_._v(" 如何应对 SYN Flood 攻击？")]),_._v(" "),t("ol",[t("li",[_._v("增加 SYN 连接，也就是增加半连接队列的容量。")]),_._v(" "),t("li",[_._v("减少 SYN + ACK 重试次数，避免大量的超时重发。")]),_._v(" "),t("li",[_._v("利用 SYN Cookie 技术，在服务端接收到"),t("code",[_._v("SYN")]),_._v("后不立即分配连接资源，而是根据这个"),t("code",[_._v("SYN")]),_._v("计算出一个 Cookie，连同第二次握手回复给客户端，在客户端回复"),t("code",[_._v("ACK")]),_._v("的时候带上这个"),t("code",[_._v("Cookie")]),_._v("值，服务端验证 Cookie 合法之后才分配连接资源。")])]),_._v(" "),t("h2",{attrs:{id:"_005-介绍一下-tcp-报文头部的字段"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_005-介绍一下-tcp-报文头部的字段"}},[_._v("#")]),_._v(" 005: 介绍一下 TCP 报文头部的字段")]),_._v(" "),t("p",[_._v("报文头部结构如下(单位为字节):")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp6.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("请大家牢记这张图！")]),_._v(" "),t("h3",{attrs:{id:"源端口、目标端口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#源端口、目标端口"}},[_._v("#")]),_._v(" 源端口、目标端口")]),_._v(" "),t("p",[_._v("如何标识唯一标识一个连接？答案是 TCP 连接的"),t("code",[_._v("四元组")]),_._v("——源 IP、源端口、目标 IP 和目标端口。")]),_._v(" "),t("p",[_._v("那 TCP 报文怎么没有源 IP 和目标 IP 呢？这是因为在 IP 层就已经处理了 IP 。TCP 只需要记录两者的端口即可。")]),_._v(" "),t("h3",{attrs:{id:"序列号"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#序列号"}},[_._v("#")]),_._v(" 序列号")]),_._v(" "),t("p",[_._v("即"),t("code",[_._v("Sequence number")]),_._v(", 指的是本报文段第一个字节的序列号。")]),_._v(" "),t("p",[_._v("从图中可以看出，序列号是一个长为 4 个字节，也就是 32 位的无符号整数，表示范围为 0 ~ 2^32 - 1。如果到达最大值了后就循环到 0。")]),_._v(" "),t("p",[_._v("序列号在 TCP 通信的过程中有两个作用:")]),_._v(" "),t("ol",[t("li",[_._v("在 SYN 报文中交换彼此的初始序列号。")]),_._v(" "),t("li",[_._v("保证数据包按正确的顺序组装。")])]),_._v(" "),t("h3",{attrs:{id:"isn"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#isn"}},[_._v("#")]),_._v(" ISN")]),_._v(" "),t("p",[_._v("即"),t("code",[_._v("Initial Sequence Number（初始序列号）")]),_._v(",在三次握手的过程当中，双方会用过"),t("code",[_._v("SYN")]),_._v("报文来交换彼此的 "),t("code",[_._v("ISN")]),_._v("。")]),_._v(" "),t("p",[_._v("ISN 并不是一个固定的值，而是每 4 ms 加一，溢出则回到 0，这个算法使得猜测 ISN 变得很困难。那为什么要这么做？")]),_._v(" "),t("p",[_._v("如果 ISN 被攻击者预测到，要知道源 IP 和源端口号都是很容易伪造的，当攻击者猜测 ISN 之后，直接伪造一个 RST 后，就可以强制连接关闭的，这是非常危险的。")]),_._v(" "),t("p",[_._v("而动态增长的 ISN 大大提高了猜测 ISN 的难度。")]),_._v(" "),t("h3",{attrs:{id:"确认号"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#确认号"}},[_._v("#")]),_._v(" 确认号")]),_._v(" "),t("p",[_._v("即"),t("code",[_._v("ACK(Acknowledgment number)")]),_._v("。用来告知对方下一个期望接收的序列号，"),t("strong",[_._v("小于 ACK")]),_._v("的所有字节已经全部收到。")]),_._v(" "),t("h3",{attrs:{id:"标记位"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#标记位"}},[_._v("#")]),_._v(" 标记位")]),_._v(" "),t("p",[_._v("常见的标记位有"),t("code",[_._v("SYN")]),_._v(","),t("code",[_._v("ACK")]),_._v(","),t("code",[_._v("FIN")]),_._v(","),t("code",[_._v("RST")]),_._v(","),t("code",[_._v("PSH")]),_._v("。")]),_._v(" "),t("p",[_._v("SYN 和 ACK 已经在上文说过，后三个解释如下: "),t("code",[_._v("FIN")]),_._v("： 即 Finish，表示发送方准备断开连接。")]),_._v(" "),t("p",[t("code",[_._v("RST")]),_._v("：即 Reset，用来强制断开连接。")]),_._v(" "),t("p",[t("code",[_._v("PSH")]),_._v("： 即 Push, 告知对方这些数据包收到后应该马上交给上层的应用，不能缓存。")]),_._v(" "),t("h3",{attrs:{id:"窗口大小"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#窗口大小"}},[_._v("#")]),_._v(" 窗口大小")]),_._v(" "),t("p",[_._v("占用两个字节，也就是 16 位，但实际上是不够用的。因此 TCP 引入了窗口缩放的选项，作为窗口缩放的比例因子，这个比例因子的范围在 0 ~ 14，比例因子可以将窗口的值扩大为原来的 2 ^ n 次方。")]),_._v(" "),t("h3",{attrs:{id:"校验和"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#校验和"}},[_._v("#")]),_._v(" 校验和")]),_._v(" "),t("p",[_._v("占用两个字节，防止传输过程中数据包有损坏，如果遇到校验和有差错的报文，TCP 直接丢弃之，等待重传。")]),_._v(" "),t("h3",{attrs:{id:"可选项"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#可选项"}},[_._v("#")]),_._v(" 可选项")]),_._v(" "),t("p",[_._v("可选项的格式如下:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp7.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("常用的可选项有以下几个:")]),_._v(" "),t("ul",[t("li",[_._v("TimeStamp: TCP 时间戳，后面详细介绍。")]),_._v(" "),t("li",[_._v("MSS: 指的是 TCP 允许的从对方接收的最大报文段。")]),_._v(" "),t("li",[_._v("SACK: 选择确认选项。")]),_._v(" "),t("li",[_._v("Window Scale： 窗口缩放选项。")])]),_._v(" "),t("h2",{attrs:{id:"_006-说说-tcp-快速打开的原理-tfo"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_006-说说-tcp-快速打开的原理-tfo"}},[_._v("#")]),_._v(" 006: 说说 TCP 快速打开的原理(TFO)")]),_._v(" "),t("p",[_._v("第一节讲了 TCP 三次握手，可能有人会说，每次都三次握手好麻烦呀！能不能优化一点？")]),_._v(" "),t("p",[_._v("可以啊。今天来说说这个优化后的 TCP 握手流程，也就是 TCP 快速打开(TCP Fast Open, 即 TFO)的原理。")]),_._v(" "),t("p",[_._v("优化的过程是这样的，还记得我们说 SYN Flood 攻击时提到的 SYN Cookie 吗？这个 Cookie 可不是浏览器的"),t("code",[_._v("Cookie")]),_._v(", 用它同样可以实现 TFO。")]),_._v(" "),t("h3",{attrs:{id:"tfo-流程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tfo-流程"}},[_._v("#")]),_._v(" TFO 流程")]),_._v(" "),t("h4",{attrs:{id:"首轮三次握手"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#首轮三次握手"}},[_._v("#")]),_._v(" 首轮三次握手")]),_._v(" "),t("p",[_._v("首先客户端发送"),t("code",[_._v("SYN")]),_._v("给服务端，服务端接收到。")]),_._v(" "),t("p",[_._v("注意哦！现在服务端不是立刻回复 SYN + ACK，而是通过计算得到一个"),t("code",[_._v("SYN Cookie")]),_._v(", 将这个"),t("code",[_._v("Cookie")]),_._v("放到 TCP 报文的 "),t("code",[_._v("Fast Open")]),_._v("选项中，然后才给客户端返回。")]),_._v(" "),t("p",[_._v("客户端拿到这个 Cookie 的值缓存下来。后面正常完成三次握手。")]),_._v(" "),t("p",[_._v("首轮三次握手就是这样的流程。而后面的三次握手就不一样啦！")]),_._v(" "),t("h4",{attrs:{id:"后面的三次握手"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#后面的三次握手"}},[_._v("#")]),_._v(" 后面的三次握手")]),_._v(" "),t("p",[_._v("在后面的三次握手中，客户端会将之前缓存的 "),t("code",[_._v("Cookie")]),_._v("、"),t("code",[_._v("SYN")]),_._v(" 和"),t("code",[_._v("HTTP请求")]),_._v("(是的，你没看错)发送给服务端，服务端验证了 Cookie 的合法性，如果不合法直接丢弃；如果是合法的，那么就正常返回"),t("code",[_._v("SYN + ACK")]),_._v("。")]),_._v(" "),t("p",[_._v("重点来了，现在服务端能向客户端发 HTTP 响应了！这是最显著的改变，三次握手还没建立，仅仅验证了 Cookie 的合法性，就可以返回 HTTP 响应了。")]),_._v(" "),t("p",[_._v("当然，客户端的"),t("code",[_._v("ACK")]),_._v("还得正常传过来，不然怎么叫三次握手嘛。")]),_._v(" "),t("p",[_._v("流程如下:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp8.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("注意: 客户端最后握手的 ACK 不一定要等到服务端的 HTTP 响应到达才发送，两个过程没有任何关系。")]),_._v(" "),t("h3",{attrs:{id:"tfo-的优势"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tfo-的优势"}},[_._v("#")]),_._v(" TFO 的优势")]),_._v(" "),t("p",[_._v("TFO 的优势并不在与首轮三次握手，而在于后面的握手，在拿到客户端的 Cookie 并验证通过以后，可以直接返回 HTTP 响应，充分利用了"),t("strong",[_._v("1 个 RTT")]),_._v("(Round-Trip Time，往返时延)的时间"),t("strong",[_._v("提前进行数据传输")]),_._v("，积累起来还是一个比较大的优势。")]),_._v(" "),t("h2",{attrs:{id:"_007-能不能说说-tcp-报文中时间戳的作用？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_007-能不能说说-tcp-报文中时间戳的作用？"}},[_._v("#")]),_._v(" 007: 能不能说说 TCP 报文中时间戳的作用？")]),_._v(" "),t("p",[t("code",[_._v("timestamp")]),_._v("是 TCP 报文首部的一个可选项，一共占 10 个字节，格式如下:")]),_._v(" "),t("pre",[t("code",[_._v("kind(1 字节) + length(1 字节) + info(8 个字节)\n复制代码\n")])]),_._v(" "),t("p",[_._v("其中 kind = 8， length = 10， info 有两部分构成: "),t("strong",[_._v("timestamp")]),_._v("和"),t("strong",[_._v("timestamp echo")]),_._v("，各占 4 个字节。")]),_._v(" "),t("p",[_._v("那么这些字段都是干嘛的呢？它们用来解决那些问题？")]),_._v(" "),t("p",[_._v("接下来我们就来一一梳理，TCP 的时间戳主要解决两大问题:")]),_._v(" "),t("ul",[t("li",[_._v("计算往返时延 RTT(Round-Trip Time)")]),_._v(" "),t("li",[_._v("防止序列号的回绕问题")])]),_._v(" "),t("h3",{attrs:{id:"计算往返时延-rtt"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#计算往返时延-rtt"}},[_._v("#")]),_._v(" 计算往返时延 RTT")]),_._v(" "),t("p",[_._v("在没有时间戳的时候，计算 RTT 会遇到的问题如下图所示:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp9.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("如果以第一次发包为开始时间的话，就会出现左图的问题，RTT 明显偏大，开始时间应该采用第二次的；")]),_._v(" "),t("p",[_._v("如果以第二次发包为开始时间的话，就会导致右图的问题，RTT 明显偏小，开始时间应该采用第一次发包的。")]),_._v(" "),t("p",[_._v("实际上无论开始时间以第一次发包还是第二次发包为准，都是不准确的。")]),_._v(" "),t("p",[_._v("那这个时候引入时间戳就很好的解决了这个问题。")]),_._v(" "),t("p",[_._v("比如现在 a 向 b 发送一个报文 s1，b 向 a 回复一个含 ACK 的报文 s2 那么：")]),_._v(" "),t("ul",[t("li",[t("strong",[_._v("step 1:")]),_._v(" a 向 b 发送的时候，"),t("code",[_._v("timestamp")]),_._v(" 中存放的内容就是 a 主机发送时的内核时刻 "),t("code",[_._v("ta1")]),_._v("。")]),_._v(" "),t("li",[t("strong",[_._v("step 2:")]),_._v(" b 向 a 回复 s2 报文的时候，"),t("code",[_._v("timestamp")]),_._v(" 中存放的是 b 主机的时刻 "),t("code",[_._v("tb")]),_._v(", "),t("code",[_._v("timestamp echo")]),_._v("字段为从 s1 报文中解析出来的 ta1。")]),_._v(" "),t("li",[t("strong",[_._v("step 3:")]),_._v(" a 收到 b 的 s2 报文之后，此时 a 主机的内核时刻是 ta2, 而在 s2 报文中的 timestamp echo 选项中可以得到 "),t("code",[_._v("ta1")]),_._v(", 也就是 s2 对应的报文最初的发送时刻。然后直接采用 ta2 - ta1 就得到了 RTT 的值。")])]),_._v(" "),t("h3",{attrs:{id:"防止序列号回绕问题"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#防止序列号回绕问题"}},[_._v("#")]),_._v(" 防止序列号回绕问题")]),_._v(" "),t("p",[_._v("现在我们来模拟一下这个问题。")]),_._v(" "),t("p",[_._v("序列号的范围其实是在 0 ~ 2 ^ 32 - 1, 为了方便演示，我们缩小一下这个区间，假设范围是 0 ~ 4，那么到达 4 的时候会回到 0。")]),_._v(" "),t("p",[_._v("第几次发包")]),_._v(" "),t("p",[_._v("发送字节")]),_._v(" "),t("p",[_._v("对应序列号")]),_._v(" "),t("p",[_._v("状态")]),_._v(" "),t("p",[_._v("1")]),_._v(" "),t("p",[_._v("0 ~ 1")]),_._v(" "),t("p",[_._v("0 ~ 1")]),_._v(" "),t("p",[_._v("成功接收")]),_._v(" "),t("p",[_._v("2")]),_._v(" "),t("p",[_._v("1 ~ 2")]),_._v(" "),t("p",[_._v("1 ~ 2")]),_._v(" "),t("p",[_._v("滞留在网络中")]),_._v(" "),t("p",[_._v("3")]),_._v(" "),t("p",[_._v("2 ~ 3")]),_._v(" "),t("p",[_._v("2 ~ 3")]),_._v(" "),t("p",[_._v("成功接收")]),_._v(" "),t("p",[_._v("4")]),_._v(" "),t("p",[_._v("3 ~ 4")]),_._v(" "),t("p",[_._v("3 ~ 4")]),_._v(" "),t("p",[_._v("成功接收")]),_._v(" "),t("p",[_._v("5")]),_._v(" "),t("p",[_._v("4 ~ 5")]),_._v(" "),t("p",[_._v("0 ~ 1")]),_._v(" "),t("p",[_._v("成功接收，序列号从 0 开始")]),_._v(" "),t("p",[_._v("6")]),_._v(" "),t("p",[_._v("5 ~ 6")]),_._v(" "),t("p",[_._v("1 ~ 2")]),_._v(" "),t("p",[_._v("？？？")]),_._v(" "),t("p",[_._v("假设在第 6 次的时候，之前还滞留在网路中的包回来了，那么就有两个序列号为"),t("code",[_._v("1 ~ 2")]),_._v("的数据包了，怎么区分谁是谁呢？这个时候就产生了序列号回绕的问题。")]),_._v(" "),t("p",[_._v("那么用 timestamp 就能很好地解决这个问题，因为每次发包的时候都是将发包机器当时的内核时间记录在报文中，那么两次发包序列号即使相同，时间戳也不可能相同，这样就能够区分开两个数据包了。")]),_._v(" "),t("h2",{attrs:{id:"_008-tcp-的超时重传时间是如何计算的？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_008-tcp-的超时重传时间是如何计算的？"}},[_._v("#")]),_._v(" 008: TCP 的超时重传时间是如何计算的？")]),_._v(" "),t("p",[_._v("TCP 具有超时重传机制，即间隔一段时间没有等到数据包的回复时，重传这个数据包。")]),_._v(" "),t("p",[_._v("那么这个重传间隔是如何来计算的呢？")]),_._v(" "),t("p",[_._v("今天我们就来讨论一下这个问题。")]),_._v(" "),t("p",[_._v("这个重传间隔也叫做"),t("strong",[_._v("超时重传时间")]),_._v("(Retransmission TimeOut, 简称 RTO)，它的计算跟上一节提到的 RTT 密切相关。这里我们将介绍两种主要的方法，一个是经典方法，一个是标准方法。")]),_._v(" "),t("h3",{attrs:{id:"经典方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#经典方法"}},[_._v("#")]),_._v(" 经典方法")]),_._v(" "),t("p",[_._v("经典方法引入了一个新的概念——SRTT(Smoothed round trip time，即平滑往返时间)，没产生一次新的 RTT. 就根据一定的算法对 SRTT 进行更新，具体而言，计算方式如下(SRTT 初始值为 0):")]),_._v(" "),t("pre",[t("code",[_._v("SRTT =  (α * SRTT) + ((1 - α) * RTT)\n复制代码\n")])]),_._v(" "),t("p",[_._v("其中，α 是"),t("strong",[_._v("平滑因子")]),_._v("，建议值是"),t("code",[_._v("0.8")]),_._v("，范围是"),t("code",[_._v("0.8 ~ 0.9")]),_._v("。")]),_._v(" "),t("p",[_._v("拿到 SRTT，我们就可以计算 RTO 的值了:")]),_._v(" "),t("pre",[t("code",[_._v("RTO = min(ubound, max(lbound, β * SRTT))\n复制代码\n")])]),_._v(" "),t("p",[_._v("β 是加权因子，一般为"),t("code",[_._v("1.3 ~ 2.0")]),_._v("， "),t("strong",[_._v("lbound")]),_._v(" 是下界，"),t("strong",[_._v("ubound")]),_._v(" 是上界。")]),_._v(" "),t("p",[_._v("其实这个算法过程还是很简单的，但是也存在一定的局限，就是在 RTT 稳定的地方表现还可以，而在 RTT 变化较大的地方就不行了，因为平滑因子 α 的范围是"),t("code",[_._v("0.8 ~ 0.9")]),_._v(", RTT 对于 RTO 的影响太小。")]),_._v(" "),t("h3",{attrs:{id:"标准方法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#标准方法"}},[_._v("#")]),_._v(" 标准方法")]),_._v(" "),t("p",[_._v("为了解决经典方法对于 RTT 变化不敏感的问题，后面又引出了标准方法，也叫"),t("code",[_._v("Jacobson / Karels 算法")]),_._v("。")]),_._v(" "),t("p",[_._v("一共有三步。")]),_._v(" "),t("p",[t("strong",[_._v("第一步")]),_._v(": 计算"),t("code",[_._v("SRTT")]),_._v("，公式如下:")]),_._v(" "),t("pre",[t("code",[_._v("SRTT = (1 - α) * SRTT + α * RTT\n复制代码\n")])]),_._v(" "),t("p",[_._v("注意这个时候的 "),t("code",[_._v("α")]),_._v("跟经典方法中的"),t("code",[_._v("α")]),_._v("取值不一样了，建议值是"),t("code",[_._v("1/8")]),_._v("，也就是"),t("code",[_._v("0.125")]),_._v("。")]),_._v(" "),t("p",[t("strong",[_._v("第二步")]),_._v(": 计算"),t("code",[_._v("RTTVAR")]),_._v("(round-trip time variation)这个中间变量。")]),_._v(" "),t("pre",[t("code",[_._v("RTTVAR = (1 - β) * RTTVAR + β * (|RTT - SRTT|)\n复制代码\n")])]),_._v(" "),t("p",[_._v("β 建议值为 0.25。这个值是这个算法中出彩的地方，也就是说，它记录了最新的 RTT 与当前 SRTT 之间的差值，给我们在后续感知到 RTT 的变化提供了抓手。")]),_._v(" "),t("p",[t("strong",[_._v("第三步")]),_._v(": 计算最终的"),t("code",[_._v("RTO")]),_._v(":")]),_._v(" "),t("pre",[t("code",[_._v("RTO = µ * SRTT + ∂ * RTTVAR\n复制代码\n")])]),_._v(" "),t("p",[t("code",[_._v("µ")]),_._v("建议值取"),t("code",[_._v("1")]),_._v(", "),t("code",[_._v("∂")]),_._v("建议值取"),t("code",[_._v("4")]),_._v("。")]),_._v(" "),t("p",[_._v("这个公式在 SRTT 的基础上加上了最新 RTT 与它的偏移，从而很好的感知了 RTT 的变化，这种算法下，RTO 与 RTT 变化的差值关系更加密切。")]),_._v(" "),t("h2",{attrs:{id:"_009-能不能说一说-tcp-的流量控制？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_009-能不能说一说-tcp-的流量控制？"}},[_._v("#")]),_._v(" 009: 能不能说一说 TCP 的流量控制？")]),_._v(" "),t("p",[_._v("对于发送端和接收端而言，TCP 需要把发送的数据放到"),t("strong",[_._v("发送缓存区")]),_._v(", 将接收的数据放到"),t("strong",[_._v("接收缓存区")]),_._v("。")]),_._v(" "),t("p",[_._v("而流量控制索要做的事情，就是在通过接收缓存区的大小，控制发送端的发送。如果对方的接收缓存区满了，就不能再继续发送了。")]),_._v(" "),t("p",[_._v("要具体理解流量控制，首先需要了解"),t("code",[_._v("滑动窗口")]),_._v("的概念。")]),_._v(" "),t("h3",{attrs:{id:"tcp-滑动窗口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#tcp-滑动窗口"}},[_._v("#")]),_._v(" TCP 滑动窗口")]),_._v(" "),t("p",[_._v("TCP 滑动窗口分为两种: "),t("strong",[_._v("发送窗口")]),_._v("和"),t("strong",[_._v("接收窗口")]),_._v("。")]),_._v(" "),t("h4",{attrs:{id:"发送窗口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#发送窗口"}},[_._v("#")]),_._v(" 发送窗口")]),_._v(" "),t("p",[_._v("发送端的滑动窗口结构如下:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp10.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("其中包含四大部分:")]),_._v(" "),t("ul",[t("li",[_._v("已发送且已确认")]),_._v(" "),t("li",[_._v("已发送但未确认")]),_._v(" "),t("li",[_._v("未发送但可以发送")]),_._v(" "),t("li",[_._v("未发送也不可以发送")])]),_._v(" "),t("p",[_._v("其中有一些重要的概念，我标注在图中:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp11.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("发送窗口就是图中被框住的范围。SND 即"),t("code",[_._v("send")]),_._v(", WND 即"),t("code",[_._v("window")]),_._v(", UNA 即"),t("code",[_._v("unacknowledged")]),_._v(", 表示未被确认，NXT 即"),t("code",[_._v("next")]),_._v(", 表示下一个发送的位置。")]),_._v(" "),t("h4",{attrs:{id:"接收窗口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#接收窗口"}},[_._v("#")]),_._v(" 接收窗口")]),_._v(" "),t("p",[_._v("接收端的窗口结构如下:")]),_._v(" "),t("img",{attrs:{src:_.$withBase("/image/tcp/tcp12.png"),alt:"foo"}}),_._v(" "),t("p",[_._v("REV 即 "),t("code",[_._v("receive")]),_._v("，NXT 表示下一个接收的位置，WND 表示接收窗口大小。")]),_._v(" "),t("h3",{attrs:{id:"流量控制过程"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#流量控制过程"}},[_._v("#")]),_._v(" 流量控制过程")]),_._v(" "),t("p",[_._v("这里我们不用太复杂的例子，以一个最简单的来回来模拟一下流量控制的过程，方便大家理解。")]),_._v(" "),t("p",[_._v("首先双方三次握手，初始化各自的窗口大小，均为 200 个字节。")]),_._v(" "),t("p",[_._v("假如当前发送端给接收端发送 100 个字节，那么此时对于发送端而言，SND.NXT 当然要右移 100 个字节，也就是说当前的"),t("code",[_._v("可用窗口")]),_._v("减少了 100 个字节，这很好理解。")]),_._v(" "),t("p",[_._v("现在这 100 个到达了接收端，被放到接收端的缓冲队列中。不过此时由于大量负载的原因，接收端处理不了这么多字节，只能处理 40 个字节，剩下的 "),t("code",[_._v("60")]),_._v(" 个字节被留在了缓冲队列中。")]),_._v(" "),t("p",[_._v("注意了，此时接收端的情况是处理能力不够用啦，你发送端给我少发点，所以此时接收端的接收窗口应该缩小，具体来说，缩小 60 个字节，由 200 个字节变成了 140 字节，因为缓冲队列还有 60 个字节没被应用拿走。")]),_._v(" "),t("p",[_._v("因此，接收端会在 ACK 的报文首部带上缩小后的滑动窗口 140 字节，发送端对应地调整发送窗口的大小为 140 个字节。")]),_._v(" "),t("p",[_._v("此时对于发送端而言，已经发送且确认的部分增加 40 字节，也就是 SND.UNA 右移 40 个字节，同时"),t("strong",[_._v("发送窗口")]),_._v("缩小为 140 个字节。")]),_._v(" "),t("p",[_._v("这也就是"),t("strong",[_._v("流量控制")]),_._v("的过程。尽管回合再多，整个控制的过程和原理是一样的。")]),_._v(" "),t("h2",{attrs:{id:"_010-能不能说说-tcp-的拥塞控制？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_010-能不能说说-tcp-的拥塞控制？"}},[_._v("#")]),_._v(" 010: 能不能说说 TCP 的拥塞控制？")]),_._v(" "),t("p",[_._v("上一节所说的"),t("strong",[_._v("流量控制")]),_._v("发生在发送端跟接收端之间，并没有考虑到整个网络环境的影响，如果说当前网络特别差，特别容易丢包，那么发送端就应该注意一些了。而这，也正是"),t("code",[_._v("拥塞控制")]),_._v("需要处理的问题。")]),_._v(" "),t("p",[_._v("对于拥塞控制来说，TCP 每条连接都需要维护两个核心状态:")]),_._v(" "),t("ul",[t("li",[_._v("拥塞窗口（Congestion Window，cwnd）")]),_._v(" "),t("li",[_._v("慢启动阈值（Slow Start Threshold，ssthresh）")])]),_._v(" "),t("p",[_._v("涉及到的算法有这几个:")]),_._v(" "),t("ul",[t("li",[_._v("慢启动")]),_._v(" "),t("li",[_._v("拥塞避免")]),_._v(" "),t("li",[_._v("快速重传和快速恢复")])]),_._v(" "),t("p",[_._v("接下来，我们就来一一拆解这些状态和算法。首先，从拥塞窗口说起。")]),_._v(" "),t("h3",{attrs:{id:"拥塞窗口"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#拥塞窗口"}},[_._v("#")]),_._v(" 拥塞窗口")]),_._v(" "),t("p",[_._v("拥塞窗口（Congestion Window，cwnd）是指目前自己还能传输的数据量大小。")]),_._v(" "),t("p",[_._v("那么之前介绍了接收窗口的概念，两者有什么区别呢？")]),_._v(" "),t("ul",[t("li",[_._v("接收窗口(rwnd)是"),t("code",[_._v("接收端")]),_._v("给的限制")]),_._v(" "),t("li",[_._v("拥塞窗口(cwnd)是"),t("code",[_._v("发送端")]),_._v("的限制")])]),_._v(" "),t("p",[_._v("限制谁呢？")]),_._v(" "),t("p",[_._v("限制的是"),t("code",[_._v("发送窗口")]),_._v("的大小。")]),_._v(" "),t("p",[_._v("有了这两个窗口，如何来计算"),t("code",[_._v("发送窗口")]),_._v("？")]),_._v(" "),t("pre",[t("code",[_._v("发送窗口大小 = min(rwnd, cwnd)\n复制代码\n")])]),_._v(" "),t("p",[_._v("取两者的较小值。而拥塞控制，就是来控制"),t("code",[_._v("cwnd")]),_._v("的变化。")]),_._v(" "),t("h3",{attrs:{id:"慢启动"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#慢启动"}},[_._v("#")]),_._v(" 慢启动")]),_._v(" "),t("p",[_._v("刚开始进入传输数据的时候，你是不知道现在的网路到底是稳定还是拥堵的，如果做的太激进，发包太急，那么疯狂丢包，造成雪崩式的网络灾难。")]),_._v(" "),t("p",[_._v("因此，拥塞控制首先就是要采用一种保守的算法来慢慢地适应整个网路，这种算法叫"),t("code",[_._v("慢启动")]),_._v("。运作过程如下:")]),_._v(" "),t("ul",[t("li",[_._v("首先，三次握手，双方宣告自己的接收窗口大小")]),_._v(" "),t("li",[_._v("双方初始化自己的"),t("strong",[_._v("拥塞窗口")]),_._v("(cwnd)大小")]),_._v(" "),t("li",[_._v("在开始传输的一段时间，发送端每收到一个 ACK，拥塞窗口大小加 1，也就是说，每经过一个 RTT，cwnd 翻倍。如果说初始窗口为 10，那么第一轮 10 个报文传完且发送端收到 ACK 后，cwnd 变为 20，第二轮变为 40，第三轮变为 80，依次类推。")])]),_._v(" "),t("p",[_._v("难道就这么无止境地翻倍下去？当然不可能。它的阈值叫做"),t("strong",[_._v("慢启动阈值")]),_._v("，当 cwnd 到达这个阈值之后，好比踩了下刹车，别涨了那么快了，老铁，先 hold 住！")]),_._v(" "),t("p",[_._v("在到达阈值后，如何来控制 cwnd 的大小呢？")]),_._v(" "),t("p",[_._v("这就是拥塞避免做的事情了。")]),_._v(" "),t("h3",{attrs:{id:"拥塞避免"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#拥塞避免"}},[_._v("#")]),_._v(" 拥塞避免")]),_._v(" "),t("p",[_._v("原来每收到一个 ACK，cwnd 加 1，现在到达阈值了，cwnd 只能加这么一点: "),t("strong",[_._v("1 / cwnd")]),_._v("。那你仔细算算，一轮 RTT 下来，收到 cwnd 个 ACK, 那最后拥塞窗口的大小 cwnd 总共才增加 1。")]),_._v(" "),t("p",[_._v("也就是说，以前一个 RTT 下来，"),t("code",[_._v("cwnd")]),_._v("翻倍，现在"),t("code",[_._v("cwnd")]),_._v("只是增加 1 而已。")]),_._v(" "),t("p",[_._v("当然，"),t("strong",[_._v("慢启动")]),_._v("和"),t("strong",[_._v("拥塞避免")]),_._v("是一起作用的，是一体的。")]),_._v(" "),t("h3",{attrs:{id:"快速重传和快速恢复"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#快速重传和快速恢复"}},[_._v("#")]),_._v(" 快速重传和快速恢复")]),_._v(" "),t("h4",{attrs:{id:"快速重传"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#快速重传"}},[_._v("#")]),_._v(" 快速重传")]),_._v(" "),t("p",[_._v("在 TCP 传输的过程中，如果发生了丢包，即接收端发现数据段不是按序到达的时候，接收端的处理是重复发送之前的 ACK。")]),_._v(" "),t("p",[_._v("比如第 5 个包丢了，即使第 6、7 个包到达的接收端，接收端也一律返回第 4 个包的 ACK。当发送端收到 3 个重复的 ACK 时，意识到丢包了，于是马上进行重传，不用等到一个 RTO 的时间到了才重传。")]),_._v(" "),t("p",[_._v("这就是"),t("strong",[_._v("快速重传")]),_._v("，它解决的是"),t("strong",[_._v("是否需要重传")]),_._v("的问题。")]),_._v(" "),t("h4",{attrs:{id:"选择性重传"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#选择性重传"}},[_._v("#")]),_._v(" 选择性重传")]),_._v(" "),t("p",[_._v("那你可能会问了，既然要重传，那么只重传第 5 个包还是第 5、6、7 个包都重传呢？")]),_._v(" "),t("p",[_._v("当然第 6、7 个都已经到达了，TCP 的设计者也不傻，已经传过去干嘛还要传？干脆记录一下哪些包到了，哪些没到，针对性地重传。")]),_._v(" "),t("p",[_._v("在收到发送端的报文后，接收端回复一个 ACK 报文，那么在这个报文首部的可选项中，就可以加上"),t("code",[_._v("SACK")]),_._v("这个属性，通过"),t("code",[_._v("left edge")]),_._v("和"),t("code",[_._v("right edge")]),_._v("告知发送端已经收到了哪些区间的数据报。因此，即使第 5 个包丢包了，当收到第 6、7 个包之后，接收端依然会告诉发送端，这两个包到了。剩下第 5 个包没到，就重传这个包。这个过程也叫做"),t("strong",[_._v("选择性重传(SACK，Selective Acknowledgment)")]),_._v("，它解决的是"),t("strong",[_._v("如何重传")]),_._v("的问题。")]),_._v(" "),t("h4",{attrs:{id:"快速恢复"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#快速恢复"}},[_._v("#")]),_._v(" 快速恢复")]),_._v(" "),t("p",[_._v("当然，发送端收到三次重复 ACK 之后，发现丢包，觉得现在的网络已经有些拥塞了，自己会进入"),t("strong",[_._v("快速恢复")]),_._v("阶段。")]),_._v(" "),t("p",[_._v("在这个阶段，发送端如下改变：")]),_._v(" "),t("ul",[t("li",[_._v("拥塞阈值降低为 cwnd 的一半")]),_._v(" "),t("li",[_._v("cwnd 的大小变为拥塞阈值")]),_._v(" "),t("li",[_._v("cwnd 线性增加")])]),_._v(" "),t("p",[_._v("以上就是 TCP 拥塞控制的经典算法: "),t("strong",[_._v("慢启动")]),_._v("、"),t("strong",[_._v("拥塞避免")]),_._v("、"),t("strong",[_._v("快速重传和快速恢复")]),_._v("。")]),_._v(" "),t("h2",{attrs:{id:"_011-能不能说说-nagle-算法和延迟确认？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_011-能不能说说-nagle-算法和延迟确认？"}},[_._v("#")]),_._v(" 011: 能不能说说 Nagle 算法和延迟确认？")]),_._v(" "),t("h3",{attrs:{id:"nagle-算法"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#nagle-算法"}},[_._v("#")]),_._v(" Nagle 算法")]),_._v(" "),t("p",[_._v("试想一个场景，发送端不停地给接收端发很小的包，一次只发 1 个字节，那么发 1 千个字节需要发 1000 次。这种频繁的发送是存在问题的，不光是传输的时延消耗，发送和确认本身也是需要耗时的，频繁的发送接收带来了巨大的时延。")]),_._v(" "),t("p",[_._v("而避免小包的频繁发送，这就是 Nagle 算法要做的事情。")]),_._v(" "),t("p",[_._v("具体来说，Nagle 算法的规则如下:")]),_._v(" "),t("ul",[t("li",[_._v("当第一次发送数据时不用等待，就算是 1byte 的小包也立即发送")]),_._v(" "),t("li",[_._v("后面发送满足下面条件之一就可以发了:\n"),t("ul",[t("li",[_._v("数据包大小达到最大段大小(Max Segment Size, 即 MSS)")]),_._v(" "),t("li",[_._v("之前所有包的 ACK 都已接收到")])])])]),_._v(" "),t("h3",{attrs:{id:"延迟确认"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#延迟确认"}},[_._v("#")]),_._v(" 延迟确认")]),_._v(" "),t("p",[_._v("试想这样一个场景，当我收到了发送端的一个包，然后在极短的时间内又接收到了第二个包，那我是一个个地回复，还是稍微等一下，把两个包的 ACK 合并后一起回复呢？")]),_._v(" "),t("p",[t("strong",[_._v("延迟确认")]),_._v("(delayed ack)所做的事情，就是后者，稍稍延迟，然后合并 ACK，最后才回复给发送端。TCP 要求这个延迟的时延必须小于 500ms，一般操作系统实现都不会超过 200ms。")]),_._v(" "),t("p",[_._v("不过需要主要的是，有一些场景是不能延迟确认的，收到了就要马上回复:")]),_._v(" "),t("ul",[t("li",[_._v("接收到了大于一个 frame 的报文，且需要调整窗口大小")]),_._v(" "),t("li",[_._v("TCP 处于 quickack 模式（通过"),t("code",[_._v("tcp_in_quickack_mode")]),_._v("设置）")]),_._v(" "),t("li",[_._v("发现了乱序包")])]),_._v(" "),t("h3",{attrs:{id:"两者一起使用会怎样？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#两者一起使用会怎样？"}},[_._v("#")]),_._v(" 两者一起使用会怎样？")]),_._v(" "),t("p",[_._v("前者意味着延迟发，后者意味着延迟接收，会造成更大的延迟，产生性能问题。")]),_._v(" "),t("h2",{attrs:{id:"_012-如何理解-tcp-的-keep-alive？"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#_012-如何理解-tcp-的-keep-alive？"}},[_._v("#")]),_._v(" 012. 如何理解 TCP 的 keep-alive？")]),_._v(" "),t("p",[_._v("大家都听说过 http 的"),t("code",[_._v("keep-alive")]),_._v(", 不过 TCP 层面也是有"),t("code",[_._v("keep-alive")]),_._v("机制，而且跟应用层不太一样。")]),_._v(" "),t("p",[_._v("试想一个场景，当有一方因为网络故障或者宕机导致连接失效，由于 TCP 并不是一个轮询的协议，在下一个数据包到达之前，对端对连接失效的情况是一无所知的。")]),_._v(" "),t("p",[_._v("这个时候就出现了 keep-alive, 它的作用就是探测对端的连接有没有失效。")]),_._v(" "),t("p",[_._v("在 Linux 下，可以这样查看相关的配置:")]),_._v(" "),t("pre",[t("code",[_._v("sudo sysctl -a | grep keepalive\n\n// 每隔 7200 s 检测一次\nnet.ipv4.tcp_keepalive_time = 7200\n// 一次最多重传 9 个包\nnet.ipv4.tcp_keepalive_probes = 9\n// 每个包的间隔重传间隔 75 s\nnet.ipv4.tcp_keepalive_intvl = 75\n复制代码\n")])]),_._v(" "),t("p",[_._v("不过，现状是大部分的应用并没有默认开启 TCP 的"),t("code",[_._v("keep-alive")]),_._v("选项，为什么？")]),_._v(" "),t("p",[_._v("站在应用的角度:")]),_._v(" "),t("ul",[t("li",[_._v("7200s 也就是两个小时检测一次，时间太长")]),_._v(" "),t("li",[_._v("时间再短一些，也难以体现其设计的初衷, 即检测长时间的死连接")])]),_._v(" "),t("p",[_._v("因此是一个比较尴尬的设计。")])])}),[],!1,null,null,null);v.default=e.exports}}]);