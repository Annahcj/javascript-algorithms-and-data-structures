// 2576. Find the Maximum Number of Marked Indices
// You are given a 0-indexed integer array nums.
// Initially, all of the indices are unmarked. You are allowed to make this operation any number of times:
  // Pick two different unmarked indices i and j such that 2 * nums[i] <= nums[j], then mark i and j.
// Return the maximum possible number of marked indices in nums using the above operation any number of times.


// Solution: Greedy w/ Two Pointers & Sorting

// Sort nums in asc order.
// Split nums into two parts: the first half and second half.
// Use two pointers for the first and second half of nums.
// We split it in half because we want to make the maximum amount of pairs.

// Try to pair up each nums[i] with nums[j]. 
// If nums[i] * 2 > nums[j], move j up until this is not true.
// Proof: If nums[i] * 2 > nums[j], then no upcoming nums[i] can be paired with nums[j]. So it is optimal to take nums[i] with the next valid nums[j].

// Time Complexity: O(n log(n)) 211ms
// Space Complexity: O(log(n)) (space for sorting) 54.8MB
var maxNumOfMarkedIndices = function(nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length, mid = Math.ceil(n / 2), ans = 0;
  for (let i = 0, j = mid; i < mid && j < n; i++) {
    while (j < n && nums[i] * 2 > nums[j]) j++;
    if (j < n) ans += 2, j++;
  }
  return ans;
};

// Three test cases
console.log(maxNumOfMarkedIndices([3,5,2,4])) // 2
console.log(maxNumOfMarkedIndices([9,2,5,4])) // 4
console.log(maxNumOfMarkedIndices([7,6,8])) // 0