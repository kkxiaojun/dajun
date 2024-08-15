function deepClose(params) {
  
}

/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(arr, target) {
  // 保存下标
  let resultMap = new Map()
  let result = []
  for (let i = 0; i < arr.length; i++) {
    const item = arr[i];
    if (resultMap.get(i) !== 'undefined' && (arr[resultMap.get(i)] + item) === target) {
      return [i, resultMap.get(i)]
    } else {
      resultMap.set(i, i)
    }
  }
  return result
};

console.log('')