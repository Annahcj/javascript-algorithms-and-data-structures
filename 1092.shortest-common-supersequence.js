// 1092. Shortest Common Supersequence
// Given two strings str1 and str2, return the shortest string that has both str1 and str2 as subsequences. If there are multiple valid strings, return any of them.
// A string s is a subsequence of string t if deleting some number of characters from t (possibly 0) results in the string s.


// Solution: Longest Common Subsequence

// let common be lcs of str1 and str2
// let res be ''
// let i be the pointer for str1, j for str2
// loop through each char in common
  // loop while str1[i] doesn't match char
    // append str1[i] to res
    // increment i by one
  // loop while str2[j] doesn't match char
    // append str2[j] to res
    // increment j by one
  // append char to res, increment i and j by 1.
// return res + str1.slice(i) + str2.slice(j)

// create a function lcs which finds the longest common subsequence
// lcs: (s1 (string1), s2 (string2))
  // create a dp matrix n + 1 by m + 1 filled with empty strings ('')
  // loop backwards from n - 1 to 0 (pointer = i) (for s1)
    // loop backwards from m - 1 to 0 (pointer = j) (for s2)
      // if s1[i] matches s2[j]
        // set dp[i][j] to s1[i] + dp[i + 1][j + 1]
      // otherwise,
        // set dp[i][j] to the longer string of dp[i + 1][j], dp[i][j + 1]
  // return dp[0][0]

// Time Complexity: O(nm) 109ms
// Space Complexity: O(nm * n) 49.5MB 
var shortestCommonSupersequence = function(str1, str2) {
  let common = lcs(str1, str2);
  let res = '';
  let i = 0, j = 0;
  for (var char of common) {
    while (str1[i] !== char) {
      res += str1[i];
      i++;
    } 
    while (str2[j] !== char) {
      res += str2[j];
      j++;
    }
    res += char, i++, j++;
  }
  return res + str1.slice(i) + str2.slice(j);
  
  function lcs(s1, s2) {
    let n = s1.length, m = s2.length;
    let dp = Array(n + 1);
    for (var i = 0; i <= n; i++) {
      dp[i] = Array(m + 1).fill('');
    }
    for (var i = n - 1; i >= 0; i--) {
      for (var j = m - 1; j >= 0; j--) {
        if (s1[i] === s2[j]) {
          dp[i][j] = s1[i] + dp[i + 1][j + 1];
        } else {
          dp[i][j] = dp[i + 1][j].length > dp[i][j + 1].length ? dp[i + 1][j] : dp[i][j + 1];
        }
      }
    }
    return dp[0][0];
  }  
};

// Three test cases to run function on
console.log(shortestCommonSupersequence("bbbaaaba", "bbababbb")) // "bbabaaababb"
console.log(shortestCommonSupersequence("abac", "cab")) // "cabac" 
console.log(shortestCommonSupersequence("aaaaaaaa", "aaaaaaaa")) // "aaaaaaaa" 