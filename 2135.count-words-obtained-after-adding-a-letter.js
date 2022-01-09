// 2135. Count Words Obtained After Adding a Letter
// You are given two 0-indexed arrays of strings startWords and targetWords. Each string consists of lowercase English letters only.
// For each string in targetWords, check if it is possible to choose a string from startWords and perform a conversion operation on it to be equal to that from targetWords.
// The conversion operation is described in the following two steps:
  // Append any lowercase letter that is not present in the string to its end.
  // For example, if the string is "abc", the letters 'd', 'e', or 'y' can be added to it, but not 'a'. If 'd' is added, the resulting string will be "abcd".
  // Rearrange the letters of the new string in any arbitrary order.
  // For example, "abcd" can be rearranged to "acbd", "bacd", "cbda", and so on. Note that it can also be rearranged to "abcd" itself.
// Return the number of strings in targetWords that can be obtained by performing the operations on any string of startWords.
// Note that you will only be verifying if the string in targetWords can be obtained from a string in startWords by performing the operations. The strings in startWords do not actually change during this process.


// Solution: Bitmasks
 
// Since each word only contains unique lowercase letters, we can use a bitmask as a set for each word.
// e.g: the word 'abd' will look like 1011 (without the leading zeroes)

// 1. For each word in startWords, turn it into its bitmask representation, and add it to a set.
// 2. For each word in targetWords, try to remove each character from targetWords (remove from its bitmask), and check whether the set contains it.

// n = startWords.length, m = targetWords.length
// Time Complexity: O(n + m) 296ms
// Space Complexity: O(n) 64.9MB
var wordCount = function(startWords, targetWords) {
  let words = new Set();
  for (var word of startWords) {
    let mask = 0;
    for (var char of word) {
      mask |= (1 << char.charCodeAt() - 97);
    }
    words.add(mask);
  }

  let count = 0;
  for (var word of targetWords) {
    let mask = 0;
    for (var char of word) {
      mask |= (1 << char.charCodeAt() - 97);
    }
    for (var char of word) {
      let oneRemoved = mask ^ (1 << char.charCodeAt() - 97);
      if (words.has(oneRemoved)) {
        count++;
        break;
      }
    }
  }
  return count;
};

// Two test cases to run function on
console.log(wordCount(["ant","act","tack"], ["tack","act","acti"])) // 2
console.log(wordCount(["ab","a"], ["abc","abcd"])) // 1