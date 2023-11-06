// 2914. Minimum Number of Changes to Make Binary String Beautiful
// You are given a 0-indexed binary string s having an even length.
// A string is beautiful if it's possible to partition it into one or more substrings such that:
  // Each substring has an even length.
  // Each substring contains only 1's or only 0's.
// You can change any character in s to 0 or 1.
// Return the minimum number of changes required to make the string s beautiful.


// Solution: Greedy w/ Counting

// Because it doesn't matter how many substrings we partition, it's better to partition into substrings of length 2.
// We just need to ensure each two characters are the same (s[0] and s[1], s[2] and s[3], and so on...)
// For each two characters (s[i] and s[i + 1] for each even index i), if they are the same we don't need to change anything, otherwise we need one change.

// Time Complexity: O(n) 55ms
// Space Complexity: O(1) 45.2MB
var minChanges = function(s) {
  let n = s.length, changes = 0;
  for (let i = 0; i < n - 1; i += 2) {
    changes += s[i] !== s[i + 1] ? 1 : 0;
  }
  return changes;
};

// Three test cases
console.log(minChanges("1001")) // 2
console.log(minChanges("10")) // 1
console.log(minChanges("0000")) // 0