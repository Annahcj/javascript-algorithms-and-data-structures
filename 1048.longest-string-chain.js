// 1048. Longest String Chain
// You are given an array of words where each word consists of lowercase English letters.
// wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.
// For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
// A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.
// Return the length of the longest possible word chain with words chosen from the given list of words.


// Solution: Sort & LIS

// 1. Sort words in increasing order of length.
// 2. Find longest increasing subsequence (but instead of increasing, find words that are one character different)
  // loop through words (pointer = i)
    // loop backwards from i - 1 to 0 (pointer = j)
      // if words[j] is one character away from words[i], update dp[i] to be Math.max(dp[i], dp[j] + 1)
// dp[i] denotes the longest word chain up to i.
// Return the maximum length in dp.

// n = number of words, s = length of each word
// Time Complexity: O(nss) 116ms
// Space Complexity: O(ns) 46.4MB
var longestStrChain = function(words) {
  words.sort((a, b) => a.length - b.length);
  function pred(word1, word2) {
    let i = 0, j = 0;
    while (i < word1.length && j < word2.length) {
      if (word1[i] !== word2[j]) {
        return word1.substr(i) === word2.substr(j + 1);
      } else i++, j++;
    }
    return j === word1.length;
  }
  let dp = Array(words.length).fill(1);
  for (var i = 0; i < words.length; i++) {
    for (var j = i - 1; j >= 0; j--) {
      if (words[j].length + 1 === words[i].length) {
        if (pred(words[j], words[i])) dp[i] = Math.max(dp[i], dp[j] + 1);
      }
    }
  }
  let maxLen = 0;
  for (var len of dp) maxLen = Math.max(maxLen, len);
  return maxLen;
};

// Three test cases to run function on
console.log(longestStrChain(["a","b","ba","bca","bda","bdca"])) // 4
console.log(longestStrChain(["xbc","pcxbcf","xb","cxbc","pcxbc"])) // 5
console.log(longestStrChain(["abcd","dbqca"])) // 1