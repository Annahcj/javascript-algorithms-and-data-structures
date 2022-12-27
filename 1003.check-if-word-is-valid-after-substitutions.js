// 1003. Check If Word Is Valid After Substitutions
// Given a string s, determine if it is valid.
// A string s is valid if, starting with an empty string t = "", you can transform t into s after performing the following operation any number of times:
  // Insert string "abc" into any position in t. More formally, t becomes tleft + "abc" + tright, where t == tleft + tright. Note that tleft and tright may be empty.
// Return true if s is a valid string, otherwise, return false.


// Solution: Stack

// Maintain a stack of characters of s.
// Once we find an "abc", pop the three characters off the stack.
// If the stack is empty at the end, then s is a valid string.

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 46.5MB
var isValid = function(s) {
  let stack = [];
  for (let char of s) {
    stack.push(char);
    if (stack.length >= 3 && isABC(stack)) {
      stack.pop();
      stack.pop();
      stack.pop();
    }
  }
  return stack.length === 0;
};

function isABC(stack) {
  return stack[stack.length - 3] === 'a' && stack[stack.length - 2] === 'b' && stack[stack.length - 1] === 'c';
}

// Three test cases
console.log(isValid("aabcbc")) // true
console.log(isValid("abcabcababcc")) // true
console.log(isValid("abccba")) // false