// 633. Sum of Square Numbers
// Given a non-negative integer c, decide whether there are two integers a and b such that a^2 + b^2 = c.


// Solution 1: Two Pointers

// The problems is very similar to two sum, except the sum is a^2 + b^2.

// Two pointers: a = 0, b = closest number to square root of c 
// Loop while a is smaller than or equal to b (a can be equal to b)
  // Set sum to a^2 + b^2
  // If sum is equal to c, return true.
  // Otherwise if sum is smaller than c, increment a by one.
  // Otherwise if sum is bigger than c, decrement b by one.
// If the loop finishes, return false.

// Time Complexity: O(sqrt(c)) 115ms
// Space Complexity: O(1) 38.3MB
var judgeSquareSum = function(c) {
  let a = 0, b = Math.floor(Math.sqrt(c));
  while (a <= b) {
    let sum = a ** 2 + b ** 2;
    if (sum === c) return true;
    else if (sum < c) {
      a++;
    } else {
      b--;
    }
  }
  return false;
};


// Solution 2: Using Sqrt Function

// Iterate through all possibilities of a up to Math.sqrt(c)
  // If we flip the formula, we get b = sqrt(c - a^2)
  // so, basically for every a, we check if b is an integer, if it is, return true.
// If the loop finishes, return false.

// Time Complexity: O(sqrt(c) log(c)) (Math.sqrt takes log(n)) 109ms
// Space Complexity: O(1) 38.6MB
var judgeSquareSum = function(c) {
  for (var a = 0; a <= Math.sqrt(c); a++) {
    let b = Math.sqrt(c - a ** 2);
    if (Number.isInteger(b)) return true;
  }
  return false;
};

// Five test cases to run function on
console.log(judgeSquareSum(5)) // true
console.log(judgeSquareSum(3)) // false
console.log(judgeSquareSum(4)) // true
console.log(judgeSquareSum(2)) // true
console.log(judgeSquareSum(1)) // true