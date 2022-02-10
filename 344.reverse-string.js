// 344. Reverse String
// Write a function that reverses a string. The input string is given as an array of characters s.
// You must do this by modifying the input array in-place with O(1) extra memory.


// Solution: Two Pointers

// Swap start and end, and move the pointers towards the middle until they meet.

// Time Complexity: O(n/2) = O(n) 100ms
// Space Complexity: O(1) 49.2MB
var reverseString = function(s) {
  let start = 0, end = s.length - 1;
  while (start < end) {
    [s[start], s[end]] = [s[end], s[start]];
    start++, end--;
  }
};