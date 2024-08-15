// 数字转千分位展示
// toLocaleString, 只支持number类型
function formatNumberWithCommas(number) {
  if (typeof number === 'number') {
    return number.toLocaleString('en-US')
  } else {
    return number
  }
}

// 正则
function formatNumberWithCommas1(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// 取余
// 1. 切割整数和小数部分，分开处理
// 2. 整数部分: 从右往左，逐个拼接，条件是：3个数为一组
// 3. 小数部分，有则直接拼接.
function formatNumberWithCommas2(number) {
  const parts = number.toString().split('.')
  // 整数部分
  const integerPart = parts[0]
  // 小数部分
  const decimalPart = parts.length > 1 ? '.' + parts[1] : ''

  let result = ''
  // 从右往左，标记当前是第几位
  let currentCount = 0

  for (let i = integerPart.length - 1; i >= 0; i--) {
    console.log('integerPart---', integerPart, integerPart[i])
    // 拼接字符串
    result = integerPart.charAt(i) + result
    // 标记当前是第几位
    currentCount++
    // 三位一个轮回
    if (currentCount % 3 === 0 && i !== 0) {
      result = ',' + result
    }
  }

  return result + decimalPart;
}

// 数字转千分位
function formatNumToS(num) {
  let parts = num.toString().split('.')
  // 整数部分
  let intPart = parts[0]
  // 小数部分
  let decimalPart = parts.length > 1 ?  '.' + parts[1]: ''
  let result = ''
  
}

console.log('formatNumberWithCommas2', formatNumberWithCommas2(123456.11))