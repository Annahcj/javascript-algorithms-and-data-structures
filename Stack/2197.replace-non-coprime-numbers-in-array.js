// 2197. Replace Non-Coprime Numbers in Array
// You are given an array of integers nums. Perform the following steps:
  // 1. Find any two adjacent numbers in nums that are non-coprime.
  // 2. If no such numbers are found, stop the process.
  // 3. Otherwise, delete the two numbers and replace them with their LCM (Least Common Multiple).
  // 4. Repeat this process as long as you keep finding two adjacent non-coprime numbers.
// Return the final modified array. It can be shown that replacing adjacent non-coprime numbers in any arbitrary order will lead to the same result.
// The test cases are generated such that the values in the final array are less than or equal to 108.
// Two values x and y are non-coprime if GCD(x, y) > 1 where GCD(x, y) is the Greatest Common Divisor of x and y.


// Solution: Stack

// The key to the problem: It can be shown that replacing adjacent non-coprime numbers in any arbitrary order will lead to the same result.
// Because we are given this proof, we can use a stack.
  // 1. Push in nums[i].
  // 2. Compare and replace the last two numbers of the stack while their gcd > 1.
// Repeat these two steps until we have finished looping through nums.

// Time Complexity: O(n) 268ms
// Space Complexity: O(n) 75.7MB
var replaceNonCoprimes = function(nums) {
  let res = [];
  for (let i = 0; i < nums.length; i++) {
    res.push(nums[i]);
    while (res.length > 1 && gcd(res[res.length - 1], res[res.length - 2]) > 1) {
      let num1 = res.pop(), num2 = res.pop();
      res.push(lcm(num1, num2));
    }
  }
  return res;
};

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}

function lcm(a, b) {
  return (a * b) / gcd(a, b);
}

// Two test cases
console.log(replaceNonCoprimes([6,4,3,2,7,6,2])) // [12,7,6]
console.log(replaceNonCoprimes([2,2,1,1,3,3,3])) // [2,1,1,3]