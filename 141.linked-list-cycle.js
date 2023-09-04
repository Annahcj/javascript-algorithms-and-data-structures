// 141. Linked List Cycle
// Given head, the head of a linked list, determine if the linked list has a cycle in it.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
// Return true if there is a cycle in the linked list. Otherwise, return false.


// Solution: Slow & Fast Pointers

// The fast pointer goes at 2x speed of the slow pointer.
// If there is a cycle, the slow and fast pointers will meet at some point.
// We can be certain they will meet because the distance between the two pointers increases by 1 each time. 
// They meet when the distance between them becomes n, which is 0 in a cycle. This is why the time complexity is O(n).

// Time Complexity: O(n) 66ms
// Space Complexity: O(1) 44.8MB
var hasCycle = function(head) {
  let slow = head, fast = head;
  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) return true;
  }
  return false;
};