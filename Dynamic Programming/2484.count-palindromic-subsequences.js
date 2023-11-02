// 2484. Count Palindromic Subsequences
// Given a string of digits s, return the number of palindromic subsequences of s having length 5. Since the answer may be very large, return it modulo 10^9 + 7.
// Note:
  // A string is palindromic if it reads the same forward and backward.
  // A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.


// Solution: DP 

// 1. For each index i, count the number of occurances of each pair of digits (j, k) ending before or at index i.
  // leftCount[i][j][k] = number of (j, k) pairs ending before or at index i.

// 2. For each index i, count the number of occurances of each pair of digits (j, k) starting after or at index i.
  // rightCount[i][j][k] = number of (j, k) pairs starting after or at index i.

// 3. Try each s[i] as the middle element and count the number of combinations of (j, k) and (k, j) on the left and right of index i.

// Time Complexity: O(n * 100) 751ms
// Space Complexity: O(n * 100) 131.1MB
var countPalindromes = function(s) {
  let n = s.length, count = Array(10).fill(0);
  let leftCount = Array(n).fill(0).map(() => Array(10).fill(0).map(() => Array(10).fill(0)));

  // count combinations on the left side
  for (let i = 0; i < n - 1; i++) {
    let digit = Number(s[i]);
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        if (i > 0) {
          leftCount[i][j][k] = leftCount[i - 1][j][k];
        }
      }
      leftCount[i][j][digit] += count[j];
    }
    count[digit]++;
  }
  
  // count combinations on the right side
  count = Array(10).fill(0);
  let rightCount = Array(n).fill(0).map(() => Array(10).fill(0).map(() => Array(10).fill(0)));
  for (let i = n - 1; i >= 0; i--) {
    let digit = Number(s[i]);
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        if (i < n - 1) {
          rightCount[i][k][j] = rightCount[i + 1][k][j];
        }
      }
      rightCount[i][digit][j] += count[j];
    }
    count[digit]++;
  }
  
  let ans = 0, MOD = 10 ** 9 + 7;
  for (let i = 2; i < n - 2; i++) {
    // go through every (j, k, i, k, j) combination
    for (let j = 0; j < 10; j++) {
      for (let k = 0; k < 10; k++) {
        let left = leftCount[i - 1][j][k];
        let right = rightCount[i + 1][k][j];
        ans = (ans + left * right) % MOD;
      }
    }
  }
  return ans;
};

// Three test cases
console.log(countPalindromes("103301")) // 2
console.log(countPalindromes("0000000")) // 21
console.log(countPalindromes("9999900000")) // 2