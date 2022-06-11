// 1658. Minimum Operations to Reduce X to Zero
// You are given an integer array nums and an integer x. In one operation, you can either remove the leftmost or the rightmost element from the array nums and subtract its value from x. Note that this modifies the array for future operations.
// Return the minimum number of operations to reduce x to exactly 0 if it is possible, otherwise, return -1.


// Solution: Hashmap & Prefix Sum

// This problem can be simplified to: find the longest subarray with a sum equal to total sum - x.
// We can solve this by using a two sum like approach, keeping the running sum and storing the earliest indices in a hashmap.
// Note: There is one edge case where the total sum is equal to x. If this is the case, return the total length.

// Time Complexity: O(n) 212ms
// Space Complexity: O(n) 76.5MB
var minOperations = function(nums, x) {
  let totalSum = nums.reduce((acc, num) => acc + num), target = totalSum - x;
  let indices = new Map(), sum = 0, max = target === 0 ? 0 : -1;
  indices.set(0, -1);
  
  for (let i = 0; i < nums.length; i++) {
    sum += nums[i];
    if (indices.has(sum - target)) {
      max = Math.max(max, i - indices.get(sum - target));
    }
    if (!indices.has(sum)) indices.set(sum, i);
  }
  return max === -1 ? -1 : nums.length - max;
};

// Three test cases to run function on
console.log(minOperations([1,1,4,2,3], 5)) // 2
console.log(minOperations([5,6,7,8,9], 4)) // -1
console.log(minOperations([3,2,20,1,1,3], 10)) // 5