// 2520. Count the Digits That Divide a Number
// Given an integer num, return the number of digits in num that divide num.
// An integer val divides nums if nums % val == 0.


// Solution: Modulo 10

// Find the last digit of the number: n % 10.
// Use Math.floor(n / 10) to remove the last digit.
// Repeat this until n becomes 0.

// Time Complexity: O(log(n)) 58ms
// Space Complexity: O(1) 41.7MB
var countDigits = function(num) {
  let n = num, ans = 0;
  while (n > 0) {
    let digit = n % 10;
    if (num % digit === 0) ans++;
    n = Math.floor(n / 10);
  }
  return ans;
};

// Three test cases
console.log(countDigits(7)) // 1
console.log(countDigits(121)) // 2
console.log(countDigits(1248)) // 4