// 2311. Longest Binary Subsequence Less Than or Equal to K
// You are given a binary string s and a positive integer k.
// Return the length of the longest subsequence of s that makes up a binary number less than or equal to k.
// Note:
  // The subsequence can contain leading zeroes.
  // The empty string is considered to be equal to 0.
  // A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.


// Solution: Greedy

// First, we can also take all the zeros because any number of zeros still becomes 0 and will always be smaller than k.
// After that, greedily try to add as many ones as possible from right to left (least significant to most significant positions).
// When we take in a "1", we can increase our count by 1 because we are pushing all the left 0's one bit further left.

// Time Complexity: O(n) 73ms
// Space Complexity: O(1) 42.5MB
var longestSubsequence = function(s, k) {
  let count = 0;
  for (let char of s) {
    count += char === '0' ? 1 : 0;
  }

  let mask = 0, bit = 1;
  for (let i = s.length - 1; i >= 0; i--) {
    if ((mask | bit) > k) break;
    if (s[i] === '1') {
      mask |= bit;
      count++;
    }
    bit <<= 1;
  }
  return count;
};

// Two test cases
console.log(longestSubsequence("1001010", 5)) // 5
console.log(longestSubsequence("00101001", 1)) // 6