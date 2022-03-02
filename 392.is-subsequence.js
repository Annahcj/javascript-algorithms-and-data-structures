// 392. Is Subsequence
// Given two strings s and t, return true if s is a subsequence of t, or false otherwise.
// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).


// Solution 1: Two Pointers

// n = s.length, m = t.length
// Time Complexity: O(m) 135ms
// Space Complexity: O(1) 41.6MB
var isSubsequence = function(s, t) {
  let i = 0, j = 0;
  let n = s.length, m = t.length;
  while (i < n && j < m) {
    if (s[i] === t[j]) i++, j++;
    else j++;
  }
  return i === n;
};

// Solution 2: Follow-up Solution -> Hashmap for Indices

// When we get lots of incoming s, we only have to process t once.
// To process each s, the time complexity is O(n log(n)) where n is the length of s.

// 1. Save the indices for each character of t in a frequency array (index 0 = a, index 1 = b, ...): [[0,2],[1],[]...] = "aba"
// 2. Compare s with t.
  // When s[i] is not equal to t[j], binary search for the index of the next s[i] in t.

// n = s.length, m = t.length
// Time Complexity: O(m + n log(n)) 68ms
// Space Complexity: O(m) 43.5MB
var isSubsequence = function(s, t) {
  let indices = Array(26).fill(0).map(() => []);
  let n = s.length, m = t.length;
  for (let j = 0; j < m; j++) {
    indices[t.charCodeAt(j) - 97].push(j);
  }

  let i = 0, j = 0;
  while (i < n && j < m) {
    if (s[i] === t[j]) i++, j++;
    else {
      let nextIdx = getNextIndex(j, indices[s.charCodeAt(i) - 97]);
      if (nextIdx === -1) return false;
      j = nextIdx;
    }
  }
  return i === n;
};

// binary search for the first index larger than idx
function getNextIndex(idx, indices) {
  let low = 0, high = indices.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (indices[mid] > idx) high = mid;
    else low = mid + 1;
  }
  return indices[low] > idx ? indices[low] : -1;
}

// Two test cases to run function on
console.log(isSubsequence("abc", "ahbgdc")) // true
console.log(isSubsequence("axc", "ahbgdc")) // false