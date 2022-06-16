// 527. Word Abbreviation
// Given an array of distinct strings words, return the minimal possible abbreviations for every word.
// The following are the rules for a string abbreviation:
  // Begin with the first character, and then the number of characters abbreviated, followed by the last character.
  // If there is any conflict and more than one word shares the same abbreviation, a longer prefix is used instead of only the first character until making the map from word to abbreviation become unique. In other words, a final abbreviation cannot map to more than one original word.
  // If the abbreviation does not make the word shorter, then keep it as the original.


// Solution: Grouping & Sorting

// 1. Group the words by their abbreviation -> { abbr: [word, word, ...], abbr: [word, ...], ... }
  // The first abbreviation for a word looks like: e.g: 'interval' -> 'i6l', 'hello' -> 'h3o'.
// 2. For each group of words, 
  // a. Sort them in lexographical order (this will ensure words with the longest prefix in common will be adjacent to each other)
  // b. For each adjacent word, find the length of the longest common prefix.
  // Keep in mind adjacent words have two neighbors, so we need to keep track of the longer length.

// Time Complexity: O(n log(n)) 170ms
// Space Complexity: O(n) 52.3MB
var wordsAbbreviation = function(words) {
  let groups = new Map();
  for (let i = 0; i < words.length; i++) {
    let word = words[i];
    let abbr = getAbbr(word);
    if (!groups.has(abbr)) groups.set(abbr, []);
    groups.get(abbr).push([word, i]);
  }
  
  let res = Array(words.length);
  for (let [_, group] of groups) {
    group.sort();
    let lcp = Array(group.length).fill(1);
    for (let i = 1; i < group.length; i++) {
      let len = getLongestCommonPrefix(group[i - 1][0], group[i][0]);
      lcp[i] = len, lcp[i - 1] = Math.max(lcp[i - 1], len);
    }
    for (let i = 0; i < group.length; i++) {
      let [word, index] = group[i];
      res[index] = getAbbr(word, lcp[i]);
    }
  }
  return res;
  
  function getAbbr(word, prefixLen = 1) {
    if (word.length - prefixLen <= 2) return word;
    let prefix = word.slice(0, prefixLen);
    return prefix + (word.length - prefixLen - 1) + word[word.length - 1];
  }
  
  function getLongestCommonPrefix(word1, word2) {
    let i = 0;
    while (i < word1.length && i < word2.length && word1[i] === word2[i]) i++;
    return i + 1; // need one extra character to make it different
  }
};

// Two test cases to run function on
console.log(wordsAbbreviation(["like","god","internal","me","internet","interval","intension","face","intrusion"])) // ["l2e","god","internal","me","i6t","interval","inte4n","f2e","intr4n"]
console.log(wordsAbbreviation(["aa","aaa"])) // ["aa","aaa"]