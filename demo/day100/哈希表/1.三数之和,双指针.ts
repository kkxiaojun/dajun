// 满足 a+b+c === 0
// 双指针
function threeSum(nums) {
  // 先排序
  nums.sort((a, b) => a-b)
  let n = nums.length
  // 结果数组
  let resArr = []
  // 用双指针方法
  for (let i = 0; i < n; i++) {
    let iNum = nums[i]
    // 排序后第一个大于0，直接返回
    if (iNum[0] > 0) {
      return resArr
    }
    // i去重
    if (iNum === nums[i - 1]) {
      continue
    }
    // 双指针的左边界
    let j = i+1
    // 双指针的右边界
    let k = n -1
    while (j < k) {
      // 三数之和
      let s = nums[i] + nums[j] + nums[k]
      if (s > 0) {
        k--
      } else if(s < 0) {
        j++
      } else {
        resArr.push([nums[i], nums[j], nums[k]])
        j++
        // j去重
        while (j < k && nums[j] === nums[j-1]) {
          j++
        }
        k--
        // k去重
        while (j < k && nums[k] === nums[k+1]) {
          k--
        }
      }
    }
  }
  return resArr
}

console.log('threeSum', threeSum([-1,0,1,2,-1,-4]))
console.log('threeSum', threeSum([-1,0,1,2,-1,-4,-2,-3,3,0,4] ))
// console.log('threeSum1', threeSum1([-1,0,1,2,-1,-4,-2,-3,3,0,4] ))

