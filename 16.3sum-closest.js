// 16. 3Sum Closest
// Given an array nums of n integers and an integer target, find three integers in nums such that the sum is closest to target. Return the sum of the three integers. You may assume that each input would have exactly one solution.


// Solution 1: Two Pointers

// Sort nums in ascending order
// Loop through nums, use two pointers on i + 1 and end of array. 
// Increment left pointer if sum is smaller than target, decrement right pointer if sum is bigger than target, break if sum is equal to target.
// Update diff if smaller diff is found
// Return target - diff. 

// Time Complexity: O(n^2) 84ms
// Space Complexity: O(log n) (built in sorting algo) 40.5MB
var threeSumClosest = function(nums, target) {
    let diff = Infinity;
    nums = nums.sort((a, b) => a - b);
    for (var i = 0; i < nums.length; i++) {
      let l = i + 1, r = nums.length - 1;
      while (l < r) {
        let sum = nums[i] + nums[l] + nums[r];
        if (Math.abs(target - sum) < Math.abs(diff)) diff = target - sum;
        if (sum == target) break;
        if (sum < target) l++;
        else r--;
      }
    }
    return target - diff;
  };
  // Two test cases to run function on
  console.log(threeSumClosest([-1,2,1,-4], 1)) // 2
  console.log(threeSumClosest([-1,2,1,-4,1], 1)) // 1