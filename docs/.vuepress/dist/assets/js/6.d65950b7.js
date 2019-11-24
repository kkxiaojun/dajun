(window.webpackJsonp=window.webpackJsonp||[]).push([[6],{207:function(t,a,s){"use strict";s.r(a);var n=s(0),e=Object(n.a)({},(function(){var t=this,a=t.$createElement,s=t._self._c||a;return s("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[s("h1",{attrs:{id:"css"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#css"}},[t._v("#")]),t._v(" CSS")]),t._v(" "),s("h2",{attrs:{id:"盒模型"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#盒模型"}},[t._v("#")]),t._v(" 盒模型")]),t._v(" "),s("p",[s("strong",[t._v("w3c标准盒模型")]),t._v("\n属性width,height只包含内容content，不包含border和padding。")]),t._v(" "),s("p",[s("strong",[t._v("ie盒模型")]),t._v("\nwidth = content + padding * 2 + border * 2")]),t._v(" "),s("p",[s("strong",[t._v("box-sizing")]),t._v("\n控制元素盒模型的解析方式")]),t._v(" "),s("ol",[s("li",[t._v("content-box: 默认值")]),t._v(" "),s("li",[t._v("border-box:告诉浏览器去理解你设置的边框和内边距的值是包含在width内的")])]),t._v(" "),s("h2",{attrs:{id:"visibility-hidden-与-display-none"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#visibility-hidden-与-display-none"}},[t._v("#")]),t._v(" visibility: hidden 与 display:none")]),t._v(" "),s("pre",[s("code",[t._v("1、display:none 元素不再占用空间。\n2、visibility: hidden 使元素在网页上不可见，但仍占用空间。 \n")])]),t._v(" "),s("h2",{attrs:{id:"bfc（block-formatting-contexts）块级格式化上下文"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#bfc（block-formatting-contexts）块级格式化上下文"}},[t._v("#")]),t._v(" BFC（Block Formatting Contexts）块级格式化上下文")]),t._v(" "),s("p",[t._v("块格式化上下文（block formatting context） 是页面上的一个独立的渲染区域，容器里面的子元素不会在布局上影响到外面的元素。它是决定块盒子的布局及浮动元素相互影响的一个因素。")]),t._v(" "),s("p",[s("strong",[t._v("触发条件")])]),t._v(" "),s("ol",[s("li",[t._v("position 属性不为 static 或者 relative")]),t._v(" "),s("li",[t._v("float 属性不为 none")]),t._v(" "),s("li",[t._v("overflow 不为 visible")]),t._v(" "),s("li",[t._v("display（display为inline-block、table-cell）")])]),t._v(" "),s("p",[s("strong",[t._v("特性")])]),t._v(" "),s("ol",[s("li",[t._v("内部的 Box 会在垂直方向，从顶部开始一个接一个地放置")]),t._v(" "),s("li",[t._v("Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生叠加")]),t._v(" "),s("li",[t._v("BFC 的区域不会与 float box 叠加")]),t._v(" "),s("li",[t._v("BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然")]),t._v(" "),s("li",[t._v("计算 BFC 的高度时，浮动元素也参与计算")])]),t._v(" "),s("p",[s("strong",[t._v("用处")])]),t._v(" "),s("ol",[s("li",[t._v("清除内部浮动：对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为0。解决这个问题，只需要把把父元素变成一个BFC就行了。常用的办法是给父元素设置overflow:hidden。")]),t._v(" "),s("li",[t._v("上下margin重合问题，可以通过触发BFC来解决")])]),t._v(" "),s("h2",{attrs:{id:"清除浮动"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#清除浮动"}},[t._v("#")]),t._v(" 清除浮动")]),t._v(" "),s("ol",[s("li",[t._v("使用空标签设置 clear: both;（clear 有哪些值可以设置？应用在什么元素上？缺点：增加无意义标签）")]),t._v(" "),s("li",[t._v("为父级元素设置 overflow: hidden; (利用 BFC 的原理，除了设置 hidden，还能设置其他的值吗？)")]),t._v(" "),s("li",[t._v("使用伪元素，为要清除浮动的元素添加 .clearfix 类(推荐，其原理可查看 "),s("a",{attrs:{href:"http://nicolasgallagher.com/micro-clearfix-hack/",target:"_blank",rel:"noopener noreferrer"}},[t._v("http://nicolasgallagher.com/micro-clearfix-hack/"),s("OutboundLink")],1),t._v(")")])]),t._v(" "),s("h2",{attrs:{id:"清除浮动元素的方法和各自的优缺点"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#清除浮动元素的方法和各自的优缺点"}},[t._v("#")]),t._v(" 清除浮动元素的方法和各自的优缺点")]),t._v(" "),s("p",[t._v("原理：清除浮动，实际上是清除父元素的高度塌陷。因为子元素脱离了父元素的文档流，所以，父元素失去了高度，导致了塌陷。要解决这个问题，就是让父元素具有高度。")]),t._v(" "),s("p",[t._v("浮动元素的特性： 在正常布局中位于该浮动元素之下的内容，此时会围绕着浮动元素，填满其右侧的空间。浮动到右侧的元素，其他内容将从左侧环绕它，浮动元素影响的不仅是自己，它会影响周围的元素对其进行环绕。\nfloat仍会占据其位置，position:absolute不占用页面空间 会有重叠问题")]),t._v(" "),s("h2",{attrs:{id:"position"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#position"}},[t._v("#")]),t._v(" position")]),t._v(" "),s("ol",[s("li",[t._v("absolute :生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位。")]),t._v(" "),s("li",[t._v("fixed （老IE8以下不支持）生成绝对定位的元素，通常相对于浏览器窗口或 frame 进行定位。")]),t._v(" "),s("li",[t._v("relative 生成相对定位的元素，相对于其在普通流中的位置进行定位。")]),t._v(" "),s("li",[t._v("static 默认值。没有定位，元素出现在正常的流中")]),t._v(" "),s("li",[t._v("sticky 生成粘性定位的元素，容器的位置根据正常文档流计算得出（饿了么的h5搜索框就是用了这个特性）")]),t._v(" "),s("li",[t._v("inherit：规定从父元素继承 position 属性的值。")])]),t._v(" "),s("p",[s("strong",[t._v("注意")])]),t._v(" "),s("ol",[s("li",[t._v("absolute：生成绝对定位的元素，"),s("font",{attrs:{color:"red"}},[t._v("定位原点")]),t._v("是离自己这一级元素最近的一级position设置为absolute或者relative的父元素的左上角为原点的。")],1),t._v(" "),s("li",[t._v("relative：生成相对定位的元素，"),s("font",{attrs:{color:"red"}},[t._v("定位原点")]),t._v("是元素本身所在位置的左上角。")],1)]),t._v(" "),s("p",[s("strong",[t._v("absolute的containing block计算方式与正常流有什么不同")]),t._v("\n无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：")]),t._v(" "),s("ol",[s("li",[t._v("若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；")]),t._v(" "),s("li",[t._v("否则,则由这个祖先元素的 padding box 构成。\n如果都找不到，则为 initial containing block。")])]),t._v(" "),s("h2",{attrs:{id:"动画"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#动画"}},[t._v("#")]),t._v(" 动画")]),t._v(" "),s("p",[t._v("用js来实现动画，我们一般是借助setTimeout或setInterval这两个函数，以及新的requestAnimationFrame")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div id"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"demo"')]),t._v(" style"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"position:absolute; width:100px; height:100px; background:#ccc; left:0; top:0;"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("script"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("var")]),t._v(" demo "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" document"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("getElementById")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'demo'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("rander")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    demo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("demo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("1")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("+")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'px'")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//每一帧向右移动1px")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("requestAnimationFrame")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("function")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("rander")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//当超过300px后才停止")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("if")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("parseInt")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("demo"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("left"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<=")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("300")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("requestAnimationFrame")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("arguments"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("callee"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("script"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),s("p",[s("strong",[t._v("css3使用")]),t._v("\n@keyframes 结合animation\ntransition：property duration timing-function delay")]),t._v(" "),s("h2",{attrs:{id:"布局"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#布局"}},[t._v("#")]),t._v(" 布局")]),t._v(" "),s("p",[s("strong",[t._v("两列布局")])]),t._v(" "),s("ol",[s("li",[t._v("position absolute;margin-left;")]),t._v(" "),s("li",[t._v("float+margin")]),t._v(" "),s("li",[t._v("负margin值")])]),t._v(" "),s("p",[s("strong",[t._v("三列布局")])]),t._v(" "),s("ol",[s("li",[t._v("与两列布局类似，左右两边设置position：absolute；和top:0;left:0;right:0; 中间设置margin-left和margin-right即可。")]),t._v(" "),s("li",[t._v("左右采用float,中间用calc()动态计算宽度，设置对应的margin")]),t._v(" "),s("li",[t._v("左右设置flex-basis，中间设置flex-grow")])]),t._v(" "),s("h3",{attrs:{id:"弹性布局flex"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#弹性布局flex"}},[t._v("#")]),t._v(" 弹性布局flex")]),t._v(" "),s("p",[t._v("容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）")]),t._v(" "),s("p",[t._v("注意：设为 Flex 布局以后，子元素的float、clear和vertical-align属性将失效。")]),t._v(" "),s("h3",{attrs:{id:"容器的属性"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#容器的属性"}},[t._v("#")]),t._v(" 容器的属性")]),t._v(" "),s("p",[t._v("以下6个属性设置在容器上")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[t._v("  // 决定主轴的方向\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex-direction")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" row | row-reverse | column | column-reverse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  // 如果一条轴排不下，如何换行\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex-wrap")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" nowrap | wrap | wrap-reverse"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  \n  // flex-direction和flex-wrap的简写\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex-flow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex-flow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <flex-direction> || <flex-wrap>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  // 主轴上的对齐方式\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("justify-content")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" flex-start | flex-end | center | space-between | space-around"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\n  // 交叉轴上的对齐方式\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("align-items")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("align-items")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" flex-start | flex-end | center | baseline | stretch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  \n  // 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。\n  align-content\n")])])]),s("p",[t._v("项目的6个属性")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[t._v("  // 定义项目的排列顺序默认0\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("order")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <integer>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* default 0 */")]),t._v("\n\n  // 定义项目的放大比例\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex-grow")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <number>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* default 0 */")]),t._v("\n\n  // 定义项目的缩小比例\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex-shrink")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <number>"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* default 1 */")]),t._v("\n\n  // 定义了项目在分配多余空间之前，项目占据的主轴空间。可设置300px\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex-basis")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" <length> | auto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/* default auto */")]),t._v("\n\n  // flex属性是flex-grow"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" none | [ <"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'flex-grow'")]),t._v("> <"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'flex-shrink'")]),t._v(">? || <"),s("span",{pre:!0,attrs:{class:"token string"}},[t._v("'flex-basis'")]),t._v("> ]\n  该属性有两个快捷值：auto "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("1 1 auto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v(" 和 none "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),t._v("0 0 auto"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),t._v("。\n\n  // align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。\n  "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("align-self")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" auto | flex-start | flex-end | center | baseline | stretch"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])]),s("p",[t._v("实现圣杯布局")]),t._v(" "),s("div",{staticClass:"language-css extra-class"},[s("pre",{pre:!0,attrs:{class:"language-css"}},[s("code",[t._v("    "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v('<div class="HolyGrail-body">\n        <main class="HolyGrail-content">content</main>\n        <nav class="HolyGrail-nav">left</nav>\n        <aside class="HolyGrail-ads">right</aside>\n    </div>\n\n    .HolyGrail-body')]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("display")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" flex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".HolyGrail-content")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*占据主轴空间*/")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".HolyGrail-nav")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("order")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" -1"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*提到最左边*/")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n\n    "),s("span",{pre:!0,attrs:{class:"token selector"}},[t._v(".HolyGrail-nav,\n    .HolyGrail-ads")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n        "),s("span",{pre:!0,attrs:{class:"token property"}},[t._v("flex")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" 0 0 12em"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("/*设置两边宽度*/")]),t._v("\n    "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[s("strong",[t._v("CSS Grid")])]),t._v(" "),s("h2",{attrs:{id:"各个单位的区别（px-em-rem-百分比-vw-vh-vmax-vmin）"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#各个单位的区别（px-em-rem-百分比-vw-vh-vmax-vmin）"}},[t._v("#")]),t._v(" 各个单位的区别（px, em, rem, 百分比, vw, vh, vmax, vmin）")]),t._v(" "),s("div",{staticClass:"language- extra-class"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[t._v("px：绝对单位，页面按精确像素展示\n\nem：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。\n\nrem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持。\n\nvw：viewpoint width，视窗宽度，1vw等于视窗宽度的1%。\n\nvh：viewpoint height，视窗高度，1vh等于视窗高度的1%。\n\nvmin：vw和vh中较小的那个。\n\nvmax：vw和vh中较大的那个。\n\n")])])]),s("h2",{attrs:{id:"水平垂直居中的方法"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#水平垂直居中的方法"}},[t._v("#")]),t._v(" 水平垂直居中的方法")]),t._v(" "),s("blockquote",[s("p",[t._v("行内布局")])]),t._v(" "),s("p",[t._v("line-height + text-align\nvertical-align + text-align")]),t._v(" "),s("blockquote",[s("p",[t._v("块布局")])]),t._v(" "),s("p",[t._v("position absolute + margin auto\nposition absolute + negative margin\nposition absolute + translate(-50%, -50%)")]),t._v(" "),s("h5",{attrs:{id:"父容器子容器不确定宽高的块级元素，做上下居中"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#父容器子容器不确定宽高的块级元素，做上下居中"}},[t._v("#")]),t._v(" 父容器子容器不确定宽高的块级元素，做上下居中")]),t._v(" "),s("p",[t._v("1.flex")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[t._v("#wrap"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n\tdisplay"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("flex"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\tjustify"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("content"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("center"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n\talign"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("items"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v("center"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("2.tabel")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parent "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n   text"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("align"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" center"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//水平居中")]),t._v("\n   display"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" table"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("cell"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n   vertical"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("align"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" middle"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//垂直居中")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("child "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    display"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" inline"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("block"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//防止块级元素宽度独占一行，内联元素可不设置")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n")])])]),s("p",[t._v("3.absolute+transform 水平垂直居中")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"parent"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("div "),s("span",{pre:!0,attrs:{class:"token keyword"}},[t._v("class")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("=")]),s("span",{pre:!0,attrs:{class:"token string"}},[t._v('"child"')]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("Demo"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("div"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("parent "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    position"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" relative"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(".")]),t._v("child "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("{")]),t._v("\n    position"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" absolute"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    left"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    top"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n    transform"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token function"}},[t._v("translate")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("(")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(",")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),s("span",{pre:!0,attrs:{class:"token number"}},[t._v("50")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("%")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(")")]),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n  "),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v("}")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("<")]),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("/")]),t._v("style"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v(">")]),t._v("\n")])])]),s("p",[t._v("4.webkit-box")]),t._v(" "),s("div",{staticClass:"language-javascript extra-class"},[s("pre",{pre:!0,attrs:{class:"language-javascript"}},[s("code",[s("span",{pre:!0,attrs:{class:"token comment"}},[t._v("//对父级元素设置")]),t._v("\nposition"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" relative"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\ndisplay"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" "),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("webkit"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("box"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("webkit"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("box"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("align"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" center"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("webkit"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("box"),s("span",{pre:!0,attrs:{class:"token operator"}},[t._v("-")]),t._v("pack"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(":")]),t._v(" center"),s("span",{pre:!0,attrs:{class:"token punctuation"}},[t._v(";")]),t._v("\n")])])])])}),[],!1,null,null,null);a.default=e.exports}}]);