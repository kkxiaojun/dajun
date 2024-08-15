// 入栈 右 -> 左
// 出栈 中 -> 左 -> 右
function preorderTraversal(root, res = []) {
  if (!root) {
    return
  }
  let stack = [root]
  while(stack.length) {
    let cur = stack.pop()
    res.push(cur.val)
    if (cur.right) {
      stack.push(cur.right)
    }
    if (cur.left) {
      stack.push(cur.left)
    }
  }
  return res
}

// 入栈 左 -> 右
// 出栈 左 -> 中 -> 右
function inorderTraversal(root, res = []) {
  let stack = []
  let cur = root
  while (cur || stack.length) {
    if (cur) {
      // 入栈
      stack.push(cur)
      // 一路向左
      cur = cur.left
    } else {
      // 回头-弹出
      cur = stack.pop()
      // 输出
      res.push(cur.val)
      // 向右
      cur = cur.right
    }
  }
  return res
}

// 中右左
function afterorderTraversal(root, res = []) {
  if (!root) {
    return
  }
  let stack = [root]
  while(stack.length) {
    let cur = stack.pop()
    res.push(cur.val)
    if (cur.left) {
      stack.push(cur.left)
    }
    if (cur.right) {
      stack.push(cur.right)
    }
  }
  return res.reverse()
}

function name2(root, res = []) {
  let res = []
  let cur = root
  while (cur || res.length) {
    if (cur) {

      
    } else {
      
    }
  }
  return res
}