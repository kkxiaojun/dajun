var invertTree = function (root) {
  // 终止条件
  if (!root) {
    return null
  }
  // 前序遍历，交换左右节点
  let rightNode = root.right
  root.right = invertTree(root.left)
  root.left = invertTree(rightNode)

  return root
}