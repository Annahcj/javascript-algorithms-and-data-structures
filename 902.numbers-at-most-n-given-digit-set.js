// 902. Numbers At Most N Given Digit Set
// Given an array of digits which is sorted in non-decreasing order. You can write numbers using each digits[i] as many times as we want. For example, if digits = ['1','3','5'], we may write numbers such as '13', '551', and '1351315'.
// Return the number of positive integers that can be generated that are less than or equal to a given integer n.


// Solution: 

// nDigits = number of digits in n, digitsSize = length of digits

// count all numbers that have less amount of digits than nDigits (since all numbers with less digits are guaranteed to be smaller)
  // e.g: ["1","3","5","7"], 100
  // x, xx = 4^1 + 4^2 = 20

// then compute all possible numbers that have the same amount of digits as nDigits
  // e.g: ["1","2","3"], 287
  // 1xx = digitsSize ^ 2 = 3^2 = 9 (the remaining two digits can have 9 different permutations)
  // 11x = digitsSize ^ 1 = 3^1 = 3 (the remaining digit can have 3 different permutations)
  // etc..

// Time Complexity: O(log(n)) 70ms
// Space Complexity: O(log(n)) 38.7MB
var atMostNGivenDigitSet = function(digits, n) {
  let ans = 0;
  n = n.toString();
  let nDigits = n.length, digitsSize = digits.length;
  for (var i = 1; i < nDigits; i++) {
    ans += digitsSize ** i;
  }

  for (var i = 0; i < nDigits; i++) {
    let digitsMatch = false;
    for (var digit of digits) {
      if (digit < n[i]) {
        ans += digitsSize ** (nDigits - i - 1);
      } else if (digit === n[i]) {
        digitsMatch = true;
      }
    }
    if (!digitsMatch) return ans;
  }
  return ans + 1;
};

// Five test cases to run function on
console.log(atMostNGivenDigitSet(["1","3","5","7"], 100)) // 20
console.log(atMostNGivenDigitSet(["1","4","9"], 1000000000)) // 29523
console.log(atMostNGivenDigitSet(["7"], 8)) // 1
console.log(atMostNGivenDigitSet(["1", "2"], 12)) // 4
console.log(atMostNGivenDigitSet(["3","5"], 4)) // 1