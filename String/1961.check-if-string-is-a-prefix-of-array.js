// 1961. Check If String Is a Prefix of Array
// Given a string s and an array of strings words, determine whether s is a prefix string of words.
// A string s is a prefix string of words if s can be made by concatenating the first k strings in words for some positive k no larger than words.length.
// Return true if s is a prefix string of words, or false otherwise.


// Keep a string 'str', add words to str one by one, keep checking if str is equal to s.

// Loop through words (pointer = i)
  // Add words[i] to str
  // If str is equal to s, return true.
// If iteration finishes, return false.

// w = words.length, s = s.length
// Time Complexity: O(w) 101ms
// Space Complexity: O(s) 40.5MB
var isPrefixString = function(s, words) {
  let str = '';
  for (let i = 0; i < words.length; i++) {
    str += words[i];
    if (str === s) return true;
  }
  return false;
};

// Three test cases
console.log(isPrefixString("a", [])) // false
console.log(isPrefixString("iloveleetcode", ["i", "love", "leetcode", "apples"])) // true
console.log(isPrefixString("a", ["aa", "aaaa", "banana"])) // false