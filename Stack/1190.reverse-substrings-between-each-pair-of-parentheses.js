// 1190. Reverse Substrings Between Each Pair of Parentheses
// You are given a string s that consists of lower case English letters and brackets.
// Reverse the strings in each pair of matching parentheses, starting from the innermost one.
// Your result should not contain any brackets.


// Solution: Stack

// Store the non-parentheses characters in an array.
// Use a stack to store the indices of the open brackets and when we encounter a closing bracket, we pop the last open bracket off the stack and reverse everything in between the two indices.
// At the end, return the array converted into a string.

// Time Complexity: O(n^2) 68ms
// Space Complexity: O(n) 50.4MB
function reverseParentheses(s) {
  let chars = [], openBrackets = [];
  let n = s.length;
  for (let i = 0; i < n; i++) {
    if (s[i] === ')') {
      // reverse all chars up to last open bracket
      let lastOpenBracket = openBrackets.pop();
      reverse(chars, lastOpenBracket, chars.length - 1);
    } else if (s[i] === '(') {
      openBrackets.push(chars.length);
    } else {
      chars.push(s[i]);
    }
  }
  return chars.join('');
};

function reverse(arr, start, end) {
  while (start < end) {
    [arr[start], arr[end]] = [arr[end], arr[start]];
    start++, end--;
  }
}

// Three test cases 
console.log(reverseParentheses("(abcd)")) // "dcba"
console.log(reverseParentheses("(u(love)i)")) // "iloveu"
console.log(reverseParentheses("(ed(et(oc))el)")) // "leetcode"