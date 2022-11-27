// 2487. Remove Nodes From Linked List
// You are given the head of a linked list.
// Remove every node which has a node with a strictly greater value anywhere to the right side of it.
// Return the head of the modified linked list.

 
// Solution: Monotonic Decreasing Stack

// For each node, we pop off nodes in the stack that have a smaller value.
// Connect the node at the top of the stack with the current node.
// Use a dummy head so that we have the reference to the new head.

// Time Complexity: O(n) 437ms
// Space Complexity: O(n) 82.3MB
var removeNodes = function(head) {
  let stack = [], dummyHead = new ListNode(Infinity);
  dummyHead.next = head;
  let node = dummyHead;
  while (node) {
    while (stack.length && stack[stack.length - 1].val < node.val) stack.pop();
    if (stack.length) stack[stack.length - 1].next = node;
    stack.push(node);
    node = node.next;
  }
  return dummyHead.next;
};