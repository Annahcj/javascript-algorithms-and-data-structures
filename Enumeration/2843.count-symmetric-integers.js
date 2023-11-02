// 2843. Count Symmetric Integers
// You are given two positive integers low and high.
// An integer x consisting of 2 * n digits is symmetric if the sum of the first n digits of x is equal to the sum of the last n digits of x. Numbers with an odd number of digits are never symmetric.
// Return the number of symmetric integers in the range [low, high].


// Solution: Brute Force

// For each number from low to high, convert the number into a string and compare the sums of the digits in the two halves.

// n = high - low, m = number of characters in a number
// Time Complexity: O(nm) 113ms
// Space Complexity: O(m) 46.1MB
var countSymmetricIntegers = function(low, high) {
  let symmetric = 0;
  for (let num = low; num <= high; num++) {
    let str = num.toString();
    if (str.length % 2 === 1) continue;
    let midIndex = str.length / 2;
    let leftSum = 0, rightSum = 0;
    for (let i = 0; i < str.length; i++) {
      let digit = Number(str[i]);
      if (i < midIndex) leftSum += digit;
      else rightSum += digit;
    }
    if (leftSum === rightSum) symmetric++;
  }  
  return symmetric;
};

// Two test cases
console.log(countSymmetricIntegers(1, 100)) // 9
console.log(countSymmetricIntegers(1200, 1230)) // 4