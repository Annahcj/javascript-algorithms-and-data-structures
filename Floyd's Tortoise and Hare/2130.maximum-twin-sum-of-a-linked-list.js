// 2130. Maximum Twin Sum of a Linked List
// In a linked list of size n, where n is even, the ith node (0-indexed) of the linked list is known as the twin of the (n-1-i)th node, if 0 <= i <= (n / 2) - 1.
  // For example, if n = 4, then node 0 is the twin of node 3, and node 1 is the twin of node 2. These are the only nodes with twins for n = 4.
// The twin sum is defined as the sum of a node and its twin.
// Given the head of a linked list with even length, return the maximum twin sum of the linked list.


// Solution: Slow & Fast Pointers & Reverse

// 1. Use slow & fast pointers to find the middle of the list.
// 2. Reverse the second half (from the mid point)
// 3. Use two pointers to traverse the two halves and get the maximum pair sum.

// Time Complexity: O(n) 145ms
// Space Complexity: O(1) 75.6MB
var pairSum = function(head) {
  let slow = head, fast = head;
  while (fast.next && fast.next.next) {
    slow = slow.next;
    fast = fast.next.next;
  }
  let mid = slow.next; // start of the second half
  slow.next = null; // cut off connection at mid point
  
  // traverse the two halves using two pointers and get the max pair sum
  let second = reverse(mid), first = head, ans = 0;
  while (first) {
    ans = Math.max(ans, first.val + second.val);
    first = first.next;
    second = second.next;
  }
  return ans;
  
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
};