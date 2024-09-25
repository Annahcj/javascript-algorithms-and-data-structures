// 3297. Count Substrings That Can Be Rearranged to Contain a String I
// You are given two strings word1 and word2.
// A string x is called valid if x can be rearranged to have word2 as a prefix.
// Return the total number of valid substrings of word1.


// Solution: Sliding Window

// Count the occurances of each character in word2.
// Maintain a minimum-lengthed sliding window of matching characters in word1.
// The right pointer moves up incrementally and the left pointer moves up while all characters in word2 exist in word1.
// For each valid window with all matching characters, the number of valid substrings is equal to the index of the left pointer + 1 (because if all characters exist in the window, extending the window to the left will still contain all those characters).

// n = length of word1, m = length of word2
// Time Complexity: O(m + n) 91ms
// Space Complexity: O(1) 53.8MB
function validSubstringCount(word1, word2) {
  let count = Array(26).fill(0);
  let distinct = 0;
  for (let char of word2) {
    count[char.charCodeAt() - 97]++;
    if (count[char.charCodeAt() - 97] === 1) {
      distinct++;
    }
  }
  let matching = 0, substrings = 0;
  for (let j = 0, i = 0; j < word1.length; j++) {
    count[word1.charCodeAt(j) - 97]--;
    if (count[word1.charCodeAt(j) - 97] === 0) {
      matching++;
    }
    while (matching >= distinct) {
      if (count[word1.charCodeAt(i) - 97] === 0) {
        if (matching === distinct) break;
        matching--;
      }
      count[word1.charCodeAt(i) - 97]++;
      i++;
    }
    if (matching === distinct) {
      substrings += i + 1;
    }
  }
  return substrings;
};

// Three test cases
console.log(validSubstringCount("bcca", "abc")) // 1
console.log(validSubstringCount("abcabc", "abc")) // 10
console.log(validSubstringCount("abcabc", "aaabc")) // 0