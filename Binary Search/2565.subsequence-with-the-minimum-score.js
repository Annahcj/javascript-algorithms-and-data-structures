// 2565. Subsequence With the Minimum Score
// You are given two strings s and t.
// You are allowed to remove any number of characters from the string t.
// The score string is 0 if no characters are removed from the string t, otherwise:
  // Let left be the minimum index among all removed characters.
  // Let right be the maximum index among all removed characters.
// Then the score of the string is right - left + 1.
// Return the minimum possible score to make t a subsequence of s.
// A subsequence of a string is a new string that is formed from the original string by deleting some (can be none) of the characters without disturbing the relative positions of the remaining characters. (i.e., "ace" is a subsequence of "abcde" while "aec" is not).


// Solution: Binary Search & Sliding Window w/ DP 

// Note: Removing characters that are not within the same substring is equivalent to removing the entire substring between the leftmost and rightmost indices.

// Binary search for the minimum substring length to remove.
  // Greedily match s with the prefix of t and store the index of s as we match each character in t (sIndex[i] = index in s after greedily matching up to index i in t)
  // Then, use a sliding window of size (t.length - len) to check whether there exists a prefix and suffix combination of t matching s.
  // Go through t backwards until we reach index len - 1 (because we need at least len characters remaining).
    // Greedily match the suffix of t with the suffix in s.
    // The length of the window = t.length - len
    // Suffix length: t.length - tIndex
    // Prefix length: t.length - len - suffix length
    // If the current s index > sIndex[prefix length - 1], that means we have matched the prefix of t up to sIndex[prefix length - 1] and matched the suffix of t up to the current s index without overlap in s.

// n = length of s, m = length of t
// Time Complexity: O(m log(n)) 127ms
// Space Complexity: O(m) 56.1MB
var minimumScore = function(s, t) {
  let low = 0, high = t.length;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (isPossible(mid)) high = mid;
    else low = mid + 1;
  }
  return low;
  
  function isPossible(len) {
    let sIndex = Array(t.length).fill(Infinity);
    for (let i = 0, tIndex = 0; i < s.length && tIndex < t.length; i++) {
      if (s[i] === t[tIndex]) {
        sIndex[tIndex] = i;
        tIndex++;
        if (tIndex >= t.length - len) return true; // prefix only
      }
    }
    for (let j = s.length - 1, tIndex = t.length - 1; j >= 0 && tIndex >= len; j--) {
      if (s[j] === t[tIndex]) {
        let suffixLen = t.length - tIndex;
        let prefixLen = t.length - len - suffixLen;
        if (suffixLen === t.length - len) return true; // suffix only
        if (sIndex[prefixLen - 1] < j) return true; // combination of prefix and suffix match
        tIndex--;
      }
    }
    return false;
  }
};

// Two test cases
console.log(minimumScore("abacaba", "bzaa")) // 1
console.log(minimumScore("cde", "xyz")) // 3