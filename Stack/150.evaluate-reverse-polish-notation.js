// 150. Evaluate Reverse Polish Notation
// Evaluate the value of an arithmetic expression in Reverse Polish Notation.
// Valid operators are +, -, *, and /. Each operand may be an integer or another expression.
// Note that division between two integers should truncate toward zero.
// It is guaranteed that the given RPN expression is always valid. That means the expression would always evaluate to a result, and there will not be any division by zero operation.


// Solution: Stack

// When we come across a number, push it in the stack
// When we come across an operator, 
  // pop out the last two numbers from the stack.
  // perform the operation on the two numbers and push it back into the stack.

// The final result of the stack should have only one number inside, which is the answer.

// Time Complexity: O(n) 146ms
// Space Complexity: O(n) 42.6MB
var evalRPN = function(tokens) {
  let stack = [];
  for (var i = 0; i < tokens.length; i++) {
    if (!isNaN(tokens[i])) {
      stack.push(+tokens[i]);
    } else {
      let num2 = stack.pop(), num1 = stack.pop();
      switch (tokens[i]) {
        case '+': stack.push(num1 + num2); break;
        case '-': stack.push(num1 - num2); break;
        case '*': stack.push(num1 * num2); break;
        case '/': stack.push(Math.trunc(num1 / num2)); break;
      }
    }
  }
  return stack[0];
};

// Three test cases to run function on
console.log(evalRPN(["2","1","+","3","*"])) // 9
console.log(evalRPN(["4","13","5","/","+"])) // 6
console.log(evalRPN(["10","6","9","3","+","-11","*","/","*","17","+","5","+"])) // 22