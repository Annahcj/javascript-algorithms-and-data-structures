// 2320. Count Number of Ways to Place Houses
// There is a street with n * 2 plots, where there are n plots on each side of the street. The plots on each side are numbered from 1 to n. On each plot, a house can be placed.
// Return the number of ways houses can be placed such that no two houses are adjacent to each other on the same side of the street. Since the answer may be very large, return it modulo 109 + 7.
// Note that if a house is placed on the ith plot on one side of the street, a house can also be placed on the ith plot on the other side of the street.

 
// Solution 1: Math

// Let's first consider one side of the street and see the pattern:

// 0 houses = 1 (no house)
// 1 house = 2 (no house, one house at first position)
// 2 houses = 3 (no house, house at first position, house at second position)
// 3 houses = 5 (no house, house at first position, house at second position, house at third position, house at first and third position)
// 4 houses = 8
// 5 houses = 13
// and so on...

// The pattern is dp[i] = dp[i - 1] + dp[i - 2], starting from base cases 0 -> 1 and 1 -> 2
// Things to look for:
  // mod: use the modulo whenver we can
  // integer overflow: use BigInt to avoid overflow

// Time Complexity: O(n) 152ms
// Space Complexity: O(n) 48.4MB
var countHousePlacements = function(n) {
  let dp = Array(n + 1), mod = BigInt(10 ** 9 + 7);
  dp[0] = 1n, dp[1] = 2n;
  for (let i = 2; i <= n; i++) {
    dp[i] = (dp[i - 1] + dp[i - 2]) % mod;
  }
  let res = dp[n];
  return Number((res * res) % mod);
};


// Solution 2: Constant Space

// Since we only need to access the previous and previous previous results, we can store the information in three variables.

// Time Complexity: O(n) 192ms
// Space Complexity: O(1) 47.9MB
var countHousePlacements = function(n) {
  let mod = BigInt(10 ** 9 + 7);
  let prevPrev = 1n, prev = 2n;
  for (let i = 2; i <= n; i++) {
    let curr = (prevPrev + prev) % mod;
    prevPrev = prev;
    prev = curr;
  }
  return Number((prev * prev) % mod);
};

// Four test cases
console.log(countHousePlacements(1)) // 4
console.log(countHousePlacements(2)) // 9
console.log(countHousePlacements(3)) // 25
console.log(countHousePlacements(1000)) // 500478595