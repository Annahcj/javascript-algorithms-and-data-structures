// 2270. Number of Ways to Split Array
// You are given a 0-indexed integer array nums of length n.
// nums contains a valid split at index i if the following are true:
  // The sum of the first i + 1 elements is greater than or equal to the sum of the last n - i - 1 elements.
  // There is at least one element to the right of i. That is, 0 <= i < n - 1.
// Return the number of valid splits in nums.


// Solution: Prefix Sum

// Keep two running sums of numbers on the left and right of each index i.

// For the right, accumulate the entire sum and subtract from it as i moves up.
// For the left, start from 0 and add to it as i moves up.

// Time Complexity: O(n) 135ms
// Space Complexity: O(1) 57.2MB
var waysToSplitArray = function(nums) {
  let n = nums.length, right = 0;
  for (let num of nums) {
    right += num;
  }
  
  let left = 0, ans = 0;
  for (let i = 0; i < n - 1; i++) {
    right -= nums[i];
    left += nums[i];
    if (left >= right) ans++;
  }
  return ans;
};

// Two test cases
console.log(waysToSplitArray([10,4,-8,7])) // 2
console.log(waysToSplitArray([2,3,1,0])) // 2