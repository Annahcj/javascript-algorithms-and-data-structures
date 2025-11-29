// 3512. Minimum Operations to Make Array Sum Divisible by K
// You are given an integer array nums and an integer k. You can perform the following operation any number of times:
  // Select an index i and replace nums[i] with nums[i] - 1.
// Return the minimum number of operations required to make the sum of the array divisible by k.


// Solution: Sum

// Get the total sum of nums.
// The answer is the remainder dividing the total sum by k.
 
// Time Complexity: O(n) 2ms
// Space Complexity: O(1) 57MB
function minOperations(nums, k) {
  const totalSum = nums.reduce((sum, num) => sum + num);
  return totalSum % k;
};

// Three test cases
console.log(minOperations([3,9,7], 5)) // 4
console.log(minOperations([4,1,3], 4)) // 0
console.log(minOperations([3,2], 6)) // 5