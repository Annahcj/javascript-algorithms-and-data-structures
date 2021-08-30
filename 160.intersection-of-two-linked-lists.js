// 160. Intersection of Two Linked Lists
// Given the heads of two singly linked-lists headA and headB, return the node at which the two lists intersect. If the two linked lists have no intersection at all, return null.


// Solution 1: Two Pointers

// Note: The length of the lists after the intersection should be the exact same length.
// That means that we can check the last parts of both linked lists. 
// If the shorter linked list has a length of 5, and the other one has a length of 7, we can check shorter[0] with longer[2], and increment them both until we find a match. 
// The first match will be the intersection point.
// We can loop through A and B and find the length of the shorter linked list (first one that reaches null)
// For e.g: 
// A: 1 -> 2 -> 3 -> 4 -> 5
// B:           8 -> 4 -> 5
// Find the length of the shorter list (B, with a length of 3)
// Loop through the longer list (A) until it has 3 items left

// Now, we have two pointers ready to traverse through the last parts of A and B
//              |
// A: 1 -> 2 -> 3 -> 4 -> 5
//              |
// B:           8 -> 4 -> 5
// Loop until the nodes at pointerA and pointerB are equal, and return the node.
// (in this case, the node will be 4)

// Time Complexity: O(n + m) 100ms
// Space Complexity: O(1) 46.6MB
var getIntersectionNode = function(headA, headB) {
  let count = 0;
  let pA = headA, pB = headB;
  while (pA && pB) {
    count++;
    pA = pA.next;
    pB = pB.next;
  }
  return pA === null ? findIS(headB, headA, count) : findIS(headA, headB, count);
  function findIS(longer, shorter, length) {
    let slow = longer, fast = longer;
    while (fast) {
      if (length < 1) slow = slow.next;
      fast = fast.next;
      length--;
    } 
    let pA = slow, pB = shorter;
    while (pA !== pB) {
      pA = pA.next;
      pB = pB.next;
    }
    return pA;
  }
};

// Solution 2: Optimized Two Pointers

// Time Complexity: O(n + m) 130ms
// Space Complexity: O(1) 45.4MB
var getIntersectionNode = function(headA, headB) {
  let pA = headA, pB = headB;
  while (pA !== pB) {
    pA = !pA ? headB : pA.next;
    pB = !pB ? headA : pB.next;
  }
  return pA;
};