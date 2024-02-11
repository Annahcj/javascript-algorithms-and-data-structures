// 3034. Number of Subarrays That Match a Pattern I
// You are given a 0-indexed integer array nums of size n, and a 0-indexed integer array pattern of size m consisting of integers -1, 0, and 1.
// A subarray nums[i..j] of size m + 1 is said to match the pattern if the following conditions hold for each element pattern[k]:
  // nums[i + k + 1] > nums[i + k] if pattern[k] == 1.
  // nums[i + k + 1] == nums[i + k] if pattern[k] == 0.
  // nums[i + k + 1] < nums[i + k] if pattern[k] == -1.
// Return the count of subarrays in nums that match the pattern.


// Solution: KMP Algorithm

// Create an array of length n - 1 `relation` representing the relationship between each pair of adjacent numbers in nums.
  // nums[i] < nums[i + 1]: 1
  // nums[i] === nums[i + 1]: 0
  // nums[i] > nums[i + 1]: -1

// Use the KMP algorithm to find the number of matches in O(n + m).
// From there, the problem boils down to finding the number of exact matches of `pattern` in `relation`.

// n = length of nums, m = length of pattern
// Time Complexity: O(n + m) 56ms
// Space Complexity: O(n + m) 52MB
var countMatchingSubarrays = function(nums, pattern) {
  let n = nums.length, relation = Array(n - 1).fill(0);
  for (let i = 0; i < n - 1; i++) {
    if (nums[i] < nums[i + 1]) relation[i] = 1;
    else if (nums[i] === nums[i + 1]) relation[i] = 0;
    else relation[i] = -1;
  }
  return kmp(relation, pattern);
};

function kmp(arr, subarray) {
  let lps = getLPS(subarray);
  let n = arr.length, m = subarray.length;
  let i = 0, j = 0;
  let matches = 0;
  while (j < n) {
    if (arr[j] === subarray[i]) { 
      i++, j++; 
      if (i === m) matches++;
    } else if (i > 0) {
      i = lps[i - 1]; // rollback
    } else j++; // i is 0, so we move j forward
  }
  return matches;
}

function getLPS(arr) {
  let n = arr.length, lps = Array(n).fill(0);
  let i = 0, j = 1;
  while (j < n) {
    if (arr[i] === arr[j]) {
      lps[j++] = ++i;
    } else if (i > 0) {
      i = lps[i - 1];
    } else j++;
  }
  return lps;
}

// Two test cases
console.log(countMatchingSubarrays([1,2,3,4,5,6], [1,1])) // 4
console.log(countMatchingSubarrays([1,4,4,1,3,5,5,3], [1,0,-1])) // 2