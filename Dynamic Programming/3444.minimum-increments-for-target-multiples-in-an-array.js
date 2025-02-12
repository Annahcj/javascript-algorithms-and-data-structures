// 3444. Minimum Increments for Target Multiples in an Array
// You are given two arrays, nums and target.
// In a single operation, you may increment any element of nums by 1.
// Return the minimum number of operations required so that each element in target has at least one multiple in nums.


// Solution 1: DP w/ Bitmasks - Recursion w/ Memoization

// Memoize each dp(i, mask), where
  // i = index in nums
  // mask = bitmask of target elements already taken

// For every dp(i, mask),
  // Go through every subset of target by enumerating every bitmask,
  // calculate the cost to turn nums[i] into the LCM of the subset.
  // We take the LCM as it is the minimum number that is a multiple of every element in the subset.

// Precompute the LCM for every bitmask beforehand.
// Record and return the minimum cost for the full target.

// n = length of nums, m = length of target
// Time Complexity: O(n * 2^m * 2^m) 647ms
// Space Complexity: O(n * 2^m) 80.92MB
var minimumIncrements = function(nums, target) {
  const n = nums.length, m = target.length;
  const lcm = Array(1 << m);
  for (let mask = 1; mask < (1 << m); mask++) {
    let currLCM = 1;
    for (let i = 0; i < m; i++) {
      if ((mask >> i) & 1) {
        currLCM = getLCM(currLCM, target[i]);
      }
    }
    lcm[mask] = currLCM;
  }
  const FULL_MASK = (1 << m) - 1;
  const memo = Array(n).fill(0).map(() => Array(1 << m).fill(-1));
  return dp(0, 0);

  function dp(i, mask) {
    if (i === n) return mask === FULL_MASK ? 0 : Infinity;
    if (memo[i][mask] !== -1) return memo[i][mask];

    let minCost = dp(i + 1, mask);
    for (let subset = 1; subset < (1 << m); subset++) {
      // minimum cost to next multiple of subset lcm
      const cost = nums[i] % lcm[subset] === 0 ? 0 : (lcm[subset] - (nums[i] % lcm[subset]));
      minCost = Math.min(minCost, cost + dp(i + 1, mask | subset));
    }
    return memo[i][mask] = minCost;
  }  
};

function getLCM(a, b) {
  return (a / gcd(a, b)) * b;
}

function gcd(a, b) {
  if (b === 0) return a;
  return gcd(b, a % b);
}


// Solution 2: Iterative DP - Bottom Up

// Since we only need results from the previous nums[i], we only need to keep the previous and current row's results.
// For every nums[i], go through every bitmask that represents a subset of target,
  // Iterate through every possible previous mask.
  // Calculate the cost to turn nums[i] into a multiple of the lcm of the subset.
  // dp[newMask] = min(dp[newMask], cost + previous row dp[prevMask]).

// Time Complexity: O(n * 2^m * 2^m) 87ms
// Space Complexity: O(2^m) 59.05MB
var minimumIncrements = function(nums, target) {
  const n = nums.length, m = target.length;  
  const lcm = Array(1 << m);
  for (let mask = 1; mask < (1 << m); mask++) {
    let currLCM = 1;
    for (let i = 0; i < m; i++) {
      if ((mask >> i) & 1) {
        currLCM = getLCM(currLCM, target[i]);
      }
    }
    lcm[mask] = currLCM;
  }
  let prev = Array(1 << m).fill(Infinity);
  prev[0] = 0;
  for (let i = 0; i < n; i++) {
    const curr = [...prev];
    for (let mask = 1; mask < (1 << m); mask++) {
      const newCost = nums[i] % lcm[mask] === 0 ? 0 : lcm[mask] - (nums[i] % lcm[mask]);
      for (let prevMask = 0; prevMask < (1 << m); prevMask++) {
        if (prev[prevMask] === Infinity) continue;
        const newMask = prevMask | mask;
        curr[newMask] = Math.min(curr[newMask], newCost + prev[prevMask]);
      }
    }
    prev = curr;
  }
  return prev[(1 << m) - 1];
};

// Three test cases
console.log(minimumIncrements([1,2,3], [4])) // 1
console.log(minimumIncrements([8,4], [10,5])) // 2
console.log(minimumIncrements([7,9,10], [7])) // 0