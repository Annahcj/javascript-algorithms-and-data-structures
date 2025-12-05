// 3432. Count Partitions with Even Sum Difference
// You are given an integer array nums of length n.
// A partition is defined as an index i where 0 <= i < n - 1, splitting the array into two non-empty subarrays such that:
  // Left subarray contains indices [0, i].
  // Right subarray contains indices [i + 1, n - 1].
// Return the number of partitions where the difference between the sum of the left and right subarrays is even.


// Solution: Counting

// Iterate through nums, keeping track of the running sum on the left and right.
// Count the number of indices where the difference between left and right sum is even.

// Time Complexity: O(n) 0ms
// Space Complexity: O(1) 57MB
function countPartitions(nums) {
  const n = nums.length;
  let right = nums.reduce((sum, num) => sum + num);
  let left = 0, ans = 0;
  for (let i = 0; i < n - 1; i++) {
    left += nums[i], right -= nums[i];
    if ((left - right) % 2 === 0) {
      ans++;
    }
  }
  return ans;
};

// Two test cases
console.log(countPartitions([10,10,3,7,6])) // 4
console.log(countPartitions([1,2,2])) // 0