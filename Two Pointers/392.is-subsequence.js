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
// To process each s, the time complexity will be O(n log(m)) where n is the length of s.

// 1. Save the indices for each character of t grouped by character (e.g: "aba" = [[0,2],[1],[]...])
// 2. Go through each index in s and keep track of the pointer in t
  // Binary search through indexesT[charcode] for the lowest index that is larger than the current index in t.

// n = s.length, m = t.length
// Time Complexity: O(m + n log(m)) 48ms
// Space Complexity: O(m) 42MB
var isSubsequence = function(s, t) {
  let indexesT = Array(26).fill(0).map(() => []);
  for (let i = 0; i < t.length; i++) {
    indexesT[t.charCodeAt(i) - 97].push(i);
  }
  for (let i = 0, j = -1; i < s.length; i++) {
    let nextIndex = getNextIndex(indexesT[s.charCodeAt(i) - 97], j);
    if (nextIndex === -1) return false;
    j = nextIndex;
  }
  return true;
};

// find lowest index that is larger than prevIndex
function getNextIndex(indexes, prevIndex) {
  if (!indexes.length) return -1;
  let low = 0, high = indexes.length - 1;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (indexes[mid] > prevIndex) high = mid;
    else low = mid + 1;
  }
  return indexes[low] > prevIndex ? indexes[low] : -1;
}

// Two test cases
console.log(isSubsequence("abc", "ahbgdc")) // true
console.log(isSubsequence("axc", "ahbgdc")) // false