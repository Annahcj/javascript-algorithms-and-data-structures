// 1836. Remove Duplicates From an Unsorted Linked List
// Given the head of a linked list, find all the values that appear more than once in the list and delete the nodes that have any of those values.
// Return the linked list after the deletions.


// Solution: Hashmap 

// 1. Count the frequency of each node value in a hashmap
// 2. Create a dummy head since the list may become empty after removals.
  // Look ahead to the next node, if the next node should be removed, skip over it.

// Time Complexity: O(n) 347ms
// Space Complexity: O(n) 80.4MB
var deleteDuplicatesUnsorted = function(head) {
  let freq = new Map(), node = head;
  while (node) {
    freq.set(node.val, (freq.get(node.val) || 0) + 1);
    node = node.next;
  }
  
  let dummy = new ListNode(null);
  dummy.next = head;
  node = dummy;
  
  while (node && node.next) {
    if (freq.get(node.next.val) === 1) {
      node = node.next;
    } else {
      node.next = node.next.next;
    }
  }
  return dummy.next;
};