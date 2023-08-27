// 403. Frog Jump
// A frog is crossing a river. The river is divided into some number of units, and at each unit, there may or may not exist a stone. The frog can jump on a stone, but it must not jump into the water.
// Given a list of stones' positions (in units) in sorted ascending order, determine if the frog can cross the river by landing on the last stone. Initially, the frog is on the first stone and assumes the first jump must be 1 unit.
// If the frog's last jump was k units, its next jump must be either k - 1, k, or k + 1 units. The frog can only jump in the forward direction.

 
// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, k), where
  // i = number of stones we have used
  // k = the units of the last jump

// Use a hashmap to store the stone index for each valid position.
// Because the number of stones can be much less than the number of positions, it's optimal to use the stone index instead of the position.

// For each dp(i, k),   
  // Try to jump either k - 1, k, or k + 1 units forward.
  // Base case: If we reach the last stone, return true.

// Time Complexity: O(n^2) 222ms 
// Space Complexity: O(n^2) 139.7MB
var canCross = function(stones) {
  let n = stones.length, indexes = {};
  for (let i = 0; i < n; i++) {
    indexes[stones[i]] = i;
  }
  if (stones[1] !== 1) return false;
  let memo = Array(n).fill(0).map(() => Array(n).fill(null));
  return dp(1, 1);
  
  function dp(i, k) {
    if (i === n - 1) return true;
    if (memo[i][k] !== null) return memo[i][k];
    
    let jumps = [k - 1, k, k + 1];
    for (let jumpAmount of jumps) {
      if (jumpAmount === 0) continue;
      let nextPosition = stones[i] + jumpAmount;
      if (indexes[nextPosition] !== undefined && dp(indexes[nextPosition], jumpAmount)) {
        return memo[i][k] = true;
      }
    }
    return memo[i][k] = false;
  }
};

// Two test cases
console.log(canCross([0,1,3,5,6,8,12,17])) // true
console.log(canCross([0,1,2,3,4,8,9,11])) // false