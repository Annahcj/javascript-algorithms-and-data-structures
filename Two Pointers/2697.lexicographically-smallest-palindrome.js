// 2697. Lexicographically Smallest Palindrome
// You are given a string s consisting of lowercase English letters, and you are allowed to perform operations on it. In one operation, you can replace a character in s with another lowercase English letter.
// Your task is to make s a palindrome with the minimum number of operations possible. If there are multiple palindromes that can be made using the minimum number of operations, make the lexicographically smallest one.
// A string a is lexicographically smaller than a string b (of the same length) if in the first position where a and b differ, string a has a letter that appears earlier in the alphabet than the corresponding letter in b.
// Return the resulting palindrome string.


// Solution: Greedy w/ Two Pointers 

// Traverse s with two pointers at the start and end.
// If the characters at the two pointers are different, then it is always optimal to take the smaller character.

// Time Complexity: O(n) 184ms
// Space Complexity: O(n) 51.9MB
var makeSmallestPalindrome = function(s) {
  let n = s.length, i = 0, j = n - 1;
  let res = s.split("");
  while (i < j) {
    if (s[i] !== s[j]) {
      let letter = s[i] < s[j] ? s[i] : s[j];
      res[i] = letter;
      res[j] = letter;
    }
    i++, j--;
  }
  return res.join("");
};

// Three test cases
console.log(makeSmallestPalindrome("egcfe")) // "efcfe"
console.log(makeSmallestPalindrome("abcd")) // "abba"
console.log(makeSmallestPalindrome("seven")) // "neven"