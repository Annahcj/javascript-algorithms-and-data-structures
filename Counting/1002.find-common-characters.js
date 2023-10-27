// 1002. Find Common Characters
// Given a string array words, return an array of all characters that show up in all strings within the words (including duplicates). You may return the answer in any order.


// Solution: Two Frequency Arrays

// Use an array of length 26 to store the frequencies of the characters in a word.
// Keep a global frequency array initially set the the frequencies of the first word.
  // Go through each other word from 1 onwards and take the minimum frequency of a character.

// Time Complexity: O(n) 81ms
// Space Complexity: O(26) = O(1) 45.3MB
var commonChars = function(words) {
  let freq = Array(26).fill(0);
  for (let char of words[0]) freq[char.charCodeAt() - 97]++;
  
  for (let i = 1; i < words.length; i++) {
    let freq2 = Array(26).fill(0);
    for (let char of words[i]) freq2[char.charCodeAt() - 97]++;
    for (let j = 0; j < 26; j++) freq[j] = Math.min(freq[j], freq2[j]);
  }
  
  let res = [];
  for (let i = 0; i < 26; i++) {
    for (let j = 0; j < freq[i]; j++) res.push(String.fromCharCode(i + 97));
  }
  return res;
};

// Two test cases 
console.log(commonChars(["bella","label","roller"])) // ["e","l","l"]
console.log(commonChars(["cool","lock","cook"])) // ["c","o"]