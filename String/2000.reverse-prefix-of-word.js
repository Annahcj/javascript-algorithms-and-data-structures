// 2000. Reverse Prefix of Word
// Given a 0-indexed string word and a character ch, reverse the segment of word that starts at index 0 and ends at the index of the first occurrence of ch (inclusive). If the character ch does not exist in word, do nothing.
  // For example, if word = "abcdefd" and ch = "d", then you should reverse the segment that starts at 0 and ends at 3 (inclusive). The resulting string will be "dcbaefd".
// Return the resulting string.


// Solution: Functional Approach

// Time Complexity: O(n) 61ms
// Space Complexity: O(n) 48.8MB
var reversePrefix = function(word, ch) {
  let index = word.indexOf(ch);
  if (index === -1) return word;
  return word.slice(0, index + 1).split("").reverse().join("") + word.slice(index + 1);
};

// Three test cases
console.log(reversePrefix("abcdefd", "d")) // "dcbaefd"
console.log(reversePrefix("xyxzxe", "z")) // "zxyxxe"
console.log(reversePrefix("abcd", "z")) // "abcd"