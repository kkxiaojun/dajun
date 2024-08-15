// 实现一个 sum 函数如下所示：

// sum(1, 2, 3).valueOf() //6
// sum(2, 3)(2).valueOf() //7
// sum(1)(2)(3)(4).valueOf() //10
// sum(2)(4, 1)(2).valueOf() //9
// sum(1)(2)(3)(4)(5)(6).valueOf() // 21

// 如果不使用valueOf计算,应该如何处理 

//=> 15
// sum(1, 2, 3) + sum(4, 5)

// //=> 100
// sum(10) * sum(10)

function sumFn(...args) {
  // 递归函数
  let f = (...rest) => sumFn(...rest, ...args)
  // 重写valueOf
  f.valueOf = () => args.reduce((x,y) => x + y, 0)
  return f
}
