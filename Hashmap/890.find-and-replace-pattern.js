// 890. Find and Replace Pattern
// Given a list of strings words and a string pattern, return a list of words[i] that match pattern. You may return the answer in any order.
// A word matches the pattern if there exists a permutation of letters p so that after replacing every letter x in the pattern with p(x), we get the desired word.
// Recall that a permutation of letters is a bijection from letters to letters: every letter maps to another letter, and no two letters map to the same letter.


// Solution: Two Maps

// Maintain two maps:
  // Map characters in a word to characters in pattern
  // Map characters in pattern to characters in a word

// Don't include the word if both maps aren't consistent with each other, for e.g:
  // Character exists in one map but not the other.
  // Characters exists in both maps but map to different characters.

// n = length of words, m = length of a word
// Time Complexity: O(n * m) 95ms
// Space Complexity: O(m) (not including output) 46.4MB
var findAndReplacePattern = function(words, pattern) {
  let res = [];
  for (let word of words) {
    if (matches(word, pattern)) res.push(word);
  }
  return res;
  
  function matches(word, pattern) {
    let mapWordToPattern = new Map(), mapPatternToWord = new Map();
    for (let i = 0; i < word.length; i++) {
      if (mapWordToPattern.has(word[i])) {
        let wordToPattern = mapWordToPattern.get(word[i]);
        let patternToWord = mapPatternToWord.get(pattern[i]);
        if (wordToPattern !== pattern[i] || patternToWord !== word[i]) return false;
      } else {
        if (mapPatternToWord.has(pattern[i])) return false;
        mapWordToPattern.set(word[i], pattern[i]);
        mapPatternToWord.set(pattern[i], word[i]);
      }
    }
    return true;
  }
};

// Two test cases 
console.log(findAndReplacePattern(["abc","deq","mee","aqq","dkd","ccc"], "abb")) // ["mee","aqq"]
console.log(findAndReplacePattern(["a","b","c"], "a")) // ["a","b","c"]