// 142. Linked List Cycle II
// Given the head of a linked list, return the node where the cycle begins. If there is no cycle, return null.
// There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the next pointer. Internally, pos is used to denote the index of the node that tail's next pointer is connected to (0-indexed). It is -1 if there is no cycle. Note that pos is not passed as a parameter.
// Do not modify the linked list.


// Solution: Floyd's Tortoise and Hare

// Floyd's algorithm has two phases

// 1. Find a cycle, then return the intersection node
// 2. Find the entrance of the cycle based on the intersection node

// Find the cycle: Slow & Fast Runner
// Use two pointers, the fast pointer goes 2x faster than the slow pointer. 
// The fast pointer will eventually catch up to the slow pointer if there is a cycle.
// Return the node at which they meet, or null if there isn't a cycle.

// Find the entrance:
// The distance from the head to the intersection node is equal to the distance from the intersection node to the entrance of the cycle.
// Therefore, we can move both pointers forward, and return the point at which they meet.

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 42MB
var detectCycle = function(head) {
  function getIntersect(head) {
    let slow = head, fast = head;
    while (slow && fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
      if (slow === fast) return slow;
    }  
    return null;
  }

  let intersect = getIntersect(head);
  if (!intersect) return null;
  let p1 = head;
  let p2 = intersect;
  while (p1 !== p2) {
    p1 = p1.next;
    p2 = p2.next;
  }
  return p1;
};