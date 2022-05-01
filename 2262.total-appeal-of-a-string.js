// 2262. Total Appeal of A String
// The appeal of a string is the number of distinct characters found in the string.
  // For example, the appeal of "abbca" is 3 because it has 3 distinct characters: 'a', 'b', and 'c'.
// Given a string s, return the total appeal of all of its substrings.
// A substring is a contiguous sequence of characters within a string.


// Solution: Last Index

// Keep track of the last index of each character in s, on the fly.
// To get the number of subarrays each character appears in, the formula is (n - i) * (i + 1)
  // (i + 1) -> number of starting subarrays ending with arr[i]
  // (n - i) -> number of different ending subarrays after arr[i]
  // e.g: arr = [1,2,3,4]
  // Let's look for the number of times arr[1] appears in a subarray:
  // (i + 1) = [[1,2],[2]]
  // (n - i) = [[2],[2,3],[2,3,4]]
  // (n - i) * (i + 1) = all the combinations (6) -> [[1,2],[1,2,3],[1,2,3,4],[2],[2,3],[2,3,4]]

// However, we are only counting the distinct characters.
// To solve this, keep track of the last index of each character, then exclude counting the subarrays which overlap with the last occurance.
// The formula turns into: (n - i) * (i - lastIdx)

// e.g: arr = [1,2,3,2,4]
// Let's calculate the 'appeal' of arr[3].
// We only want to count these subarrays (don't include the earlier 2) -> [[3,2],[3,2,4],[2],[2,4]]
// The last occurance of 2 was at index 1.
// (n - i) * (i - lastIdx) = (5 - 3) * (3 - 1) = 2 * 2 = 4

// Time Complexity: O(n) 74ms
// Space Complexity: O(26) = O(1) 44.5MB
var appealSum = function(s) {
  let ans = 0, n = s.length;
  let lastIndex = Array(26).fill(-1);
  for (let i = 0; i < n; i++) {
    let charcode = s.charCodeAt(i) - 97;
    let lastIdx = lastIndex[charcode];
    ans += (n - i) * (i - lastIdx);
    lastIndex[charcode] = i;
  }  
  return ans;
};

// Three test cases to run function on
console.log(appealSum("aaaaaa")) // 21
console.log(appealSum("abbca")) // 28
console.log(appealSum("code")) // 20