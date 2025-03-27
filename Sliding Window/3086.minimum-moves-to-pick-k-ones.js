// 3086. Minimum Moves to Pick K Ones
// You are given a binary array nums of length n, a positive integer k and a non-negative integer maxChanges.
// Alice plays a game, where the goal is for Alice to pick up k ones from nums using the minimum number of moves. When the game starts, Alice picks up any index aliceIndex in the range [0, n - 1] and stands there. If nums[aliceIndex] == 1 , Alice picks up the one and nums[aliceIndex] becomes 0(this does not count as a move). After this, Alice can make any number of moves (including zero) where in each move Alice must perform exactly one of the following actions:
  // Select any index j != aliceIndex such that nums[j] == 0 and set nums[j] = 1. This action can be performed at most maxChanges times.
  // Select any two adjacent indices x and y (|x - y| == 1) such that nums[x] == 1, nums[y] == 0, then swap their values (set nums[y] = 1 and nums[x] = 0). If y == aliceIndex, Alice picks up the one after this move and nums[y] becomes 0.
// Return the minimum number of moves required by Alice to pick exactly k ones.


// Solution: Sliding Window & Prefix Sum

// For a given y, the minimum number of moves to get k ones:
  // If y is already 1, we get a 1 for free.
  // If y - 1 or y + 1 is already 1, it costs 1 move to get that 1.
  // For any further 1's, it costs 2 moves to get a 1: 
    // 1. Set y - 1 or y + 1 to 1 using a change.
    // 2. Swap (y - 1, y) or (y + 1, y).
  // When we have run out of changes, get the sum of distances to 1's on the left and right of y.

// Get all the indices of 1's.
// Maintain a sliding window of size k - maxChanges.
// For a window, pick the middle index as the y, as picking the median is guaranteed to give us the minimum number of moves.
// Note: If the window size is even, take the minimum moves out of the two middle indices.
// Calculate the sum of distances of every 1 in the window to the middle index.

// However, we can't only consider the window size of k - maxChanges, as there can be up to 3 indices that takes less moves than a change.
// Hence, we want to try every window size from k - maxChanges to k - maxChanges + 3.

// Time Complexity: O(n) 45ms
// Space Complexity: O(n) 72.4MB
function minimumMoves(nums, k, maxChanges) {
  const n = nums.length, ones = [];
  for (let i = 0; i < n; i++) {
    if (nums[i] === 1) {
      ones.push(i);
    }
  }
  const numOnes = ones.length;
  const pSum = [0, ...ones];
  for (let i = 1; i < pSum.length; i++) {
    pSum[i] += pSum[i - 1];
  }
  const minSwaps = Math.max(1, k - maxChanges);
  let minMoves = maxChanges >= k ? k * 2 : Infinity;
  for (let swaps = minSwaps; swaps <= Math.min(k, minSwaps + 3); swaps++) {
    if (swaps > ones.length) break;
    if (swaps + maxChanges < k) continue;
    const movesFromChanges = (k - swaps) * 2;
    for (let i = 0; i < numOnes; i++) {
      if (i >= swaps - 1) {
        const left = i - swaps + 1;
        const lowerMidIndex = Math.floor((left + i) / 2);
        const higherMidIndex = Math.ceil((left + i) / 2);
        const lowerIndexMoves = distSumToIndex(pSum, ones, lowerMidIndex, left, i);
        const higherIndexMoves = distSumToIndex(pSum, ones, higherMidIndex, left, i);
        minMoves = Math.min(minMoves, lowerIndexMoves + movesFromChanges, higherIndexMoves + movesFromChanges);
      }
    }
  }
  return minMoves;
};

// sum of distances from every ones[i] to ones[index] within the window (l, r)
function distSumToIndex(pSum, ones, index, l, r) {
  const leftCount = index - l;
  const rightCount = r - index;
  const leftDistSum = (ones[index] * leftCount) - (pSum[index] - pSum[l]);
  const rightDistSum = (pSum[r + 1] - pSum[index + 1]) - (ones[index] * rightCount);
  return leftDistSum + rightDistSum;
}

// Two test cases
console.log(minimumMoves([1,1,0,0,0,1,1,0,0,1], 3, 1)) // 3
console.log(minimumMoves([0,0,0,0], 2, 3)) // 4