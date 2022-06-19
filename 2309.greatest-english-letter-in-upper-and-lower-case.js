// 2309. Greatest English Letter in Upper and Lower Case
// Given a string of English letters s, return the greatest English letter which occurs as both a lowercase and uppercase letter in s. The returned letter should be in uppercase. If no such letter exists, return an empty string.
// An English letter b is greater than another letter a if b appears after a in the English alphabet.


// Solution: Hashset

// Add each character of s to a hashset.
// Find the largest character where both the lowercase and uppercase of the character exists in the hashset. 
// We can achieve this by looping backwards from z to a.

// u = number of unique characters in s, which is at max 52 (26 lowercase and 26 uppercase)
// Time Complexity: O(n) 76ms
// Space Complexity: O(u) 43.5MB
var greatestLetter = function(s) {
  let set = new Set();
  for (let char of s) set.add(char);
  for (let i = 25; i >= 0; i--) {
    let lower = String.fromCharCode(i + 97);
    let upper = String.fromCharCode(i + 65);
    if (set.has(lower) && set.has(upper)) return upper;
  }
  return "";
};

// Three test cases to run function on
console.log(greatestLetter("lEeTcOdE")) // "E"
console.log(greatestLetter("arRAzFif")) // "R"
console.log(greatestLetter("AbCdEfGhIjK")) // ""