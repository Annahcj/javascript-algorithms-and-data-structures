// 3366. Minimum Array Sum
// You are given an integer array nums and three integers k, op1, and op2.
// You can perform the following operations on nums:
  // Operation 1: Choose an index i and divide nums[i] by 2, rounding up to the nearest whole number. You can perform this operation at most op1 times, and not more than once per index.
  // Operation 2: Choose an index i and subtract k from nums[i], but only if nums[i] is greater than or equal to k. You can perform this operation at most op2 times, and not more than once per index.
// Note: Both operations can be applied to the same index, but at most once each.
// Return the minimum possible sum of all elements in nums after performing any number of operations.


// Solution: DP

// For every nums[i], keep track of the minimum array sum for every combination of operation 1s and operation 2s.
// prev[j][l] = minimum array sum from index 0 to current index, using j operation 1's and l operation 2's.

// For every nums[i], we have five scenarios:
  // 1. Don't perform any operation and take nums[i] as it is.
  // 2. Only perform operation 1 (if we have enough operation 1's).
  // 3. Perform operation 1, then operation 2 (if we have enough operation 1's AND the leftover nums[i] >= k after performing operation 1).
  // 4. Only perform operation 2 (if we have enough operation 2's and nums[i] >= k).
  // 5. Perform operation 2, then operation 1 (if we have enough operation 2's and nums[i] >= k, AND we have enough operation 1's).
// Take the minimum array sum out of these five scenarios.

// Time Complexity: O(n * op1 * op2) 204ms
// Space Complexity: O(op1 * op2) 61.3MB
function minArraySum(nums, k, op1, op2) {
  let n = nums.length, prev = Array(op1 + 1).fill(0).map(() => Array(op2 + 1).fill(Infinity));
  prev[0][0] = 0;
  for (let i = 0; i < n; i++) {
    let curr = Array(op1 + 1).fill(0).map(() => Array(op2 + 1).fill(Infinity));
    for (let j = 0; j <= op1; j++) {
      for (let l = 0; l <= op2; l++) {
        // don't perform any operation
        curr[j][l] = prev[j][l] + nums[i];
        // only perform operation 1
        if (j > 0) {
          const afterOp1 = Math.ceil(nums[i] / 2);
          curr[j][l] = Math.min(curr[j][l], prev[j - 1][l] + afterOp1);
          // perform operation 1, then operation 2
          if (l > 0 && afterOp1 >= k) {
            curr[j][l] = Math.min(curr[j][l], prev[j - 1][l - 1] + afterOp1 - k);
          }
        }
        // only perform operation 2
        if (l > 0 && nums[i] >= k) {
          const afterOp2 = nums[i] - k;
          curr[j][l] = Math.min(curr[j][l], prev[j][l - 1] + afterOp2);
          // perform operation 2, then operation 1
          if (j > 0) {
            curr[j][l] = Math.min(curr[j][l], prev[j - 1][l - 1] + Math.ceil(afterOp2 / 2));
          }
        }
      }
    }
    prev = curr;
  }
  return prev.reduce((min, row) => Math.min(min, row.reduce((min2, res) => Math.min(min2, res), Infinity)), Infinity);
};

// Two test cases
console.log(minArraySum([2,8,3,19,3], 3, 1, 1)) // 23
console.log(minArraySum([2,4,3], 3, 2, 1)) // 3