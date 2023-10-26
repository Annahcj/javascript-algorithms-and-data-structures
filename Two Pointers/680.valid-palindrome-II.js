// 680. Valid Palindrome II
// Given a string s, return true if the s can be palindrome after deleting at most one character from it.


// Solution 1: Two Pointers

// Thoughts:
// We can set two pointers at both ends and move them inward at the same time as long as the values at both positions are equal.
// Since we can delete at MOST 1 character, the moment we find the first pair of characters that aren't equal, we would have two situations that could possibly be a palindrome. -> (i, j - 1) or (i + 1, j) 
// e.g: 'abbaa' ->
// 'abbaa'
//  i   j  (s[i] is 'a' and s[j] is 'a')
// 'abbaa'
//   i i   (s[i] is 'b' and s[j] is 'a'), since they are not equal, we look at the two sitations in which could result in a palindrome.
// situation 1: (i, j - 1)
// 'abbaa'
//   ij
// situation one returns a palindrome since s[i] is equal to s[j]
// situation 2: (i + 1, j)
// 'abbaa'
//    ij
// situation two returns NOT a palindrome since s[i] is not equal to s[j]
// With this in mind, once we come to this point, we can just loop through the remaining characters for these two situations and return true if either of these return true.

// Algorithm:
// Helper function -> isPalindrome (accepts the main string, index1 (i), index2 (j))
  // Loop while i is smaller than j
    // If str[i] is not equal to str[j], return false.
  // - if iteration finishes, return true -

// Set two pointers at both ends of s (i = 0, j = s.length - 1)
// Loop while i is smaller than j
  // If s[i] is not equal to s[j]
    // Return isPalindrome(str, i, j - 1) OR isPalindrome(str, i + 1, j)
// - if iteration finishes, return true (a perfect palindrome, no removals necessary) -

// Time Complexity: O(n) 84ms
// Space Complexity: O(1) 46.6MB
  var validPalindrome = function(s) {
    let i = 0, j = s.length - 1;
    while (i < j) {
      if (s[i] !== s[j]) {
        return isPalindrome(s, i, j - 1) || isPalindrome(s, i + 1, j);
      }
      i++, j--;
    }
    return true;
  };
  function isPalindrome(str, i, j) {
    while (i < j) {
      if (str[i] !== str[j]) return false;
      i++, j--;
    }
    return true;
  }
  
  // Three test cases to run function on
  console.log(validPalindrome("aba")) // true
  console.log(validPalindrome("abca")) // true
  console.log(validPalindrome("abc")) // false