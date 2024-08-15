// 比如字符串：S = acd，那么 str = S + S = acdacd

// acd 移动的可能：dac、cda。其实都包含在了 str 中了。就像一个滑动窗口

// 一开始 acd (acd) ，移动一次 ac(dac)d，移动两次 a(cda)cd。循环结束

// 所以可以直接判断 str 中去除首尾元素之后，是否包含自身元素。如果包含。则表明存在重复子串。

/**
 * @param {string} s
 * @return {boolean}
 */
var repeatedSubstringPattern = function(s) {
  let ss = s + s
  return ss.substring(1, ss.length - 1).includes(s)
};