module.exports = {
  base: '/dajun/',
  title: '大俊的知识库',
  description: '大俊的博客',
  head: [
    ['link', { rel: 'icon', href: '/image/avator.png'}]
  ],
  themeConfig: {
    // 导航栏配置
    nav: [
        { text: '主页', link: '/' },
        { text: '博文', link: '/android/'
          // items: [
          //   { text: 'Android', link: '/android/' },
          //   { text: 'ios', link: '/ios/' },
          //   { text: 'Web', link: '/web/' }
          // ]
        },
        { text: '关于', link: '/about/' },
        { text: 'Github', link: 'https://www.github.com/kkxiaojun' },
    ],
    displayAllHeaders: true,
    sidebar: 'auto',
    lastUpdated: 'Last Updated', 
  }
}