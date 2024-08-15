// 二分查找, 找到返回下标；未找到返回-1
// 输入: nums = [-1,0,3,5,9,12], target = 9     
// 输出: 4       
// 解释: 9 出现在 nums 中并且下标为 4 
function search(nums, target) {
  if (nums.length === 0) {
    return
  }
  // 左区间
  let left = 0;
  // 右区间
  let right = nums.length - 1;
  // 为什么是=，因为num[right]是有值的
  while (left <= right) {
    let middle = Math.floor((left + right) / 2)
    if (nums[middle] === target) {
      // 找到，直接返回
      return middle
    } else if (target < nums[middle]) {
      // 左边区间查找
      right = middle - 1
    } else {
      // 右边区间查找
      left = middle + 1
    }
  }
  return -1
}

// 特点：排序数组和一个目标值


// 时间复杂度：O(log n)
// 空间复杂度：O(1)
// [1,3,5,6], 5

function search1(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  // 找不到需要返回的位置: 默认是最后的位置
  let position = nums.length;
  while (left <= right) {
    let mid = Math.floor((left + right) /2)
    if (target > nums[mid]) {
      // 往右继续查找
      left = mid + 1
    } else  {
      // 往左继续查找
      position = mid
      right = mid - 1
    }
  }
  return position
}

function search2(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  // 找不到需要返回的位置: 默认是最后的位置
  let position = nums.length;
  while (left <= right) {
    let mid = Math.floor((left + right) /2)
    if (target === nums[mid]) {
      return mid
    }
    else if (target > nums[mid]) {
      // 往右继续查找
      left = mid + 1
    } else  {
      // 往左继续查找
      position = mid
      right = mid - 1
      // 找不到就结束了left <= right
    }
  }
  return position
}


console.log('search', search([-1,0,3,5,9,12],9 ))
console.log('search1', search1([1,3,5,6], 5))
console.log('search1', search2([1,3,5,6], 5))