// 2575. Find the Divisibility Array of a String
// You are given a 0-indexed string word of length n consisting of digits, and a positive integer m.
// The divisibility array div of word is an integer array of length n such that:
  // div[i] = 1 if the numeric value of word[0,...,i] is divisible by m, or
  // div[i] = 0 otherwise.
// Return the divisibility array of word.


// Solution: Build Modulo

// Build up the modulo sum on the fly as we process each digit in word.

// Time Complexity: O(n) 212ms
// Space Complexity: O(n) 62.8MB
var divisibilityArray = function(word, m) {
  let n = word.length, div = Array(n).fill(0), sum = 0;
  for (let i = 0; i < n; i++) {
    let digit = Number(word[i]);
    sum = (sum * 10 + digit) % m;
    if (sum == 0) div[i] = 1;
  }
  return div;
};

// Two test cases
console.log(divisibilityArray("998244353", 3)) // [1,1,0,0,0,1,1,0,0]
console.log(divisibilityArray("1010", 10)) // [0,1,0,1]