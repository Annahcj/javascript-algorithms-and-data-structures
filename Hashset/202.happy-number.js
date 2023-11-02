// 202. Happy Number
// Write an algorithm to determine if a number n is happy.
// A happy number is a number defined by the following process:
  // Starting with any positive integer, replace the number by the sum of the squares of its digits.
  // Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a cycle which does not include 1.
  // Those numbers for which this process ends in 1 are happy.
// Return true if n is a happy number, and false if not.


// Solution 1: Hashset

// keep getting the next number while n is not equal to 1 and we haven't seen it before
  // mark n as seen
  // set n to filter(n) (returns the sum of the squares of its digits)
// Return true if n is 1, otherwise false.

// Time Complexity: O(log(n)) 84ms
// Space Complexity: O(1) 40.5MB
var isHappy = function(n) {
  let seen = new Set();
  function filter(num) {
    let ans = 0;
    while (num > 0) {
      let digit = num % 10;
      num = Math.floor(num / 10);
      ans += digit * digit;
    }
    return ans;
  }  
  while (n !== 1 && !seen.has(n)) {
    seen.add(n);
    n = filter(n);
  }
  return n === 1;
};  


// Solution 2: Floyd's Tortoise & Hare Algorithm

// Note: filter is the method which returns the sum of the squares of its digits
// Set two runners/pointers slow and fast to n and filter(n)
// Loop while fast is not equal to 1 AND slow is not equal to fast
  // set slow to filter(slow)
  // set fast to filter(filter(fast))
// Return true is fast is equal to 1, otherwise false.

// Time Complexity: O(log(n)) 76ms
// Space Complexity: O(1) 40.2MB
var isHappy = function(n) {
  function filter(num) {
    let ans = 0;
    while (num > 0) {
      let digit = num % 10;
      num = Math.floor(num / 10);
      ans += digit * digit;
    }
    return ans;
  }  
  let slow = n, fast = filter(n);
  while (fast !== 1 && slow !== fast) {
    slow = filter(slow);
    fast = filter(filter(fast));
  }
  return fast === 1;
};

// Two test cases to run function on
console.log(isHappy(19)) // true
console.log(isHappy(2)) // false