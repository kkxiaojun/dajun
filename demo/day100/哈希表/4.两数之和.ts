function twoSum(nums, target) {
  let hashMap = {}
  for (let i = 0; i < nums.length; i++) {
      if (hashMap[(target - nums[i])]!== undefined) {
          return [i, hashMap[(target - nums[i])]]
      }
      hashMap[nums[i]] = i
  }
  return hashMap
}