/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

// 1. 为什么快指针走两步，慢指针走一步，如果有环，一定相遇
// 2. 为什么慢指针到环入口的位置x，等于z
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function(head) {
  let fast = head
  let slow = head
  while(fast !== null && fast.next !== null) {
      slow = slow.next
      fast = fast.next.next
      // 快慢指针相遇
      if (fast === slow) {
          let index2 = head
          let index1 = fast
          while (index1 !== index2) {
              index1 = index1.next
              index2 = index2.next
          }
          return index2
      }
  }
  return null
};