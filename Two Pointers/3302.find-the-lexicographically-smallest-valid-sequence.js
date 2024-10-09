// 3302. Find the Lexicographically Smallest Valid Sequence
// You are given two strings word1 and word2.
// A string x is called almost equal to y if you can change at most one character in x to make it identical to y.
// A sequence of indices seq is called valid if:
  // The indices are sorted in ascending order.
  // Concatenating the characters at these indices in word1 in the same order results in a string that is almost equal to word2.
// Return an array of size word2.length representing the lexicographically smallest valid sequence of indices. If no such sequence of indices exists, return an empty array.
// Note that the answer must represent the lexicographically smallest array, not the corresponding string formed by those indices.


// Solution: Two Pointers

// It's always optimal to take the smallest possible indices as early on as possible.
// We need to know whether it's possible to match all the remaining characters in word2, regardless of the lexicographical part.
// suffixMatch[i] = the rightmost index of a subsequence in word1 matching the suffix in word2 starting from index i.

// Then, go through from left-to-right and match the earliest possible characters.
// Use the preprocessed suffix matches to determine whether it's valid to skip word2[i].
// Take the earliest possible character to skip.

// n = length of word1, m = length of word2
// Time Complexity: O(n + m) 517ms
// Space Complexity: O(n + m) 95.7MB
function validSequence(word1, word2) {
  let n = word1.length, m = word2.length;
  let suffixMatch = Array(m);
  for (let i = n - 1, j = m - 1; i >= 0 && j >= 0; i--) {
    if (word2[j] === word1[i]) {
      suffixMatch[j] = i;
      j--;
    }
  }
  let indices = [];
  for (let i = 0, j = 0; i < n && j < m; i++) {
    if (word2[j] === word1[i]) {
      indices.push(i);
      j++;
      continue; // for cases where a character is a match hence we don't need to waste the skipped character here
    }
    if (j === m - 1 || suffixMatch[j + 1] > i) {
      indices.push(i);
      return [...indices, ...remainingIndices(i + 1, j + 1)];
    }
  }
  return indices.length === m ? indices : [];
  
  function remainingIndices(i, j) {
    let indices = [];
    while (i < n && j < m) {
      if (word1[i] === word2[j]) {
        indices.push(i);
        j++;
      } 
      i++;
    }
    return indices;
  }
};

// Three test cases
console.log(validSequence("vbcca", "abc")) // [0,1,2]
console.log(validSequence("bacdc", "abc")) // [1,2,4]
console.log(validSequence("aaaaaa", "aaabc")) // []