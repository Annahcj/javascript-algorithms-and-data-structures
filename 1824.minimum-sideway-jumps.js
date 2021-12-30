// 1824. Minimum Sideway Jumps
// Return the minimum number of side jumps the frog needs to reach any lane at point n starting from lane 2 at point 0.


// Solution: Dynamic Programming

// For point 0:
  // lane 1: 1 (takes one jump to reach from lane 2)
  // lane 2: 0 (where the frog starts off)
  // lane 3: 1 (takes one jump to reach from lane 2)
// dp[0] represents lane 1, dp[1] represents lane 2, dp[2] represents lane 3.

// Time Complexity: O(n) 222ms
// Space Complexity: O(1) 64MB
var minSideJumps = function(obstacles) {
  let dp = [1,0,1];
  for (var lane of obstacles) {
    if (lane > 0) dp[lane - 1] = Infinity; // set the obstacle lane to Infinity
    for (var j = 0; j < 3; j++) {
      if (j === lane - 1) continue;
      dp[j] = Math.min(dp[j], Math.min(dp[(j + 1) % 3], dp[(j + 2) % 3]) + 1); // same lane, or 1 jump from the best of the other two lanes.
    }
  }
  return Math.min(dp[0], dp[1], dp[2]);
};

// Three test cases to run function on
console.log(minSideJumps([0,1,2,3,0])) // 2
console.log(minSideJumps([0,1,1,3,3,0])) // 0
console.log(minSideJumps([0,2,1,0,3,0])) // 2