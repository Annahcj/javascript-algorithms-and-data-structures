// 408. Valid Word Abbreviation
// A string can be abbreviated by replacing any number of non-adjacent, non-empty substrings with their lengths. The lengths should not have leading zeros.
// For example, a string such as "substitution" could be abbreviated as (but not limited to):
  // "s10n" ("s ubstitutio n")
  // "sub4u4" ("sub stit u tion")
  // "12" ("substitution")
  // "su3i1u2on" ("su bst i t u ti on")
  // "substitution" (no substrings replaced)
// The following are not valid abbreviations:
  // "s55n" ("s ubsti tutio n", the replaced substrings are adjacent)
  // "s010n" (has leading zeros)
  // "s0ubstitution" (replaces an empty substring)
// Given a string word and an abbreviation abbr, return whether the string matches the given abbreviation.
// A substring is a contiguous non-empty sequence of characters within a string.


// Solution: Two Pointers

// Keep track of two pointers for word and abbr.
// When reaching a number in abbr, get the full number and skip the word pointer forward the appropriate number of steps.
  // Check for leading zeros.

// Time Complexity: O(n) 86ms
// Space Complexity: O(1) 42.5MB
var validWordAbbreviation = function(word, abbr) {
  let i = 0, j = 0;
  while (i < word.length && j < abbr.length) {
    if (!isNaN(abbr[j])) { // is a number
      let num = 0;
      while (j < abbr.length && !isNaN(abbr[j])) {
        if (num === 0 && abbr[j] === '0') return false; // leading zeros
        num = num * 10 + Number(abbr[j++]);
      }
      i += num;
    } else {
      if (word[i] !== abbr[j]) return false;
      i++, j++;
    }
  }
  return i === word.length && j === abbr.length;
};

// Two test cases to run function on
console.log(validWordAbbreviation("internationalization", "i12iz4n")) // true
console.log(validWordAbbreviation("apple", "a2e")) // false