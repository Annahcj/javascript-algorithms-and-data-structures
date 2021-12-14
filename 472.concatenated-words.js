// 472. Concatenated Words
// Given an array of strings words (without duplicates), return all the concatenated words in the given list of words.
// A concatenated word is defined as a string that is comprised entirely of at least two shorter words in the given array.


// Solution: Dynamic Programming

// Since a word can only be formed by words that are shorter than it, we should sort the words by length.
// Add each word to a hashset after we check whether it is a concatenated word.

// 1. Sort words by length
// 2. Get the words that are concatenated

// n = words.length, m = length of longest word in words
// Time Complexity: O(nm^3) 1436ms
// Space Complexity: O(n) 52.5MB
var findAllConcatenatedWordsInADict = function(words) {
  words.sort((a, b) => a.length - b.length);
  let strings = new Set(), res = [];  
  for (var word of words) {
    if (isConcatenated(word)) res.push(word);
    strings.add(word);
  }
  return res;

  function isConcatenated(word) {
    let n = word.length, dp = Array(n).fill(false);
    for (var i = 0; i < n; i++) {
      for (var j = 0; j <= i; j++) {
        if (j !== 0 && !dp[j - 1]) continue;
        if (strings.has(word.slice(j, i + 1))) {
          dp[i] = true;
          break; // if we have a match, we don't need to keep checking because we don't care which words match, we have matched up to position i.
        }
      }
    }
    return dp[n - 1];
  }
};

// Two test cases to run function on
console.log(findAllConcatenatedWordsInADict(["cat","cats","catsdogcats","dog","dogcatsdog","hippopotamuses","rat","ratcatdogcat"])) // "catsdogcats","dogcatsdog","ratcatdogcat"]
console.log(findAllConcatenatedWordsInADict(["cat","dog","catdog"])) // ["catdog"]