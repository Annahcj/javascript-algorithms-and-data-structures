// 86. Partition List
// Given the head of a linked list and a value x, partition it such that all nodes less than x come before nodes greater than or equal to x.
// You should preserve the original relative order of the nodes in each of the two partitions.


// Solution: Build Two Lists

// Keep track of two separate lists:
  // left: nodes with values less than x
  // right: nodes with values greater than or equal to x
// At the end, join them together and cut off unwanted connections from the tail.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 44.1MB
var partition = function(head, x) {
  if (!head) return null;
  let leftHead = new ListNode(0), left = leftHead;
  let rightHead = new ListNode(0), right = rightHead;
  while (head) {
    if (head.val < x) {
      // add to left
      left.next = head;
      left = left.next;
    } else {
      // add to right
      right.next = head;
      right = right.next;
    }
    head = head.next;
  }
  
  left.next = rightHead.next; // join two lists together
  right.next = null; // cut off unwanted connection
  return leftHead.next;
};