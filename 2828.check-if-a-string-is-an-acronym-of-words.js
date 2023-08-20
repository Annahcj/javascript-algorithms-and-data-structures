// 2828. Check if a String Is an Acronym of Words
// Given an array of strings words and a string s, determine if s is an acronym of words.
// The string s is considered an acronym of words if it can be formed by concatenating the first character of each string in words in order. For example, "ab" can be formed from ["apple", "banana"], but it can't be formed from ["bear", "aardvark"].
// Return true if s is an acronym of words, and false otherwise.

 
// Solution: Compare First Letters

// Check that the first letters of each words[i] are each equal to s[i].

// n = number of words
// Time Complexity: O(n) 67ms
// Space Complexity: O(1) 44.6MB
var isAcronym = function(words, s) {
  if (words.length !== s.length) return false;
  for (let i = 0; i < words.length; i++) {
    if (words[i][0] !== s[i]) return false;
  }
  return true;
};

// Two test cases
console.log(isAcronym(["alice","bob","charlie"], "abc")) // true
console.log(isAcronym(["an","apple"], "a")) // false