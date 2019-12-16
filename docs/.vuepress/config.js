module.exports = {
  base: '/dajun/',
  title: 'KK的知识库',
  description: 'KK的博客',
  head: [
    ['link', { rel: 'icon', href: '/image/avator.png'}]
  ],
  themeConfig: {
    // 导航栏配置
    nav: [
        { text: '主页', link: '/' },
        { text: '前端基础',
          items: [
            { text: 'JavaScript', link: '/javascript/' },
            { text: 'CSS', link: '/css/' },
            { text: 'Webpack', link: '/webpack/' },
            { text: '浏览器相关', link: '/broswer/'}
          ]
        },
        { text: '框架基础', link: '/frame/' },
        { text: '计算机基础',
          items: [
            { text: '计算机网络', link: '/internet/' },
            { text: '算法', link: '/sort/' }
          ]
        },
        { text: 'Github', link: 'https:www.github.com/kkxiaojun' },
    ],
    displayAllHeaders: true,
    sidebar: 'auto',
    lastUpdated: 'Last Updated', 
  }
}