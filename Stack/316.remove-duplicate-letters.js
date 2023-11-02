// 316. Remove Duplicate Letters
// Given a string s, remove duplicate letters so that every letter appears once and only once. You must make sure your result is the smallest in lexicographical order among all possible results.


// Solution: Stack

// Time Complexity: O(n) 139ms
// Space Complexity: O(1) 41.1MB (stores unique chars only, so the maximum space is O(26))
var removeDuplicateLetters = function(s) {
  let stack = [], seen = new Map();
  let lastIndex = new Map();
  // record the last occurance of each character in s
  for (var i = 0; i < s.length; i++) lastIndex.set(s[i], i);
  for (var i = 0; i < s.length; i++) {
    let char = s[i];
    // if char isn't already in our stack
    if (!seen.has(char)) {
      // pop from stack and remove from seen while 
        // 1. last char of stack is smaller than current char
        // 2. AND last char of stack still has later occurances in s
      while (stack.length && stack[stack.length - 1] > char && lastIndex.get(stack[stack.length - 1]) > i) {
        seen.delete(stack.pop());
      }
      // add the current char into stack and mark it as seen
      stack.push(char);
      seen.set(char);
    }
  }
  // build up the result string from the stack
  let res = '';
  for (var char of stack) res += char;
  return res;
};

// Two test cases to run function on
console.log(removeDuplicateLetters("bcabc")) // "abc"
console.log(removeDuplicateLetters("cbacdcbc")) // "acdb"