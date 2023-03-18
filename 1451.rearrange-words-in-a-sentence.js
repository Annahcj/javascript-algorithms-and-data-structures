// 1451. Rearrange Words in a Sentence
// Given a sentence text (A sentence is a string of space-separated words) in the following format:
  // First letter is in upper case.
  // Each word in text are separated by a single space.
// Your task is to rearrange the words in text such that all words are rearranged in an increasing order of their lengths. If two words have the same length, arrange them in their original order.
// Return the new text following the format shown above.

 
// Solution: Sorting

// Split the sentence into words.
// Sort based on length, then by the original index if the length is equal.

// n = length of text, m = number of words in the sentence
// Time Complexity: O(n + m log(m)) 74ms
// Space Complexity: O(n) 48.6MB
var arrangeWords = function(text) {
  let words = text.toLowerCase().split(" ").map((word, idx) => [word, idx]);
  words = words.sort((a, b) => a[0].length === b[0].length ? a[1] - b[1] : a[0].length - b[0].length);
  words[0][0] = words[0][0][0].toUpperCase() + words[0][0].slice(1); 
  return words.map(([word]) => word).join(" ");
};

// Two test cases
console.log(arrangeWords("Leetcode is cool")) // "Is cool leetcode"
console.log(arrangeWords("Keep calm and code on")) // "On and keep calm code"