// 234. Palindrome Linked List
// Given the head of a singly linked list, return true if it is a palindrome.


// Solution 1: Brute Force

// 1. Loop through the list, put values into an array.
// 2. Use two pointers to check whether it is a palindrome.

// Time Complexity: O(n) 223ms
// Space Complexity: O(n) 82.3MB
var isPalindrome = function(head) {
  let values = [];
  while (head) {
    values.push(head.val);
    head = head.next;
  }
  let start = 0, end = values.length - 1;
  while (start < end) {
    if (values[start] !== values[end]) return false;
    start++, end--;
  }
  return true;
}; 

// Solution 2: Recursion

// Almost like post-order dfs, go depth first to reach the tail first, then go back.

// Time Complexity: O(n) 281ms
// Space Complexity: O(n) (call stack) 81.2MB
var isPalindrome = function(head) {
  return recurse(head);
  function recurse(node) {
    if (node) {
      if (!recurse(node.next)) return false;
      if (node.val !== head.val) return false;
      head = head.next;
    }
    return true;
  }
};  

// Solution 3: O(1) space

// 1. Find middle node
// 2. Reverse middle half
// 3. Compare two lists node by node

// Time Complexity: O(n) 160ms
// Space Complexity: O(1) 59.3MB
var isPalindrome = function(head) {
  let secondHalfHead = findMiddle(head);
  let reversedHalf = reverse(secondHalfHead);
  
  if (!reversedHalf) return true;
  let p1 = head, p2 = reversedHalf;
  while (p2) {
    if (p1.val !== p2.val) return false;
    p1 = p1.next;
    p2 = p2.next;
  }
  return true;
  
  function findMiddle(node) {
    let slow = node, fast = node;
    while (fast && fast.next) {
      slow = slow.next;
      fast = fast.next.next;
    }
    return slow;
  }
  
  function reverse(node) {
    let prev = null;
    while (node) {
      let next = node.next;
      node.next = prev;
      prev = node;
      node = next;
    }
    return prev;
  }
};  