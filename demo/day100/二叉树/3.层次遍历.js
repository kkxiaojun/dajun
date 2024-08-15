var levelOrder = function(root) {
  let res = []
  let queue = [root]
  if (root === null) {
    return res
  }
  while (queue.length) {
    // 当前层节点个数
    let levelLen = queue.length
    // 当前层的输出
    let levelArr = []
    for (let i = 0; i < levelLen; i++) {
      let node = queue.shift()
      levelArr.push(node.val)
      // 下一层
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