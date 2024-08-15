## react hooks

### react hooks原理 

**为什么引入 react hooks**

react组件的两种方式：

1. 函数组件（函数式编程）
    - 无生命周期
    - 无 this
    - 无 state

2. 类组件 （面向对象）
    - 组件之间的逻辑状态难以复用
    - 大型复杂的组件很难拆分
    - class语法不友好

1：组件之间的逻辑状态难以复用；

2：大型复杂的组件很难拆分；

3：Class(生命周期，state, this, 函数组件不能) 语法的使用不友好；


**react hooks 原理**，主打函数组件，推函数式编程

> React-Hooks 是什么？它是一套能够使函数组件更强大、更灵活的“钩子”。

1. 要确保 Hooks 在每次渲染时都保持同样的执行顺序
2. Hooks 的正常运作，在底层依赖于单链表
3. 调用链路：
    - 首次渲染；mountState（首次渲染）按顺序构建链表并渲染，hook 相关的所有信息收敛在一个 hook 对象里，而 hook 对象之间以单向链表的形式相互串联；hooks 的实现就是基于 fiber 的，会在 fiber 节点上放一个链表，每个节点的 memorizedState 属性上存放了对应的数据
    - 更新阶段；updateState（更新） 按顺序去遍历之前构建好的链表，取出对应的数据信息进行渲染
    - 如果前后两次读到的链表在顺序上出现差异，那么渲染的结果自然是不可控的


Q：为什么只能在函数最外层调用 Hook？为什么不要在循环、条件判断或者子函数中调用。

A: react中，hook是以链表（链表是动态分配内存，是非连续的。数组才是连续的，且是静态分配的）的方式存储；memorizedState（hook的存储对象）是按照hook定义的顺序放置数据的，如果hook顺序变化，memorizedState并不会感知

Q：自定义的 Hook 是如何影响使用它的函数组件的？

A：共享memorizedState，共享顺序。

Q：“Capture Value”（每次re render都生成一个快照，固化的值） 特性是如何产生的？

A：每一次 ReRender 的时候，都是重新去执行函数组件了，对于之前已经执行过的函数组件，并不会做任何操作。



https://github.com/brickspert/blog/issues/26
https://github.com/xy-sea/blog/tree/main

相关hooks的实现和区别

### useEffect useLayoutEffect
- 优先使用 useEffect，因为它是异步执行的，不会阻塞渲染
- 会影响到渲染的操作尽量放到 useLayoutEffect中去，避免出现闪烁问题
- useLayoutEffect和componentDidMount是等价的，会同步调用，阻塞渲染
- 在ssr的时候使用会有一个 warning，因为它可能导致首屏实际内容和服务端渲染出来的内容不一致。

## react fiber
https://kaiwu.lagou.com/course/courseInfo.htm?courseId=510#/detail/pc?id=4861
https://7kms.github.io/react-illustration-series/main/macro-structure
### Fiber架构的迭代动机和设计思想
- JavaScript 线程和渲染线程必须是互斥的：这两个线程不能够穿插执行，必须串行。当其中一个线程执行时，另一个线程只能挂起等待
- React 15 调和（Reconciliation）过程与 Diff 算法, 卡顿，卡顿原因

问题：diff（是树的深度优先遍历的过程，同步递归的过程），javascript线程占据主任务， 渲染线程挂起，导致卡顿；

这个过程的致命性在于它是同步的，不可以被打断。当处理结构相对复杂、体量相对庞大的虚拟 DOM 树时，Stack Reconciler 需要的调和时间会很长，这就意味着 JavaScript 线程将长时间地霸占主线程，进而导致我们上文中所描述的渲染卡顿/卡死、交互长时间无响应等问题。

React 15 调和（Reconciliation）过程，同步递归的过程

React 16.x 设计思想：Fiber 是如何解决问题的

1. 调度器，渐进渲染，增量渲染，实现增量渲染的目的，是为了实现任务的可中断、可恢复，并给不同的任务赋予不同的优先级，最终达成更加顺滑的用户体验。
2. 对生命周期的影响：废除componentWillMount、componentWillUpdate、componentWillReceiveProps、shouldComponentUpdate（工作单元（也就是任务）的重启将会伴随着对部分生命周期的重复执行）

### Fiber架构整理流程
![整体流程](https://cdn.hiyayuyin.com/resource/tool/1132575239044182000-ItIQj5AttnpRy-Z3jcnrZ-542-800.jpg)

**整体流程**

通过上文的描述, 两大循环的分工可以总结为: 大循环(任务调度循环)负责调度task, 小循环(fiber 构造循环)负责实现task .

react 运行的主干逻辑, 即将输入转换为输出的核心步骤, 实际上就是围绕这两大工作循环进行展开.

结合上文的宏观概览图(展示核心包之间的调用关系), 可以将 react 运行的主干逻辑进行概括（也可理解为，react组件的更新流程）:

1. 输入: 将每一次更新(如: 新增, 删除, 修改节点之后)视为一次更新需求(目的是要更新DOM节点).
2. 注册调度任务: `react-reconciler`(构造器)收到更新需求之后, 并不会立即构造fiber树, 而是去调度中心scheduler注册一个新任务task, 即把更新需求转换成一个task.
3. 执行调度任务(输出): 调度中心scheduler通过任务调度循环来执行task(task的执行过程又回到了react-reconciler包中).
    - fiber构造循环是task的实现环节之一, 循环完成之后会构造出最新的 fiber 树.
    - commitRoot是task的实现环节之二, 把最新的 fiber 树最终渲染到页面上, task完成.
    - 主干逻辑就是输入到输出这一条链路, 为了更好的性能(如批量更新, 可中断渲染等功能), react在输入到输出的链路上做了很多优化策略, 比如本文讲述的任务调度循环和fiber构造循环相互配合就可以实现可中断渲染


### Fiber运行核心流程

#### react-reconciler
此处先归纳一下react-reconciler包的主要作用, 将主要功能分为 4 个方面:

- 输入: 暴露api函数(如: scheduleUpdateOnFiber), 供给其他包(如react包)调用.
- 注册调度任务: 与调度中心(scheduler包)交互, 注册调度任务task, 等待任务回调.
- 执行任务回调: 在内存中构造出fiber树, 同时与与渲染器(react-dom)交互, 在内存中创建出与fiber对应的DOM节点.
- 输出: 与渲染器(react-dom)交互, 渲染DOM节点.

#### react 启动模式
`react17.0.2`
- legacy
- concurrent(可中断渲染)

#### 优先级管理
    

## redux相关，zustand, 等等


## react-router