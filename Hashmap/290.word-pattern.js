// 290. Word Pattern
// Given a pattern and a string s, find if s follows the same pattern.
// Here follow means a full match, such that there is a bijection between a letter in pattern and a non-empty word in s.


// Solution: Hashmap & Hashset

// Each character in pattern should correspond to the same word in s.
// If there are multiple characters mapped to the same word OR there are multiple words mapped to the same character, return false.

// We can map each word to each character, and keep a set for each character.

// n = pattern.length, m = s.length
// Time Complexity: O(n) 101ms
// Space Complexity: O(n + m) 38.5MB
var wordPattern = function(pattern, s) {
  let map = new Map(), keys = new Set(), n = pattern.length;
  s = s.split(" ");
  if (pattern.length !== s.length) return false;
  for (var i = 0; i < n; i++) {
    let [key, word] = [pattern[i], s[i]];
    if (!map.has(word)) { // new word
      if (keys.has(key)) return false; // if the key is already mapped to another word, return false.
      keys.add(key);
      map.set(word, key);
    } else if (map.get(word) !== key) return false; // if the word is mapped to a different key already, return false.
  }
  return true;
};

// Three test cases to run function on
console.log(wordPattern("abba", "dog cat cat dog")) // true
console.log(wordPattern("abba", "dog cat cat fish")) // false
console.log(wordPattern("aaaa", "dog cat cat dog")) // false