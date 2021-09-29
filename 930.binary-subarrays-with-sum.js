// 930. Binary Subarrays With Sum
// Given a binary array nums and an integer goal, return the number of non-empty subarrays with a sum goal.
// A subarray is a contiguous part of the array.

 
// Solution 1: Prefix Sum w/ Hashmap

// Use a hashmap 'count' to store the number of times a prefix sum occurs in nums
// Initially, set count[0] to 1.
// Loop through nums (pointer = i)
  // add nums[i] to prefixSum
  // add count[prefixSum - goal] to ans
  // increment count of prefixSum
// Return ans

// Time Complexity: O(n) 92ms
// Space Complexity: O(n) 44.1MB
var numSubarraysWithSum = function(nums, goal) {
  let count = {0: 1}, ans = 0, prefixSum = 0;
  for (var i = 0; i < nums.length; i++) {
    prefixSum += nums[i];
    ans += (count[prefixSum - goal] || 0);
    count[prefixSum] = (count[prefixSum] || 0) + 1;
  }
  return ans;
};


// Solution 2: Sliding Window

// function atMost returns the number of subarrays with sums smaller than or equal to goal
// returning atMost(goal) - atMost(goal - 1) returns the number of subarrays with sums exactly equal to goal

// atMost: (goal)
  // if goal is smaller than 0, return 0 (the sum can never be smaller than 0 since we only have 1's and 0's)
  // set ans to 0, left to 0
  // loop through nums (pointer = right)
    // decrement goal by nums[right]
    // loop while goal is smaller than 0,
      // increment goal by nums[left]
      // increment left by one
    // add right - left + 1 to ans
  // return ans

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 42.1MB
var numSubarraysWithSum = function(nums, goal) {
  function atMost(goal) {
    if (goal < 0) return 0;
    let ans = 0;
    let left = 0;
    for (var right = 0; right < nums.length; right++) {
      goal -= nums[right];
      while (goal < 0) {
        goal += nums[left];
        left++;
      }
      ans += (right - left) + 1;
    }
    return ans;
  }
  return atMost(goal) - atMost(goal - 1);
};

// Four test cases to run function on
console.log(numSubarraysWithSum([1,0,1], 2)) // 1
console.log(numSubarraysWithSum([0,0,0,0,0,0,1,0,0,0], 0)) // 27
console.log(numSubarraysWithSum([1,0,1,0,1], 2)) // 4
console.log(numSubarraysWithSum([0,0,0,0,0], 0)) // 15