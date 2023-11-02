// 69. Sqrt(x)
// Given a non-negative integer x, compute and return the square root of x.
// Since the return type is an integer, the decimal digits are truncated, and only the integer part of the result is returned.
// Note: You are not allowed to use any built-in exponent function or operator, such as pow(x, 0.5) or x ** 0.5.


// Solution: Binary Search

// We know that the square root will be somewhere in between 0 and x/2.
// If x is 0 or 1, the answer is itself.
// Set two pointers -> left to 2, right to x / 2
// Loop while left is smaller than or equal to right
  // let pow be mid point * mid point
  // if pow is bigger than x, set right to mid - 1 (we need the rounded down number)
  // if pow is smaller than x, set left to mid + 1
  // if pow is equal to x, return mid.
// Return right (right would be the smaller/rounded down number)

// Time Complexity: O(log(n)) 84ms
// Space Complexity: O(1) 40.4MB
var mySqrt = function(x) {
  if (x < 2) return x;
  let left = 2, right = Math.ceil(x / 2); 
  while (left <= right) {
    let mid = Math.floor((left + right) / 2);
    let pow = mid * mid;
    if (pow > x) right = mid - 1;
    else if (pow < x) left = mid + 1;
    else return mid;
  }
  return right;
};

// Two test cases to run function on
console.log(mySqrt(4)) // 2
console.log(mySqrt(8)) // 2