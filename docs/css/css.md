# CSS

## 盒模型

**w3c 标准盒模型**
属性 width,height 只包含内容 content，不包含 border 和 padding。

**ie 盒模型**
width = content + padding _ 2 + border _ 2

**box-sizing**
控制元素盒模型的解析方式

1. content-box: 默认值
2. border-box:告诉浏览器去理解你设置的边框和内边距的值是包含在 width 内的

## visibility: hidden 与 display:none

    1、display:none 元素不再占用空间。
    2、visibility: hidden 使元素在网页上不可见，但仍占用空间。

## BFC（Block Formatting Contexts）块级格式化上下文

块格式化上下文（block formatting context） 是页面上的一个独立的渲染区域，容器里面的子元素不会在布局上影响到外面的元素。它是决定块盒子的布局及浮动元素相互影响的一个因素。

**触发条件**

1. 根元素或其他包含它的元素
2. 浮动元素 (元素的 float 不是 none)
3. 绝对定位元素 (元素具有 position 为 absolute 或 fixed)
4. 内联块 (元素具有 display: inline-block)
5. 表格单元格 (元素具有 display: table-cell，HTML 表格单元格默认属性)
6. 表格标题 (元素具有 display: table-caption, HTML 表格标题默认属性)
7. 具有 overflow 且值不是 visible 的块元素
8. display: flow-root 的元素
9. column-span: all 的元素

**特性**

1. 内部的 Box 会在垂直方向，从顶部开始一个接一个地放置
2. Box 垂直方向的距离由 margin 决定。属于同一个 BFC 的两个相邻 Box 的 margin 会发生叠加
3. BFC 的区域不会与 float box 叠加
4. BFC 就是页面上的一个隔离的独立容器，容器里面的子元素不会影响到外面的元素，反之亦然
5. 计算 BFC 的高度时，浮动元素也参与计算

**问题**

1. 边距折叠
2. 清除浮动
3. 自适应多栏布局

**用处**

1. 清除内部浮动：对子元素设置浮动后，父元素会发生高度塌陷，也就是父元素的高度变为 0。解决这个问题，只需要把把父元素变成一个 BFC 就行了。常用的办法是给父元素设置 overflow:hidden。
2. 上下 margin 重合问题（overflow:auto），可以通过触发 BFC 来解决

## 清除浮动

