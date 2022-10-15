// 1531. String Compression II
// Run-length encoding is a string compression method that works by replacing consecutive identical characters (repeated 2 or more times) with the concatenation of the character and the number marking the count of the characters (length of the run). For example, to compress the string "aabccc" we replace "aa" by "a2" and replace "ccc" by "c3". Thus the compressed string becomes "a2bc3".
// Notice that in this problem, we are not adding '1' after single characters.
// Given a string s and an integer k. You need to delete at most k characters from s such that the run-length encoded version of s has minimum length.
// Find the minimum length of the run-length encoded version of s after deleting at most k characters.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, k), where dp(i, k) = minimum length of substring from index i to n-1 with k deletions left over.
// For each dp(i, k),
  // Take a new group of characters (from index i to j).
  // Try to take the character with the maximum occurance and delete all other characters.
  // Take the minimum result out of every index j.

// n = length of s
// Time Complexity: O(n^2 * k) 576ms
// Space Complexity: O(nk) 48.5MB
var getLengthOfOptimalCompression = function(s, k) {
  let n = s.length, memo = Array(n).fill(0).map(() => Array(k + 1).fill(-1));
  return dp(0, k);
  
  function dp(i, k) {
    if (k < 0) return Infinity;
    if (i === n) return 0;
    if (memo[i][k] !== -1) return memo[i][k];
    
    let count = Array(26).fill(0), maxCount = 0;
    let ans = Infinity;
    for (let j = i; j < n; j++) {
      let charcode = s.charCodeAt(j) - 97;
      count[charcode]++;
      maxCount = Math.max(maxCount, count[charcode]);
      let numChars = j - i + 1;
      ans = Math.min(ans, dp(j + 1, k - numChars)); // delete all
      ans = Math.min(ans, 1 + getLength(maxCount) + dp(j + 1, k - (numChars - maxCount))); // delete all characters except maximum count character
    }
    return memo[i][k] = ans;
  }  
  
  function getLength(num) {
    if (num === 1) return 0;
    let digits = 0;
    while (num > 0) {
      digits++;
      num = Math.floor(num / 10);
    }
    return digits;
  }
};

// Three test cases
console.log(getLengthOfOptimalCompression("aaabcccd", 2)) // 4
console.log(getLengthOfOptimalCompression("aabbaa", 2)) // 2
console.log(getLengthOfOptimalCompression("aaaaaaaaaaa", 0)) // 3