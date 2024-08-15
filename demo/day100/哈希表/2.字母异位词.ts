// 给定两个字符串 s 和 t ，编写一个函数来判断 t 是否是 s 的字母异位词。

// 注意：若 s 和 t 中每个字符出现的次数都相同，则称 s 和 t 互为字母异位词。

var isAnagram = function(s, t) {
  if (s.length !== t.length) {
    return false
  }
  let resultMap = new Map()
  // 遍历t
  for (let key of s) {
    resultMap.set(key, (resultMap.get(key) || 0) + 1)
  }

  for (let key of t) {
    // 两层意思：1. 有小于0，false  2.不存在的false
    if (!resultMap.get(key)) {
      return false
    }
    resultMap.set(key, resultMap.get(key) - 1)
  }

  return true
}

console.log('--ss--', isAnagram('anagnan', 'anagnan'))