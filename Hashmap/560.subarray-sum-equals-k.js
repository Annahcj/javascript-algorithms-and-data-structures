// 560. Subarray Sum Equals K
// Given an array of integers nums and an integer k, return the total number of continuous subarrays whose sum equals to k.


// Solution: Cumulative Sum in One Pass

// Declare a map to keep each sum and the occurance of each.
// Loop through nums, update total sum.
  // If map contains [current total sum - k], add number of occurances to count.
  // If map contains current total sum, increment map[sum] by one, otherwise set it equal to one.

// For e.g.: nums = [5,2,2,4], targ = 4
  // map: {0: 1} i = 0  ->  sum = 5, does map have sum - k (5 - 4), it doesn't, so count = 0, increment map[sum] by 1;
  // map: {0: 1, 5: 1} i = 1  -> sum = 7, does map have (7 - 4), it doesn't, so count = 0, increment map[sum] by 1;
  // map: {0: 1, 5: 1, 7: 1} i = 2  -> sum = 9, does map have (9 - 4), yes it does! so count += map[9 - 5] (count = 1), increment map[sum] by 1;
  // map: {0: 1, 5: 1, 7: 1, 9: 1} i = 3  -> sum = 13, does map have (13 - 4), yes it does, so count += map[13 - 4] (count = 2), increment map[sum] by 1;
  // Loop is finished, so we return count, which is 2.

// Time Complexity: O(n) 128ms
// Space Complexity: O(n) 49.7MB
var subarraySum = function(nums, k) {
  let map = {0: 1}, count = 0, sum = 0;
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (map[sum - k]) {
      count += map[sum - k];
    }
    map[sum] = (map[sum] || 0) + 1;
  }
  return count;
};

// Three test cases to run function on
console.log(subarraySum([1,-1,0],0)) // 3
console.log(subarraySum([1,1,2], 2)) // 2
console.log(subarraySum([1,1,2,2,3,3], 6)) // 2