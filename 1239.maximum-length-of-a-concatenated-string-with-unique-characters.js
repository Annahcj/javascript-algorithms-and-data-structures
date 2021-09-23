// 1239. Maximum Length of a Concatenated String with Unique Characters
// You are given an array of strings arr. A string s is formed by the concatenation of a subsequence of arr that has unique characters.
// Return the maximum possible length of s.
// A subsequence is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.


// Solution 1: Map
// Using backtracking to try every possible combination
// Create a helper function isUnique, which returns whether the string only contains unique letters.

// Set max to 0 (maximum length), n to arr.length
// call backtrack(0, "")
// return max

// backtrack: (start (starting index), currStr)
  // update max if necessary
  // base case: if start is equal to n (can't go any further), return.
  // loop through arr from start to n (pointer = i)
    // if isUnique(currStr + arr[i]) returns true, 
      // call backtrack(i + 1, currStr + arr[i])

// isUnique: (str)
  // create a new map 
  // loop through each char of str
    // if map doesn't contain char, set counter for char to 1
    // otherwise, if it already contains char, return false.
  // return true if it reaches the end


// Time Complexity: O(2^n) 132ms
// Space Complexity: O(n) 44.7MB
var maxLength = function(arr) {
  let max = 0, n = arr.length;
  backtrack(0, '');
  return max;
  function backtrack(start, currStr) {
    max = Math.max(max, currStr.length);
    if (start === n) return;
    for (var i = start; i < n; i++) {
      if (isUnique(currStr + arr[i])) backtrack(i + 1, currStr + arr[i]);
    }
  }
  function isUnique(str) {
    let map = new Map();
    for (var char of str) {
      if (!map.has(char)) map.set(char, 1);
      else return false;
    }
    return true;
  }  
};


// Solution 2: Bit Manipulation

// The only difference from solution 1 is the 'isUnique' function.
// Instead of using a map, we will use bit manipulation to store if a character exists (1), or doesn't (0)

// Time Complexity: O(2^n) 84ms
// Space Complexity: O(n) 43.2MB
var maxLength = function(arr) {
  let max = 0, n = arr.length;
  backtrack(0, '');
  return max;
  function backtrack(start, currStr) {
    max = Math.max(max, currStr.length);
    if (start === n) return;
    for (var i = start; i < n; i++) {
      if (isUnique(currStr + arr[i])) backtrack(i + 1, currStr + arr[i]);
    }
  }
  function isUnique(str) {
    let bit = 0;
    for (var char of str) {
      let charCode = char.charCodeAt() - 97;
      if (bit & (1 << charCode)) return false;
      bit |= (1 << charCode);
    }
    return true;
  }  
};

// Three test cases to run function on
console.log(maxLength(["un","iq","ue"])) // 4
console.log(maxLength(["cha","r","act","ers"])) // 6
console.log(maxLength(["abcdefghijklmnopqrstuvwxyz"])) // 26