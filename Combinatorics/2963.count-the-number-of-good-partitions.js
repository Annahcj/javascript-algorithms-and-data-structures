// 2963. Count the Number of Good Partitions
// You are given a 0-indexed array nums consisting of positive integers.
// A partition of an array into one or more contiguous subarrays is called good if no two subarrays contain the same number.
// Return the total number of good partitions of nums.
// Since the answer may be large, return it modulo 10^9 + 7.


// Solution: Combinatorics & Two Pointers

// 1. Find the number of groups.
  // All occurances of a number must be contained in the same group.
  // Use two pointers to find the number of groups: 
    // Record the indices of the last occurance of each number.
    // Extend the right pointer of the group to lastIndex[nums[i]], until the left pointer reaches the right pointer.
// 2. Calculate the number of different partitions of these groups.
  // Each group has two choices: Either join the current group with the previous group, or start a new partition.
  // Since the first group has only one choice, it can be calculated as: 2^(groups - 1). Calculate this on the fly.

// Time Complexity: O(n) 173ms
// Space Complexity: O(n) 64.1MB
var numberOfGoodPartitions = function(nums) {
  let n = nums.length, lastIndex = {};
  for (let i = 0; i < n; i++) {
    lastIndex[nums[i]] = i;
  }
  let i = 0, foundFirstGroup = false;
  let ans = 1n, MOD = 1000000007n;
  while (i < n) {
    let j = lastIndex[nums[i]];
    while (i < j) {
      i++;
      j = Math.max(j, lastIndex[nums[i]]);
    }
    if (foundFirstGroup) {
      ans = (ans * 2n) % MOD;
    }
    i++, foundFirstGroup = true;
  }
  return ans;
};

// Three test cases
console.log(numberOfGoodPartitions([1,2,3,4])) // 8
console.log(numberOfGoodPartitions([1,1,1,1])) // 1
console.log(numberOfGoodPartitions([1,2,1,3])) // 2