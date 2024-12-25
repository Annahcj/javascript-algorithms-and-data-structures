// 3397. Maximum Number of Distinct Elements After Operations
// You are given an integer array nums and an integer k.
// You are allowed to perform the following operation on each element of the array at most once:
  // Add an integer in the range [-k, k] to the element.
// Return the maximum possible number of distinct elements in nums after performing the operations.


// Solution: Greedy w/ Sorting

// Sort nums in asc order.
// The largest range is achieved by reducing the minimum element of nums by k.
// Keep track of the current largest element we have operated on and change each nums[i] to take the next available spot within the bounds of k.
  // If it's impossible to change nums[i] into a distinct number (last + 1 >= nums[i] + k), skip it.
  // Otherwise, take the smallest possible next position: Math.max(last + 1, nums[i] - k).
// Return the number of distinct elements after the operations.

// n = length of nums
// Time Complexity: O(n log(n)) 130ms
// Space Complexity: O(log(n)) 62.1MB
function maxDistinctElements(nums, k) {
  nums.sort((a, b) => a - b);
  let last = nums[0] - k, distinct = 1;
  for (let i = 1; i < nums.length; i++) {
    if (last + 1 > nums[i] + k) continue;
    last = Math.max(last + 1, nums[i] - k);
    distinct++;
  }
  return distinct;
};

// Two test cases
console.log(maxDistinctElements([1,2,2,3,3,4], 2)) // 6
console.log(maxDistinctElements([4,4,4,4], 1)) // 3