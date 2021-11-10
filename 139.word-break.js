// 139. Word Break
// Given a string s and a dictionary of strings wordDict, return true if s can be segmented into a space-separated sequence of one or more dictionary words.


// Solution 1: BFS

// Turn the word dictionary into a hashmap/set for more efficient lookup.
// Create a visited map (for storing indexes we have visited), and a queue for bfs.
// Loop while the length of queue is bigger than 0
  // Take the first element from the queue, store it in a variable curr.
  // Keep a 'word' variable to store the ongoing string as you loop through s from the 'curr' starting index.
  // Loop through s from curr index to the end of s (pointer = i) 
    // word += s[i] (build up ongoing string)
    // Check if current string 'word' is one of the words in wordDict
      // If i is the last element of s (we got through s), return true.
      // Push i + 1 (next index to check from) into queue 
  // Add the 'curr' index to visited (so we don't have to go over it more than once)
// If there is nothing left in the queue and we have got to the end, return false.

// Time Complexity: O(n^2) 96ms
// Space Complexity: O(wordDict + n) 41.3MB
var wordBreak = function(s, wordDict) {
  let words = new Set(wordDict);
  let visited = {};
  let queue = [0];
  while (queue.length) {
    let curr = queue.shift();
    if (!visited[curr]) {
      let word = "";
      for (var i = curr; i < s.length; i++) {
        word += s[i];
        if (words.has(word)) {
          if (i === s.length - 1) return true;
          queue.push(i + 1);
        }
      }
    }
    visited[curr] = true;
  }
  return false;
};


// Solution 2: Dynamic Programming

// Thoughts:
// Use an array to keep track of substrings that match words in wordDict (true or false).
// Generate substrings of every length from every letter in s.

// e.g.
// s: 'leetcode'
// wordDict: ['leet', 'code']
//
// end = 1 start = 0 l
// dp = [true, false, false, false, false, false, false, false, false]
// end = 2 start = 0 le
// end = 2 start = 1  e
// dp = [true, false, false, false, false, false, false, false, false]
// end = 3 start = 0 lee
// end = 3 start = 1  ee
// end = 3 start = 2   e
// dp = [true, false, false, false, false, false, false, false, false]
// end = 4 start = 0 leet
// has a match
// dp = [true, false, false, false, true, false, false, false, false]
//
// end = 5 start = 0 leetc
// end = 5 start = 1  eetc
// end = 5 start = 2   etc
// end = 5 start = 3    tc
// end = 5 start = 4     c
// dp = [true, false, false, false, true, false, false, false, false]
// end = 6 start = 0 leetco
// end = 6 start = 1  eetco
// end = 6 start = 2   etco
// end = 6 start = 3    tco
// end = 6 start = 4     co
// end = 6 start = 5      o
// dp = [true, false, false, false, true, false, false, false, false]
// end = 7 start = 0 leetcod
// end = 7 start = 1  eetcod
// end = 7 start = 2   etcod
// end = 7 start = 3    tcod
// end = 7 start = 4     cod
// end = 7 start = 5      od
// end = 7 start = 6       d
// dp = [true, false, false, false, true, false, false, false, false]
// end = 8 start = 0 leetcode
// end = 8 start = 1  eetcode
// end = 8 start = 2   etcode
// end = 8 start = 3    tcode
// end = 8 start = 4     code
// has a match
// dp = [true, false, false, false, true, false, false, false, true]

// Algorithm:
// Turn wordDict into a set (for efficient lookup)
// Initialize a dp array (length of s + 1) and fill it up with false.
// Initialize the first item of dp to be true (since we will always be checking whether dp[start] is true)
// Loop through s from [1, ..., s.length - 1] (pointer = end)
  // Loop through s from [0, ..., end] (pointer = start)
    // Check if dp[start] is true (the substring from beginning of s to 'start' consists of perfect segments of words in wordDict) AND the new substring from start to end is a word in wordDict
      // If so, set dp[end] to true 
      // break 
// Return the last item of dp  

// Time Complexity: O(n^2) 80ms
// Space Complexity: O(n) 40.9MB
var wordBreak = function(s, wordDict) {
  let words = new Set(wordDict);
  let dp = Array(s.length + 1).fill(false);
  dp[0] = true;
  for (var end = 1; end <= s.length; end++) {
    for (var start = 0; start < end; start++) {
      if (dp[start] && words.has(s.slice(start, end))) {
        dp[end] = true;
        break;
      }
    }
  }
  return dp[dp.length - 1];
};
  
// Solution 3: Trie w/ Recursion & Memoization

var wordBreak = function(s, wordDict) {
  let trie = new Trie(wordDict);
  let memo = Array(s.length);
  return recurse(0);

  function recurse(idx) {
    if (memo[idx] !== undefined) return memo[idx];
    if (idx === s.length) return true;
    let node = trie.root.children;
    // dfs to find all words that match from idx
    let ans = false;
    let i = idx;
    while (node[s[i]]) {
      node = node[s[i]];
      // if node is a word, recurse at index + 1 (next index to start searching again)
      if (node.wordEnd) {
        // if recurse(i + 1) returns true, set ans to true
        if (recurse(i + 1)) ans = true;
      }
      node = node.children;
      i++;
    }
    // memoize ans and return it for earlier calls
    memo[idx] = ans;
    return ans;
  }
};
class TrieNode {
  constructor() {
    this.children = {};
    this.wordEnd = false;
  }
}
class Trie {
  constructor(words) {
    this.root = new TrieNode();
    for (var word of words) {
      let node = this.root;
      for (var char of word) {
        node = node.children;
        if (!node[char]) node[char] = new TrieNode();
        node = node[char];
      }
      node.wordEnd = true;
    }
  }
}


// Four test cases to run function on
console.log(wordBreak("abaabbbbbbbbbbbbaaa", ["a","b"])) // true
console.log(wordBreak("leetcode", ["leet","code"])) // true
console.log(wordBreak("applepenapple", ["apple","pen"])) // true
console.log(wordBreak("catsandog", ["cats","dog","sand","and","cat"])) // false