let arr = [
  {id: 1, name: '部门1', pid: 0},
  {id: 2, name: '部门2', pid: 1},
  {id: 3, name: '部门3', pid: 1},
  {id: 4, name: '部门4', pid: 3},
  {id: 5, name: '部门5', pid: 4},
]

function arrayToTree(arr, pid) {
  let tree = []
  for (let i = 0; i < arr.length; i++) {
    // 每个pid下的node节点找齐
    if (arr[i].pid === pid) {
      const node = {
        id: arr[i].id,
        name: arr[i].name,
        children: arrayToTree(arr, arr[i].id)
      }
      tree.push(node)
    }
  }
  return tree
}

console.log('arrayToTree----', arrayToTree(arr,0))

const tree = [
  {
    id: 1,
    name: 'Node 1',
    children: [
      {
        id: 2,
        name: 'Node 1.1',
        children: []
      },
      {
        id: 3,
        name: 'Node 1.2',
        children: [
          {
            id: 4,
            name: 'Node 1.2.1',
            children: []
          }
        ]
      }
    ]
  },
  {
    id: 5,
    name: 'Node 2',
    children: [
      {
        id: 6,
        name: 'Node 2.1',
        children: []
      }
    ]
  }
];

// 深度优先遍历
function flattenTree(tree) {
  const flattened = [];

  function traverse(node) {
    flattened.push(node);

    if (node.children && node.children.length > 0) {
      for (let i = 0; i < node.children.length; i++) {
        traverse(node.children[i]);
      }
    }
  }

  for (let i = 0; i < tree.length; i++) {
    traverse(tree[i]);
  }

  return flattened;
}

const flattened = flattenTree(tree);
console.log(flattened);