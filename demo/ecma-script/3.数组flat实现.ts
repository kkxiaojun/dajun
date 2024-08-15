// 采用递归
function flat(arr) {
  let resultArr = []
  arr.forEach(item => {
    if (Array.isArray(item)) {
      resultArr = resultArr.concat(flat(item))
    } else {
      resultArr.push(item)
    }
  })
  return resultArr
}
