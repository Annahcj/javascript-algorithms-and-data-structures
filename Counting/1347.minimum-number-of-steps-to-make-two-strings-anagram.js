// 1347. Minimum Number of Steps to Make Two Strings Anagram
// Given two equal-size strings s and t. In one step you can choose any character of t and replace it with another character.
// Return the minimum number of steps to make t an anagram of s.


// Solution: Counting

// Count the occurances of characters in s and t.
// Calculate the total differences in character counts between s and t.
// At the end, divide this difference by 2, because a character missing in one string will be counted once, and the character existing in the other string will be counted again.

// n = length of s, m = length of t
// Time Complexity: O(n + m) 63ms
// Space Complexity: O(1) 46.8MB
var minSteps = function(s, t) {
  let countS = Array(26).fill(0);
  for (let i = 0; i < s.length; i++) {
    countS[s.charCodeAt(i) - 97]++;
  }
  let countT = Array(26).fill(0);
  for (let i = 0; i < t.length; i++) {
    countT[t.charCodeAt(i) - 97]++;
  }
  let minSteps = 0;
  for (let i = 0; i < 26; i++) {
    minSteps += Math.abs(countS[i] - countT[i]);
  }
  return minSteps / 2;
};

// Four test cases
console.log(minSteps("bab", "aba")) // 1
console.log(minSteps("leetcode", "practice")) // 5
console.log(minSteps("anagram", "mangaar")) // 0
console.log(minSteps("friend", "family")) // 4