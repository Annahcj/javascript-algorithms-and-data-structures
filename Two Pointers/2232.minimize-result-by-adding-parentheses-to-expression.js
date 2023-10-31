// 2232. Minimize Result by Adding Parentheses to Expression
// You are given a 0-indexed string expression of the form "<num1>+<num2>" where <num1> and <num2> represent positive integers.
// Add a pair of parentheses to expression such that after the addition of parentheses, expression is a valid mathematical expression and evaluates to the smallest possible value. The left parenthesis must be added to the left of '+' and the right parenthesis must be added to the right of '+'.
// Return expression after adding a pair of parentheses such that expression evaluates to the smallest possible value. If there are multiple answers that yield the same result, return any of them.
// The input has been generated such that the original value of expression, and the value of expression after adding any pair of parentheses that meets the requirements fits within a signed 32-bit integer.


// Solution: Brute Force w/ Two Pointers

// Try all combinations of the positions of the left and right parentheses.
// Make sure the left pointer < index of '+' - 1
// Make sure the right pointer > index of '+' + 1

// Time Complexity: O(n^3) 65ms
// Space Complexity: O(n) 41.8MB
var minimizeResult = function(expression) {
  let plus = expression.indexOf('+'), n = expression.length;
  let min = Infinity, res;
  for (let i = 0; i < plus; i++) {
    for (let j = plus + 2; j <= n; j++) {
      let left = +expression.slice(0, i) || 1, right = +expression.slice(j) || 1;
      let leftNum = +expression.slice(i, plus), rightNum = +expression.slice(plus + 1, j);
      let result = (leftNum + rightNum) * left * right;
      if (result < min) {
        res = expression.slice(0, i) + '(' + expression.slice(i, j) + ')' + expression.slice(j);
        min = result;
      }
    }
  }
  return res;
};

// Two test cases
console.log(minimizeResult("247+38")) // "2(47+38)"
console.log(minimizeResult("12+34")) // "1(2+3)4"