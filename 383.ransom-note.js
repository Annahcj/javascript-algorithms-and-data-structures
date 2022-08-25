// 383. Ransom Note
// Given two strings ransomNote and magazine, return true if ransomNote can be constructed by using the letters from magazine and false otherwise.
// Each letter in magazine can only be used once in ransomNote.


// Solution: Counting

// Count the occurances of each letter in magazine.
// Remove occurances of each letter in ransomNote.
  // When the count of a letter becomes < 0, we can't construct ransomNote from magazine.

// n = length of ransomNote, m = length of magazine
// Time Complexity: O(n + m) 67ms
// Space Complexity: O(1) 42.5MB
var canConstruct = function(ransomNote, magazine) {
  let count = Array(26).fill(0);
  for (let i = 0; i < magazine.length; i++) {
    count[magazine.charCodeAt(i) - 97]++;
  }
  for (let i = 0; i < ransomNote.length; i++) {
    if (--count[ransomNote.charCodeAt(i) - 97] < 0) return false;
  }
  return true;
};

// Three test cases to run function on
console.log(canConstruct("a", "b")) // false
console.log(canConstruct("aa", "ab")) // false
console.log(canConstruct("aa", "aab")) // true