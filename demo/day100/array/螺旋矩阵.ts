
// 给定一个正整数 n，生成一个包含 1 到 n^2 所有元素，且元素按顺时针顺序螺旋排列的正方形矩阵。

// 示例:

// 输入: 3 输出: [ [ 1, 2, 3 ], [ 8, 9, 4 ], [ 7, 6, 5 ] ]


var generateMatrix = function(n) {
  let startX = 0, startY = 0;   // 起始位置
  let loop = Math.floor(n/2);   // 旋转圈数
  let mid = Math.floor(n/2);    // 中间位置
  let offset = 1;    // 控制每一层填充元素个数
  let count = 1;     // 更新填充数字
  let res = new Array(n).fill(0).map(() => new Array(n).fill(0));

  while (loop--) {
      let row = startX, col = startY;
      // 上行从左到右（左闭右开）
      for (; col < n - offset; col++) {
          res[row][col] = count++;
      }
      // 右列从上到下（左闭右开）
      for (; row < n - offset; row++) {
          res[row][col] = count++;
      }
      // 下行从右到左（左闭右开）
      for (; col > startY; col--) {
          res[row][col] = count++;
      }
      // 左列做下到上（左闭右开）
      for (; row > startX; row--) {
          res[row][col] = count++;
      }

      // 更新起始位置
      startX++;
      startY++;

      // 更新offset
      offset += 1;
  }
  // 如果n为奇数的话，需要单独给矩阵最中间的位置赋值
  if (n % 2 === 1) {
      res[mid][mid] = count;
  }
  return res;
};

var generateMatrix1 = function(n) {
    // 起始位置
    var startX=0, startY = 0;
    // 旋转圈数
    var loop = Math.floor(n/2);
    // 中间位置
    var mid = Math.floor(n/2);
    // 每一层填充元素个数
    var offset = 1
    // 填充的数字
    var count = 1
    var res = new Array(n).fill(n).map(() => new Array(n).fill(n))
    while (loop--) {
        var row = startX, col = startY
        // 上边，从左到右
        for (; col < n - offset; col++) {
            res[row][col] = count++
        }
        // 右边，从上到下
        for (; row < n - offset; row++) {
            res[row][col] = count++
        }
        // 下边，从右到左
        for (; col < startY; col--) {
            res[row][col] = count++
        }
        // 左边，从下到上
        for (; row < startX; row--) {
            res[row][col] = count++
        }
        startX++
        startY++
        offset++
    }
    if (n % 2 === 1) {
        res[mid][mid] = count
    }
}

console.log('--generateMatrix--', generateMatrix(3))