// 2900. Longest Unequal Adjacent Groups Subsequence I
// You are given a string array words and a binary array groups both of length n, where words[i] is associated with groups[i].
// Your task is to select the longest alternating subsequence from words. A subsequence of words is alternating if for any two consecutive strings in the sequence, their corresponding elements in the binary array groups differ. Essentially, you are to choose strings such that adjacent elements have non-matching corresponding bits in the groups array.
// Formally, you need to find the longest subsequence of an array of indices [0, 1, ..., n - 1] denoted as [i0, i1, ..., i[k-1]], such that groups[i_j] != groups[i_j+1] for each 0 <= j < k - 1 and then find the words corresponding to these indices.
// Return the selected subsequence. If there are multiple answers, return any of them.
// Note: The elements in words are distinct.


// Solution: Greedy w/ DP

// Keep track of the longest subsequence ending with group 0, and ending with group 1.
// For each index i, we have two choices - take the longest choice:
  // 1. Take words[i] and the current longest ending at the opposite group (1 ^ groups[i]).
  // 2. Skip words[i] and take the current longest ending at groups[i].

// At the end, return the longer subsequence out of the two.

// Time Complexity: O(n^2) 1ms
// Space Complexity: O(n) 59MB
function getLongestSubsequence(words, groups) {
  const n = words.length, subseq = [[], []];
  for (let i = 0; i < n; i++) {
    if (subseq[1 ^ groups[i]].length + 1 > subseq[groups[i]].length) {
      subseq[groups[i]] = [...subseq[1 ^ groups[i]], words[i]];
    } 
  }  
  return subseq[0].length >= subseq[1].length ? subseq[0] : subseq[1];
};

// Two test cases
console.log(getLongestSubsequence(["e","a","b"], [0,0,1])) // ["e","b"]
console.log(getLongestSubsequence(["a","b","c","d"], [1,0,1,1])) // ["a","b","c"]