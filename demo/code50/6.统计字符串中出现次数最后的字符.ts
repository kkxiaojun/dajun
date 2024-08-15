//=> ['a', 6]
// getFrequentChar('aaabbaaacc')

//=> ['a', 3]
// getFrequentChar('aaa')

function getFrequentChar(str) {
  let strMap = {}
  let max = ''
  let min = 0
  for (let i = 0; i < str.length; i++) {
    strMap[str[i]] = (strMap[str[i]] || 0) + 1
    if (strMap[str[i]] > min) {
      max = str[i]
      min = strMap[str[i]]
    }
  }
  return [max, min]
}

console.log('getFrequentChar', getFrequentChar('aaabbaaacc'))