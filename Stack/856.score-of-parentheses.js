// 856. Score of Parentheses
// Given a balanced parentheses string s, return the score of the string.
// The score of a balanced parentheses string is based on the following rule:
  // "()" has score 1.
  // AB has score A + B, where A and B are balanced parentheses strings.
  // (A) has score 2 * A, where A is a balanced parentheses string.


// Solution 1: Divide & Conquer

// Count the balance of the current string.
  // ( = -1
  // ) = +1
// When the balance is 0, recurse the inner parentheses: (start + 1, i - 1)

// Time Complexity: O(n^2) 45ms
// Space Complexity: O(n) 42.1MB
var scoreOfParentheses = function(s) {
  return recurse(0, s.length - 1);
  
  function recurse(start, end) {
    let bal = 0, ans = 0;
    for (let i = start; i <= end; i++) {
      bal += s[i] === '(' ? -1 : 1;
      if (bal === 0) {
        if (i - start === 1) ans++; // just one pair
        else ans += recurse(start + 1, i - 1) * 2;
        start = i + 1;
      }
    }
    return ans;
  }
};

// Solution 2: Stack

// ( = push 0 into stack
// ) = 
  // if the last number in stack is 0, score = 1.
  // otherwise, get the total sum until the last zero and multiply it by 2.

// to get the final answer, sum up the numbers in the stack.

// Time Complexity: O(n) 56ms
// Space Complexity: O(n) 42.6MB
var scoreOfParentheses = function(s) {
  let stack = [];
  for (let char of s) {
    if (char === '(') stack.push(0);
    else {
      if (stack[stack.length - 1] === 0) {
        stack.pop();
        stack.push(1);
      } else {
        let sum = 0;
        while (stack[stack.length - 1] !== 0) {
          sum += stack.pop();
        }
        stack.pop();
        stack.push(sum * 2);
      }
    }
  }
  let ans = 0;
  for (let num of stack) ans += num;
  return ans;
};

// Three test cases 
console.log(scoreOfParentheses("()")) // 1
console.log(scoreOfParentheses("()()")) // 2
console.log(scoreOfParentheses("((())())")) // 6