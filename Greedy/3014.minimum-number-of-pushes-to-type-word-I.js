// 3014. Minimum Number of Pushes to Type Word I
// You are given a string word containing distinct lowercase English letters.
// Telephone keypads have keys mapped with distinct collections of lowercase English letters, which can be used to form words by pushing them. For example, the key 2 is mapped with ["a","b","c"], we need to push the key one time to type "a", two times to type "b", and three times to type "c" .
// It is allowed to remap the keys numbered 2 to 9 to distinct collections of letters. The keys can be remapped to any amount of letters, but each letter must be mapped to exactly one key. You need to find the minimum number of times the keys will be pushed to type the string word.
// Return the minimum number of pushes needed to type word after remapping the keys.
// An example mapping of letters to keys on a telephone keypad is given below. Note that 1, *, #, and 0 do not map to any letters.


// Solution: Greedy

// Assign the first eight characters to the first positions in the eight keys.
// Assign the second eight characters to the second positions in the eight keys.
// ... and so on.

// n = length of word
// Time Complexity: O(n) 60ms
// Space Complexity: O(1) 45.9MB
var minimumPushes = function(word) {
  let pushes = 0;
  for (let i = 0; i < word.length; i++) {
    pushes += Math.floor(i / 8) + 1;
  }
  return pushes;
};

// Two test cases
console.log(minimumPushes("abcde")) // 5
console.log(minimumPushes("xycdefghij")) // 12