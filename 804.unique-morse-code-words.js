// 804. Unique Morse Code Words
// International Morse Code defines a standard encoding where each letter is mapped to a series of dots and dashes, as follows:
  // 'a' maps to ".-",
  // 'b' maps to "-...",
  // 'c' maps to "-.-.", and so on.
// For convenience, the full table for the 26 letters of the English alphabet is given below:
// [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."]
// Given an array of strings words where each word can be written as a concatenation of the Morse code of each letter.
  // For example, "cab" can be written as "-.-..--...", which is the concatenation of "-.-.", ".-", and "-...". We will call such a concatenation the transformation of a word.
// Return the number of different transformations among all words we have.


// Solution: Hashset

// Concatenate the morse codes for each word and store them in a hashset to get the unique codes.

// n = total number of characters for all words
// Time Complexity: O(n^2) 81ms
  // string concatenation takes O(m) each time, so O(m^2) for each word.
// Space Complexity: O(n) 42.7MB
var uniqueMorseRepresentations = function(words) {
  let codes = [".-","-...","-.-.","-..",".","..-.","--.","....","..",".---","-.-",".-..","--","-.","---",".--.","--.-",".-.","...","-","..-","...-",".--","-..-","-.--","--.."];
  let codesSet = new Set();
  for (let word of words) {
    let code = "";
    for (let i = 0; i < word.length; i++) {
      code += codes[word.charCodeAt(i) - 97];
    }
    codesSet.add(code);
  }
  return codesSet.size;
};

// Two test cases to run function on
console.log(uniqueMorseRepresentations(["gin","zen","gig","msg"])) // 2
console.log(uniqueMorseRepresentations(["a"])) // 1