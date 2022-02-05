// 1567. Maximum Length of Subarray With Positive Product
// Given an array of integers nums, find the maximum length of a subarray where the product of all its elements is positive.
// A subarray of an array is a consecutive sequence of zero or more values taken out of that array.
// Return the maximum length of a subarray with positive product.


// Solution: Greedy Approach

// A subarray with a positive product must consist of: 
  // Any number of positives
  // An even number of negatives
  // No zeros

// When we get to zero, we can't include it in the subarray, so we reset everything.
// Otherwise, keep track of the index of the first negative number, the running product, and the start index (index of the last zero).
// If the product is negative, the subarray length is: curr index - firstNegative.
// Otherwise, the subarray length is: curr index - start index.
// Get the maxmimum subarray length.

// Time Complexity: O(n) 83ms
// Space Complexity: O(1) 51.2MB
var getMaxLen = function(nums) {
  let start = -1, firstNeg = Infinity, product = 1, ans = 0;
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === 0) {
      firstNeg = Infinity;
      start = i;
      product = 1;
    } else {
      if (nums[i] < 0) firstNeg = Math.min(firstNeg, i);
      product *= nums[i];
    }
    
    if (product < 0) {
      ans = Math.max(ans, i - firstNeg);
    } else {
      ans = Math.max(ans, i - start);
    }
  }
  return ans;
};

// Three test cases to run function on
console.log(getMaxLen([1,-2,-3,4])) // 4
console.log(getMaxLen([0,1,-2,-3,-4])) // 3
console.log(getMaxLen([-1,-2,-3,0,1])) // 2