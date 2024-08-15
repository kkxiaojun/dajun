// 数组中的第K个最大元素
// 给定整数数组 nums 和整数 k，请返回数组中第 k 个最大的元素。
1
// 请注意，你需要找的是数组排序后的第 k 个最大的元素，而不是第 k 个不同的元素。

// 你必须设计并实现时间复杂度为 O(n) 的算法解决此问题。
function topK(arr, k) {
  arr.sort((a, b) => b - a).slice(0, k)
  return arr[k-1]
}

// 采用堆实现
// 核心原理：小顶堆的添加、删除
function topK1(arr, k) {
  // 初始化一个[0, k-1]的堆
  let heap = []
  let n = 0; // 堆数组当前最后一个节点的索引
  // 初始化大小为k的小顶堆
  function createHeap() {
    for (let i = 0; i < k; i++) {
      heap[n] = arr[i] 
      upHead(0, n)
      n++
    }
  }

  // 更新小顶堆： [k, arr.length]元素与堆顶元素对比，有比堆顶小的，就替换堆顶，重新构造小顶堆
  function updateHead() {
    for (let i = k; i < arr.length; i++) {
      if (arr[i] > heap[0]) {
        heap[0] = arr[i]  
        downHead(0, k)
      }
    }
  }

  // 向上对比+交换
  function upHead(low, high) {
    let i = high, j = Math.floor((i - 1) / 2)  // i 的 父节点
    while (j >= low) {
      // 左孩子>父节点，交换
      if (heap[i] < heap[j]) {
        // 交换
        const temp = heap[i]
        temp[i] = heap[j]
        heap[j] = temp
        // 继续往上走
        i = j
        j = Math.floor((i - 1) / 2)
      } else {
        break
      }
    }
  }

  // 向下对比+交互
  function downHead(low, high) {
    let i = low, j = i * 2 + 1
    while(j<=high) {
      // 如果右孩子比左孩子更小，用右孩子节点比较
      if (j + 1 <=high && heap[j+1] < heap[j]) {
        j = j + 1
      }
      // 当前节点 < 左边孩子节点，交换
      if (heap[i] > heap[j]) {
        const temp = heap[i]
        heap[i] = heap[j] 
        heap[j] = temp

        // 继续向下
        i = j
        j = j * 2 + 1
      } else {
        break
      }
    }
  }
  
  createHeap()
  updateHead()
  return heap[0]
}

// 前k个高频元素
// 直接用js-api
function topKFrequent(nums, k) {
  const countMap = new Map();
  for (let num of nums) {
      countMap.set(num, (countMap.get(num) || 0) + 1);
  }
  // tS没有最小堆的数据结构，所以直接对整个数组进行排序，取前k个元素
  console.log('kkkk', [...countMap.entries()].sort((a, b) =>{
    console.log('aaa',  a)
    return  b[1] - a[1]
  }))
  return [...countMap.entries()]
      .sort((a, b) => b[1] - a[1])
      .slice(0, k)
      .map(i => i[0]);
};


console.log('topk---', topK1([4,5,1,6,2,7,3,8], 4))
console.log('topKFrequent---', topKFrequent([4,5,1,6,2,7,3,8], 4))