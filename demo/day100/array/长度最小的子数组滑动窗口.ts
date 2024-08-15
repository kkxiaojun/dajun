// 长度最小的子数组
// 给定一个含有 n 个正整数的数组和一个正整数 s ，找出该数组中满足其和 ≥ s 的长度最小的 连续 子数组，并返回其长度。如果不存在符合条件的子数组，返回 0。

// 输入：s = 7, nums = [2,3,1,2,4,3]
// 输出：2
// 解释：子数组 [4,3] 是该条件下的长度最小的子数组。

function findChildLen(nums, s) {
  // 结果
  var result = Infinity;
  // 子数组长度
  var sublen = 0;
  // 子数组总和
  var sum = 0;
  for (let i = 0; i < nums.length; i++) { // 子数组起点
    sum = 0 // 新的一轮需要重置
    for (let j = i; j < nums.length; j++) { // 子数组终点
      sum += nums[j]
      // 终止条件，sum >= s
      if (sum >= s ) {
        sublen = j - i + 1
        result = result < sublen ? result : sublen
        // 找到最小的即可终止
        break
      }
    }
  }
  return result
}

// 滑动窗口接发
function minSubArrayLen(target, nums) {
  let start, end
  start = end = 0
  let sum = 0
  let len = nums.length
  let result = Infinity
  
  while(end < len){
      sum += nums[end];
      while (sum >= target) {
          result = Math.min(result, end - start + 1);
          sum -= nums[start];
          start++;
      }
      end++;
  }
  return result === Infinity ? 0 : result
};

function findLen(nums, s) {
  // 子数组和
  let sums = 0
  // 结果，len
  let resultLen = Infinity
  // sublen子数组长度
  let sublen = 0
  for (let start = 0; start < nums.length; start++) { // 滑动窗口的起点
    sums = 0
    for (let end = start; end < nums.length; end++) { // 滑动窗口终点
      sums += nums[end]
      // 满足条件
      if (sums >= s) {
        sublen = end - start + 1
        resultLen = resultLen < sublen ? resultLen : sublen
        break
      }
    }
  }
  return resultLen
}

function findLenSpeed(nums, s) {
  let sums = 0 // 滑动窗口序列和
  let sublen = 0 // 滑动窗口长度
  let resultLen = Infinity // 最小长度
  let i = 0 // 滑动窗口起点
  for (let j = 0; j < nums.length; j++) { // 滑动窗口终点
    sums += nums[j]
    while (sums >= s) {
      sublen = j - i + 1
      resultLen = resultLen < sublen ? resultLen : sublen
      // 动态调整起点位置
      sums = sums - nums[i]
      i++
    }
  }
  return resultLen === Infinity ? 0 : resultLen
}


console.log('test findChildLen', findLen([2,3,1,2,4,3], 7))
// 滑动窗口
console.log('test minSubArrayLen', findLenSpeed([2,3,1,2,4,3], 7))


