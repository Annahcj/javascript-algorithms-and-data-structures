// 3487. Maximum Unique Subarray Sum After Deletion
// You are given an integer array nums.
// You are allowed to delete any number of elements from nums without making it empty. After performing the deletions, select a subarray of nums such that:
  // All elements in the subarray are unique.
  // The sum of the elements in the subarray is maximized.
// Return the maximum sum of such a subarray.


// Solution: Hashset

// Store the distinct non-negative numbers in a hashset.
// For the case where all numbers are negative, we need to take the maximum negative number.
// Keep track of the maximum negative numbers, and return that if the set is empty at the end.
// Otherwise, return the sum of the set.

// Time Complexity: O(n) 1ms
// Space Complexity: O(n) 57MB
function maxSum(nums) {
  const unique = new Set();
  let sum = 0, maxNegative = -Infinity;
  for (let num of nums) {
    if (num < 0) {
      maxNegative = Math.max(maxNegative, num);
      continue;
    }
    if (!unique.has(num)) {
      unique.add(num);
      sum += num;
    }
  }
  return unique.size === 0 ? maxNegative : sum;
};

// Two test cases
console.log(maxSum([1,2,3,4,5])) // 15
console.log(maxSum([1,1,0,1,1])) // 1