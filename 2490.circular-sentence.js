// 2490. Circular Sentence
// A sentence is a list of words that are separated by a single space with no leading or trailing spaces.
  // For example, "Hello World", "HELLO", "hello world hello world" are all sentences.
// Words consist of only uppercase and lowercase English letters. Uppercase and lowercase English letters are considered different.
// A sentence is circular if:
  // The last character of a word is equal to the first character of the next word.
  // The last character of the last word is equal to the first character of the first word.
// For example, "leetcode exercises sound delightful", "eetcode", "leetcode eats soul" are all circular sentences. However, "Leetcode is cool", "happy Leetcode", "Leetcode" and "I like Leetcode" are not circular sentences.
// Given a string sentence, return true if it is circular. Otherwise, return false.


// Solution: 

// n = sentence.length, m = number of words
// Time Complexity: O(n + m) 63ms
// Space Complexity: O(m) 42.2MB
var isCircularSentence = function(sentence) {
  let words = sentence.split(" "), n = words.length;
  if (words[0][0] !== words[n - 1][words[n - 1].length - 1]) return false;
  for (let i = 0; i < n - 1; i++) {
    let lastChar = words[i][words[i].length - 1];
    if (lastChar !== words[i + 1][0]) return false;
  }
  return true;
};

// Three test cases
console.log(isCircularSentence("leetcode exercises sound delightful")) // true
console.log(isCircularSentence("eetcode")) // true
console.log(isCircularSentence("Leetcode is cool")) // false