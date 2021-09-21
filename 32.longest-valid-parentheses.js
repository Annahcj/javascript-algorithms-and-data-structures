// 32. Longest Valid Parentheses
// Given a string containing just the characters '(' and ')', find the length of the longest valid (well-formed) parentheses substring.


// Solution: Stack

// First, initialize a stack with -1.
// This -1 is like an imaginary wrapper for situations like '()()', which is part of one valid group.
// If this -1 is used, we can push in the last previous index as another imaginary wrapper for future groups.

// Set max to 0
// Loop through s (pointer = i)
  // if (s[i] is equal to '(')
    // push i into stack
  // otherwise,
    // pop from the stack
    // if stack is empty
      // push i into stack
    // otherwise, set max to Math.max(max, i - stack[stack.length - 1])
// Return max

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) 40.5MB
var longestValidParentheses = function(s) {
  let max = 0;
  let stack = [-1];
  for (var i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      stack.push(i);
    } else {
      stack.pop();
      if (!stack.length) {
        stack.push(i);
      } else {
        max = Math.max(max, i - stack[stack.length - 1]);
      }
    }
  }  
  return max;
};

// Four test cases to run function on
console.log(longestValidParentheses("()(()")) // 2
console.log(longestValidParentheses("(()")) // 2
console.log(longestValidParentheses(")()())")) // 4
console.log(longestValidParentheses("")) // 0