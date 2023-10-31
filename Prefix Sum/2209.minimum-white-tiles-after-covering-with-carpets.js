// 2209. Minimum White Tiles After Covering With Carpets
// You are given a 0-indexed binary string floor, which represents the colors of tiles on a floor:
  // floor[i] = '0' denotes that the ith tile of the floor is colored black.
  // On the other hand, floor[i] = '1' denotes that the ith tile of the floor is colored white.
// You are also given numCarpets and carpetLen. You have numCarpets black carpets, each of length carpetLen tiles. Cover the tiles with the given carpets such that the number of white tiles still visible is minimum. Carpets may overlap one another.
// Return the minimum number of white tiles still visible.


// Solution 1: Prefix Sum & DP - Recursion w/ Memoization

// dp(i, k), where
  // i = index in floor
  // k = the number of carpets we have left
// dp(i, k) = the maximum number of white tiles we can cover for tiles in range (i + 1, n), with k carpets left.

// At each index i, we have two choices:
  // 1. Place the carpet with start position at index i. That will cover all tiles up to index i + carpetLen.
  // 2. Don't place the carpet at index i. Move to the next index (i + 1).

// Use prefix sum to count the number of white tiles between two indices in O(1) time.
  // whiteTiles[i] = number of white tiles from index 0 to index i

// Record the minimum number of white tiles taken out of each possible situation.

// n = length of floor, k = number of carpets
// Time Complexity: O(nk) 1111ms
// Space Complexity: O(nk) 82.7MB
var minimumWhiteTiles = function(floor, numCarpets, carpetLen) {
  let n = floor.length, whiteTiles = Array(n).fill(0);
  let memo = Array(n).fill(0).map(() => Array(numCarpets + 1).fill(-1));
  for (let i = 0; i < n; i++) {
    whiteTiles[i] = i === 0 ? Number(floor[i]) : whiteTiles[i - 1] + Number(floor[i]);
  }
  return whiteTiles[n - 1] - dp(0, numCarpets);
  
  function dp(i, k) {
    if (i >= n) return 0;
    if (k === 0) return 0;
    if (memo[i][k] !== -1) return memo[i][k];
    
    let ans = dp(i + 1, k); // don't place carpet at index i
    let numWhiteTiles = countWhiteTiles(i, Math.min(n - 1, i + carpetLen - 1));
    ans = Math.max(ans, numWhiteTiles + dp(i + carpetLen, k - 1)); // place carpet at index i
    return memo[i][k] = ans;
  }  
  
  function countWhiteTiles(start, end) {
    if (start === 0) return whiteTiles[end];
    return whiteTiles[end] - whiteTiles[start - 1];
  }
};


// Solution 2: Prefix Sum w/ Bottom Up DP

// dp[i][k] = the maximum number of white tiles covered with k carpets from index 0 to index i.

// At each index i, we have two choices:
  // 1. Place the carpet to end at index i. That will cover all tiles from index i - carpetLen + 1 to index i.
  // 2. Don't place the carpet at index i. Take the previous state dp[i - 1][k].

// Use prefix sum to count the number of white tiles between two indices in O(1) time.
  // whiteTiles[i] = number of white tiles from index 0 to index i

// Record the maximum number of white tiles covered out of each possible situation.

// n = length of floor, k = number of carpets
// Time Complexity: O(nk) 465ms
// Space Complexity: O(nk) 68.8MB
var minimumWhiteTiles = function(floor, numCarpets, carpetLen) {
  let n = floor.length, whiteTiles = Array(n).fill(0);
  let dp = Array(n + 1).fill(0).map(() => Array(numCarpets + 1).fill(0));
  for (let i = 0; i < n; i++) {
    whiteTiles[i + 1] = whiteTiles[i] + Number(floor[i]);
  }
  for (let i = 1; i <= n; i++) {
    for (let k = 1; k <= numCarpets; k++) {
      let start = Math.max(1, i - carpetLen + 1);
      let numWhiteTiles = countWhiteTiles(start, i);
      dp[i][k] = Math.max(dp[i - 1][k], numWhiteTiles + dp[start - 1][k - 1]);
    }
  }
  return whiteTiles[n] - dp[n][numCarpets];
  
  function countWhiteTiles(start, end) {
    return whiteTiles[end] - whiteTiles[start - 1];
  }
};

// Two test cases
console.log(minimumWhiteTiles("10110101", 2, 2)) // 2
console.log(minimumWhiteTiles("11111", 2, 3)) // 0