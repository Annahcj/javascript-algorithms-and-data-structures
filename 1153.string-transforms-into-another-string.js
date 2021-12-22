// 1153. String Transforms Into Another String
// Given two strings str1 and str2 of the same length, determine whether you can transform str1 into str2 by doing zero or more conversions.
// In one conversion you can convert all occurrences of one character in str1 to any other lowercase English character.
// Return true if and only if you can transform str1 into str2.


// Solution: Logic

// e.g:  abcd dbca
// str1: zbcd -> zbca -> dbca

// as long as there is a character that is not present in str2, str1 can be converted to str2. 
// so if the number of unique characters in str2 is 26, AND str1 is not equal to str2, str1 cannot be converted to str2.

// however, if str1 has characters that map to more than one unique character in str2, str1 cannot be converted to str2.
// e.g:  aab cdd ('a' maps to 'c' and 'd')
// It is impossible to convert str1 to str2. 

// Time Complexity: O(n) 72ms
// Space Complexity: O(26) 39.2MB
var canConvert = function(str1, str2) {
  if (str1 === str2) return true;
  let map = new Map();
  for (var i = 0; i < str1.length; i++) {
    if (map.has(str1[i]) && map.get(str1[i]) !== str2[i]) return false;
    map.set(str1[i], str2[i]);
  }  
  let unique = new Set(map.values());
  return unique.size < 26;
};

// Two test cases to run function on
console.log(canConvert("aabcc", "aazzz")) // true
console.log(canConvert("abcdefghijklmnopqrstuvwxyz", "bcadefghijklmnopqrstuvwxzz")) // true