// 291. Word Pattern II
// Given a pattern and a string s, return true if s matches the pattern.
// A string s matches a pattern if there is some bijective mapping of single characters to strings such that if each character in pattern is replaced by the string it maps to, then the resulting string is s. A bijective mapping means that no two characters map to the same string, and no character maps to two different strings.


// Solution: Backtracking

// Keep two maps: 
  // keys: for each character in pattern
  // words: for each word in s

// Try to map each string in s to the current key in pattern.
// If the current key and the word both map correctly to each other, recursively go to the next state.
// Otherwise if they are both not mapped to anything yet, 
  // map them to each other
  // recursively go to the next state
  // backtrack: erase the mapping 

// If we get to the end of both pattern and s, return true.

var wordPatternMatch = function(pattern, s) {
  return backtrack(0, 0, new Map(), new Map());
  
  function backtrack(i, j, keys, words) {
    if (i === pattern.length) return j === s.length;
    if (j === s.length) return false;
    let currKey = pattern[i];
    for (var idx = j; idx < s.length; idx++) {
      let word = s.slice(j, idx + 1);
      if (keys.has(currKey) && keys.get(currKey) === word && words.get(word) === currKey) {
        if (backtrack(i + 1, idx + 1, keys, words)) return true;
      } else if (!keys.has(currKey) && !words.has(word)) {
        keys.set(currKey, word);
        words.set(word, currKey);
        if (backtrack(i + 1, idx + 1, keys, words)) return true;
        keys.delete(currKey);
        words.delete(word);
      }
    }
    return false;
  }  
};

// Four test cases to run function on
console.log(wordPatternMatch("abba", "baab")) // true
console.log(wordPatternMatch("abab", "redblueredblue")) // true
console.log(wordPatternMatch("aaaa", "asdasdasdasd")) // true
console.log(wordPatternMatch("aabb", "xyzabcxzyabc")) // false