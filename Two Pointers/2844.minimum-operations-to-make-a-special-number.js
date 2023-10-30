// 2844. Minimum Operations to Make a Special Number
// You are given a 0-indexed string num representing a non-negative integer.
// In one operation, you can pick any digit of num and delete it. Note that if you delete all the digits of num, num becomes 0.
// Return the minimum number of operations required to make num special.
// An integer x is considered special if it is divisible by 25.


// Solution: Two Pointers 

// Find the minimum operations to make num end with one of ['00', '25', '50', '75'].
// Use two pointers and iterate through num from right to left, greedily matching the end digits.

// Special case: We can also turn num into 0, which will take n - 1 operations if num contains '0', otherwise n operations.

// Time Complexity: O(5n) 58ms
// Space Complexity: O(1) 44MB
var minimumOperations = function(num) {
  let possibleEndDigits = ['00', '25', '50', '75'];
  let minOperations = num.includes('0') ? num.length - 1 : num.length; // turn number into 0
  for (let endDigits of possibleEndDigits) {
    minOperations = Math.min(minOperations, operationsToEndWith(num, endDigits));
  }
  return minOperations;
};

function operationsToEndWith(num, endDigits) {
  let n = num.length, operations = 0, j = endDigits.length - 1;
  for (let i = n - 1; i >= 0; i--) {
    if (num[i] === endDigits[j]) {
      j--;
      if (j === -1) return operations;
    } else {
      operations++;
    }
  }
  return n;
}

// Three test cases
console.log(minimumOperations("2245047")) // 2
console.log(minimumOperations("2908305")) // 3
console.log(minimumOperations("10")) // 1