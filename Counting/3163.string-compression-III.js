// 3163. String Compression III
// Given a string word, compress it using the following algorithm:
  // Begin with an empty string comp. While word is not empty, use the following operation:
    // Remove a maximum length prefix of word made of a single character c repeating at most 9 times.
    // Append the length of the prefix followed by c to comp.
// Return the string comp.


// Solution: Counting

// Go through word while keeping track of the previous character and the count of consecutive equal characters so far.
// If we come across a different character or the count exceeds 9, append to the result and reset the count.

// Time Complexity: O(n^2) 123ms
  // Concatenating a string is O(n) in JS, although it is a bit faster in practice.
// Space Complexity: O(1) (excluding output) 64.2MB
var compressedString = function(word) {
  let comp = "", prev = word[0], count = 1;
  for (let i = 1; i < word.length; i++) {
    if (word[i] === prev && count < 9) {
      count++;
    } else {
      comp += `${count}${prev}`;
      prev = word[i];
      count = 1;
    }
  }
  comp += `${count}${prev}`;
  return comp;
};

// Two test cases
console.log(compressedString("abcde")) // "1a1b1c1d1e"
console.log(compressedString("aaaaaaaaaaaaaabb")) // "9a5a2b"