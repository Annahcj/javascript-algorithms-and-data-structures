// 2053. Kth Distinct String in an Array
// A distinct string is a string that is present only once in an array.
// Given an array of strings arr, and an integer k, return the kth distinct string present in arr. If there are fewer than k distinct strings, return an empty string "".
// Note that the strings are considered in the order in which they appear in the array.


// Solution: Counting w/ Hashmap

// Count the occurances of each string in a hashmap.
// Go through arr in a second pass and return the kth string with a count of 1.

// n = length of arr
// Time Complexity: O(n) 54ms
// Space Complexity: O(n) 52.6MB
function kthDistinct(arr, k) {
  let count = {};
  for (let str of arr) {
    count[str] = (count[str] || 0) + 1;
  }
  let unique = 1;
  for (let str of arr) {
    if (count[str] === 1) {
      if (unique === k) return str;
      unique++;
    }
  }
  return "";
};

// Three test cases
console.log(kthDistinct(["d","b","c","b","c","a"], 2)) // "a"
console.log(kthDistinct(["aaa","aa","a"], 1)) // "aaa"
console.log(kthDistinct(["a","b","a"], 3)) // ""