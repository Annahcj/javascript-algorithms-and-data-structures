// 1160. Find Words That Can Be Formed by Characters
// You are given an array of strings words and a string chars.
// A string is good if it can be formed by characters from chars (each character can only be used once).
// Return the sum of lengths of all good strings in words.


// Solution: Count Frequency of Letters

// Each character is a lowercase letter, so there are only 26 different characters. 
// Use an array of size 26 to count the occurance of each letter.

// If the frequency of any character in a word is bigger than the frequency of that character in chars, don't count that word.

// n = words.length, m = average length of a word
// Time Complexity: O(nm) 96ms
// Space Complexity: O(26) = O(1) 50.5MB
var countCharacters = function(words, chars) {
  let count = Array(26).fill(0);
  for (let char of chars) count[char.charCodeAt() - 97]++;
  
  let len = 0;
  for (let word of words) {
    let currCount = Array(26).fill(0);
    for (let char of word) currCount[char.charCodeAt() - 97]++;
    if (isEnough(count, currCount)) len += word.length;
  }
  return len;
  
  function isEnough(count, currCount) {
    for (let i = 0; i < 26; i++) {
      if (currCount[i] > count[i]) return false;
    }
    return true;
  }
};

// Two test cases to run function on
console.log(countCharacters(["cat","bt","hat","tree"], "atach")) // 6
console.log(countCharacters(["hello","world","leetcode"], "welldonehoneyr")) // 10