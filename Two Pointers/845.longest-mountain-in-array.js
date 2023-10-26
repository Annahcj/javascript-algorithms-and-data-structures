// 845. Longest Mountain in Array
// You may recall that an array arr is a mountain array if and only if:
  // arr.length >= 3
  // There exists some index i (0-indexed) with 0 < i < arr.length - 1 such that:
    // arr[0] < arr[1] < ... < arr[i - 1] < arr[i]
    // arr[i] > arr[i + 1] > ... > arr[arr.length - 1]
// Given an integer array arr, return the length of the longest subarray, which is a mountain. Return 0 if there is no mountain subarray.


// Solution 1: 3 Passes w/ DP

// For each arr[i], get and record:
  // 1. inc[i]: the number of continuously decreasing numbers to the left of i.
  // 2. dec[i]: the number of continuously decreasing numbers to the right of i.
// Then, using these calculations, get the maximum inc[i] + dec[i] + 1.

// Time Complexity: O(n) 83ms
// Space Complexity: O(n) 44.5MB
var longestMountain = function(arr) {
  // inc[i] = length of increasing subarray ending at i
  // dec[i] = length of decreasing subarray starting at i
  let n = arr.length, inc = Array(n).fill(0), dec = Array(n).fill(0);
  for (let i = 1; i < n; i++) {
    if (arr[i] > arr[i - 1]) inc[i] = inc[i - 1] + 1;
  }
  for (let i = n - 2; i >= 0; i--) {
    if (arr[i] > arr[i + 1]) dec[i] = dec[i + 1] + 1;
  }
  
  let ans = 0;
  for (let i = 1; i < n - 1; i++) {
    if (inc[i] > 0 && dec[i] > 0) {
      ans = Math.max(ans, inc[i] + dec[i] + 1);
    }
  }
  return ans;
};


// Solution 2: Two Pointers

// Use two pointers to find each mountain and get the length.
// Use two while loops to traverse the increasing part and decreasing part.
// Check to make sure it's a valid mountain before recording the length.

// Time Complexity: O(n) 75ms
// Space Complexity: O(1) 44.2MB
var longestMountain = function(arr) {
  let start = 0, n = arr.length, ans = 0;
  while (start < n) {
    let end = start;
    while (end < n - 1 && arr[end] < arr[end + 1]) end++;
    while (end < n - 1 && arr[end] > arr[end + 1]) end++;
    if (end > 0 && arr[start] < arr[start + 1] && arr[end - 1] > arr[end]) {
      ans = Math.max(ans, end - start + 1);
    }
    start = Math.max(start + 1, end);
  }
  return ans;
};

// Two test cases
console.log(longestMountain([2,1,4,7,3,2,5])) // 5
console.log(longestMountain([2,2,2])) // 0