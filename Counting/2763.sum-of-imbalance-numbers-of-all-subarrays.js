// 2763. Sum of Imbalance Numbers of All Subarrays
// The imbalance number of a 0-indexed integer array arr of length n is defined as the number of indices in sarr = sorted(arr) such that:
  // 0 <= i < n - 1, and
  // sarr[i+1] - sarr[i] > 1
// Here, sorted(arr) is the function that returns the sorted version of arr.
// Given a 0-indexed integer array nums, return the sum of imbalance numbers of all its subarrays.
// A subarray is a contiguous non-empty sequence of elements within an array.


// Solution: Counting 

// For each nums[i], go through each index j where i < j.
// Keep track of how many pairs in the current subarray (i, j).
// Use a hashset to keep track of which numbers we have so far.

// If the set already contains nums[j] - 1 and nums[j] + 1, then we lose one pair.
  // e.g: If we previously had [3,5], and nums[j] = 4, then we lose 1 pair (3,5).

// If the set doesn't contain nums[j] - 1 AND doesn't contain nums[j] + 1, then we gain one pair. 
  // e.g: If the set is currently [1,5] with count = 1, and nums[j] = 3, then we gain 1 pair because we can pretend (1,5) becomes (1,3), and add the additional (3,5).

// Time Complexity: O(n^2) 219ms
// Space Complexity: O(n) 49.1MB
var sumImbalanceNumbers = function(nums) {
  let n = nums.length, ans = 0;
  for (let i = 0; i < n; i++) {
    let set = new Set([nums[i]]), count = 0;
    for (let j = i + 1; j < n; j++) {
      if (!set.has(nums[j])) {
        if (set.has(nums[j] - 1) && set.has(nums[j] + 1)) count--;
        else if (!set.has(nums[j] - 1) && !set.has(nums[j] + 1)) count++;
        set.add(nums[j]);
      }
      ans += count; // for each subarray starting at nums[i], we have `count` pairs
    }
  }
  return ans;
};

// Two test cases
console.log(sumImbalanceNumbers([2,3,1,4])) // 3
console.log(sumImbalanceNumbers([1,3,3,3,5])) // 8