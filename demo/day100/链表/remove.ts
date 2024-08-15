// 链表的移除
class LinkNode {
  val: any
  next: any
  constructor(val, next) {
    this.val = val;
    this.next = next;
  }
}

var removeElements = function(head, val) {
  const dummyHead = new LinkNode(0, head);
  dummyHead.next = head;
  let temp = dummyHead;
  while (temp.next !== null) {
      if (temp.next.val == val) {
          temp.next = temp.next.next;
      } else {
          temp = temp.next;
      }
  }
  return dummyHead.next;
};


var removeEle = (head, val) => {
  // 虚拟头节点
  const copyHead = new LinkNode(0, head)
  copyHead.next = head
  // 遍历开始的节点
  let temp = copyHead
  while (temp.next !== null) {
    if (temp.next.val === val) {
      temp = temp.next.next
    } else {
      temp = temp.next
    }
  }
}