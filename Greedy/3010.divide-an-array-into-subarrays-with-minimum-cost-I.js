// 3010. Divide an Array Into Subarrays With Minimum Cost I
// You are given an array of integers nums of length n.
// The cost of an array is the value of its first element. For example, the cost of [1,2,3] is 1 while the cost of [3,4,1] is 3.
// You need to divide nums into 3 disjoint contiguous subarrays.
// Return the minimum possible sum of the cost of these subarrays.

 
// Solution: Top Two Minimum 

// The first subarray must start from nums[0].
// The second and third subarray can start from anywhere after index 0.
// Find the top two minimum numbers in the array after nums[0].

// Time Complexity: O(n) 82ms
// Space Complexity: O(1) 52.6MB
var minimumCost = function(nums) {
  let min = Infinity, secondMin = min, n = nums.length;
  for (let i = 1; i < n; i++) {
    if (nums[i] < min) {
      secondMin = min;
      min = nums[i];
    } else if (nums[i] < secondMin) {
      secondMin = nums[i];
    }
  }
  return nums[0] + min + secondMin;
};

// Three test cases
console.log(minimumCost([1,2,3,12])) // 6
console.log(minimumCost([5,4,3])) // 12
console.log(minimumCost([10,3,1,1])) // 12