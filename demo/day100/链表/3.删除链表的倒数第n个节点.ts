/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */

// 倒n, 快慢指针，关键在于找到要删除节点的前一个节点
var removeNthFromEnd = function(head, n) {
  // 构建虚拟头节点，抹平移除头结点和其它节点不一致的操作
  let dummyHead = new ListNode(0, null)
  dummyHead.next = head
  let fast = dummyHead
  let slow = dummyHead
  // 快指针先走n+1步
  n++
  while(n-- && fast) {
      fast = fast.next
  }
  // 快慢指针一起走
  while(fast) {
      fast = fast.next
      slow = slow.next
  }
  // 此时，slow就是n-1个节点，执行删除操作即可
  slow.next = slow.next.next
  return dummyHead.next
};