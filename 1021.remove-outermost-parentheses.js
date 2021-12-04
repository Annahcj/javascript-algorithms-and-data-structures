// 1021. Remove Outermost Parentheses
// A valid parentheses string is either empty "", "(" + A + ")", or A + B, where A and B are valid parentheses strings, and + represents string concatenation.
// For example, "", "()", "(())()", and "(()(()))" are all valid parentheses strings.
// A valid parentheses string s is primitive if it is nonempty, and there does not exist a way to split it into s = A + B, with A and B nonempty valid parentheses strings.
// Given a valid parentheses string s, consider its primitive decomposition: s = P1 + P2 + ... + Pk, where Pi are primitive valid parentheses strings.
// Return s after removing the outermost parentheses of every primitive string in the primitive decomposition of s.


// Solution 1: Stack

// Initialize a stack with the first parenthesis in it, set the start index to 0.
// Loop through from 1 onwards (pointer = i)
  // if s[i] is ), pop the last parenthesis from the stack.
  // otherwise push ( into the stack.
  // if stack is empty, that means we have found a primitive decomposition
    // add the string from start + 1 to i - 1 to the answer.
    // increment i, set stack to [s[i]].
    // set start to i.
// Return ans.

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) 41.2MB
var removeOuterParentheses = function(s) {
  let ans = "";
  let stack = [s[0]];
  let start = 0;
  for (var i = 1; i < s.length; i++) {
    if (s[i] === ')') stack.pop();
    else stack.push('(');
    if (!stack.length) {
      ans += s.slice(start + 1, i);
      i++;
      if (i < s.length) stack = [s[i]];
      start = i;
    }
  }
  return ans;
};

// Solution 2: Counter

// Opening parenthesis: increment counter 
// Closing parenthesis: decrement counter

// When the counter is equal to 0, the string is balanced.
// Only append the parenthesis to the string if the counter is not equal to 0.

// Time Complexity: O(n) 80ms
// Space Complexity: O(1) 41.3MB
var removeOuterParentheses = function(s) {
  let ans = "";
  let count = 0;
  for (var i = 0; i < s.length; i++) {
    if (s[i] === '(') {
      if (count !== 0) ans += s[i];
      count++;
    } else {
      count--;
      if (count !== 0) ans += s[i];
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(removeOuterParentheses("(()())(())")) // "()()()"
console.log(removeOuterParentheses("(()())(())(()(()))")) // "()()()()(())"
console.log(removeOuterParentheses("()()")) // ""