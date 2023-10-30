// 1764. Form Array by Concatenating Subarrays of Another Array
// You are given a 2D integer array groups of length n. You are also given an integer array nums.
// You are asked if you can choose n disjoint subarrays from the array nums such that the ith subarray is equal to groups[i] (0-indexed), and if i > 0, the (i-1)th subarray appears before the ith subarray in nums (i.e. the subarrays must be in the same order as groups).
// Return true if you can do this task, and false otherwise.
// Note that the subarrays are disjoint if and only if there is no index k such that nums[k] belongs to more than one subarray. A subarray is a contiguous sequence of elements within an array.


// Solution 1: Greedy & Brute Force

// Greedily match as early on as possible.
// Keep two pointers (i = index in groups, j = index in nums).
// For each index j, try to match groups[i].
  // If it's a match, move j forward groups[i].length.
  // If it's not a match, move j forward by 1.

// n = length of nums, m = max(groups[i].length)
// Time Complexity: O(nm) 111ms
// Space Complexity: O(1) 42.9MB
var canChoose = function(groups, nums) {
  let m = groups.length, n = nums.length;
  let i = 0, j = 0;
  while (i < m && j < n) {
    if (n - j < groups[i].length) return false;
    if (isMatch(i, j)) {
      j += groups[i].length, i++;
    } else j++;
  }
  return i === m;
  
  function isMatch(i, j) { // i = index in groups, j = index in nums
    for (let idx = 0; idx < groups[i].length; idx++) {
      if (groups[i][idx] !== nums[j + idx]) return false;
    }
    return true;
  }
};


// Solution 2: KMP Algorithm

// Use the kmp algorithm to match.
// Keep two pointers (i = index in groups, j = index in nums).
// For each group, move j forward to first match index + groups[i].length.
  // If there is no match, return false.

// n = length of nums, m = sum(groups[i].length)
// Time Complexity: O(n + m) 68ms
// Space Complexity: O(m) 43.7MB
var canChoose = function(groups, nums) {
  let m = groups.length, j = 0;
  for (let i = 0; i < m; i++) {
    let matchIndex = kmp(nums, groups[i], j);
    if (matchIndex === -1) return false;
    j = matchIndex + groups[i].length;
  }
  return true;
  
  function kmp(arr, subArr, startIndex = 0) {
    let lps = getLPS(subArr);
    let n = arr.length, m = subArr.length;
    let i = 0, j = startIndex;
    while (j < n) {
      if (arr[j] === subArr[i]) { 
        i++, j++; 
        if (i === m) return j - m;
      } else if (i > 0) {
        i = lps[i - 1]; // rollback
      } else j++; // i is 0, so we move j forward
    }
    return -1;
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
};

// Three test cases
console.log(canChoose([[1,-1,-1],[3,-2,0]], [1,-1,0,1,-1,-1,3,-2,0])) // true
console.log(canChoose([[10,-2],[1,2,3,4]], [1,2,3,4,10,-2])) // false
console.log(canChoose([[1,2,3],[3,4]], [7,7,1,2,3,4,7,7])) // false