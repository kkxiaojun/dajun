var levelOrder = function(root) {
  let res = []
  if (root === null) {
    return res
  }
  let queue = [root]
  while (queue.length) {
    let levelLen = queue.length
    let levelArr = []
    for (let i = 0; i < levelLen; i++) {
      let node = queue.shift()
      levelArr.push(node.val)
      if (node.left) {
        queue.push(node.left)
      }
      if (node.right) {
        queue.push(node.right)
      }
    }
    res.push(levelArr)
  }
  return res
};