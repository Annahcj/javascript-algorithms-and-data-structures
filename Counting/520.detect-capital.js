// 520. Detect Capital
// We define the usage of capitals in a word to be right when one of the following cases holds:
  // All letters in this word are capitals, like "USA".
  // All letters in this word are not capitals, like "leetcode".
  // Only the first letter in this word is capital, like "Google".
// Given a string word, return true if the usage of capitals in it is right.


// Solution: Count Upper and Lowercase Letters

// Count the number of lowercase and uppercase letters in word.
// If there are no uppercase letters OR no lowercase letters, return true.
// Otherwise if the first character is uppercase AND the count of uppercase letters is 1, return true.
// In any other case, return false.

// Time Complexity: O(n) 165ms
// Space Complexity: O(1) 40.3MB
var detectCapitalUse = function(word) {
  let uppercase = 0, lowercase = 0;
  for (var char of word) {
    if (char >= 'a' && char <= 'z') lowercase++;
    else uppercase++;
  }
  if (uppercase === 0 || lowercase === 0) return true;
  if (word[0] >= 'A' && word[0] <= 'Z' && uppercase === 1) return true;
  return false;
};

// Two test cases to run function on
console.log(detectCapitalUse("USA")) // true
console.log(detectCapitalUse("FlaG")) // false