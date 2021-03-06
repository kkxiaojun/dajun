module.exports = {
  base: '/dajun/',
  title: 'KK的知识库',
  description: 'KK的博客',
  head: [
    ['link', { rel: 'icon', href: '/image/avator.png'}]
  ],
  themeConfig: {
    logo: '/image/avator.png',
    // 导航栏配置
    nav: [
        { text: '主页', link: '/' },
        { text: 'JavaScript基础', link: '/javascript/' },
        { text: '浏览器相关', link: '/broswer/' },
        { text: '网络Http', link: '/internet/' },
        { text: 'TCP', link: '/tcp/'},
        { text: '框架基础', 
          items: [
            { text: 'Vue', link: '/Vue/'},
            { text: 'React', link: '/React/'},
          ]  
        },
        { text: '计算机基础',
          items: [
            { text: '计算机网络', link: '/internet/' },
            { text: '算法', link: '/sort/' }
          ]
        },
        { text: 'Github', link: 'https:www.github.com/kkxiaojun' },
    ],
    displayAllHeaders: true,
    sidebar: {
      '/javascript/': [
        {
          title: 'JavaScript基础',
          sidebarDepth: 3,
          children: [
            'base',
            'es6',
            'async',
            'sourcecode',
          ]
        }
      ],
      '/broswer/': [
        {
          title: '浏览器工作原理',
          sidebarDepth: 3,
          children: [
            'main1',
            'render',
            'v8',
            'event',
            'cors',
            'cache',
            'xss',
          ]
        }
      ],
      '/internet/': [
        {
          title: '网络相关',
          sidebarDepth: 3,
          children: [
            'base',
            'http',
            'net',
          ]
        }
      ],
      '/tcp/': [
        {
          title: 'TCP相关',
          sidebarDepth: 3,
          children: [
            'tcp'
          ]
        }
      ]
    },
    lastUpdated: 'Last Updated', 
  }
}