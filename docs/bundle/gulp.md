## gulp简介
::: tip
官网定义：基于流的自动化构建工具，如果你查看它的网页源代码，还会看
到在<meta>标签里有一段更详细的描述：如果你查看它的网页源代码，还会看到
在<meta>标签里有一段更详细的描述：Gulp.js 是一个自动化构建工具，开发者
可以使用它在项目开发过程中自动执行常见任务。Gulp.js 是基于 Node.js 构建
的，利用 Node.js 流的威力，你可以快速构建项目并减少频繁的 IO 操作。
Gulp.js 源文件和你用来定义任务的 Gulp 文件都是通过 JavaScript（或者
CoffeeScript ）源码来实现的。
:::
**注意：本文主要介绍gulp与angular的实现，关于gulp安装所需环境node、cnpm等不再介绍**
## gulp内部实现

### 流
在计算机系统中文件的大小是变化很大的，有的文件内容非常多非常大，而
Node.js 里文件操作是异步的，如果用一个形象的比喻来形容将一个文件的内容
读取出来并写入另一个文件中，可以将它想象成文件内容像是水流，从一个文件
“流”入另一个文件。

### nodejs中的流 
在 node 里面，读写文件可以用“流”来描述：
```javascript
"use strict";
let fs = require("fs");
fs.createReadStream("./in.txt")
.pipe(fs.createWriteStream("./out.txt"));
```
上面的代码除了将 in.txt 文件中的内容输出到 out.txt 之外，不做其他任何
事情，相当于复制了一份数据，从语法形式上可以看到，“数据流”从
fs.createReadStream 创建然后经过 pipe 流出，最后到 fs.createWriteStream。
在这输入流到输出流的中间，我们可以对“流”做一些事情。
这就是gulp内部实现最重要的部分，后面会看到很多gulp的实现的如下代码片段：
```javascript
    .src('static/less/**/**.less') // 读取流
    .pipe(gulp.dest('static/css')) // 输出流
```

## gulp基本api
* gulp.src()

    gulp.src(globs[, options])
    
    globs参数是文件匹配模式(类似正则表达式)，用来匹配文件路径(包括文件名) 
    gulp.src()方法正是用来获取流的，但要注意这个流里的内容不是原始的文件流，而是一个虚拟文件对象流(Vinyl files)，这个虚拟文件对象中存储着原始文件的路径、文件名、内容等信息。
* gulp.task()

    方法用来定义任务，
    gulp.task(name[, deps], fn)

* gulp.dest()

    gulp.dest(path[,options])
    gulp.dest()方法是用来写文件的，
    gulp的使用流程一般是这样子的：首先通过gulp.src()方法获取到我们想要处理的文件流，然后把文件流通过pipe方法导入到gulp的插件中，最后把经过插件处理后的流再通过pipe方法导入到gulp.dest()中，gulp.dest()方法则把流中的内容写入到文件中，这里首先需要弄清楚的一点是，我们给gulp.dest()传入的路径参数，只能用来指定要生成的文件的目录，而不能指定生成文件的文件名，它生成文件的文件名使用的是导入到它的文件流自身的文件名，所以生成的文件名是由导入到它的文件流决定的。
    ```
    var gulp = require('gulp');
    gulp.src('script/jquery.js')
        .pipe(gulp.dest('dist/foo.js'));
    //最终生成的文件路径为 dist/foo.js/jquery.js,而不是dist/foo.js 
    ```
* gulp.watch()

    用来监视文件的变化，当文件发生变化后，我们可以利用它来执行相应的任务，例如文件压缩等。 
    ```
    gulp.task('uglify',function(){ //do something }); gulp.task('reload',function(){ //do something }); 
    gulp.watch('js/**/*.js', ['uglify','reload']);
    ```
## gulp 结合angular的构建

### 目录结构

```javascript
├─.gitee
├─components----------------------------------------lib库
│  ├─angular
│  ├─angular-bootstrap
│  ├─angular-ui-router
│  │  ├─api
│  │  ├─release
│  │  └─src
│  ├─require-css
│  └─requirejs
├─controller----------------------------------------页面控制器
│  ├─homePage
│  └─main
├─html----------------------------------------------展示demo
│  ├─Base
│  └─Promote
├─dist
├─route---------------------------------------------路由
├─static--------------------------------------------静态文件
│  ├─css
│  │  └─common
│  ├─images
│  └─less
│      └─common
└─views---------------------------------------------项目view
    ├─common
    └─homepage
```

## 项目介绍
### 对静态资源进行监听，编译，使用模块如下：

* browser-sync
* run-sequence
* gulp-htmlmin
* gulp-less
* gulp-autoprefixer
* gulp-sourcemaps
* gulp-cssnano
* gulp-uglify
* gulp-imagemin
* gulp-util

### 使用browser-sync 来进行本地静态资源服务器及刷新浏览器

```javascript

gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    })
});

```

### 使用run-sequence 来同步运行任务插件

```javascript
gulp.task('default', (callback) => {
    runSequence(['browserSync', 'watch'], callback);
})
```

### 引入less，使用gulp-less，gulp-autoprefixer，gulp-sourcemap，gulp-cssnano 来编译压缩

```javascript

gulp.task('less', () =>
    gulp
    .src('static/less/bootstrap.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('/'))
    .pipe(gulp.dest('static/css'))
    .pipe(browserSync.reload({ stream: true }))
);

```

### 引入gulp-uglify压缩js

```javascript

gulp.task('script', () => {
    gulp.src(['controller/*.js', 'controller/**/*.js'])
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
});

```

### 引入gulp-imagemin压缩图片

```javascript

gulp.task('image', () => {
    gulp.src('static/images/**/*')
        .pipe(imagemin({ progressive: true }))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/images'));
});

```

