// 143. Reorder List
// You are given the head of a singly linked-list. The list can be represented as:
  // L0 → L1 → … → Ln - 1 → Ln
// Reorder the list to be on the following form:
  // L0 → Ln → L1 → Ln - 1 → L2 → Ln - 2 → …
// You may not modify the values in the list's nodes. Only nodes themselves may be changed.


// Solution: Slow & Fast Pointers + Reverse List

// 1. Use slow and fast pointers to find the middle of the list.
  // Find the middle of the list: 
    // Odd list: 1 -> __2__ -> 3 -> 4 -> 5
    // Even list: 1 -> __2__ -> 3 -> 4
  // Reverse and sever the list starting from the next node after the 'middle'.
// 2. Reverse the second half of the list.
// 3. Use the first half and reversed second half to build the final intertwined list.

// n = number of nodes in the list
// Time Complexity: O(n) 74ms
// Space Complexity: O(1) 57.8MB
var reorderList = function(head) {
  let slow = head, fast = head;
  while (fast.next && fast.next?.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  if (slow.next) {
    let next = slow.next;
    slow.next = null;
    slow = next;
  }
  let reversedSecondHalf = reverse(slow);
  let node = head;
  while (node && reversedSecondHalf) {
    let next = node.next;
    node.next = reversedSecondHalf;
    let secondHalfNext = reversedSecondHalf.next;
    reversedSecondHalf.next = next;
    reversedSecondHalf = secondHalfNext;
    node = next;
  }
  return head;
};

function reverse(head) {
  let prev = null;
  while (head) {
    let next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}