// 237. Delete Node in a Linked List
// There is a singly-linked list head and we want to delete a node node in it.
// You are given the node to be deleted node. You will not be given access to the first node of head.
// All the values of the linked list are unique, and it is guaranteed that the given node node is not the last node in the linked list.
// Delete the given node. Note that by deleting the node, we do not mean removing it from memory. We mean:
  // The value of the given node should not exist in the linked list.
  // The number of nodes in the linked list should decrease by one.
  // All the values before node should be in the same order.
  // All the values after node should be in the same order.


// Solution: Swap Value & Delete Next Node

// It is stated that we only need to remove the value, not the actual node itself.

// Swap the value with the next node.
// Then, remove the next node.

// Time Complexity: O(1) 72ms
// Space Complexity: O(1) 44.2MB
var deleteNode = function(node) {
  node.val = node.next.val;
  node.next = node.next.next;
};