/**
 * @param {string} s
 * @param {number} k
 * @return {string}
 */
var reverseStr = function(s, k) {
  if(s.length === 1 || k===1) {
      return s
  }
  let resArr = s.split('');
  let len = s.length;
  // 以2k为一个区间，区间内进行反转
  for (let i = 0; i< len; i += 2 * k) {
      let left = i;
      // 剩余 < k, 反转剩余；否则反转k
      let right = len - i < k ? len -1 : i + k - 1
      // 双指针，反转
      while(left < right) {
          [resArr[left], resArr[right]] = [resArr[right], resArr[left]]
          left++
          right--
      }
  }
  return resArr.join('')
};