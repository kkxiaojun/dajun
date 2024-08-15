## 结论
lerna 在文档中说它解决了 3 个 monorepo 最大的问题：

1. 不同包的自动 link
2. 命令的按顺序执行
3. 版本更新、自动 tag、发布

这三个问题是 monorepo 的核心问题。

第一个问题用 pmpm workspace、npm workspace、yarn workspace 都可以解决。

第二个问题用 pnpm exec 也可以保证按照拓扑顺序执行，或者用 npm exec 或者 yarn exec 也可以。

第三个问题用 changesets 就可以做到。

lerna 在功能上和 pnpm workspace + changesets 并没有大的差别，主要是它做了命令缓存、分布式执行任务等性能的优化。

总之，monorepo 工具的核心就是解决这三个问题。

## npm yarn pnpm workspace，monorepo

> monorepo是在一个项目中管理多个包的项目组织形式

解决的问题：
 * 工程化配置重复
 * 不同包的link(开发调试)（workspace可以解决）
 * 命令的顺序执行 （pnpm exec可以解决）
 * 版本更新、自动tag、发布、 拓扑顺序（pnpm支持：pnpm -r -no-sort test）（指定包之间的依赖关系，以确保包的构建和发布顺序是正确的） (changeset可以解决)

lerna和pnpm（原理深入）对比, lerna优点：

1. 命令缓存
2. 分布式执行任务

## npm yarn的问题

* npm; 嵌套依赖，会复制很多次（嵌套是会超过 windows 路径的长度限制的）
* yarn；依赖铺平，幽灵依赖问题
* 不支持拓扑顺序（指定包之间的依赖关系，以确保包的构建和发布顺序是正确的）

## pnpm（支持拓扑顺序）
解决的问题：

* 幽灵依赖
* 相同依赖复制多次
* windows路径过长

解决问题原理：

所以每个包的寻找都要经过三层结构：node_modules/package-a > 软链接 node_modules/.pnpm/package-a@1.0.0/node_modules/package-a > 硬链接 ~/.pnpm-store/v3/files/00/xxxxxx。

* 硬链可以链接文件，不能处理文件夹; 所以第二层采用软链接
* 硬链接目标文件并不是普通的 NPM 包源码，而是一个哈希文件，这种文件组织方式叫做 content-addressable（基于内容的寻址，优点：即便包版本升级了，也仅需存储改动 Diff）

所有的依赖都是从全局 store 硬链接到了 node_modules/.pnpm，然后每个包之间通过软连接相互依赖（其它语言类似：java的maven,rust的cargo_home）

深入：加分项

1. 使⽤ —-frozen-lockfile 参数：确保CI过程中拉到的依赖和你本地开发时的依赖完全⼀
致；并且使⽤该参数，在lockfile没有发⽣变化的时候会跳过依赖分析的过程。
2. pnpm的坑说一下：因为（pnpm是全局store硬链接到了 node_modules/.pnpm，node_module下的是符号链接，真实的module是在.pnpm下），所以babel需要手动include处理第三方库(没有进行 es6转es5,ahooks,@react-spring)的问题（我怎么处理的：借用`enhanced-resolve`,递归获取所有第三方包的依赖库，nextjs的transpilePackages（next-transpile-modules）问题）
3. pnpm大版本升级，lock文件结构错乱，大变

巧妙：利用 workspace:*可以在 pnpm publish的时候自动更新到最新的版本 

提问：为什么要有硬链接？为什么不直接符号链接到全局存储？

1. 硬链接的作用： 一个包在一台机器上可以有不同的依赖集。
2. 符号链接直接到全局存储的缺点：跨文件系统的限制、Windows 支持的不可靠性（需要管理员权限）和潜在的安全风险

## turbo

1. 执行的任务数量越多，并且依赖越复杂的情况；构建层面的优化
2. turborepo为什么性能更快，除了并行下载和缓存以外
