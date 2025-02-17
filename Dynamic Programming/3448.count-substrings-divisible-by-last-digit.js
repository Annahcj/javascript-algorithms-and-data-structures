// 3448. Count Substrings Divisible By Last Digit
// You are given a string s consisting of digits.
// Return the number of substrings of s divisible by their non-zero last digit.
// Note: A substring may contain leading zeros.


// Solution: DP

// dp[mod][rem] = number of substrings with a remainder of `rem` using modulo `mod`.
// For every index i, go through every mod value,
  // Count substrings reset at s[i]: dp[mod][s[i] % mod]++
  // Count substrings continued on from previous characters:
    // curr[mod][(prev remainder * 10 + s[i]) % mod] += prev[mod][prev remainder]

// Count the total sum of substrings ending with itself and with remainder of 0: sum of prev[s[i]][0] for every index i.

// n = length of s
// Time Complexity: O(100n) 1268ms
// Space Complexity: O(100) 60.89MB
function countSubstrings(s) {
  let prev = Array(10).fill(0).map(() => Array(10).fill(0));
  let substrings = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = Array(10).fill(0).map(() => Array(10).fill(0));
    const digit = Number(s[i]);
    for (let mod = 0; mod <= 9; mod++) {
      curr[mod][digit % mod]++;
      for (let prevRem = 0; prevRem < mod; prevRem++) {
        curr[mod][(prevRem * 10 + digit) % mod] += prev[mod][prevRem];
      }
    }
    prev = curr;
    substrings += prev[digit][0];
  }
  return substrings;
};

// Three test cases
console.log(countSubstrings("12936")) // 11
console.log(countSubstrings("5701283")) // 18
console.log(countSubstrings("1010101010")) // 25