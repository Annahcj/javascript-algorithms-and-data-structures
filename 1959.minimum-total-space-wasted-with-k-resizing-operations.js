// 1959. Minimum Total Space Wasted With K Resizing Operations
// You are currently designing a dynamic array. You are given a 0-indexed integer array nums, where nums[i] is the number of elements that will be in the array at time i. In addition, you are given an integer k, the maximum number of times you can resize the array (to any size).
// The size of the array at time t, sizet, must be at least nums[t] because there needs to be enough space in the array to hold all the elements. The space wasted at time t is defined as sizet - nums[t], and the total space wasted is the sum of the space wasted across every time t where 0 <= t < nums.length.
// Return the minimum total space wasted if you can resize the array at most k times.
// Note: The array can have any size at the start and does not count towards the number of resizing operations.


// Solution: Recursion w/ Memoization

// Get the max within the range [i, ..., j].
// The amount of wasted space is max * (j - i + 1) - sum of [i, ..., j].
// Get the best combination of resizing.

// Time Complexity: O(n^2 * k) 248ms
// Space Complexity: O(n^2 * k) 40.6MB
var minSpaceWastedKResizing = function(nums, k) {
  let n = nums.length;
  let memo = Array(n);
  for (var i = 0; i < n; i++) memo[i] = Array(k);
  return recurse(0, k);
  
  function recurse(i, k) {
    if (i === n) return 0;
    if (k < 0) return Infinity;
    if (memo[i][k] !== undefined) return memo[i][k];
    
    let max = 0, currSum = 0, ans = Infinity;
    for (var j = i; j < n; j++) {
      max = Math.max(max, nums[j]);
      currSum += nums[j];
      let spaceWasted = max * (j - i + 1) - currSum;
      ans = Math.min(ans, recurse(j + 1, k - 1) + spaceWasted);
    }
    memo[i][k] = ans;
    return ans;
  }
};

// Three test cases to run function on
console.log(minSpaceWastedKResizing([10,20], 0)) // 10
console.log(minSpaceWastedKResizing([10,20,30], 1)) // 10
console.log(minSpaceWastedKResizing([10,20,15,30,20], 2)) // 15