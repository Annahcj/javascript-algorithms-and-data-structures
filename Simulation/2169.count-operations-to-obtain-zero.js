// 2169. Count Operations to Obtain Zero
// You are given two non-negative integers num1 and num2.
// In one operation, if num1 >= num2, you must subtract num2 from num1, otherwise subtract num1 from num2.
  // For example, if num1 = 5 and num2 = 4, subtract num2 from num1, thus obtaining num1 = 1 and num2 = 4. However, if num1 = 4 and num2 = 5, after one operation, num1 = 4 and num2 = 1.
// Return the number of operations required to make either num1 = 0 or num2 = 0.


// Solution: Simulation

// Just do as the instructions say until num1 or num2 is 0.
// Count the number of operations.

// Time Complexity: O(n + m) 124ms
// Space Complexity: O(1) 42.2MB
var countOperations = function(num1, num2) {
  let count = 0;
  while (num1 !== 0 && num2 !== 0) {
    if (num1 >= num2) num1 -= num2;
    else num2 -= num1;
    count++;
  }  
  return count;
};

// Two test cases
console.log(countOperations(2, 3)) // 3
console.log(countOperations(10, 10)) // 1