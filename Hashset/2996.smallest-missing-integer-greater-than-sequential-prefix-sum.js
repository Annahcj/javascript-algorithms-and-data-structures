// 2996. Smallest Missing Integer Greater Than Sequential Prefix Sum
// You are given a 0-indexed array of integers nums.
// A prefix nums[0..i] is sequential if, for all 1 <= j <= i, nums[j] = nums[j - 1] + 1. In particular, the prefix consisting only of nums[0] is sequential.
// Return the smallest integer x missing from nums such that x is greater than or equal to the sum of the longest sequential prefix.


// Solution: Hashset

// 1. Find the longest sequential prefix sum. 
  // Iterate through nums until nums[i - 1] + 1 !== nums[i].
// 2. Add all numbers to a hashset and increment the sequential sum until it doesn't exist in the hashset.

// n = length of nums
// Time Complexity: O(n) 71ms
// Space Complexity: O(n) 50.9MB
var missingInteger = function(nums) {
  let n = nums.length, sequentialSum = nums[0];
  for (let i = 1; i < n; i++) {
    if (nums[i - 1] + 1 !== nums[i]) break;
    sequentialSum += nums[i];
  }
  let set = new Set(nums);
  let smallestMissing = sequentialSum;
  while (set.has(smallestMissing)) {
    smallestMissing++;
  }
  return smallestMissing;
};

// Two test cases
console.log(missingInteger([1,2,3,2,5])) // 6
console.log(missingInteger([3,4,5,1,12,14,13])) // 15