// 2563. Count the Number of Fair Pairs
// Given a 0-indexed integer array nums of size n and two integers lower and upper, return the number of fair pairs.
// A pair (i, j) is fair if:
  // 0 <= i < j < n, and
  // lower <= nums[i] + nums[j] <= upper


// Solution: Binary Search & Sorting 

// First, sort nums in asc order (order doesn't matter)
// Then for each index i, binary search for the lower and upper bound indices:
  // 1. Binary search for the smallest index j where nums[i] + nums[j] >= lower (and j > i)
  // 2. Binary search for the largest index j where nums[i] + nums[j] <= upper (and j > i)
// The number of pairs with the index i = upperBound - lowerBound + 1

// Time Complexity: O(n log(n)) 316ms
// Space Complexity: O(log(n)) (space for sorting) 53.9MB
var countFairPairs = function(nums, lower, upper) {
  let n = nums.length, pairs = 0;
  nums.sort((a, b) => a - b);
  for (let i = 0; i < n - 1; i++) {
    let lowerBound = lower_bound(i); 
    let upperBound = upper_bound(i);
    pairs += Math.max(0, upperBound - lowerBound + 1);
  }
  return pairs;
  
  function lower_bound(i) {
    // Find smallest index j where nums[i] + nums[j] >= lower
    let low = i + 1, high = n - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (nums[mid] + nums[i] >= lower) high = mid;
      else low = mid + 1;
    }
    return nums[low] + nums[i] >= lower ? low : n;
  }
  
  function upper_bound(i) {
    // Find largest index j where nums[i] + nums[j] <= upper
    let low = i + 1, high = n - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (nums[mid] + nums[i] <= upper) low = mid;
      else high = mid - 1;
    }
    return nums[low] + nums[i] <= upper ? low : i;
  }
};

// Two test cases
console.log(countFairPairs([0,1,7,4,4,5], 3, 6)) // 6
console.log(countFairPairs([1,7,9,2,5], 11, 11)) // 1