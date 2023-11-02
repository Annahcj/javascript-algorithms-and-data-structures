// 1721. Swapping Nodes in a Linked List
// You are given the head of a linked list, and an integer k.
// Return the head of the linked list after swapping the values of the kth node from the beginning and the kth node from the end (the list is 1-indexed).


// Solution: Two Pointers 

// Traverse through the list with two pointers (let's call them slow and fast nodes) k elements apart until the fast node reaches the end of the list.
// Keep track of the current index in the list.
// When the index is k, the fast node is the kth node, so we save the reference.
// When the fast node reaches the end of the list, the slow node will be the n-kth node since they are k nodes apart.
// Finally, swap the values of the kth node and the n-kth node.

// Time Complexity: O(n) 413ms
// Space Complexity: O(1) 101.6MB
var swapNodes = function(head, k) {
  let slow = head, fast = head;
  let i = 1, kth = null;
  while (fast) {
    if (i === k) kth = fast;
    if (i > k) slow = slow.next;
    fast = fast.next;
    i++;
  }
  let kthVal = kth.val;
  kth.val = slow.val;
  slow.val = kthVal;
  return head;
};