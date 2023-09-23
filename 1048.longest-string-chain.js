// 1048. Longest String Chain
// You are given an array of words where each word consists of lowercase English letters.
// wordA is a predecessor of wordB if and only if we can insert exactly one letter anywhere in wordA without changing the order of the other characters to make it equal to wordB.
// For example, "abc" is a predecessor of "abac", while "cba" is not a predecessor of "bcad".
// A word chain is a sequence of words [word1, word2, ..., wordk] with k >= 1, where word1 is a predecessor of word2, word2 is a predecessor of word3, and so on. A single word is trivially a word chain with k == 1.
// Return the length of the longest possible word chain with words chosen from the given list of words.


// Solution: Sorting & Hashmap

// 1. Sort the words by shortest length.
// 2. Go through the sorted words and keep track of the longest chain length ending at each word.
  // Try to create a new word removing one character from it.
  // If the map contains that word with one character removed, the new length of the chain is map.get(oneCharRemoved) + 1
  // Return the maximum chain length.

// n = number of words, m = max(words[i].length)
// Time Complexity: O(nm^2) 78ms
// Space Complexity: O(nm) 49MB
var longestStrChain = function(words) {
  words.sort((a, b) => a.length - b.length);
  let map = new Map(), n = words.length, maxChainLength = 0;
  for (let i = 0; i < n; i++) {
    let chainLength = 1;
    for (let j = 0; j < words[i].length; j++) {
      let oneCharRemoved = words[i].slice(0, j) + words[i].slice(j + 1);
      if (map.has(oneCharRemoved)) {
        chainLength = Math.max(chainLength, map.get(oneCharRemoved) + 1);
      }
    }
    map.set(words[i], chainLength);
    maxChainLength = Math.max(maxChainLength, chainLength);
  }
  return maxChainLength;
};

// Three test cases
console.log(longestStrChain(["a","b","ba","bca","bda","bdca"])) // 4
console.log(longestStrChain(["xbc","pcxbcf","xb","cxbc","pcxbc"])) // 5
console.log(longestStrChain(["abcd","dbqca"])) // 1