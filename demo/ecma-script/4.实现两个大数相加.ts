// js实现大数相加，转成字符串相加

function add(a, b) {
  let maxLen = Math.max(a.length, b.length);
  console.log('max', maxLen)
  a = a.padStart(maxLen, 0);
  b = b.padStart(maxLen, 0);
  let sum = ''
  let t = 0; // 个位
  let f = 0; // 进位
  for (let i = maxLen - 1; i >= 0; i--) {
    t = parseInt(a[i]) + parseInt(b[i]) + f
    f = Math.floor(t / 10) // 进位
    sum = (t % 10) + sum
  }

  if (f == 1) {
    sum = '1' + sum
  }
  return sum

}

let a = "9007199254740991";
let b = "1234567899999999999";

console.log('add(a,b)----', add(a,b))