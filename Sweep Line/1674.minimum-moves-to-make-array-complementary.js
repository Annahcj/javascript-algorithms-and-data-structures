// 1674. Minimum Moves to Make Array Complementary
// You are given an integer array nums of even length n and an integer limit. In one move, you can replace any integer from nums with another integer between 1 and limit, inclusive.
// The array nums is complementary if for all indices i (0-indexed), nums[i] + nums[n - 1 - i] equals the same number. For example, the array [1,2,3,4] is complementary because for all indices i, nums[i] + nums[n - 1 - i] = 5.
// Return the minimum number of moves required to make nums complementary.


// Solution: Line Sweep

// For a given complementary pair (x, y)
  // Minimum sum changing both x and y: 2 (1 is the minimum number to change to)
  // Minimum sum changing one: min(x, y) + 1
  // No change: x + y
  // Maximum sum changing one: max(x, y) + limit
  // Maximum sum changing both: limit * 2

// For every number in between these ranges, the cost is the same.
// Hence, we can use line sweep to accumulate the sum of moves for every possible sum.
// Return the minimum moves across all sums.

// Time Complexity: O(n + limit) 10ms
// Space Complexity: O(limit) 67.2MB
function minMoves(nums, limit) {
  const n = nums.length, moves = Array(limit * 2 + 2).fill(0);
  for (let i = 0; i < n / 2; i++) {
    const x = nums[i], y = nums[n - i - 1];
    moves[2] += 2;
    moves[Math.min(x, y) + 1]--;
    moves[x + y]--;
    moves[x + y + 1]++;
    moves[Math.max(x, y) + limit + 1]++;
  }  
  let currMoves = 0, minMoves = Infinity;
  for (let sum = 2; sum <= limit * 2; sum++) {
    currMoves += moves[sum];
    minMoves = Math.min(minMoves, currMoves);
  }
  return minMoves;
};

// Three test cases
console.log(minMoves([1,2,4,3], 4)) // 1
console.log(minMoves([1,2,2,1], 2)) // 2
console.log(minMoves([1,2,1,2], 2)) // 0