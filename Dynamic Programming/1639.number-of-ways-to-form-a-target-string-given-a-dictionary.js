// 1639. Number of Ways to Form a Target String Given a Dictionary
// You are given a list of strings of the same length words and a string target.
// Your task is to form target using the given words under the following rules:
  // target should be formed from left to right.
  // To form the ith character (0-indexed) of target, you can choose the kth character of the jth string in words if target[i] = words[j][k].
  // Once you use the kth character of the jth string of words, you can no longer use the xth character of any string in words where x <= k. In other words, all characters to the left of or at index k become unusuable for every string.
  // Repeat the process until you form the string target.
// Notice that you can use multiple characters from the same string in words provided the conditions above are met.
// Return the number of ways to form target from words. Since the answer may be too large, return it modulo 109 + 7.


// Solution: DP - Recursion w/ Memoization

// 1. Record the count of each character at each index of each word.
// 2. Use recursion and memoization to find the number of ways to form target from words.
  // dp will have two parameters: (i, k)
    // i = the index in target
    // k = the current k index we are up to
  // For each index k, we have two choices:
    // 1. Skip it.
    // 2. Use it, in this case we get the count of target[i] at index k and multiply with the answer.

// n = target.length, m = words[i].length, w = words.length
// Time Complexity: O(wm + nm) 482ms
// Space Complexity: O(26m + nm) 121.7MB
var numWays = function(words, target) {
  let n = target.length, m = words[0].length;
  let freq = Array(m).fill(0).map(() => Array(26).fill(0));
  for (let word of words) {
    for (let i = 0; i < m; i++) {
      let charcode = word.charCodeAt(i) - 97;
      freq[i][charcode]++;
    }
  }
  
  let memo = Array(n).fill(0).map(() => Array(m).fill(-1)), mod = 10 ** 9 + 7;
  return dp(0, 0);
  
  function dp(i, k) {
    if (i === n) return 1; // successfully constructed a string equal to target.
    if (k === m) return 0; // ran out of characters, invalid.
    if (memo[i][k] !== -1) return memo[i][k];
    
    let ans = dp(i, k + 1); // skip kth index
    let charcode = target.charCodeAt(i) - 97;
    if (freq[k][charcode] > 0) { // take kth index 
      ans = (ans + dp(i + 1, k + 1) * freq[k][charcode]) % mod;
    }    
    return memo[i][k] = ans;
  }
};

// Two test cases
console.log(numWays(["acca","bbbb","caca"], "aba")) // 6
console.log(numWays(["abba","baab"], "bab")) // 4