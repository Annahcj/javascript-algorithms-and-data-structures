// 328. Odd Even Linked List
// Given the head of a singly linked list, group all the nodes with odd indices together followed by the nodes with even indices, and return the reordered list.
// The first node is considered odd, and the second node is even, and so on.
// Note that the relative order inside both the even and odd groups should remain as it was in the input.


// Solution: In-Place

// Keep two pointers odd and even 
// Starting at the second node (first even node) in the list, we reassign the pointers so that
  // next odd node = even.next
  // odd = odd.next
  // next even node = even.next.next
  // even = even.next

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 41.2MB
var oddEvenList = function(head) {
  if (!head) return null;
  let evenHead = head.next; // save the first even node as evenHead
  let odd = head, even = evenHead;
  while (even && even.next) { // while even is valid and even has a next node
    odd.next = even.next;
    odd = odd.next;
    even.next = even.next.next;
    even = even.next;
  }   
  odd.next = evenHead; // attach the even list at the end of the odd list
  return head;
};