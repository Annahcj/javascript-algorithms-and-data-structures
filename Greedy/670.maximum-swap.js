// 670. Maximum Swap
// You are given an integer num. You can swap two digits at most once to get the maximum valued number.
// Return the maximum valued number you can get.


// Solution: Greedy Approach

// For each digit, record the maximum digit at or after this digit.
// Look for the first digit where the maximum digit is not equal to it.
// Swap this digit with the last occurance of the maximum digit and return the number.
// It is optimal to swap it with the last occurance since we want the smaller digit to be as far right as possible.

// n = number of digits in num
// Time Complexity: O(n) 85ms
// Space Complexity: O(n) 38.9MB
var maximumSwap = function(num) {
  let digits = [], temp = num;
  while (temp > 0) {
    digits.push(temp % 10);
    temp = Math.floor(temp / 10);
  }
  digits.reverse();

  let n = digits.length, maxIndices = Array(n).fill(-1);
  maxIndices[n - 1] = n - 1;
  for (var i = n - 2; i >= 0; i--) {
    maxIndices[i] = maxIndices[i + 1];
    if (digits[i] > digits[maxIndices[i + 1]]) maxIndices[i] = i;
  }

  for (var i = 0; i < n; i++) {
    if (digits[maxIndices[i]] !== digits[i]) {
      let lastIndex = maxIndices[i];
      [digits[i], digits[lastIndex]] = [digits[lastIndex], digits[i]];
      return +digits.join("");
    }
  }
  return num;
};

// Two test cases to run function on
console.log(maximumSwap(2736)) // 7236
console.log(maximumSwap(9973)) // 9973