// 2901. Longest Unequal Adjacent Groups Subsequence II
// You are given a string array words, and an array groups, both arrays having length n.
// The hamming distance between two strings of equal length is the number of positions at which the corresponding characters are different.
// You need to select the longest subsequence from an array of indices [0, 1, ..., n - 1], such that for the subsequence denoted as [i0, i1, ..., ik-1] having length k, the following holds:
  // For adjacent indices in the subsequence, their corresponding groups are unequal, i.e., groups[ij] != groups[ij+1], for each j where 0 < j + 1 < k.
  // words[ij] and words[ij+1] are equal in length, and the hamming distance between them is 1, where 0 < j + 1 < k, for all indices in the subsequence.
// Return a string array containing the words corresponding to the indices (in order) in the selected subsequence. If there are multiple answers, return any of them.
// Note: strings in words may be unequal in length.


// Solution 1: DP

// Use DP to find the longest valid subsequence ending at every index.
// dp[i] = longest valid subsequence ending at index i.

// For every i, go through every j where j < i, 
// set dp[i] = 1 + dp[j] if both of the following conditions are met:
  // groups[i] is not equal to groups[j]
  // The hamming distance between words[i] and words[j] is equal to 1.

// Use an array prev to store the previous index j for every result we are taking that is longest than the current maximum.
// At the end, find the maximum dp[i] and backtrack the path using the prev array.

// n = length of words, m = max(words[i].length)
// Time Complexity: O(n^2 * m) 122ms
// Space Complexity: O(n) 58MB
var getWordsInLongestSubsequence = (words, groups) => {
  const n = words.length, dp = Array(n).fill(1);
  const prev = Array(n).fill(-1);
  let maxLen = 1, maxLastIndex = 0;
  for (let i = 1; i < n; i++) {
    for (let j = 0; j < i; j++) {
      if (groups[i] === groups[j] || hammingDistance(words[i], words[j]) !== 1) continue;
      if (1 + dp[j] > dp[i]) {
        dp[i] = 1 + dp[j];
        prev[i] = j;
      }
      if (dp[i] > maxLen) {
        maxLen = dp[i];
        maxLastIndex = i;
      }
    }
  }  
  const res = [];
  let index = maxLastIndex;
  while (index !== -1) {
    res.push(words[index]);
    index = prev[index];
  }
  return res.reverse();
};

function hammingDistance(word1, word2) {
  if (word1.length !== word2.length) {
    return -1;
  }
  let dist = 0;
  for (let i = 0; i < word1.length; i++) {
    dist += word1[i] !== word2[i] ? 1 : 0;
  }
  return dist;
}


// Solution 2: DP & Precomputing for Hamming Distance

// For efficient lookup of words with hamming distance of 1,
// for each words[i], precompute every possible words[i] replacing one character.
// e.g. "abc" -> "#bc", "a#c", "ab#".
// Store the indices for each replaced words[i].

// Use DP to calculate the longest valid subsequence for each index.
// For every i, go through each character k in words[i],
// Generate the word without the character k, and go through the array of indices matching the generated word.
// Set dp[i] = 1 + dp[j] if groups[i] is not equal to groups[j].

// Use an array prev to store the previous index j for every result we are taking that is longest than the current maximum.
// At the end, find the maximum dp[i] and backtrack the path using the prev array.

// Note: The time complexity is the same as the other DP solution, but in the best case it can be much faster when there are not many matching words.
// n = length of words, m = max(words[i].length)
// Time Complexity: O(n^2 * m) 50ms
// Space Complexity: O(nm) 65MB
var getWordsInLongestSubsequence = (words, groups) => {
  const n = words.length, dp = Array(n).fill(1);
  const map = {}, prev = Array(n).fill(-1);
  let maxLen = 1, maxLastIndex = 0;
  for (let i = 0; i < n; i++) {
    const replaced = [];
    for (let k = 0; k < words[i].length; k++) {
      const withoutK = `${words[i].slice(0, k)}#${words[i].slice(k + 1)}`;
      replaced.push(withoutK);
      const matching = map[withoutK] || [];
      for (let j of matching) {
        if (groups[i] === groups[j]) continue;
        if (1 + dp[j] > dp[i]) {
          dp[i] = 1 + dp[j];
          prev[i] = j;
        }
        if (dp[i] > maxLen) {
          maxLen = dp[i];
          maxLastIndex = i;
        }
      }
    }
    for (let word of replaced) {
      if (!map[word]) map[word] = [];
      map[word].push(i);
    }
  }
  const res = [];
  let index = maxLastIndex;
  while (index !== -1) {
    res.push(words[index]);
    index = prev[index];
  }
  return res.reverse();
};

// Two test cases
console.log(getWordsInLongestSubsequence(["bab","dab","cab"], [1,2,2])) // ["bab","cab"]
console.log(getWordsInLongestSubsequence(["a","b","c","d"], [1,2,3,4])) // ["a","b","c","d"]