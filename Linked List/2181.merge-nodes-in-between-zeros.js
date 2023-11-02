// 2181. Merge Nodes in Between Zeros
// You are given the head of a linked list, which contains a series of integers separated by 0's. The beginning and end of the linked list will have Node.val == 0.
// For every two consecutive 0's, merge all the nodes lying in between them into a single node whose value is the sum of all the merged nodes. The modified list should not contain any 0's.
// Return the head of the modified linked list.


// Solution: One Pass 

// Sum up all node values inbetween zeros and create a new nodes.

// Time Complexity: O(n) 652ms
// Space Complexity: O(1) (excluding output) 96.7MB
var mergeNodes = function(head) {
  let dummy = new ListNode(0), res = dummy;
  head = head.next;
  while (head) {
    let sum = 0, node = head;
    while (node.val !== 0) {
      sum += node.val;
      node = node.next;
    }
    res.next = new ListNode(sum);
    res = res.next;
    head = node.next;
  }
  return dummy.next;
};