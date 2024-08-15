// 有序数组的平方
// 给你一个按 非递减顺序 排序的整数数组 nums，返回 每个数字的平方 组成的新数组，要求也按 非递减顺序 排序。
// 输入：nums = [-4,-1,0,3,10]
// 输出：[0,1,9,16,100]
// 解释：平方后，数组变为 [16,1,0,9,100]，排序后，数组变为 [0,1,9,16,100]
function sortSquare(nums) {
  var len = nums.length
  var result = new Array(len).fill(0)
  // 左指针
  var i = 0;
  // 右指针
  var j = len - 1;
  // 当前填充的指针
  var k = len - 1;
  while (i <= j) { // 等于号是为了把
    if (nums[i] * nums[i] > nums[j] * nums[j]) {
      result[k--] = nums[i] * nums[i]
      i++
    } else {
      result[k--] = nums[j] * nums [j]
      j--
    }
  }
  return result
}

console.log('sortSquare----', sortSquare([-4,-1,0,3,10]))