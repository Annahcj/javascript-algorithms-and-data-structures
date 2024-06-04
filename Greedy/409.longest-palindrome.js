// 409. Longest Palindrome
// Given a string s which consists of lowercase or uppercase letters, return the length of the longest palindrome that can be built with those letters.
// Letters are case sensitive, for example, "Aa" is not considered a palindrome.


// Solution 1: Counting

// Count the total number of pairs of same characters.
// A palindrome can have at most 1 odd count (the middle character), and every pair will wrap the middle on both ends.
// Use a boolean flag to check whether we have an odd count - it's possible that none of the counts are odd and the palindrome length will be even.

// Time Complexity: O(n) 58ms
// Space Complexity: O(1) (at most 52 characters) 51.4MB
var longestPalindrome = function(s) {
  let count = {};
  for (let char of s) {
    count[char] = (count[char] || 0) + 1;
  }
  let len = 0, hasOdd = false;
  for (let char in count) {
    len += count[char] % 2 === 0 ? count[char] : count[char] - 1;
    if (count[char] % 2 === 1) {
      hasOdd = true;
    }
  }
  return len + (hasOdd ? 1 : 0);
};


// Solution 2: Greedy w/ Hashset

// One pass through the string using a hashset to keep track of characters we have seen.
// When we encounter a character that already exists in the hashset, we can make a "pair" and remove it from the hashset.
// Otherwise, add it to the hashset.
// At the end, if the hashset has at least one character, we can add 1 to the length of the palindrome for the middle character.

// Time Complexity: O(n) 57ms
// Space Complexity: O(1) 51MB
var longestPalindrome = function(s) {
  let seen = new Set(), len = 0;
  for (let char of s) {
    if (seen.has(char)) {
      len += 2;
      seen.delete(char);
    } else {
      seen.add(char);
    }
  }
  return len + (seen.size > 0 ? 1 : 0);
};

// Two test cases
console.log(longestPalindrome("abccccdd")) // 7
console.log(longestPalindrome("a")) // 1