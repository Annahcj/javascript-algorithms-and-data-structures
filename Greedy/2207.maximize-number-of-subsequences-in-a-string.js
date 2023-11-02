// 2207. Maximize Number of Subsequences in a String
// You are given a 0-indexed string text and another 0-indexed string pattern of length 2, both of which consist of only lowercase English letters.
// You can add either pattern[0] or pattern[1] anywhere in text exactly once. Note that the character can be added even at the beginning or at the end of text.
// Return the maximum number of times pattern can occur as a subsequence of the modified text.
// A subsequence is a string that can be derived from another string by deleting some or no characters without changing the order of the remaining characters.

 
// Solution: Greedy Logic

// Keep a running count of the number of occurances of pattern[0] and pattern[1].
// Whenever we encounter each pattern[1], get the number of pattern[0] that occured previously and add it to the count of subsequences.

// It is optimal to take the opposite of the one with more occurances (because we get more pairs).
  // If there are more of pattern[0], we can put pattern[1] at the end of the string and gain count(pattern[0]) more pairs.
  // If there are more of pattern[1], we can put pattern[0] at the start of the string and gain count(pattern[1]) more pairs.

// Time Complexity: O(n) 167ms
// Space Complexity: O(1) 49.3MB
var maximumSubsequenceCount = function(text, pattern) {
  let count = [0, 0], subsequences = 0;
  for (let char of text) {
    if (char === pattern[1]) {
      subsequences += count[0];
      count[1]++;
    }
    if (char === pattern[0]) count[0]++;
  }
  return subsequences + Math.max(count[0], count[1]);
}; 

// Two test cases
console.log(maximumSubsequenceCount("abdcdbc", "ac")) // 4
console.log(maximumSubsequenceCount("aabb", "ab")) // 6