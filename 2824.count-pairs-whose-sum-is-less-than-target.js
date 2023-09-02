// 2824. Count Pairs Whose Sum is Less than Target
// Given a 0-indexed integer array nums of length n and an integer target, return the number of pairs (i, j) where 0 <= i < j < n and nums[i] + nums[j] < target.


// Solution: Sorting & Two Pointers

// Sort nums in asc order.
// Keep track of two pointers (i and j) at the start and end of nums.
// Move the left pointer up incrementally, and move the right pointer down while nums[i] + nums[j] >= target.

// Logic: If we move the left pointer up, the sum will only grow larger so the right pointer will never miss any possible pairs using numbers on the right of the right pointer because they couldn't even form pairs with a smaller number.

// Time Complexity: O(n log(n)) 59ms
// Space Complexity: O(log(n)) (space for sorting) 43.8MB
var countPairs = function(nums, target) {
  nums.sort((a, b) => a - b);
  let n = nums.length, pairs = 0;
  for (let i = 0, j = n - 1; i < n; i++) {
    // find rightmost index where nums[i] + nums[j] < target
    while (j > i && nums[i] + nums[j] >= target) j--;
    pairs += Math.max(0, j - i);
  }
  return pairs;
};

// Two test cases
console.log(countPairs([-1,1,2,3,1], 2)) // 3
console.log(countPairs([-6,2,5,-2,-7,-1,3], -2)) // 10