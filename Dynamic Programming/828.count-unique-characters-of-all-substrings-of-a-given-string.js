// 828. Count Unique Characters of All Substrings of a Given String
// Let's define a function countUniqueChars(s) that returns the number of unique characters on s.
  // For example if s = "LEETCODE" then "L", "T", "C", "O", "D" are the unique characters since they appear only once in s, therefore countUniqueChars(s) = 5.
// Given a string s, return the sum of countUniqueChars(t) where t is a substring of s.
// Notice that some substrings can be repeated so in this case you have to count the repeated ones too.


// Solution: Dynamic Programming - Prev & Next Indexes

// Formula for the number of substrings a character is in: (current index - previous index) * (next index - current index)

// 1. Loop from left to right: use a hashmap to get the last occurance (on the left) for each character. Store in an array 'left'.
// 2. Loop from right to left: use a hashmap to get the last occurance (on the right) for each character. Store in an array 'right'.
// 3. Loop through to calculate the number of substrings each character is in using the left and right arrays.

// e.g: ABA
// left: [-1,-1,0], right: [2,3,3]
// i = 0: (0 - (-1)) * (2 - 0) = 1 * 2 = 2
// i = 1: (1 - (-1)) * (3 - 1) = 2 * 2 = 4
// i = 2: (2 - 0) * (3 - 2) = 2 * 1 = 2
// result = 8

// Time Complexity: O(n) 221ms
// Space Complexity: O(n) 50.2MB
var uniqueLetterString = function(s) {
  let n = s.length;
  let idxMap = {}, left = Array(n);
  for (var i = 0; i < n; i++) {
    if (idxMap[s[i]] === undefined) left[i] = -1;
    else left[i] = idxMap[s[i]];
    idxMap[s[i]] = i;
  }
  let right = Array(n);
  idxMap = {}; // clear out the index map and reuse
  for (i = n - 1; i >= 0; i--) {
    if (idxMap[s[i]] === undefined) right[i] = n;
    else right[i] = idxMap[s[i]];
    idxMap[s[i]] = i;
  }

  let res = 0;
  for (i = 0; i < n; i++) {
    res += (i - left[i]) * (right[i] - i);
  }
  return res;
};

// Solution 2: Optimized Space

// We can calculate the answer on the go.
// Only use one array 'dp'.

// Time Complexity: O(n) 168ms
// Space Complexity: O(n) 46.2MB
var uniqueLetterString = function(s) {
  let n = s.length;
  let idxMap = {}, dp = Array(n);
  for (var i = 0; i < n; i++) {
    if (idxMap[s[i]] === undefined) dp[i] = i + 1;
    else dp[i] = i - idxMap[s[i]];
    idxMap[s[i]] = i;
  }
  idxMap = {}; // clear out the index map and reuse
  let res = 0;
  for (i = n - 1; i >= 0; i--) {
    if (idxMap[s[i]] === undefined) dp[i] *= n - i;
    else dp[i] *= idxMap[s[i]] - i;
    idxMap[s[i]] = i;
    res += dp[i]; // calculate answer on the go
  }
  return res;
};

// Three test cases to run function on
console.log(uniqueLetterString("ABC")) // 10
console.log(uniqueLetterString("ABA")) // 8
console.log(uniqueLetterString("LEETCODE")) // 92