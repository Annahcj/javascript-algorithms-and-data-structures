// 61. Rotate List
// Given the head of a linked list, rotate the list to the right by k places.


// Solution: Find new head

// 1. Count the number of nodes 'n' and also save the tail (we need it to reconnect to the head later).
// 2. Set k to k % n. Since k rotations = k + n rotations.
// 3. Find the cut-point: n - k + 1.
// 4. Find the start after the cut-point and disconnect the list at the cut-point.
// 5. Connect the tail with the head and return the new head.

// Time Complexity: O(n) 101ms
// Space Complexity: O(1) 43.9MB
var rotateRight = function(head, k) {
  if (!head) return null;
  let node = head, n = 0, tail = null;
  while (node) {
    if (!node.next) tail = node;
    node = node.next;
    n++;
  }
  
  k = k % n;
  if (k === 0) return head;
  
  let idx = n - k + 1, i = 1;
  let newStart;
  node = head;
  while (i < idx) {
    if (i === idx - 1) {
      newStart = node.next;
      node.next = null;
    }
    node = node.next;
    i++;
  }
  
  tail.next = head;
  return newStart;
};