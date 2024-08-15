class LinkNode1 {
  val
  next
  constructor(val, next) {
    this.val = val
    this.next = next
  }
}

var reverse = (head) => {
  let pre = null;
  let cur = head
  while (cur) {
    let temp; // 保存下一个节点，因为反转前一个的时候next后改变，需要暂存
    temp = cur.next
    cur.next = pre

    pre = cur
    cur  = temp
  }
  return pre
}

var reverse1 = (head) => {
  var pre = null
  var cur = head
  while (cur) {
    var temp = cur.next
    cur.next = pre

    // pre 前进
    pre = cur
    // cur 前进
    cur = temp
  }
  return pre
}