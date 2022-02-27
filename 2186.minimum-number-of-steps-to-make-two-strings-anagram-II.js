// 2186. Minimum Number of Steps to Make Two Strings Anagram II
// You are given two strings s and t. In one step, you can append any character to either s or t.
// Return the minimum number of steps to make s and t anagrams of each other.
// An anagram of a string is a string that contains the same characters with a different (or the same) ordering.


// Solution: Two Frequency Arrays

// Use two arrays of size 26 to store the frequency of each character in s and t.
// Return the sum of the absolute differences between each sFreq[i] and tFreq[i].

// n = s.length, m = t.length
// Time Complexity: O(n + m) 176ms
// Space Complexity: O(1) 53.9MB
var minSteps = function(s, t) {
  let sFreq = Array(26).fill(0), tFreq = Array(26).fill(0);
  for (let char of s) sFreq[char.charCodeAt() - 97]++;
  for (let char of t) tFreq[char.charCodeAt() - 97]++;
  let ans = 0;
  for (let i = 0; i < 26; i++) {
    ans += Math.abs(sFreq[i] - tFreq[i]);
  }
  return ans;
};

// Two test cases to run function on
console.log(minSteps("leetcode", "coats")) // 7
console.log(minSteps("night", "thing")) // 0