### 引入gulp-util输出压缩日志

> 项目入口

### 使用的库主要是

* requirejs
* angular
* angular-ui-router

### 使用requirejs 来加载页面所需的js

```javascript
var CURRENT_PATH = '/'
var COMPONENTS_PATH = './components/';

require.config({
    paths: {
        'angular': COMPONENTS_PATH + 'angular/angular',
        'app': CURRENT_PATH + 'app',
        'ui-route': COMPONENTS_PATH + 'angular-ui-router/release/angular-ui-router',
        'route': CURRENT_PATH + 'route/angular.route',
    },
    shim: {
        'angular': {
            exports: 'angular'
        },
        'ui-route': {
            deps: ['angular'],
            exports: 'ui-route'
        }
    }
})

```

### 引入

```javascript
require([
    'angular',
    'app',
    'route',
    'ui-route',
    './controller/controller',
], function() {
    angular.bootstrap(document, ['webapp']);
})

```
### angular 入口 app.js

```javascript

    var app = angular.module('webapp', [
        'ui.router',
        'webapp.Ctrl',
    ]);
    return app;

```
### angular 路由定义 angular.route.js

```javascript

var PATH_LAYOUT = './views/common/layout.html';

var PATH_MENU = './views/common/menu.html';

$stateProvider.state('index', {
    url: '/index',
    views: {
        'layout': {
            templateUrl: PATH_LAYOUT
        },
        'side@index': {
            templateUrl: PATH_MENU
        },
        'main@index': {
            templateUrl: './views/homepage/index.html'
        }
    }
})
```

### gulpfile.js文件
```javascript
var gulp = require('gulp');
// 自动同步浏览器插件
var browserSync = require('browser-sync');
// 同步运行任务插件
var runSequence = require('run-sequence');
// html
var htmlmin = require('gulp-htmlmin');
// 编译less
var less = require('gulp-less');
// 给css3属性添加浏览器前缀插件
var autoprefixer = require('gulp-autoprefixer');
// css map
var sourcemaps = require('gulp-sourcemaps');
// 压缩css插件
var cssnano = require('gulp-cssnano');
var cleanCSS = require('gulp-clean-css');
var concat = require('gulp-concat');
// 压缩js
var uglify = require('gulp-uglify');
// 压缩图片
var imagemin = require('gulp-imagemin');
// 压缩日志
var gutil = require('gulp-util');
// 起本地静态资源服务器，及监听
gulp.task('browserSync', () => {
    browserSync({
        server: {
            baseDir: './',
            index: 'index.html'
        }
    });
});
gulp.task('testHtmlmin', ()=> {
    var options = {
        removeComments: true,//清除HTML注释
        collapseWhitespace: true,//压缩HTML
        collapseBooleanAttributes: true,//省略布尔属性的值 <input checked="true"/> ==> <input />
        removeEmptyAttributes: true,//删除所有空格作属性值 <input id="" /> ==> <input />
        removeScriptTypeAttributes: true,//删除<script>的type="text/javascript"
        removeStyleLinkTypeAttributes: true,//删除<style>和<link>的type="text/css"
        minifyJS: true,//压缩页面JS
        minifyCSS: true//压缩页面CSS
    };
    gulp.src('*.html')
        .pipe(htmlmin(options))
        .pipe(gulp.dest('dist'));
});
// 编译less文件,并压缩
gulp.task('less', () =>
    gulp
    .src('static/less/**/**.less')
    .pipe(sourcemaps.init())
    .pipe(less())
    .pipe(sourcemaps.write({ includeContent: false }))
    .pipe(autoprefixer())
    .pipe(sourcemaps.write('/'))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    // .pipe(concat('all.css'))
    .pipe(gulp.dest('static/css'))
);
// 压缩 js 文件
// 在命令行使用 gulp script 启动此任务
gulp.task('script', () => {
    // 1. 找到文件
    gulp.src(['controller/*.js', 'controller/**/*.js', '!controller/module.js'])
    // 2. 压缩文件
    .pipe(uglify())
    // 3. 另存压缩后的文件
    .pipe(gulp.dest('dist'));
});

// gulp-imagemin 图片压缩
gulp.task('image', () => {
    gulp.src('static/images/**/*')
        .pipe(imagemin({ progressive: true }))
        .on('error', gutil.log)
        .pipe(gulp.dest('dist/images'));
});
// 监听文件修改
gulp.task('watch', ['browserSync', 'testHtmlmin', 'less', 'script', 'image'], () => {

    gulp.watch([
        '*.html',
        'views/**/*.html'
    ], browserSync.reload);

    gulp.watch([
        'require.config.js',
        'controller/*.js',
        'controller/**/*.js'
    ], browserSync.reload);

    gulp.watch([
        'static/less/*.less',
        'static/less/**/*.less'
    ], ['less', browserSync.reload]);

    gulp.watch('docs/**/*.md', ['md', browserSync.reload]);
})

// 默认任务
gulp.task('default', (callback) => {
    runSequence(['browserSync', 'watch'], callback);
})
```
## 总结
Gulp 的定位是 Task Runner, 就是用来跑一个一个任务的。自动化这个流程
Grunt/Gulp, 比如你写完代码后要想发布 production 版本，用一句 gulp build 就
可以自动把 sass 编译成 css, coffee 编译成 js 压缩各自的文件，压缩图片，生成图
片 sprite 拷贝 minified/uglified 文件到 dist 文件夹。

但是它没发解决的是 js module 的问题，写代码时候如何组织代码结构
的问题. 后面的webpack就很好地解决了这个问题
## 项目地址
[项目gitee地址](https://gitee.com/M-J/gulp-angular1)