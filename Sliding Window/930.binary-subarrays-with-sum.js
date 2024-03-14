// 930. Binary Subarrays With Sum
// Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.
// A subarray is a contiguous part of the array.

 
// Solution 1: Hashmap & Prefix Sum

// Two sum approach.
// Store occurances of each prefix sum in a hashmap
// Find the number of previous occurances of the current prefix sum - goal, as it means the subarray in between the current and previous index has a sum equal to goal.

// Time Complexity: O(n) 66ms
// Space Complexity: O(n) 54.2MB
var numSubarraysWithSum = function(nums, goal) {
  let map = {}, sum = 0, subarrays = 0;
  map[0] = 1;
  for (let num of nums) {
    sum += num;
    subarrays += (map[sum - goal] || 0);
    map[sum] = (map[sum] || 0) + 1;
  }
  return subarrays;
};


// Solution 2: Sliding Window

// Count all subarrays where the sum is less than or equal to goal.
// Count all subarrays where the sum is less than or equal to goal - 1.
// Maintain a sliding window of maximum length, where the sum doesn't exceed a certain sum.

// Return the (subarrays with sum <= goal) - (subarrays with sum <= goal - 1).

// Time Complexity: O(n) 72ms
// Space Complexity: O(1) 50.7MB
var numSubarraysWithSum = function(nums, goal) {
  return countSubarraysWithMaxSum(nums, goal) - countSubarraysWithMaxSum(nums, goal - 1);
};

function countSubarraysWithMaxSum(nums, maxSum) {
  let sum = 0, subarrays = 0;
  for (let j = 0, i = 0; j < nums.length; j++) {
    sum += nums[j];
    while (i <= j && sum > maxSum) {
      sum -= nums[i];
      i++;
    }
    subarrays += (j - i + 1);
  }
  return subarrays;
}

// Four test cases 
console.log(numSubarraysWithSum([1,0,1], 2)) // 1
console.log(numSubarraysWithSum([0,0,0,0,0,0,1,0,0,0], 0)) // 27
console.log(numSubarraysWithSum([1,0,1,0,1], 2)) // 4
console.log(numSubarraysWithSum([0,0,0,0,0], 0)) // 15