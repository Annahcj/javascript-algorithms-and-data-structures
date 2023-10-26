// 58. Length of Last Word
// Given a string s consisting of some words separated by some number of spaces, return the length of the last word in the string.


// Solution: Backwards Traversal

// Loop backwards while character is a space.
// Then, loop backwards while character is not a space, and count the number of iterations.
// Return the count.

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 38.7MB
var lengthOfLastWord = function(s) {
  let len = 0;
  let i = s.length - 1;
  while (i >= 0 && s[i] === ' ') {
    i--;
  }
  while (i >= 0 && s[i] !== ' ') {
    len++, i--;
  }
  return len;
};

// Three test cases to run function on
console.log(lengthOfLastWord("Hello World")) // 5
console.log(lengthOfLastWord("   fly me   to   the moon  ")) // 4
console.log(lengthOfLastWord("luffy is still joyboy")) // 6