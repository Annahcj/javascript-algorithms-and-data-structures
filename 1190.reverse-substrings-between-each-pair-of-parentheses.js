// 1190. Reverse Substrings Between Each Pair of Parentheses
// You are given a string s that consists of lower case English letters and brackets.
// Reverse the strings in each pair of matching parentheses, starting from the innermost one.
// Your result should not contain any brackets.


// Solution: Stack

// Keep each character in a stack.
// When we come across a ')', 
  // 1. pop out each character up to the latest '('
  // 2. add them back to the stack in reversed order

// Time Complexity: O(n^2) 85ms
// Space Complexity: O(n) 42MB
var reverseParentheses = function(s) {
  let stack = [];
  for (let i = 0; i < s.length; i++) {
    if (s[i] === ')') {
      let temp = [];
      while (stack[stack.length - 1] !== '(') temp.push(stack.pop());
      stack.pop(); // pop the (
      for (let j = 0; j < temp.length; j++) stack.push(temp[j]); // add back in reversed order
    } else {
      stack.push(s[i]);
    }
  }
  return stack.join("");
};

// Three test cases to run function on
console.log(reverseParentheses("(abcd)")) // "dcba"
console.log(reverseParentheses("(u(love)i)")) // "iloveu"
console.log(reverseParentheses("(ed(et(oc))el)")) // "leetcode"