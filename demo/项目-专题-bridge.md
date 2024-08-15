# xbridge
  - 多个bridge, 需要统一提供callHandler, regeisterHandler
  - xbase 基础的方法, toast, log, openUrl，啥玩意儿 
  - x-e,x-w,x-a

 - DSBridge-Android通过注入API的方式
 - 多app马甲包的bridge抽象；（设计上的优势，控制反转，bridge通信原理，每一种的具体情况）;
 - bridge设计， 采用ioc（控制反转）的设计模式解耦（快速上手，多马甲包，bridge管理和开发混乱问题）, 多讲讲
    - 控制反转ioc设计；解耦多个bridge（老的bridge，dsbridge）的依赖注入
    - xbase.use(dsbridge || jsbridge)

# 结合monorepo的方式，统一说明

1. standard-version、release-it 控制版本
2. peer-dependences 控制宿主环境
3. tag作为构建依据，方便回滚