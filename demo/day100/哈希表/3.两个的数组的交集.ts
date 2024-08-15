var linkArr = (nums1, nums2) => {
  // 交换位置, 保证num1.leng >= num2.length
  if (nums1.length < nums2.length) {
    const temp = nums1
    nums1 = nums2
    nums2 = temp
  }
  let resultSet = new Set()
  let nums1Set = new Set(nums1)
  for (let i = 0; i < nums2.length; i++) {
    if (nums1Set.has(nums2[i])) {
      resultSet.add(nums2[i])
    }
  }
  return Array.from(resultSet)
}