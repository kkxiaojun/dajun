// 示例 1: 给定 nums = [3,2,2,3], val = 3, 函数应该返回新的长度 2, 
// 并且 nums 中的前两个元素均为 2。 你不需要考虑数组中超出新长度后面的元素。

// 快慢指针
function removeElement(nums, target) {
  // 需要增加临界条件判断
  var len = nums.length;
  var slowIndex = 0;
  for (var fastIndex = 0; fastIndex < len; fastIndex++) {
    if (nums[fastIndex] !== target) {
      nums[slowIndex++] = nums[fastIndex]
    }
  }
  return slowIndex
}
