// 1662. Check If Two String Arrays are Equivalent
// Given two string arrays word1 and word2, return true if the two arrays represent the same string, and false otherwise.
// A string is represented by an array if the array elements concatenated in order forms the string.


// Solution: Four Pointers

// Keep track of the following:
  // index1: pointer in word1
  // i: pointer in word1[index1]
  // index2: pointer in word2
  // j: pointer in word2[index2]

// Check that each word1[index1][i] === word2[index2][j].
// Move i and j forward.
  // If i reaches the end of the word1[index1], move index1 forward and reset i to 0.
  // If j reaches the end of the word2[index2], move index2 forward and reset j to 0.

// n = number of characters in word1, m = number of characters in word2
// Time Complexity: O(min(n, m)) 108ms
// Space Complexity: O(1) 42.8MB
var arrayStringsAreEqual = function(word1, word2) {
  let n = word1.length, m = word2.length;
  let index1 = 0, index2 = 0; // indexes in word1 and word2
  let i = 0, j = 0; // indexes in word1[index1] and word2[index2]
  while (index1 < n && index2 < m) {
    if (word1[index1][i] !== word2[index2][j]) return false;
    if (++i === word1[index1].length) {
      index1++, i = 0;
    }
    if (++j === word2[index2].length) {
      index2++, j = 0;
    }
  }
  return index1 === n && index2 === m;
};

// Three test cases
console.log(arrayStringsAreEqual(["ab", "c"], ["a", "bc"])) // true
console.log(arrayStringsAreEqual(["a", "cb"], ["ab", "c"])) // false
console.log(arrayStringsAreEqual(["abc", "d", "defg"], ["abcddefg"])) // true