// 1371. Find the Longest Substring Containing Vowels in Even Counts
// Given the string s, return the size of the longest substring containing each vowel an even number of times. That is, 'a', 'e', 'i', 'o', and 'u' must appear an even number of times.


// Solution: Hashmap & Bitmasks

// We only need to keep track of whether the count of each vowel is even or odd.
// Use a bitmask to store this information in five bits (0 for even, 1 for odd).
// Store the earliest index of each count state in a hashmap (two sum approach).
// At each index, get the earliest index of an occurance of the same counts (10110 - 10110 to get 00000).
// Record the maximum i - map.get(count)

// Time Complexity: O(n) 178ms
// Space Complexity: O(2^5) = O(1) 46.5MB
var findTheLongestSubstring = function(s) {
  let n = s.length;
  let key = {
    a: 0,
    e: 1,
    i: 2,
    o: 3,
    u: 4
  };
  let count = 0, maxSize = 0;
  let map = new Map();
  map.set(0, -1);
  for (let i = 0; i < n; i++) {
    if (key[s[i]] !== undefined) {
      count ^= (1 << key[s[i]]); // flip the key[i]th bit
    }
    if (map.has(count)) {
      maxSize = Math.max(maxSize, i - map.get(count));
    } else {
      map.set(count, i);
    }
  }
  return maxSize;
};

// Three test cases
console.log(findTheLongestSubstring("eleetminicoworoep")) // 13
console.log(findTheLongestSubstring("leetcodeisgreat")) // 5
console.log(findTheLongestSubstring("bcbcbc")) // 6