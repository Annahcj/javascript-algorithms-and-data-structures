// 462. Minimum Moves to Equal Array Elements II
// Given an integer array nums of size n, return the minimum number of moves required to make all array elements equal.
// In one move, you can increment or decrement an element of the array by 1.


// Solution: Greedy Approach using Median

// The median is always the optimal position.
// If the array length is even, both medians result in the same number of moves, so we can pick any.

// Sort the array in asc order, then return the difference of all numbers from the median.

// Time Complexity: O(n log(n)) 80ms
// Space Complexity: O(log(n)) (sorting) 41.1MB
var minMoves2 = function(nums) {
  let n = nums.length, ans = 0;
  nums.sort((a, b) => a - b);
  let mid = Math.floor(n / 2);
  let median = nums[mid];
  for (var num of nums) {
    ans += Math.abs(median - num);
  }
  return ans;
};

// Two test cases to run function on
console.log(minMoves2([1,2,3])) // 2
console.log(minMoves2([1,10,2,9])) // 16