module.exports = {
  base: './',
  title: '大俊的知识库',
  description: '大俊的博客',
  head: [
    ['link', { rel: 'icon', href: '/image/avator.png'}]
  ],
  themeConfig: {
    logo: '/image/avator.png',
    // 导航栏配置
    nav: [
        { text: '主页', link: '/' },
        { text: 'css', link: '/css/' },
        { text: 'JavaScript基础', link: '/javascript/' },
        { text: '浏览器相关', link: '/broswer/' },
        { text: '网络Http', link: '/internet/' },
        { text: 'TCP', link: '/tcp/'},
        { text: 'Vue', link: '/vue/'},
        { text: 'React', link: '/react/'},
        { text: 'Node', link: '/node/'},
        { text: 'Performance', link: '/performance/'},
        { text: '打包工具', link: '/bundle/' },
        { text: '视野', link: '/sort/' },
        { text: 'Github', link: 'https:www.github.com/kkxiaojun' },
    ],
    displayAllHeaders: true,
    sidebar: {
      '/javascript/': [
        {
          title: '基础知识库',
          sidebarDepth: 2,
          collapsable: true,
          children: [
            'base',
            'base1',
            'es6',
          ]
        },
        {
          title: '异步溯源',
          sidebarDepth: 2,
          collapsable: true,
          children: [
            'async',
          ]
        },
        {
          title: 'API实现',
          sidebarDepth: 2,
          collapsable: true,
          children: [
            'sourcecode',
          ]
        },
        {
          title: '进阶之问',
          sidebarDepth: 2,
          collapsable: true,
          children: [
            'deep',
          ]
        },
      ],
      '/css/': [
        {
          title: 'css',
          sidebarDepth: 2,
          children: [
            'css',
            'animation'
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
      ],
      '/vue/': [
        {
          title: 'vue',
          sidebarDepth: 5,
          children: [
            'vue'
          ]
        }
      ],
      '/react/': [
        {
          title: 'react',
          sidebarDepth: 5,
          children: [
            'react'
          ]
        }
      ],
      '/bundle/': [
        {
          title: 'Webpack',
          sidebarDepth: 1,
          children: [
            'webpack',
            'webpackopt',
            'babel'
          ]
        },
        {
          title: 'Gulp',
          sidebarDepth: 1,
          children: [
            'gulp'
          ]
        }
      ],
      '/node/': [
        {
          title: 'node',
          sidebarDepth: 1,
          children: [
            'base'
          ]
        }
      ],
      '/sort/': [
        {
          title: '前端视野',
          sidebarDepth: 3,
          children: [
            'sortmethod'
          ]
        }
      ],
      '/performance/': [
        {
          title: 'performance',
          sidebarDepth: 3,
          children: [
            'image',
            'long',
            'lazyload',
            'performance',
            'h5'
          ]
        }
      ]
    },
    lastUpdated: 'Last Updated', 
  }
}