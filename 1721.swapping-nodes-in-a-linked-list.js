// 1721. Swapping Nodes in a Linked List
// You are given the head of a linked list, and an integer k.
// Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).


// Solution: Two Pass

// 1. Get the length of the list
// 2. Get the two nodes at positions k and n - k + 1
// 3. Swap the values of the two nodes

// Time Complexity: O(n) 745ms
// Space Complexity: O(1) 101.9MB
var swapNodes = function(head, k) {
  // get the length
  let n = 0, node = head;
  while (node) {
    n++;
    node = node.next;
  }
  // get the two nodes
  let node1, node2, idx = 1;
  node = head;
  while (idx <= n) {
    if (idx === k) node1 = node;
    if (idx === n - k + 1) node2 = node;
    node = node.next;
    idx++;
  }
  // swap the values
  let val = node1.val;
  node1.val = node2.val;
  node2.val = val;
  return head;
};