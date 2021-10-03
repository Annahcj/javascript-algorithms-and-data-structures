// 141. Linked List Cycle
// Given head, the head of a linked list, determine if the linked list has a cycle in it.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to. Note that pos is not passed as a parameter.
// Return true if there is a cycle in the linked list. Otherwise, return false.


// Solution: Two Pointers / Slow & Fast Runner Algorithm

// Logic:
// We set two pointers, slow and fast, to both point at head initially.
// The fast runner goes at 2x speed of the slow runner.
// If there is no cycle, the slow runner will never catch up to the fast runner.
// However, if there is a cycle, the fast runner will reach it first, then will end up being caught in the cycle until the slow runner catches up,
// and they both end up at the same position.

// Algorithm:
// Set slow to head, fast to head
// Loop while slow AND fast AND fast.next
  // set slow to slow.next
  // set fast to fast.next.next
  // if slow is equal to fast,
    // return true (found a cycle)
// If the loop finishes, return false (no cycle)

// Time Complexity: O(n) 119ms
// Space Complexity: O(1) 41.6MB
var hasCycle = function(head) {
  let slow = head, fast = head;
  while (slow && fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
    if (slow === fast) {
      return true;
    }
  } 
  return false; 
};