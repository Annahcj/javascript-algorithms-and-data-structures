// 2131. Longest Palindrome by Concatenating Two Letter Words
// You are given an array of strings words. Each element of words consists of two lowercase English letters.
// Create the longest possible palindrome by selecting some elements from words and concatenating them in any order. Each element can be selected at most once.
// Return the length of the longest palindrome that you can create. If it is impossible to create any palindrome, return 0.
// A palindrome is a string that reads the same forward and backward.


// Solution: Hashmap for Frequency

// There are two possible scenarios: 
  // 1. Middle of the palindrome has one word e.g: "aa" OR "bb" OR "cc"
  // 2. Middle of the palindrome has two words e.g: "ab ba" OR "ba ab" (spacing is just for clarity in separation of words)

// Other than the middle part, we can just count the number of opposite pairs (a pair of words which are equal when one word is flipped, e.g: bc cb).

// In scenario 1 ^^ with the one middle word, it is only beneficial to take one middle word if doesn't have a matching word to make the string longer.
// Otherwise, it would be better to be in a pair and be longer by a length of 2.

// Time Complexity: O(n) 244ms
// Space Complexity: O(n) 54MB
var longestPalindrome = function(words) {
  let wordCount = new Map();
  for (let word of words) {
    wordCount.set(word, (wordCount.get(word) || 0) + 1);
  }

  let length = 0, hasPalindromeMiddle = false;
  for (let [word, count] of wordCount) {
    if (word[0] === word[1]) {
      if (count % 2 === 1) hasPalindromeMiddle = true;
      length += (Math.floor(count / 2) * 4);
    } else {
      let flipped = word[1] + word[0], pairs = Math.min(count, (wordCount.get(flipped) || 0));
      length += (pairs * 4);
      wordCount.delete(word);
    }
  }
  return hasPalindromeMiddle ? length + 2 : length;
};

// Three test cases to run function on
console.log(longestPalindrome(["lc","cl","gg"])) // 6
console.log(longestPalindrome(["ab","ty","yt","lc","cl","ab"])) // 8
console.log(longestPalindrome(["cc","ll","xx"])) // 2