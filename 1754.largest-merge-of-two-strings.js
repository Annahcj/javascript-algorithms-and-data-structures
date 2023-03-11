// 1754. Largest Merge Of Two Strings
// You are given two strings word1 and word2. You want to construct a string merge in the following way: while either word1 or word2 are non-empty, choose one of the following options:
  // If word1 is non-empty, append the first character in word1 to merge and delete it from word1.
    // For example, if word1 = "abc" and merge = "dv", then after choosing this operation, word1 = "bc" and merge = "dva".
  // If word2 is non-empty, append the first character in word2 to merge and delete it from word2.
    // For example, if word2 = "abc" and merge = "", then after choosing this operation, word2 = "bc" and merge = "a".
// Return the lexicographically largest merge you can construct.
// A string a is lexicographically larger than a string b (of the same length) if in the first position where a and b differ, a has a character strictly larger than the corresponding character in b. For example, "abcd" is lexicographically larger than "abcc" because the first position they differ is at the fourth character, and d is greater than c.


// Solution: Two Pointers

// If word1[i] > word2[j], take word1[i].
// If word2[j] > word1[i], take word2[j].
// If they are equal, take the character from the bigger remaining string.

// n = length of word1, m = length of word2
// Time Complexity: O((n + m) * min(n, m)) 204ms
// Space Complexity: O(n + m) 50.5MB
var largestMerge = function(word1, word2) {
  let merge = "", i = 0, j = 0;
  while (i < word1.length || j < word2.length) {
    if (j === word2.length || word1[i] > word2[j]) {
      merge += word1[i++];
    } else if (i === word1.length || word2[j] > word1[i]) {
      merge += word2[j++];
    } else if (isBigger(i, j)) {
      merge += word1[i++];
    } else {
      merge += word2[j++];
    }
  }
  return merge;
  
  function isBigger(i, j) {
    while (i < word1.length || j < word2.length) {
      if (i === word1.length) return false;
      if (j === word2.length) return true;
      if (word1[i] > word2[j]) return true;
      else if (word2[j] > word1[i]) return false;
      i++, j++;
    }
    return true;
  }
};

// Two test cases
console.log(largestMerge("cabaa", "bcaaa")) // "cbcabaaaaa"
console.log(largestMerge("abcabc", "abdcaba")) // "abdcabcabcaba"