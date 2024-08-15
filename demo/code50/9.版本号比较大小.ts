// 比较版本号大小

function compareVersion(versionA, versionB) {
  let partA = versionA.split('.')
  let partB = versionB.split('.')
  // 找出两版本号，最长的那一个，从高往低一一对应比较
  let len = Math.max(partA.length, partB.length)
  for (let i = 0; i < len; i++) {
    const numA = parseInt(partA[i] || 0, 10)
    const numB = parseInt(partB[i] || 0, 10)
    if (numA > numB) {
      return 1
    }
    if (numA < numB) {
      return -1
    }
  }
  return 0
}

console.log('compareVersion---', compareVersion('3.0.0', '3.0.0'))
