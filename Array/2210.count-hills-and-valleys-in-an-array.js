// 2210. Count Hills and Valleys in an Array
// You are given a 0-indexed integer array nums. An index i is part of a hill in nums if the closest non-equal neighbors of i are smaller than nums[i]. Similarly, an index i is part of a valley in nums if the closest non-equal neighbors of i are larger than nums[i]. Adjacent indices i and j are part of the same hill or valley if nums[i] == nums[j].
// Note that for an index to be part of a hill or valley, it must have a non-equal neighbor on both the left and right of the index.
// Return the number of hills and valleys in nums.


// Solution: Get Unique Numbers

// 1. Get the unique numbers in nums (numbers not equal to the next)
// 2. Get the count of numbers where 
  // unique[i - 1] > unique[i] AND unique[i + 1] > unique[i]
  // OR
  // unique[i - 1] < unique[i] AND unique[i + 1] < unique[i]

// Time Complexity: O(n) 79ms
// Space Complexity: O(n) 42.7MB
var countHillValley = function(nums) {
  let unique = [], n = nums.length;
  for (let i = 0; i < n; i++) {
    if (nums[i] !== nums[i + 1]) unique.push(nums[i]);
  }
  
  let ans = 0;
  for (let i = 1; i < unique.length - 1; i++) {
    if (isHillOrValley(unique[i], unique[i - 1], unique[i + 1])) ans++;
  }
  return ans;
    
  function isHillOrValley(num, prev, next) {
    return (num > prev && num > next) || (num < prev && num < next); 
  }
};

// Two test cases
console.log(countHillValley([2,4,1,1,6,5])) // 3
console.log(countHillValley([6,6,5,5,4,1])) // 0