// 1544. Make The String Great
// Given a string s of lower and upper case English letters.
// A good string is a string which doesn't have two adjacent characters s[i] and s[i + 1] where:
  // 0 <= i <= s.length - 2
  // s[i] is a lower-case letter and s[i + 1] is the same letter but in upper-case or vice-versa.
// To make the string good, you can choose two adjacent characters that make the string bad and remove them. You can keep doing this until the string becomes good.
// Return the string after making it good. The answer is guaranteed to be unique under the given constraints.
// Notice that an empty string is also good.


// Solution: Stack

// Process s from left to right.
// Push each character into a stack.
// Remove the last two characters from the stack while they are bad (e.g: 'e' and 'E' or 'E' and 'e')

// How to check whether two characters are bad (eE or Ee):
  // If the difference between their character codes are equal to 32, they are bad.
  // 'a' -> 97, 'A' -> 65: difference = 32

// Time Complexity: O(n) 77ms
// Space Complexity: O(n) 44.1MB
var makeGood = function(s) {
  let stack = [];
  for (let char of s) {
    stack.push(char);
    while (stack.length >= 2 && isBad(stack[stack.length - 2], stack[stack.length - 1])) {
      stack.pop();
      stack.pop();
    }
  }
  return stack.join("");
};
  
function isBad(char1, char2) {
  return Math.abs(char1.charCodeAt() - char2.charCodeAt()) === 32;
}

// Three test cases
console.log(makeGood("leEeetcode")) // "leetcode"
console.log(makeGood("abBAcC")) // ""
console.log(makeGood("s")) // "s"