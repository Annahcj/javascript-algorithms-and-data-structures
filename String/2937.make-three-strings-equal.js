// 2937. Make Three Strings Equal
// You are given three strings s1, s2, and s3. You have to perform the following operation on these three strings as many times as you want.
// In one operation you can choose one of these three strings such that its length is at least 2 and delete the rightmost character of it.
// Return the minimum number of operations you need to perform to make the three strings equal if there is a way to make them equal, otherwise, return -1.


// Solution: Find Longest Prefix

// Find the longest equal prefix in s1, s2, and s3.
// Go through each index i, where i < the minimum length of s1, s2, and s3.
  // Once we find an index i where s1[i], s2[i], and s3[i] are not equal, calculate the number of dekete operations until we are left with the three prefixes.
  // We want to subtract the sum of the prefix lengths from the sum of total lengths: s1.length + s2.length + s3.length - i * 3

// n = min(s1.length, s2.length, s3.length)
// Time Complexity: O(n) 88ms
// Space Complexity: O(1) 47.3MB
var findMinimumOperations = function(s1, s2, s3) {
  let n = Math.min(s1.length, s2.length, s3.length);
  for (let i = 0; i < n; i++) {
    if (s1[i] !== s2[i] || s2[i] !== s3[i]) {
      let operations = s1.length + s2.length + s3.length - i * 3;
      return i === 0 ? -1 : operations;
    }
  }
  return s1.length + s2.length + s3.length - n * 3;
};

// Two test cases
console.log(findMinimumOperations("abc", "abb", "ab")) // 2
console.log(findMinimumOperations("dac", "bac", "cac")) // -1