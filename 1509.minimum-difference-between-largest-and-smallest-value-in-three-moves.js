// 1509. Minimum Difference Between Largest and Smallest Value in Three Moves
// You are given an integer array nums. In one move, you can choose one element of nums and change it by any value.
// Return the minimum difference between the largest and smallest value of nums after performing at most three moves.


// Solution: Sort and Find Best Combination

// Edge case: If the length of nums is 4 or less, we can always make all values the same, thus the difference will be 0.
// 1. Sort nums in asc order
// 2. Find the minimum of four situations:
  // The diff between: (end = last index of nums)
  // 1. 0, end - 3
  // 2. 1, end - 2
  // 3. 2, end - 1
  // 4. 3, end
// Each of these situations means: Remove the i minimum values, and remove the (3 - i) maximum values. (by remove, it means make equal to new min or max)

// Time Complexity: O(n log(n)) 175ms
// Space Complexity: O(log(n)) (space for sorting) 50.9MB
var minDifference = function(nums) {
  if (nums.length <= 4) return 0;
  nums.sort((a, b) => a - b);
  
  let n = nums.length, ans = Infinity;
  for (var i = 0; i <= 3; i++) {
    let start = i, end = n - (3 - i) - 1;
    ans = Math.min(ans, nums[end] - nums[start]);
  }
  return ans;
};

// Two test cases to run function on
console.log(minDifference([5,3,2,4])) // 0
console.log(minDifference([1,5,0,10,14])) // 1