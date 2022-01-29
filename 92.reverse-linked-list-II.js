// 92. Reverse Linked List II
// Given the head of a singly linked list and two integers left and right where left <= right, reverse the nodes of the list from position left to position right, and return the reversed list.


// Solution: Iterative

// Keywords: 
  // start = left part of linked list (before the part to reverse)
  // middle = part to reverse
  // end or tail = part of linked list after the middle

// 1. Using a counter, find the end of 'start' and start of the part to reverse.
  // Save the references to the two nodes: startTail and midEnd (will be the new mid end after reversal)

// 2. Until we reach the right index, reverse the list.
  // Save the references after reversing: midStart (the new start after reversal) and tailStart (start of the end portion)

// 3. Connect the three portions of the list:
  // startTail -> midStart: if startTail is null, set head to midStart, otherwise set startTail.next to midStart.
  // midEnd -> tailStart: set midEnd.next to tailStart

// 4. Finally, return the head.

// Time Complexity: O(n) 70ms
// Space Complexity: O(1) 42.2MB
var reverseBetween = function(head, left, right) {
  let node = head, idx = 1;
  let startTail;
  while (idx < left) {
    if (idx === left - 1) {
      startTail = node;
    }
    node = node.next;
    idx++;
  }
  
  let midEnd = node, prev = null;
  while (idx <= right) {
    let next = node.next;
    node.next = prev;
    prev = node;
    node = next;
    idx++;
  }
  let midStart = prev, tailStart = node;
  if (!startTail) head = midStart;
  else startTail.next = midStart;
  midEnd.next = tailStart;
  return head;
};