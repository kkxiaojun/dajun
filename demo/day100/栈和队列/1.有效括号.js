/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function(s) {
  // 左右括号对照表
  let strMap = new Map([
    ['(', ')'],
    ['[', ']'],
    ['{', '}'],
  ])
  // 存在括号数组
  let resArr = []
  for (let i = 0; i < s.length; i++) {
    // 已出现过左括号
    if (strMap.has(s[i])) {
      // 栈顶字符，是否有相应的右括号匹配
      if (resArr(resArr.length - 1) !== strMap.get(s[i])) {
        return false
      }
      // 出栈
      resArr.pop()
    } else {
      resArr.push(s[i])
    }
  }
  return !resArr.length
};