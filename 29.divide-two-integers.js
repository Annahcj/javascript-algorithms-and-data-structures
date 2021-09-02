// 29. Divide Two Integers
// Given two integers dividend and divisor, divide two integers without using multiplication, division, and mod operator.
// Return the quotient after dividing dividend by divisor.
// The integer division should truncate toward zero, which means losing its fractional part. For example, truncate(8.345) = 8 and truncate(-2.7335) = -2.
// Note: Assume we are dealing with an environment that could only store integers within the 32-bit signed integer range: [−231, 231 − 1]. For this problem, assume that your function returns 231 − 1 when the division result overflows.


// Solution 1: Repeated Exponential Searches

// Time Complexity: O(log^2(n)) 88ms
// Space Complexity: O(1) 40MB
var divide = function(dividend, divisor) {
  if (dividend === -2147483648 && divisor === -1) return 2147483647;
  let negatives = 0;
  if (dividend < 0) {
    dividend = -dividend;
    negatives++;
  }
  if (divisor < 0) {
    divisor = -divisor;
    negatives++;
  }
  let res = 0;
  while (dividend >= divisor) {
    let times = 1;
    let sum = divisor;
    while (sum + sum < dividend) {
      sum += sum;
      times += times;
    }
    res += times;
    dividend -= sum;
  }  
  if (negatives === 1) res = -res;
  return res;
};

// Solution 2: Powers of Two

// E.g: dividend = 21, divisor = 3 
// We create two arrays of powers of two (one for the power, one for the divisor ^ power)
// powers:    [1, 2, 4]
// multiples: [3, 6, 12]
// Then, loop through from back to front, 
  // if divisor is smaller than or equal to multiples[i],
    // add powers[i] to result
    // subtract multiples[i] from divisor
// Finally, return result.

// Time Complexity: O(log(n)) 114ms
// Space Complexity: O(log(n)) 39.9MB
var divide = function(dividend, divisor) {
  if (dividend === -2147483648 && divisor === -1) return 2147483647;
  let negatives = 0;
  if (dividend < 0) {
    dividend = -dividend;
    negatives++;
  }
  if (divisor < 0) {
    divisor = -divisor;
    negatives++;
  }
  let power = 1;
  let powers = [];
  let multiples = [];
  while (divisor <= dividend) {
    powers.push(power);
    multiples.push(divisor);
    power += power;
    divisor += divisor;
  }
  let res = 0;
  for (var i = multiples.length - 1; i >= 0; i--) {
    if (multiples[i] <= dividend) {
      res += powers[i];
      dividend -= multiples[i];
    }
  }
  if (negatives === 1) res = -res;
  return res;
};

// Solution 3: Powers of Two w/ Bit Shifting

// Same idea as solution 2, except we just keep track of the bigger multiple and its power, and use bit shifting to divide them in two each time.
// Note: To divide a number by two, use the right shift bitwise operator. 
// 4 >> 1 = 2
// Extra: To multiply a number by two, use the left shift bitwise operator.
// 2 << 1 = 4

// Time Complexity: O(log(n)) 83ms
// Space Complexity: O(1) 39.7MB
var divide = function(dividend, divisor) {
  if (dividend === -2147483648 && divisor === -1) return 2147483647;
  let negatives = 0;
  if (dividend < 0) {
    dividend = -dividend;
    negatives++;
  }
  if (divisor < 0) {
    divisor = -divisor;
    negatives++;
  }
  let highestPower = 1;
  let highestMultiple = divisor;
  while (highestMultiple + highestMultiple <= dividend) {
    highestPower += highestPower;
    highestMultiple += highestMultiple;
  }
  let res = 0;
  while (divisor <= dividend) {
    if (highestMultiple <= dividend) {
      res += highestPower;
      dividend -= highestMultiple;
    }
    highestPower >>= 1;
    highestMultiple >>= 1;
  }
  if (negatives === 1) res = -res;
  return res;
};

// Four test cases to run function on
console.log(divide(21, 3)) // 7
console.log(divide(10, 3)) // 3
console.log(divide(7, -3)) // -2
console.log(divide(0, 1)) // 0
console.log(divide(1, 1)) // 1