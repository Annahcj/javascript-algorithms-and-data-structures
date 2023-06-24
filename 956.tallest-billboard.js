// 956. Tallest Billboard
// You are installing a billboard and want it to have the largest height. The billboard will have two steel supports, one on each side. Each steel support must be an equal height.
// You are given a collection of rods that can be welded together. For example, if you have rods of lengths 1, 2, and 3, you can weld them together to make a support of length 6.
// Return the largest possible height of your billboard installation. If you cannot support the billboard, return 0.


// Solution: DP

// dp[diff] = maximum x where there exists two disjoint subset sums (x, y) with y - x = diff.
// For each dp[diff], we try to add it to the left subset and the right subset.
// At the end, return the maximum sum at dp[0].

// e.g:
// left|right
// 2   |   5
// diff = 3, currMaxStart = 2

// let's say rod = 3
// We have two choices:
// 1. Add rod to right: 
  // diff becomes 5 + 3 = 8 (diff + rod) 
  // currMaxStart is still the same
// 2. Add rod to left: 
  // diff becomes 2 + 3 = 5 (diff - rod)
  // currMaxStart becomes 2 + 3 = 5 (currMaxStart + rod)

// let's say rod = 4
// 1. Add rod to right:  
  // diff becomes 3 + 4 = 7 (diff + rod)
  // currMaxStart is still the same
// 2. Add rod to left: 
  // diff becomes 2 + 4 = 6 (rod - diff)
  // currMaxStart becomes 2 + 3 = 5 (currMaxStart + diff)

// n = length of rods, m = sum(rods[i])
// Time Complexity: O(n * min(m, 3^n)) 139ms
// Space Complexity: O(min(m, 3^n)) 49MB
var tallestBillboard = function(rods) {
  let dp = {0: 0};
  for (let rod of rods) {
    let dp2 = {...dp};
    for (let d in dp) {
      let diff = Number(d), currMaxStart = dp[d];
      dp2[diff + rod] = Math.max(dp2[diff + rod] || 0, currMaxStart);
      if (diff >= rod) {
        dp2[diff - rod] = Math.max(dp2[diff - rod] || 0, rod + currMaxStart);
      } else {
        dp2[rod - diff] = Math.max(dp2[rod - diff] || 0, diff + currMaxStart);
      }
    }
    dp = dp2;
  }  
  return dp[0];
};

// Three test cases
console.log(tallestBillboard([1,2,3,6])) // 6
console.log(tallestBillboard([1,2,3,4,5,6])) // 10
console.log(tallestBillboard([1,2])) // 0