1. 使用空标签设置 clear: both;（clear 有哪些值可以设置？应用在什么元素上？缺点：增加无意义标签）
2. 为父级元素设置 overflow: hidden; (利用 BFC 的原理，除了设置 hidden，还能设置其他的值吗？)
3. 使用伪元素，为要清除浮动的元素添加 .clearfix 类(推荐，其原理可查看 [http://nicolasgallagher.com/micro-clearfix-hack/](http://nicolasgallagher.com/micro-clearfix-hack/))

## 清除浮动元素的方法和各自的优缺点

原理：清除浮动，实际上是清除父元素的高度塌陷。因为子元素脱离了父元素的文档流，所以，父元素失去了高度，导致了塌陷。要解决这个问题，就是让父元素具有高度。

浮动元素的特性： 在正常布局中位于该浮动元素之下的内容，此时会围绕着浮动元素，填满其右侧的空间。浮动到右侧的元素，其他内容将从左侧环绕它，浮动元素影响的不仅是自己，它会影响周围的元素对其进行环绕。
float 仍会占据其位置，position:absolute 不占用页面空间 会有重叠问题

## position

1. absolute :生成绝对定位的元素， 相对于最近一级的 定位不是 static 的父元素来进行定位。
2. fixed （老 IE8 以下不支持）生成绝对定位的元素，通常相对于浏览器窗口或 frame 进行定位。
3. relative 生成相对定位的元素，相对于其在普通流中的位置进行定位。
4. static 默认值。没有定位，元素出现在正常的流中
5. sticky 生成粘性定位的元素，容器的位置根据正常文档流计算得出（饿了么的 h5 搜索框就是用了这个特性）
6. inherit：规定从父元素继承 position 属性的值。

**注意**

1. absolute：生成绝对定位的元素，<font color=red>定位原点</font>是离自己这一级元素最近的一级 position 设置为 absolute 或者 relative 的父元素的左上角为原点的。
2. relative：生成相对定位的元素，<font color=red>定位原点</font>是元素本身所在位置的左上角。

**absolute 的 containing block 计算方式与正常流有什么不同**
无论属于哪种，都要先找到其祖先元素中最近的 position 值不为 static 的元素，然后再判断：

1. 若此元素为 inline 元素，则 containing block 为能够包含这个元素生成的第一个和最后一个 inline box 的 padding box (除 margin, border 外的区域) 的最小矩形；
2. 否则,则由这个祖先元素的 padding box 构成。
   如果都找不到，则为 initial containing block。

## CSS 选择器的权重规则

## 动画

用 js 来实现动画，我们一般是借助 setTimeout 或 setInterval 这两个函数，以及新的 requestAnimationFrame

```javascript
<div id="demo" style="position:absolute; width:100px; height:100px; background:#ccc; left:0; top:0;"></div>

<script>
  var demo = document.getElementById('demo');
  function rander(){
    demo.style.left = parseInt(demo.style.left) + 1 + 'px'; //每一帧向右移动1px
  }
  requestAnimationFrame(function(){
    rander();
    //当超过300px后才停止
    if(parseInt(demo.style.left)<=300) requestAnimationFrame(arguments.callee);
  });
</script>
```

**css3 使用**
@keyframes 结合 animation
transition：property duration timing-function delay

## 布局

**两列布局**

1. position absolute; margin-left;
2. float left + margin-left
3. flex-basis + flex-shrink: 0 + flex-grow: 0; flex auto
4. 

   https://juejin.cn/post/6979231967476711460

**三列布局**

1. 与两列布局类似，左右两边设置 position：absolute；和 top:0;left:0;right:0; 中间设置 margin-left 和 margin-right 即可。
2. 左右采用 float,中间用 calc()动态计算宽度，设置对应的 margin
3. 左右设置 flex-basis，中间设置 flex-grow

### 弹性布局 flex

容器默认存在两根轴：水平的主轴（main axis）和垂直的交叉轴（cross axis）

注意：设为 Flex 布局以后，子元素的 float、clear 和 vertical-align 属性将失效。

### 容器的属性

以下 6 个属性设置在容器上

```css
  // 决定主轴的方向
  flex-direction: row | row-reverse | column | column-reverse;

  // 如果一条轴排不下，如何换行
  flex-wrap: nowrap | wrap | wrap-reverse;

  // flex-direction和flex-wrap的简写
  flex-flow: flex-flow: <flex-direction> || <flex-wrap>;

  // 主轴上的对齐方式
  justify-content: flex-start | flex-end | center | space-between | space-around;

  // 交叉轴上的对齐方式
  align-items: align-items: flex-start | flex-end | center | baseline | stretch;

  // 属性定义了多根轴线的对齐方式。如果项目只有一根轴线，该属性不起作用。
  align-content
```

项目的 6 个属性

```css
  // 定义项目的排列顺序默认0
  order: <integer>; /* default 0 */

  // 定义项目的放大比例
  flex-grow: <number>; /* default 0 */

  // 定义项目的缩小比例
  flex-shrink: <number>; /* default 1 */

  // 定义了项目在分配多余空间之前，项目占据的主轴空间。可设置300px
  flex-basis: <length> | auto; /* default auto */

  // flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
  flex: none | [ <'flex-grow'> <'flex-shrink'>? || <'flex-basis'> ]
  该属性有两个快捷值：auto (1 1 auto) 和 none (0 0 auto)。

  // align-self属性允许单个项目有与其他项目不一样的对齐方式，可覆盖align-items属性。
  align-self: auto | flex-start | flex-end | center | baseline | stretch;
```

**CSS Grid**

两列布局：
```js
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr; /* 两列等分 */
      grid-gap: 10px; /* 列间距 */
    }
    
    .item {
        display: grid;
        place-items: center;
      background-color: #f2f2f2;
    }
```

## 各个单位的区别（px, em, rem, 百分比, vw, vh, vmax, vmin）

```
px：绝对单位，页面按精确像素展示

em：相对单位，基准点为父节点字体的大小，如果自身定义了font-size按自身来计算（浏览器默认字体是16px），整个页面内1em不是一个固定的值。

rem：相对单位，可理解为”root em”, 相对根节点html的字体大小来计算，CSS3新加属性，chrome/firefox/IE9+支持。

vw：viewpoint width，视窗宽度，1vw等于视窗宽度的1%。

vh：viewpoint height，视窗高度，1vh等于视窗高度的1%。

vmin：vw和vh中较小的那个。

vmax：vw和vh中较大的那个。

```

## 两行或三行省略号

```javascript
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;（行数）
  -webkit-box-orient: vertical;
```

## 左边定宽，右边自适应
```js
 <style>
    .container {
      display: flex;
    }
    .left {
      flex-basis: 300px;
      flex-shrink: 0;
      border: 1px solid red;
    }
    .right {
      flex-grow: 1;
      border: 1px solid green;
    }
    .container1 {
      display: grid;
      grid-template-columns: 300px 1fr;
    }
    .left1 {
      border: 1px solid blue;
    }
    .right1 {
      border: 1px solid red;
    }
  </style>
  <div class="container">
    <div class="left">left</div>
    <div class="right">right</div>
  </div>
  <div class="container1">
    <div class="left1">left</div>
    <div class="right1">right</div>
  </div>

```