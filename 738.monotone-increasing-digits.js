// 738. Monotone Increasing Digits
// An integer has monotone increasing digits if and only if each pair of adjacent digits x and y satisfy x <= y.
// Given an integer n, return the largest number that is less than or equal to n with monotone increasing digits.


// Solution: Greedy

// Turn n into an array to make it easier to modify.
// Starting from back to front, compare each pair of adjacent digits.
  // If adjacent digits x > y, make previous digit (x) one less and turn all following digits into 9.

// d = number of digits in n (<= 10)
// Time Complexity: O(d^2) 99ms
// Space Complexity: O(d) 42.4MB
var monotoneIncreasingDigits = function(n) {
  let num = n.toString().split("").map((digit) => Number(digit));  
  for (let i = num.length - 1; i > 0; i--) {
    if (num[i - 1] > num[i]) {
      num[i - 1]--;
      turnToNine(i);
    }
  }
  return Number(num.join(""));
  
  function turnToNine(start) {
    for (let i = start; i < num.length; i++) {
      num[i] = 9;
    }
  }
};

// Three test cases to run function on
console.log(monotoneIncreasingDigits(10)) // 9
console.log(monotoneIncreasingDigits(1234)) // 1234
console.log(monotoneIncreasingDigits(332)) // 299