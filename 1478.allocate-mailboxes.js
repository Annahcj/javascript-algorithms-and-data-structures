// 1478. Allocate Mailboxes
// Given the array houses where houses[i] is the location of the ith house along a street and an integer k, allocate k mailboxes in the street.
// Return the minimum total distance between each house and its nearest mailbox.
// The test cases are generated so that the answer fits in a 32-bit integer.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, k), where
  // i = the ith house
  // k = the number of mailboxes left

// Partition the houses into k segments.
// In each segment, place a mailbox in the median of the house positions.
  // The median is proven to be the best point for the smallest total distance.
  // We need to sort houses in asc order so that we can use the median.

// To get the minimum total distance between houses within a range, 
  // Precompute the results in a matrix dist, such that dist[i][j] = the minimum total distance between houses[i] to houses[j] to the median mailbox.
  // If there are two medians (length is even), then picking either one of the medians results in the same total distance.
  // If there is only one median, we can use that median.

// Time Complexity: O(n^3 + n^2 * k) 240ms
// Space Complexity: O(n^2 + nk) 51.5MB
var minDistance = function(houses, k) {
  let n = houses.length, dist = Array(n).fill(0).map(() => Array(n).fill(0));
  houses.sort((a, b) => a - b);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      let median = houses[Math.floor((i + j) / 2)];
      for (let l = i; l <= j; l++) {
        dist[i][j] += Math.abs(houses[l] - median);
      }
    }
  }
  
  let memo = Array(n).fill(0).map(() => Array(k + 1).fill(-1));
  return dp(0, k);
  
  function dp(i, k) {
    if (i === n) return k === 0 ? 0 : Infinity;
    if (k === 0) return Infinity;
    if (memo[i][k] !== -1) return memo[i][k];
    
    let ans = Infinity;
    for (let j = i; j < n; j++) {
      ans = Math.min(ans, dp(j + 1, k - 1) + dist[i][j]);
    }
    return memo[i][k] = ans;
  }
};

// Two test cases to run function on
console.log(minDistance([1,4,8,10,20], 3)) // 5
console.log(minDistance([2,3,5,12,18], 2)) // 9