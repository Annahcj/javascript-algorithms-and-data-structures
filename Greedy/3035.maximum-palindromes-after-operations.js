// 3035. Maximum Palindromes After Operations
// You are given a 0-indexed string array words having length n and containing 0-indexed strings.
// You are allowed to perform the following operation any number of times (including zero):
  // Choose integers i, j, x, and y such that 0 <= i, j < n, 0 <= x < words[i].length, 0 <= y < words[j].length, and swap the characters words[i][x] and words[j][y].
// Return an integer denoting the maximum number of palindromes words can contain, after performing some operations.
// Note: i and j may be equal during an operation.


// Solution: Greedy w/ Counting & Sorting

// 1. Count the occurances of each character across all words into an array `count`, then get the total number of 2 equal characters.
  // We only need to consider the pairs of equal characters, the odd character in the middle will always be possible since the total count of characters is exactly equal to the number of characters in all words - meaning we can take whatever characters are left over after using the even pairs.
// 2. Get the lengths of each word into an array and sort in asc order. It is optimal to construct smaller lengthed palindromes first to get the maximum number of palindromes possible.
// 3. Go through each word length in asc order and based on the number of pairs of characters we need, check whether we have enough equal pairs to make a palindrome: equalPairs >= Math.floor(len / 2)

// n = number of words, m = words[i].length
// Time Complexity: O(nm + n log(n)) 77ms
// Space Complexity: O(n) 53.9MB
var maxPalindromesAfterOperations = function(words) {
  let count = Array(26).fill(0);
  let lengths = [];
  for (let word of words) {
    lengths.push(word.length);
    for (let char of word) {
      count[char.charCodeAt() - 97]++;
    }
  }
  let equalPairs = 0;
  for (let i = 0; i < 26; i++) {
    equalPairs += Math.floor(count[i] / 2);
  }
  lengths.sort((a, b) => a - b);
  for (let i = 0; i < lengths.length; i++) {
    if (equalPairs < Math.floor(lengths[i] / 2)) return i;
    equalPairs -= Math.floor(lengths[i] / 2);
  }
  return words.length;
};

// Three test cases
console.log(maxPalindromesAfterOperations(["abbb","ba","aa"])) // 3
console.log(maxPalindromesAfterOperations(["abc","ab"])) // 2
console.log(maxPalindromesAfterOperations(["cd","ef","a"])) // 1