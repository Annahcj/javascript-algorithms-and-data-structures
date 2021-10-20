// 242. Valid Anagram
// Given two strings s and t, return true if t is an anagram of s, and false otherwise.


// Solution 1: Arrays

// We can use an array (initially filled with 0's) to store the count of occurances.
// Loop through s, use the charcode - 97 for the index in the array, and add one to its count.
// Loop through t, this time decrementing count of each character by one.
// Now, if the strings are anagrams, each count in the array should be 0.
// So we do a simple check to make sure all numbers are equal to 0.

// Time Complexity: O(n) 88ms
// Space Complexity: O(26) -> O(1) 41.4MB
var isAnagram = function(s, t) {
  let charCount = Array(26).fill(0);
  for (var char of s) charCount[char.charCodeAt() - 97]++;
  for (var char of t) charCount[char.charCodeAt() - 97]--;
  for (var i = 0; i < 26; i++) {
    if (charCount[i] !== 0) return false;
  }
  return true;
};

// Solution 2: Hashmap
// follow-up -> for unicode characters

// Use hashmaps instead of arrays.
// Loop through each key/character in sMap, if the count of the character in sMap is not equal to the count in tMap, return false.
// If iteration finishes, return true.

// Time Complexity: O(n) 98ms
// Space Complexity: O(n) 40.9MB
var isAnagram = function(s, t) {
  if (s.length !== t.length) return false;
  let sMap = {}, tMap = {};
  for (var char of s) sMap[char] = (sMap[char] || 0) + 1;
  for (var char of t) tMap[char] = (tMap[char] || 0) + 1;
  for (var key in sMap) {
    if (sMap[key] !== tMap[key]) return false;
  } 
  return true;
};

// Two test cases to run function on
console.log(isAnagram("anagram", "nagaram")) // true
console.log(isAnagram("rat", "car")) // false