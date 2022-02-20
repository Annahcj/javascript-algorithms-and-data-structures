// 2180. Count Integers With Even Digit Sum    
// Given a positive integer num, return the number of positive integers less than or equal to num whose digit sums are even.
// The digit sum of a positive integer is the sum of all its digits.


// Solution: Brute Force - Sum Digits

// Get the sum of digits for each number and count the number of even sums.

// Time Complexity: O(n log(n)) 89ms
// Space Complexity: O(1) 42.3MB
var countEven = function(num) {
  let ans = 0;
  for (let i = 1; i <= num; i++) {
    if (getDigitSum(i) % 2 === 0) ans++;
  }
  return ans;
  
  function getDigitSum(num) {
    let n = num, sum = 0;
    while (n > 0) {
      let digit = n % 10;
      sum += digit;
      n = Math.floor(n / 10);
    }
    return sum;
  }  
};

// Two test cases to run function on
console.log(countEven(4)) // 2
console.log(countEven(30)) // 14