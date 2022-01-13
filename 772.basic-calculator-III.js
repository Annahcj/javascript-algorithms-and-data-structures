// 772. Basic Calculator III
// Implement a basic calculator to evaluate a simple expression string.
// The expression string contains only non-negative integers, '+', '-', '*', '/' operators, and open '(' and closing parentheses ')'. The integer division should truncate toward zero.


// Solution: Recursion & Stack

// On a '(', recursively call calc with the current index + 1.
// Calc returns the evaluated calculation of the expression between idx and the next closing bracket.

// Operations:
// Keep the previous operator.
// When we come across an operator, we perform an operation on the previous number and current number using the previous operator.

// Time Complexity: O(n) 153ms 
// Space Complexity: O(n) 45.9MB
var calculate = function(s) {
  return calc(0)[0];
  
  function calc(idx) {
    let stack = [], num = 0, sign = '+';
    let expEnd = idx;
    for (var i = idx; i <= s.length; i++) {
      let char = s[i];
      if (!isNaN(char)) {
        num = num * 10 + +char;
      } else if (char === '(') {
        let [res, endIdx] = calc(i + 1);
        num = res;
        i = endIdx;
      } else {
        if (sign === '+') stack.push(num);
        else if (sign === '-') stack.push(-num);
        else if (sign === '*') stack.push(stack.pop() * num);
        else stack.push(Math.trunc(stack.pop() / num));
        
        if (char === ')') {
          expEnd = i;
          break;
        }
        sign = char;
        num = 0;
      }
    }
    let ans = 0;
    for (var n of stack) ans += n;
    return [ans, expEnd];
  }
};

// Three test cases to run function on
console.log(calculate("1+1")) // 2
console.log(calculate("6-4/2")) // 4
console.log(calculate("2*(5+5*2)/3+(6/2+8)")) // 21