# 离线缓存实现方案
## 项目背景
	- Android WebView + H5 SPA
	- 多国家
	- 复杂的网络环境

	- 线上资源多
	- 首屏加载时间长
	- 用户带宽，流量成本高
	- 服务器压力大

## 遇到的问题

 - 离线包资源越来越大
 - 业务快速迭代时，部分页面的加载还是存在大量的等待



# PWA

怎么避免全新加载 sw.js  (加版本号   设置缓存no-cache, max-age=0 设置 mx-age=3250000000) 

## PWA优秀实践

1. 线程启动；  onload注册

2. 缓存主文档

3. sw push预加载效果；可以取代离线包

4. 本地调试


# PWA 美团分享

1. 必须是https的资源，http资源会引发Mixed Content导致资源不能被加载（必要时可以加 ^http过滤）
2. 只会缓存get请求
3. diff服务
4.  fetch 事件会拦截页面上所有的网络资源请求，需要对当前的资源请求进行判断分类；fetch 事件回调参数的 event.request 属性描述了当前被拦截的资源请求，可以通过它来进行判断分类

本地调试：打开[chrome://flags/#unsafely-treat-insecure-origin-as-secure](chrome://flags/#unsafely-treat-insecure-origin-as-secure)可以把对应不安全的网站设置为安全网站



// 本地模拟登录的参数
export const localLoginParams = () => {
  if (process.env.RUN_ENV !== 'local') {
    return {}
  }
  return {
    xluid: 'dflksdjffslkdjfflkd', // 随便填写
    userid: 623637, // 用户id
    sex: 2 // 1 女性  2男性
  }
}

Person构造函数 prototype   Person实例原型prototype

person __proto__ Person.ptototype

add_header 'Access-Control-Allow-Origin' $h5_origin;
    add_header 'Access-Control-Allow-Credentials' 'true';
    add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
    add_header 'Access-Control-Allow-Headers' 'DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type,sentry-trace';

<meta name="viewport" content="width=device-width, viewport-fit=cover">

padding-bottom: constant(safe-area-inset-bottom);

padding-bottom: env(safe-area-inset-bottom);


