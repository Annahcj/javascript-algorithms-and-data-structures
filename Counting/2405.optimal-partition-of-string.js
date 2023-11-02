// 2405. Optimal Partition of String
// Given a string s, partition the string into one or more substrings such that the characters in each substring are unique. That is, no letter appears in a single substring more than once.
// Return the minimum number of substrings in such a partition.
// Note that each character should belong to exactly one substring in a partition.


// Solution: Greedy & Counting

// Greedily take the longest substrings possible with unique characters.
// Once we come across a duplicate character, start a new substring.
// Use an array of size 26 to keep track of the count of each character.

// Time Complexity: O(n) 204ms
// Space Complexity: O(1) 49.8MB
var partitionString = function(s) {
  let n = s.length, count = Array(26).fill(0), ans = 1;
  for (let i = 0; i < n; i++) {
    if (++count[s.charCodeAt(i) - 97] > 1) {
      ans++;
      count = Array(26).fill(0);
      count[s.charCodeAt(i) - 97] = 1;
    }
  }
  return ans;
};

// Two test cases
console.log(partitionString("abacaba")) // 4
console.log(partitionString("ssssss")) // 6