/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function(haystack, needle) {
  let sourceLen = haystack.length;
  let childLen = needle.length;
  for (let i =0; i <= sourceLen - childLen; i++) {
      let flag = true
      for (let j=0; j < childLen; j++) {
          // 有不匹配的，直接下一轮
          if(haystack[i + j] !== needle[j]) {
              flag = false
              break;
          }
      }
      // 没有不匹配的字符，说明找到
      if (flag) {
          return i
      }
  }
  return -1
};