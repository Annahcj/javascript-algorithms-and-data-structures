// 3016. Minimum Number of Pushes to Type Word II
// You are given a string word containing lowercase English letters.
// Telephone keypads have keys mapped with distinct collections of lowercase English letters, which can be used to form words by pushing them. For example, the key 2 is mapped with ["a","b","c"], we need to push the key one time to type "a", two times to type "b", and three times to type "c" .
// It is allowed to remap the keys numbered 2 to 9 to distinct collections of letters. The keys can be remapped to any amount of letters, but each letter must be mapped to exactly one key. You need to find the minimum number of times the keys will be pushed to type the string word.
// Return the minimum number of pushes needed to type word after remapping the keys.
// An example mapping of letters to keys on a telephone keypad is given below. Note that 1, *, #, and 0 do not map to any letters.


// Solution: Counting & Greedy

// It is optimal to assign characters with the most occurances to the front positions on the keys.

// 1. Count the occurances of each character.
// 2. Collect the counts and sort them in desc order.
// 3. Greedily assign characters with the most occurances to the front positions.
  // Assign the first eight counts to the first positions in the eight keys.
  // Assign the second eight counts to the second positions in the eight keys.
  // ... and so on.

// Time Complexity: O(n) 77ms
// Space Complexity: O(1) 55.7MB
var minimumPushes = function(word) {
  let count = Array(26).fill(0), n = word.length;
  for (let i = 0; i < n; i++) {
    count[word.charCodeAt(i) - 97]++;
  }
  let counts = [];
  for (let i = 0; i < 26; i++) {
    if (count[i] > 0) counts.push(count[i]);
  }
  counts.sort((a, b) => b - a);
  let ans = 0;
  for (let i = 0; i < counts.length; i++) {
    let position = Math.floor(i / 8) + 1;
    ans += position * counts[i];
  }
  return ans;
};

// Three test cases
console.log(minimumPushes("abcde")) // 5
console.log(minimumPushes("xyzxyzxyzxyz")) // 12
console.log(minimumPushes("aabbccddeeffgghhiiiiii")) // 24