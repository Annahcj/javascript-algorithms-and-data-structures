// 1328. Break a Palindrome
// Given a palindromic string of lowercase English letters palindrome, replace exactly one character with any lowercase English letter so that the resulting string is not a palindrome and that it is the lexicographically smallest one possible.
// Return the resulting string. If there is no way to replace a character to make it not a palindrome, return an empty string.
// A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, a has a character strictly smaller than the corresponding character in b. For example, "abcc" is lexicographically smaller than "abcd" because the first position they differ is at the fourth character, and 'c' is smaller than 'd'.


// Solution: 

// We know that we only have to loop up to half of the string since the opposite character will be the same.
// However, on a string with an odd length, like "aba", we can only loop up to the first character, hence -> Math.floor(palindrome.length / 2)

// Edge case: If the palindrome has a length of 1, we know that it's impossible to not be a palindrome.

// Loop through from 0 to Math.floor(palindrome.length / 2) (pointer = i)
  // if palindrome[i] is not equal to "a", change it to "a" and return it.

// Otherwise if the entire string consists of a's, change the last character to "b" and return it.


// Time Complexity: O(n) 56ms
// Space Complexity: O(n) 38.7MB
var breakPalindrome = function(palindrome) {
  if (palindrome.length === 1) return "";
  for (let i = 0; i < Math.floor(palindrome.length / 2); i++) {
    if (palindrome[i] !== 'a') {
      return palindrome.slice(0, i) + 'a' + palindrome.slice(i + 1);
    }
  }  
  return palindrome.slice(0, palindrome.length - 1) + 'b';
};

// Four test cases 
console.log(breakPalindrome("abccba")) // "aaccba"
console.log(breakPalindrome("a")) // ""
console.log(breakPalindrome("aa")) // "ab"
console.log(breakPalindrome("aba")) // "abb"