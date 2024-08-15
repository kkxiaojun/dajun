/**
 * @param {string} s
 * @return {string}
 */
var removeDuplicates = function(s) {
  let resArr = []
  for (let i = 0; i<s.length; i++) {
      if(s[i] === resArr[resArr.length - 1]) {
          resArr.pop()
      } else {
          resArr.push(s[i])
      }
  }
  return resArr.join('')
};