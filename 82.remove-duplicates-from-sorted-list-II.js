// 82. Remove Duplicates from Sorted List II
// Given the head of a sorted linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.


// Solution: Two Pointers

// When the value of a node is not equal to the previous value and the next value, we keep the node.
  // To achieve this, we keep track of the value of the previous node in a variable.
// Otherwise, disconnect it.

// Time Complexity: O(n) 77ms
// Space Complexity: O(1) 44.4MB
var deleteDuplicates = function(head) {
  let dummy = new ListNode(null), node = dummy;
  let prevVal = null;
  while (head) {
    let next = head.next, nextVal = next ? next.val : null; // keep the reference of the next node as we may disconnect it
    if (head.val !== prevVal && head.val !== nextVal) {
      node.next = head;
      node = node.next;
      node.next = null;
    }
    prevVal = head.val;
    head = next;
  }
  return dummy.next;
};