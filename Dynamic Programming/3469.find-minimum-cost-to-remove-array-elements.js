// 3469. Find Minimum Cost to Remove Array Elements
// You are given an integer array nums. Your task is to remove all elements from the array by performing one of the following operations at each step until nums is empty:
  // Choose any two elements from the first three elements of nums and remove them. The cost of this operation is the maximum of the two elements removed.
  // If fewer than three elements remain in nums, remove all the remaining elements in a single operation. The cost of this operation is the maximum of the remaining elements.
// Return the minimum cost required to remove all the elements.


// Solution: DP

// For every three numbers, after deleting two, there will always be one remaining. 
// Combine this remaining one with the next two, and repeat.
// Since there is only one remaining number, we can use dynamic programming on the parameters (i, prevIndex).

// Memoize every dp(i, prevIndex), where
  // i = the current index in nums
  // prevIndex = the carryover index that we have not deleted

// For every dp(i, prevIndex), 
  // Combine the previous index with nums[i] and nums[i + 1] to get the three elements.
  // Try every combination of these three elements, and return the option with the minimum total cost.

// Time Complexity: O(n^2 * 3) 1462ms
// Space Complexity: O(n^2) 87.52MB
function minCost(nums) {
  const n = nums.length;
  const memo = Array(n).fill(0).map(() => Array(n).fill(-1));
  return dp(1, 0);

  function dp(i, prevIndex) {
    const indices = [prevIndex, ...(i < n ? [i] : []), ...(i < n - 1 ? [i + 1] : [])];
    if (indices.length <= 2) return Math.max(...indices.map((i) => nums[i]));
    if (memo[i][prevIndex] !== -1) return memo[i][prevIndex];

    const combinations = [
      {index1: indices[0], index2: indices[1], indexToKeep: indices[2]},
      {index1: indices[0], index2: indices[2], indexToKeep: indices[1]},
      {index1: indices[1], index2: indices[2], indexToKeep: indices[0]}
    ];
    let minCost = Infinity;
    for (let {index1, index2, indexToKeep} of combinations) {
      minCost = Math.min(minCost, Math.max(nums[index1], nums[index2]) + dp(i + 2, indexToKeep));
    }
    return memo[i][prevIndex] = minCost;
  }
};

// Two test cases
console.log(minCost([6,2,8,4])) // 12
console.log(minCost([2,1,3,3])) // 5