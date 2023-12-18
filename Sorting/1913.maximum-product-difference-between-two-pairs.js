// 1913. Maximum Product Difference Between Two Pairs
// The product difference between two pairs (a, b) and (c, d) is defined as (a * b) - (c * d).
  // For example, the product difference between (5, 6) and (2, 7) is (5 * 6) - (2 * 7) = 16.
// Given an integer array nums, choose four distinct indices w, x, y, and z such that the product difference between pairs (nums[w], nums[x]) and (nums[y], nums[z]) is maximized.
// Return the maximum such product difference.


// Solution 1: Sorting

// Sort the array and return: last * second last - first * second

// Time Complexity: O(n log(n)) 89ms
// Space Complexity: O(log(n)) (space for sorting) 44.9MB
var maxProductDifference = function(nums) {
  nums.sort((a, b) => a - b);
  let n = nums.length;
  return (nums[n - 1] * nums[n - 2]) - (nums[0] * nums[1]);
};


// Solution 2: Two Max and Two Mins

// It's optimal to choose the two maximum and two minimum numbers, to get the maximum difference.

// Time Complexity: O(n) 55ms
// Space Complexity: O(1) 45.3MB
var maxProductDifference = function(nums) {
  let max = -Infinity, secondMax = -Infinity;
  let min = Infinity, secondMin = Infinity;
  for (let num of nums) {
    if (num >= max) {
      secondMax = max;
      max = num;
    } else if (num > secondMax) {
      secondMax = num;
    }
    
    if (num <= min) {
      secondMin = min;
      min = num;
    } else if (num < secondMin) {
      secondMin = num;
    }
  }
  return (max * secondMax) - (min * secondMin);
};

// Two test cases
console.log(maxProductDifference([5,6,2,7,4])) // 34
console.log(maxProductDifference([4,2,5,9,7,4,8])) // 64