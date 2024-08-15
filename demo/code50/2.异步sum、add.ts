/*
  请实现一个 sum 函数，接收一个数组 arr 进行累加，并且只能使用add异步方法
  
  add 函数已实现，模拟异步请求后端返回一个相加后的值
*/
function add(a, b) {
  return Promise.resolve(a + b);
}

// 初级：串行实现，promise，await

function sum(arr) {
  if (arr.length === 1) {
    return Promise.resolve(arr[0])
  }
  return arr.reduce((x, y) => Promise.resolve(x).then(x => add(x,y)))
}

async function sum1(arr) {
  let result = arr[0]
  for (let i = 1; i<arr.length; i++) {
    result = await add(result, arr[i])
  }
  return result
}

sum([1,2]).then((value) => {
  console.log('sum---', value)
})

sum1([2,1]).then((value) => {
  console.log('sum1---', value)
})


// 中级实现: 并行方式，使用二分法和promise.all
async function sum2(arr) {
  // 最后一个，直接返回
  if (arr.length === 1) {
    return arr[0]
  }

  // 二分
  function chunk(list, size) {
    let newArr = []
    for (let i = 0; i < list.length; i++) {
      // 二分的中间点, 两两组合
      const index = Math.floor(i/size)
      if (!newArr[i]) {
        newArr[i] = []
      }
      newArr[i].push(list[i])
    }
    return newArr
  }

  // 所有要执行的promise
  const promiseAll = chunk(arr, 2).map(item => {
    return item[1] === undefined ? item[0] : add(item[0], item[1])
  })

  // 执行promise
  return Promise.all(promiseAll).then((list) => sum(list))
}

sum2([2,1,3]).then((value) => {
  console.log('sum2---', value)
})
