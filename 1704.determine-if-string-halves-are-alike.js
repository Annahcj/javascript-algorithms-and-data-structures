// 1704. Determine if String Halves Are Alike
// You are given a string s of even length. Split this string into two halves of equal lengths, and let a be the first half and b be the second half.
// Two strings are alike if they have the same number of vowels ('a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'). Notice that s contains uppercase and lowercase letters.
// Return true if a and b are alike. Otherwise, return false.


// Solution: 

// Count the number of vowels in the first half and second half of s.
// Return true if the two counts are equal.

// Time Complexity: O(n) 127ms
// Space Complexity: O(1) 44.4MB
var halvesAreAlike = function(s) {
  let n = s.length, mid = s.length / 2;
  let vowelsA = 0;
  for (let i = 0; i < mid; i++) {
    vowelsA += isVowel(s[i]) ? 1 : 0;
  }
  let vowelsB = 0;
  for (let i = mid; i < n; i++) {
    vowelsB += isVowel(s[i]) ? 1 : 0;
  }
  return vowelsA === vowelsB;
};

function isVowel(char) {
  return ['a', 'e', 'i', 'o', 'u', 'A', 'E', 'I', 'O', 'U'].includes(char);
}

// Two test cases
console.log(halvesAreAlike("book")) // true
console.log(halvesAreAlike("textbook")) // false