// 2231. Largest Number After Digit Swaps by Parity
// You are given a positive integer num. You may swap any two digits of num that have the same parity (i.e. both odd digits or both even digits).
// Return the largest possible value of num after any number of swaps.


// Solution: Separate and sort

// 1. Convert num into a string to make it easier to access the digits.
// 2. Separate even and odd digits into their own arrays.
// 3. Sort the even and odd digits in desc order.
// 4. Build the final number based on the sorted digits.

// n = number of digits in num
// Time Complexity: O(n log(n)) 84ms
// Space Complexity: O(n) 43.9MB
var largestInteger = function(num) {
  let number = num.toString();
  let even = [], odd = [];
  for (let digit of number) {
    let d = +digit;
    if (d % 2 === 0) even.push(d);
    else odd.push(d);
  }
  
  even.sort((a, b) => b - a);
  odd.sort((a, b) => b - a);
  
  let res = 0, i = 0, j = 0;
  for (let digit of number) {
    let d = +digit;
    res *= 10;
    if (d % 2 === 0) res += even[i++];
    else res += odd[j++];
  }
  return res;
};

// Two test cases to run function on
console.log(largestInteger(1234)) // 3412
console.log(largestInteger(65875)) // 87655