// 49. Group Anagrams
// Given an array of strings strs, group the anagrams together. 


// Solution 1: Categorize by Sorting

// Split and sort each string in strs array, use sorted strings as keys in object
// Push each string into place with same key in the object
// Return the values of the object

// Time Complexity: O(n·klogk) 156ms
// Space Complexity: O(nk) 51MB
var groupAnagrams = function(strs) {
  let result = {};
  for (let i = 0; i < strs.length; i++) {
    let sorted = strs[i].split("").sort();
    if (!result[sorted]) result[sorted] = [];
    result[sorted].push(strs[i]);
  }
  return Object.values(result);
};


// Solution 2: Categorize by character count

// For each string in strs array, keep its character count in an array with a length of 26 (all letters of the alphabet)
// Use this character count as key in object, and assign each string to its appropriate place in the object.
// Return the values of the object

// Time Complexity: O(nk) 164ms
// Space Complexity: O(nk) 50.5MB
var groupAnagrams = function(strs) {
let result = {};
for (let str of strs) {
  let charCount = Array(26).fill(0);
  for (let char of str) {
    charCount[char.charCodeAt() - 97]++;
  }
  if (!result[charCount]) result[charCount] = [str];
  else result[charCount].push(str);
}
return Object.values(result);
};

// Three test cases
console.log(groupAnagrams(["eat","tea","tan","ate","nat","bat"])) // [["bat"],["nat","tan"],["ate","eat","tea"]]
console.log(groupAnagrams(["a"])) // ["a"]]
console.log(groupAnagrams([""])) // [[""]]