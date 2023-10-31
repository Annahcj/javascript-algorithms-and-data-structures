// 1910. Remove All Occurrences of a Substring
// Given two strings s and part, perform the following operation on s until all occurrences of the substring part are removed:
  // Find the leftmost occurrence of the substring part and remove it from s.
// Return s after removing all occurrences of part.
// A substring is a contiguous sequence of characters in a string.


// Solution: Stack

// Use a stack to keep track of the current characters of s.
// Check the last m letters of the stack and compare it with part, if they match, pop off the last m characters.

// n = s.length, m = part.length
// Time Complexity: O(nm) 155ms
// Space Complexity: O(n) 48.4MB
var removeOccurrences = function(s, part) {
  let stack = [];
  for (let char of s) {
    stack.push(char);
    if (stack.length < part.length) continue;
    let last = stack.slice(stack.length - part.length).join("");
    if (last === part) {
      for (let j = 0; j < part.length; j++) stack.pop();
    }
  }
  return stack.join("");
};

// Two test cases
console.log(removeOccurrences("daabcbaabcbc", "abc")) // "dab"
console.log(removeOccurrences("axxxxyyyyb", "xy")) // "ab"