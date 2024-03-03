// 19. Remove Nth Node From End of List
// Given the head of a linked list, remove the nth node from the end of the list and return its head.


// Solution: One Pass w/ Two Pointers

// Keep track of two pointers:
  // curr: current node
  // nBehind: n + 1 positions behind the current node

// At the end, nBehind will be the node one behind the node to remove.
// Remove the reference to the node to remove by using: nBehind.next = nBehind.next.next
// Edge case: If the node to remove is the head, just return head.next as the new head.

// Time Complexity: O(n) 58ms
// Space Complexity: O(1) 50.9MB
var removeNthFromEnd = function(head, n) {
  let nBehind = head, curr = head;
  let index = 0;
  while (curr) {
    curr = curr.next;
    if (index >= n + 1) nBehind = nBehind.next;
    index++;
  }
  if (index === n) return head.next; // head is the node to remove
  nBehind.next = nBehind.next?.next;
  return head;
};