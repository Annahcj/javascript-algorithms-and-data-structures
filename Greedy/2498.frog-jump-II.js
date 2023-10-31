// 2498. Frog Jump II
// You are given a 0-indexed integer array stones sorted in strictly increasing order representing the positions of stones in a river.
// A frog, initially on the first stone, wants to travel to the last stone and then return to the first stone. However, it can jump to any stone at most once.
// The length of a jump is the absolute difference between the position of the stone the frog is currently on and the position of the stone to which the frog jumps.
  // More formally, if the frog is at stones[i] and is jumping to stones[j], the length of the jump is |stones[i] - stones[j]|.
// The cost of a path is the maximum length of a jump among all jumps in the path.
// Return the minimum cost of a path for the frog.


// Solution: Greedy 

// Find max(stones[i] - stones[i - 2]).
// It is optimal to take alternate stones (gap of 2).
// Proof: If we have a big difference, e.g: [0,1,2,100,102,104]
  // The maximum difference between alternate stones is 100.
  // We can see that we can never have a score less than 100.
  // This is because if we choose to take adjacent stones to try to get a smaller difference, the difference on the way back to the start will be even more than the maximum alternate difference.

// Time Complexity: O(n) 106ms
// Space Complexity: O(1) 53MB
var maxJump = function(stones) {
  let n = stones.length, maxDiff = stones[1] - stones[0];
  for (let i = 2; i < n; i++) {
    maxDiff = Math.max(maxDiff, stones[i] - stones[i - 2]);
  }
  return maxDiff;
};

// Two test cases
console.log(maxJump([0,2,5,6,7])) // 5
console.log(maxJump([0,3,9])) // 9