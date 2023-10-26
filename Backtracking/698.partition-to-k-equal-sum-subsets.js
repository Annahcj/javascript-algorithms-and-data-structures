// 698. Partition to K Equal Sum Subsets
// Given an integer array nums and an integer k, return true if it is possible to divide this array into k non-empty subsets whose sums are all equal.


// Solution: Backtracking

// If k is equal to 1, we know we can always return true because the length of nums is guaranteed to be not empty.
// If the length of nums is smaller than k, return false since it's impossible.
// Loop through nums and calculate the total sum of the numbers in nums.
// If the total sum is not divisible by k, return false.
// Sort nums in descending order
// Return backtrack(0, 0, 0, sum / k, {})

// backtrack: (index, current sum, number of subsets, target sum, taken)
  // if numSubsets is equal to k - 1, return true (we know that the last subset will also have a sum equal to target)
  // if currSum is bigger than target, return false (sum will only get bigger from here)
  // if currSum is equal to target
    // return backtrack(0, 0, numSubsets + 1, target, taken) (a subset is now complete, we move on to the next one)
  // loop through nums from index (pointer = i)
    // if i has not been taken yet
      // mark i as taken
      // if backtrack(i + 1, currSum + nums[i], numSubsets, target, taken) returns true, return true.
      // unmark i as taken
  // if the end of the loop has been reached, return false

// Time Complexity: O(k * 2^n) 79ms
// Space Complexity: O(n) 39.7MB
var canPartitionKSubsets = function(nums, k) {
  function backtrack(index, currSum, numSubsets, target, taken) {
    if (numSubsets === k - 1) return true;
    if (currSum > target) return false;
    if (currSum === target) {
      return backtrack(0, 0, numSubsets + 1, target, taken);
    }
    for (var i = index; i < nums.length; i++) {
      if (!taken[i]) {
        taken[i] = true;
        if (backtrack(i + 1, currSum + nums[i], numSubsets, target, taken)) return true;
        taken[i] = false;
      }
    }
    return false;
  }  

  let sum = 0;
  for (var num of nums) sum += num;
  if (k === 1) return true;
  if (nums.length < k) return false;
  if (sum % k !== 0) return false;

  nums = nums.sort((a, b) => b - a);
  return backtrack(0, 0, 0, sum / k, {});
};

// Three test cases to run function on
console.log(canPartitionKSubsets([2,2,2,2,3,4,5], 4)) // false
console.log(canPartitionKSubsets([4,3,2,3,5,2,1], 4)) // true
console.log(canPartitionKSubsets([1,2,3,4], 3)) // false