// 1703. Minimum Adjacent Swaps for K Consecutive Ones
// You are given an integer array, nums, and an integer k. nums comprises of only 0's and 1's. In one move, you can choose two adjacent indices and swap their values.
// Return the minimum number of moves required so that nums has k consecutive 1's.


// Solution: Sliding Window

// 1. Get the indices of the 1's.
// 2. Maintain a sliding window of k 1's.
  // It's optimal to make the 1's revolve around the median (choosing the median results in the least absolute deviation).
  // Note: If k is even, choosing whichever of the two medians results in the same cost.
  // To calculate the cost: 
    // Cost on the left side: (median index * count of 1's on the left) - sum of indices on the left.
    // Cost on the right side: sum of indices on the right - (median index * count of 1's on the right).
    // However, the 1's should not all occupy the same position, but should be in incremental positions, so we need to subtract the extra cost we have added in our calculation.
    // Subtract extra cost: sum(1, ..., count of left 1's) + sum(1, ..., count of right 1's).

// n = length of nums
// Time Complexity: O(n) 94ms
// Space Complexity: O(n) 64.5MB
var minMoves = function(nums, k) {
  let n = nums.length, oneIndices = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      oneIndices.push(i);
    }
  }
  let pSum = [...oneIndices], minCost = Infinity;
  for (let i = 0; i < oneIndices.length; i++) {
    if (i > 0) pSum[i] += pSum[i - 1];
    if (i >= k - 1) {
      let left = i - k + 1;
      let medianIndex = left + Math.floor((k - 1) / 2);
      let leftCount = medianIndex - left; // count of ones on the left of medianIndex
      let rightCount = i - medianIndex; // count of ones on the right of medianIndex
      let leftCostToMakeEqual = (oneIndices[medianIndex] * leftCount) - getRangeSum(pSum, left, medianIndex - 1); // cost to turn all ones on the left into oneIndices[medianIndex]
      let rightCostToMakeEqual = getRangeSum(pSum, medianIndex + 1, i) - (oneIndices[medianIndex] * rightCount); // cost to turn all ones on the right into oneIndices[medianIndex]
      let extraCostLeft = sumOf1ToN(leftCount); 
      let extraCostRight = sumOf1ToN(rightCount);
      let totalCost = leftCostToMakeEqual - extraCostLeft + rightCostToMakeEqual - extraCostRight;
      minCost = Math.min(minCost, totalCost);
    }
  }
  return minCost;
};

function sumOf1ToN(n) {
  return n * (n + 1) / 2;
}

function getRangeSum(pSum, left, right) {
  if (left > right) return 0;
  if (left === 0) return pSum[right];
  return pSum[right] - pSum[left - 1];
}

// Three test cases
console.log(minMoves([1,0,0,1,0,1], 2)) // 1
console.log(minMoves([1,0,0,0,0,0,1,1], 3)) // 5
console.log(minMoves([1,1,0,1], 2)) // 0