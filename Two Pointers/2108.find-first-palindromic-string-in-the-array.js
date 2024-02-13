// 2108. Find First Palindromic String in the Array
// Given an array of strings words, return the first palindromic string in the array. If there is no such string, return an empty string "".


// Solution: Two Pointers

// Iterate through the words to find the first palindrome.
// To check whether a word is a palindrome, use two pointers starting from index (0, n - 1) and incrementally work your way to the middle checking whether each pair of characters is equal.

// n = length of words, m = words[i].length
// Time Complexity: O(nm) 54ms
// Space Complexity: O(1) 53MB
var firstPalindrome = function(words) {
  for (let word of words) {
    if (isPalindrome(word)) return word;
  }  
  return "";
};

function isPalindrome(word) {
  let start = 0, end = word.length - 1;
  while (start < end) {
    if (word[start] !== word[end]) return false;
    start++, end--;
  }
  return true;
}

// Two test cases
console.log(firstPalindrome(["abc","car","ada","racecar","cool"])) // "ada"
console.log(firstPalindrome(["notapalindrome","racecar"])) // "racecar"