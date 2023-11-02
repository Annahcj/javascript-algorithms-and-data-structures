// 2707. Extra Characters in a String
// You are given a 0-indexed string s and a dictionary of words dictionary. You have to break s into one or more non-overlapping substrings such that each substring is present in dictionary. There may be some extra characters in s which are not present in any of the substrings.
// Return the minimum number of extra characters left over if you break up s optimally.


// Solution 1: Trie & DP 

// Use a trie to store the dictionary words.
// Memoize each dp(i), where dp(i) = minimum number of characters left over for the substring of index i to end of s.
// For each dp(i), iterate through s starting from index i until we don't have any more matches in the trie.
// Note: By using a trie, we save the time of searching a path where there are no future words (current substring is not a start of any words in dictionary).

// n = length of s, m = number of words in dictionary, k = max(dictionary[i].length)
// Time Complexity: O(n^2 + mk) 172ms
// Space Complexity: O(mk) 57.2MB
var minExtraChar = function(s, dictionary) {
  let n = s.length, memo = Array(n).fill(-1);
  let trie = new TrieNode();
  for (let word of dictionary) {
    let node = trie;
    for (let char of word) {
      node = node.children;
      if (!node[char]) node[char] = new TrieNode();
      node = node[char];
    }
    node.isWordEnd = true;
  }
  return dp(0);
  
  function dp(i) {
    if (i === n) return 0;
    if (memo[i] !== -1) return memo[i];
    
    let ans = 1 + dp(i + 1); // skip s[i]
    let node = trie;
    for (let j = i; j < n; j++) {
      node = node.children;
      if (!node[s[j]]) break; // stop when there are no matches in the trie
      node = node[s[j]];
      if (node.isWordEnd) ans = Math.min(ans, dp(j + 1));
    }
    return memo[i] = ans;
  }
};

class TrieNode {
  constructor() {
    this.children = {};
    this.isWordEnd = false;
  }
}


// Solution 2: Iterative DP & Hashset

// Bottom up iterative DP.
// dp[i] = minimum number of characters left over for the substring from index 0 to index i - 1.
// Use a hashset to store the words in the dictionary.

// n = length of s, m = number of words in dictionary, k = max(dictionary[i].length)
// Time Complexity: O(n^3 + mk) 163ms
// Space Complexity: O(mk) 51.1MB
var minExtraChar = function(s, dictionary) {
  let n = s.length, wordsSet = new Set(dictionary);
  let dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  for (let i = 0; i < n; i++) {
    dp[i + 1] = Math.min(dp[i + 1], 1 + dp[i]);
    for (let j = i; j >= 0; j--) {
      let substr = s.slice(j, i + 1);
      if (wordsSet.has(substr)) {
        dp[i + 1] = Math.min(dp[i + 1], dp[j]);
      }
    }
  }
  return dp[n];
};

// Two test cases
console.log(minExtraChar("leetscode", ["leet","code","leetcode"])) // 1
console.log(minExtraChar("sayhelloworld", ["hello","world"])) // 3