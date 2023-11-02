// 2294. Partition Array Such That Maximum Difference Is K
// You are given an integer array nums and an integer k. You may partition nums into one or more subsequences such that each element in nums appears in exactly one of the subsequences.
// Return the minimum number of subsequences needed such that the difference between the maximum and minimum values in each subsequence is at most k.
// A subsequence is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.


// Solution: Greedy w/ Sorting

// Sort nums, then group as many numbers as possible within a subsequence.

// Time Complexity: O(n log(n)) 269ms
// Space Complexity: O(log(n)) (space for sorting) 54.4MB
var partitionArray = function(nums, k) {
  nums.sort((a, b) => a - b);
  let start = 0, ans = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] - nums[start] > k) {
      start = i;
      ans++;
    }
  }
  return ans;
};

// Three test cases
console.log(partitionArray([3,6,1,2,5], 2)) // 2
console.log(partitionArray([1,2,3], 1)) // 2
console.log(partitionArray([2,2,4,5], 0)) // 3