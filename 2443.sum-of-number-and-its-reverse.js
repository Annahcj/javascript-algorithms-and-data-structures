// 2443. Sum of Number and Its Reverse
// Given a non-negative integer num, return true if num can be expressed as the sum of any non-negative integer and its reverse, or false otherwise.


// Solution: Brute Force

// For each number i from 0 to num, check whether i + reverse(i) is equal to num.
// Reversing a number costs O(log(n)).

// Time Complexity: O(n log(n)) 435ms
// Spcae Complexity: O(1) 42.8MB
var sumOfNumberAndReverse = function(num) {
  for (let i = 0; i <= num; i++) {
    if (i + reverse(i) === num) return true;
  }
  return false;   
};

function reverse(num) {
  let reversed = 0;
  while (num > 0) {
    let digit = num % 10;
    reversed = reversed * 10 + digit;
    num = Math.floor(num / 10);
  }
  return reversed;
}  

// Three test cases
console.log(sumOfNumberAndReverse(443)) // true
console.log(sumOfNumberAndReverse(63)) // false
console.log(sumOfNumberAndReverse(181)) // true