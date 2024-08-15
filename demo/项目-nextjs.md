项目描述: 负责语音业务线，app内嵌webview、玩法交互类h5的开发与维护；在整个生命周期内，负责过旧项目的迁移工作、新h5、pc项目的架构设计，统一h5的模板，并深入研究与实践多语言、性能优化、兼容性、小游戏活动、复杂的动效；

技术栈: next.js + axios + zustand + i18next + pnpm + typescript

项目亮点：
- 项目模板（ci/cd, 多语言，bridge）具备最小mvp功能，研发规范，具备快速复制的功能；
- DDD实践（Domain-Driven Design）：领域驱动设计（不使用 graphql、内聚，计算，不不同的ui展示，比如钱包页面）；
  1. 业务逻辑和数据处理放在service层（UI与数据分离，数据与数据处理、业务逻辑分离）
- 多语言的实践
  1. css背景图多语言(html lang 标签选择器, 需设置lang属性，mixin)，js动态引入图片（webpack.require）,webp图片，data-webp
  2. （重点和亮点，详细说）语言包管理（自动拉取excel；i18n Ally => zh.json => 借助自动翻译工具 => excel => 回写到google excel， 画个流程图https://bobi.ink/2023/08/08/i18n-locale/）; https://juejin.cn/post/7174082242426175525, 自动提取“中文”，加t函数(参考bundle/babel)
  3. 语言包根据业务动态加载（1. 首先ssg的时候已经打包不同语言的url路径（使用getStaticPaths方法,locale参数）；2. 根据模块，加载翻译；next.js的ssg下，使用nexti18的serverSideTranslations;）

- 解决构建产物的兼容性问题，降低线上兼容性故障发生概率（es-check问题，解决兼容性和白屏问题）; 参考bundle/babel目录，总结：https://borninsummer.com/files/2018/11/acorn.js-intro.pdf，ACORN.js的原理和应用
- pnpm解析第三方包的问题，由此引入webpack的寻址原理(enhanced-resolve)，软链，硬链，优缺点（参考monorepo.md）
- 弹窗管理 https://github.com/ebay/nice-modal-react

  优势
  - 调用过程干净优雅
  - 组件依旧存在于上下文中（可以自定义位置，默认在 Provider 下）
  - show/hide 方法返回值为 Promise，方便链式调用（通过useModal().resolve(val)等方法改变 Promise 状态）

  实现
  - 1. 弹窗调用方式问题，维护弹窗状态过多 —— NiceModal.Provider 内统一渲染弹窗
  - 2. 显隐相关状态以及方法需要共享 —— 库内部维护对应状态，通过统一 API （show/hide/useModal）暴露
  - show/hide/useModal 等方法就是基于 dispatch 函数进行弹窗数据（Context） 的更新从而触发视图更新（其中 show 方法多一步注册，生成 ID 并绑定至对应的高阶组件）
  ```js
  const Provider: React.FC = ({ children }) => {
    // 初始弹窗信息
    const [modals, _dispatch] = useReducer(reducer, initialState);
    dispatch = _dispatch;
    return (
      <NiceModalContext.Provider value={modals}>
        {children}
        <NiceModalPlaceholder />
      </NiceModalContext.Provider>
    );
  };

  const NiceModalPlaceholder: React.FC = () => {
    const modals = useContext(NiceModalContext);
    // 根据弹窗信息找到需要渲染的弹窗 ID （NiceModal.show 时更新）
    const visibleModalIds = Object.keys(modals).filter((id) =>
      Boolean(modals[id])
    );

    // 找到对应创建的高阶组件(NiceModal.show 时注册）
    const toRender = visibleModalIds
      .filter((id) => MODAL_REGISTRY[id])
      .map((id) => ({
        id,
        ...MODAL_REGISTRY[id],
      }));

    return (
      <>
        {toRender.map((t) => (
          {/* 渲染 NiceModal.create 创建的高阶组件，并注入 ID */}
          <t.comp key={t.id} id={t.id} />
        ))}
      </>
    );
  };

  const create =
    <P extends Record<string, unknown>>(
      Comp: React.ComponentType<P>
    ): React.FC<P & NiceModalHocProps> =>
    ({ id }) => {
      const modals = useContext(NiceModalContext);
      const shouldMount = Boolean(modals[id]);

      if (!shouldMount) {
        return null;
      }
      return (
        <NiceModalIdContext.Provider value={id}>
          {/* 找到对应 ID 的参数，传入内部真实组件 */}
          <Comp {...(modals[id].args as P)} />
        </NiceModalIdContext.Provider>
      );
    };
  ```

- next.js打包优化（重要），部署`standalone`模式打包(会有个server.js文件)
- next.js采用 link做预加载（让客户端预先加载一个webview）, 参考性能优化.md（作为亮点，hhh）
- 多app马甲包的bridge抽象；（设计上的优势，控制反转，bridge通信原理，每一种的具体情况）;
- 参考 动画专题.md;(结合实践，扭蛋机，许愿池等等说明)
- https://mp.weixin.qq.com/s/23ZFPK4CaCkinwpZ3SG9Rw , 性能检测，异常上报，

## next.js 讲解

### Next.js 与 React 技术选型的区别在哪里？使用 Next.js 比使用 React 有什么优势？

### 什么是服务器端渲染（SSR）？SSR 的原理是什么？了解渐进式渲染和流式渲染嘛？

### RSC的实现解决了什么问题，说说你的理解

### 服务端组件和客户端组件的区别有哪些？什么时候用服务端组件，什么时候用客户端组件？

### 如何优化 Next.js 应用程序的性能？Next.js 有哪些常用的性能优化手段？

### Next.js 服务端和客户端渲染不一致导致的水合报错该怎么解决？

### Next.js模板，做了什么事情
 多语言方面
  - 根据业务按需加载语言文件
  - 阿拉伯语的处理
  - 语言包管理（自动拉取excel；i18n Ally => zh.json => 借助自动翻译工具 => excel => 回写到google excel
  - 路由,全局的middleware
 难点1：业务与UI的耦合度过高（到处的state和业务逻辑）
  - 借助领域驱动设计的思想，业务逻辑和数据处理放在service层（UI与数据分离，数据与数据处理、业务逻辑分离）
 难点2：解决兼容性
  - 在CI/CD阶段，对代码进行兼容性检测（es-check）
  - 上升到分享ACORN.js的原理和应用
 难点3：性能优化
  - 页面打开慢，白屏时间长（spa），seo不友好

### APP-ROUTER, PAGE-ROUTER
* App Router 制定了更加完善的规范，使代码更好被组织和管理（template,loading,error等）
* pages目录下所有文件都会被当成路由文件（可以通过pageExtensions自定义页面扩展名）
### CSR、SSG、SSR、ISR
* ISR, 其实就是ssr+ssg，时间内是ssg, 到达更新时间后的第一次访问就是ssr

### React Server Component

总结一下，使用 Suspense，可以解锁两个主要的好处，使得 SSR 的功能更加强大：

1.  Streaming Server Rendering（流式渲染）：从服务器到客户端渐进式渲染 HTML
2.  Selective Hydration（选择性水合）：React 根据用户交互决定水合的优先级

区别：
* ssr的缺点（连续、阻塞的）
  - 输出html
  - 发送到客户端
  - 浏览器生成用户界面
  - 水合
* 那就是状态的保持（渲染成不同的格式是“因”，状态的保持是“果”）。每次 SSR 都是一个新的 HTML 页面，所以状态不会保持
