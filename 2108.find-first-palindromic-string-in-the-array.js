// 2108. Find First Palindromic String in the Array
// Given an array of strings words, return the first palindromic string in the array. If there is no such string, return an empty string "".


// Solution: Two Pointers

// Use two pointers to check if a word is a palindrome.
// Return the first word that is a palindrome, otherwise return "".

// n = length of words, m = length of longest word in words
// Time Complexity: O(nm)
// Space Complexity: O(1)
var firstPalindrome = function(words) {
  for (var word of words) {
    if (isPalin(word)) return word;
  }
  return "";
  
  function isPalin(str) {
    let start = 0, end = str.length - 1;
    while (start < end) {
      if (str[start] !== str[end]) return false;
      start++, end--;
    }
    return true;
  }  
};

// Two test cases to run function on
console.log(firstPalindrome(["abc","car","ada","racecar","cool"])) // "ada"
console.log(firstPalindrome(["notapalindrome","racecar"])) // "racecar"