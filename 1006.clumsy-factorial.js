// 1006. Clumsy Factorial
// The factorial of a positive integer n is the product of all positive integers less than or equal to n.
  // For example, factorial(10) = 10 * 9 * 8 * 7 * 6 * 5 * 4 * 3 * 2 * 1.
// We make a clumsy factorial using the integers in decreasing order by swapping out the multiply operations for a fixed rotation of operations with multiply '*', divide '/', add '+', and subtract '-' in this order.
  // For example, clumsy(10) = 10 * 9 / 8 + 7 - 6 * 5 / 4 + 3 - 2 * 1.
// However, these operations are still applied using the usual order of operations of arithmetic. We do all multiplication and division steps before any addition or subtraction steps, and multiplication and division steps are processed left to right.
// Additionally, the division that we use is floor division such that 10 * 9 / 8 = 90 / 8 = 11.
// Given an integer n, return the clumsy factorial of n.


// Solution: Stack

// Initial a stack with [n].
// Loop through each number i from n - 1 to 1,
  // If i % 4 === 1, the operation is multiplication.
  // If i % 4 === 2, the operation is division.
  // If i % 4 === 3, the operation is addition.
  // If i % 4 === 0, the operation is subtraction.

// For multiplication and division, we immediately pop the last number from the stack and perform the operation.
// Then, we go through the numbers at the end and calculation the result using addition and subtraction alternatively.

// Time Complexity: O(n) 68ms
// Space Complexity: O(n) 44.6MB
var clumsy = function(n) {
  let stack = [n];
  for (let i = 1; i < n; i++) {
    let num = n - i;
    if (i % 4 === 1) {
      stack.push(stack.pop() * num);
    } else if (i % 4 === 2) {
      stack.push(Math.floor(stack.pop() / num));
    } else {
      stack.push(num);
    }
  }
  let res = stack[0];
  for (let i = 1; i < stack.length; i++) {
    if (i % 2 === 1) res += stack[i];
    else res -= stack[i];
  }
  return res;
};

// Two test cases
console.log(clumsy(4)) // 7
console.log(clumsy(10)) // 12