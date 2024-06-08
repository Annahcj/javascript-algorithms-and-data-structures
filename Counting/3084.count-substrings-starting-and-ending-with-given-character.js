// 3084. Count Substrings Starting and Ending with Given Character
// You are given a string s and a character c. Return the total number of substrings of s that start and end with c.


// Solution: Counting

// Keep track of the running count of occurances of `c`.
// When we encounter a `c`, count the number of substrings ending at the current character, starting with `c` (the running count of `c`)

// Time Complexity: O(n) 73ms
// Space Complexity: O(1) 56.3MB
var countSubstrings = function(s, c) {
  let cCount = 0, ans = 0;
  for (let char of s) {
    if (char === c) {
      cCount++;
      ans += cCount;
    }
  }
  return ans;
};

// Two test cases
console.log(countSubstrings("abada", "a")) // 6
console.log(countSubstrings("zzz", "z")) // 6