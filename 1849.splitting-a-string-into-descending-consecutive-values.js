// 1849. Splitting a String Into Descending Consecutive Values
// You are given a string s that consists of only digits.
// Check if we can split s into two or more non-empty substrings such that the numerical values of the substrings are in descending order and the difference between numerical values of every two adjacent substrings is equal to 1.
  // For example, the string s = "0090089" can be split into ["0090", "089"] with numerical values [90,89]. The values are in descending order and adjacent values differ by 1, so this way is valid.
  // Another example, the string s = "001" can be split into ["0", "01"], ["00", "1"], or ["0", "0", "1"]. However all the ways are invalid because they have numerical values [0,1], [0,1], and [0,0,1] respectively, all of which are not in descending order.
// Return true if it is possible to split s​​​​​​ as described above, or false otherwise.
// A substring is a contiguous sequence of characters in a string.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, lastNum), where
  // i = index in s
  // lastNum = the last number in the sequence (next number must be exactly lastNum - 1)

// At each index, try to build up the next number that is exactly lastNum - 1.
// To avoid integer overflow, make sure each number doesn't exceed the maximum safe integer.

// n = length of s, m = number of different numbers from s (there can be at most n^2)
// Time Complexity: O(nm) 73ms
// Space Complexity: O(nm) 43.1MB
var splitString = function(s) {
  let n = s.length, num = 0, memo = new Map();
  for (let i = 0; i < n - 1; i++) {
    num = num * 10 + Number(s[i]);
    if (num >= Number.MAX_SAFE_INTEGER) break;
    if (dp(i + 1, num)) return true;
  }
  return false;
  
  function dp(i, lastNum) {
    if (i === n) return true;
    let key = `${i},${lastNum}`;
    if (memo.has(key)) return memo.get(key);
    
    let num = 0;
    for (let j = i; j < n; j++) {
      num = num * 10 + Number(s[j]);
      if (num >= lastNum) break;
      if (num === lastNum - 1 && dp(j + 1, num)) {
        memo.set(key, true);
        return true;
      }
    }
    memo.set(key, false);
    return false;
  }  
};

// Three test cases to run function on
console.log(splitString("1234")) // false
console.log(splitString("050043")) // true
console.log(splitString("9080701")) // false