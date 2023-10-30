// 2046. Sort Linked List Already Sorted Using Absolute Values
// Given the head of a singly linked list that is sorted in non-decreasing order using the absolute values of its nodes, return the list sorted in non-decreasing order using the actual values of its nodes.


// Solution: Add negatives to front 

// For negative nodes -> add to front of the list
// For positive nodes -> add to back of the list

// Time Complexity: O(n) 285ms
// Space Complexity: O(1) 102.5MB
var sortLinkedList = function(head) {
  let dummyHead = new ListNode(0), node = dummyHead;
  while (head) {
    let next = head.next;
    if (head.val < 0) {
      head.next = dummyHead.next; 
      dummyHead.next = head;
      if (node === dummyHead) node = head; // set connection between last (closest to 0) negative & positives
    } else {
      node.next = head;
      node = node.next;
      head.next = null; // cut off extra connections
    }
    head = next;
  }
  return dummyHead.next;
};