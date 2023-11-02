// 2390. Removing Stars From a String
// You are given a string s, which contains stars *.
// In one operation, you can:
  // Choose a star in s.
  // Remove the closest non-star character to its left, as well as remove the star itself.
// Return the string after all stars have been removed.
// Note:
  // The input will be generated such that the operation is always possible.
  // It can be shown that the resulting string will always be unique.


// Solution: Stack

// Reverse s, instead of removing the closest to the left, remove the closest to the right.
// We can then use a stack to efficiently find and remove the closest non-star on the right.
// The top of the stack is the closest non-star on the right.
// Whatever is left in the stack are the final characters.

// Time Complexity: O(n) 233ms
// Space Complexity: O(n) 61.7MB
var removeStars = function(s) {
  s = s.split("").reverse();
  let stack = [], n = s.length;
  for (let i = n - 1; i >= 0; i--) {
    if (s[i] === '*') stack.pop();
    else stack.push(s[i]);
  }
  return stack.join("");
};

// Two test cases
console.log(removeStars("leet**cod*e")) // "lecoe"
console.log(removeStars("erase*****")) // ""