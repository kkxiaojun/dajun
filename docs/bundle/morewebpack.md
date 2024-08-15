# webpack多页面

借助`glob`获取目录

```javascript
  const glob = require('glob')

  function getEntry(globPath, filterStr, splitCode = '/') {
    const entries = {}

    glob.sync(globPath).forEach(item => {
      const entryPathArr = item.split('/').splice(-3, 2)
      const entryName = item.split('/').splice(-2, 1)
      console.log('entryName:', entryName)
      if (filterStr) {
        if (entryPathArr.join('/') === filterStr) {
          entries['index'] = {
            entry: 'src/' + filterStr + '/main.js',
            template: 'src/' + filterStr + '/index.html'
          }
        }
      }
    })
    return entries
  }

  // getEntry('../src/pages/*/main.js', 'pages/page1', '.')

  module.exports = {
    getEntry
  }

```

结合page设置多页面
```javascript
module.exports = {
  // 根据入口构建
  pages: entry,
}
```

# webpack实践