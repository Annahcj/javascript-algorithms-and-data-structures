 // 3045. Count Prefix and Suffix Pairs II
// You are given a 0-indexed string array words.
// Let's define a boolean function isPrefixAndSuffix that takes two strings, str1 and str2:
// isPrefixAndSuffix(str1, str2) returns true if str1 is both a prefix and a suffix of str2, and false otherwise.
// For example, isPrefixAndSuffix("aba", "ababa") is true because "aba" is a prefix of "ababa" and also a suffix, but isPrefixAndSuffix("abc", "abcd") is false.
// Return an integer denoting the number of index pairs (i, j) such that i < j, and isPrefixAndSuffix(words[i], words[j]) is true.


// Solution: Z Algorithm & Rolling Hash

// 1. Use the Z algorithm to find prefix/suffix matches.
  // To check whether the prefix ending at index i matches the suffix, check whether z[n - i - 1] === i + 1
// 2. Use rolling hash to calculate the hash for each prefix of each word.
  // Store the count of hashes for previous words.
  // Add count[hash] to the total number of pairs.

// n = number of words, m = max(words[i].length)
// Time Complexity: O(nm) 335ms
// Space Complexity: O(nm) 73.9MB
var countPrefixSuffixPairs = function(words) {
  let count = {}, pairs = 0;
  for (let word of words) {
    let z = zArray(word);
    let hash = 0, MOD = 1000000009, power = 31, powerValue = 1;
    for (let i = 0; i < z.length; i++) {
      let charcode = word.charCodeAt(i) - 96;
      hash = (hash + charcode * powerValue) % MOD;
      powerValue = (powerValue * power) % MOD;
      let prefixMatchesSuffix = z[z.length - i - 1] === i + 1;
      if (prefixMatchesSuffix || i === z.length - 1) {
        pairs += (count[hash] || 0);
      }
    }
    count[hash] = (count[hash] || 0) + 1;
  }  
  return pairs;
};

function zArray(s) {
  let n = s.length, z = Array(n).fill(0);
  for (let i = 1, left = 0, right = 0; i < n; i++) {
    if (i > right) { // i is outside of window, match characters
      left = right = i;
      while (right < n && s[right] === s[right - left]) {
        right++;
      }
      z[i] = right - left;
      right--;
    } else { // i is inside window
      if (z[i - left] + i <= right) { // can re-use prefix value since i is completely within the window
        z[i] = z[i - left];
      } else { // need to match characters since z[i - left] exceeds the right bound
        left = i;
        while (right < n && s[right] === s[right - left]) {
          right++;
        }
        z[i] = right - left;
        right--;
      }
    }
  }
  return z;
}


// Solution: Trie

// For each word, insert each pair of characters (i, word.length - i - 1) into a trie.
// Count the total number of matches in the trie.

// e.g: words = ['abc', 'abcabc']
  // 'abc' ->    'ac' + 'bb' + 'ca'
  // 'abcabc' -> 'ac' + 'bb' + 'ca' + 'ac' + 'bb' + 'ca'
// Notice that the pairs are initially the same between 'abc' and 'abcabc'

// n = number of words, m = max(word[i].length)
// Time Complexity: O(nm)
// Space Complexity: O(nm)
var countPrefixSuffixPairs = function(words) {
  let trie = new TrieNode(), pairs = 0;
  for (let word of words) {
    let node = trie;
    for (let i = 0; i < word.length; i++) {
      node = node.children;
      let charPair = word[i] + word[word.length - i - 1];
      if (!node[charPair]) node[charPair] = new TrieNode();
      node = node[charPair];
      pairs += node.count;
    }
    node.count++;
  }
  return pairs;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; 
  }
}

// Three test cases
console.log(countPrefixSuffixPairs(["a","aba","ababa","aa"])) // 4
console.log(countPrefixSuffixPairs(["pa","papa","ma","mama"])) // 2
console.log(countPrefixSuffixPairs(["abab","ab"])) // 0