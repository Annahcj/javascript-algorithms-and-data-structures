// 2552. Count Increasing Quadruplets
// Given a 0-indexed integer array nums of size n containing all numbers from 1 to n, return the number of increasing quadruplets.
// A quadruplet (i, j, k, l) is increasing if:
  // 0 <= i < j < k < l < n, and
  // nums[i] < nums[k] < nums[j] < nums[l].


// Solution 1: [Javascript Heap out of Memory] Precomputation 

// Precompute a 2D array smaller, where smaller[j][k] = the number of nums[i] where i <= j and nums[i] <= k.

// Go through each pair of (j, k) where nums[k] < nums[j].
  // Use the precomputed array to find the number of nums[i] and nums[l].
  // Count i's: smaller[j - 1][nums[k] - 1] = number of nums[i] where i < j and nums[i] < k
  // Count l's:
    // Total numbers > nums[j]: n - smaller[n - 1][nums[j]]
    // Total numbers > nums[j] where index < k: (k + 1) - smaller[k][nums[j]]
    // Total larger numbers - total larger numbers before index k: (n - smaller[n - 1][nums[j]]) - ((k + 1) - smaller[k][nums[j]])

// Time Complexity: O(n^2)
// Space Complexity: O(n^2)
var countQuadruplets = function(nums) {
  let n = nums.length, smaller = [Array(n + 1).fill(0)];
  for (let k = 1; k <= n; k++) {
    if (nums[0] <= k) {
      smaller[0][k] = 1;
    }
  }
  for (let j = 1; j < n; j++) {
    smaller.push([...smaller[j - 1]]);
    for (let k = 1; k <= n; k++) {
      if (nums[j] <= k) {
        smaller[j][k]++;
      }
    }
  }
  
  let ans = 0;
  for (let j = 1; j < n - 2; j++) {
    for (let k = j + 1; k < n - 1; k++) {
      if (nums[j] < nums[k]) continue;
      let i = smaller[j - 1][nums[k] - 1];
      let l = (n - smaller[n - 1][nums[j]]) - ((k + 1) - smaller[k][nums[j]]);
      ans += i * l;
    }
  }
  return ans;
};


// Solution 2: DP

// Populate each dp[i], where dp[i] = the number of triplets (i, j, k), where nums[i] < nums[k] < nums[j].
// Go through each j,
  // Go through each i where i < j.
  // Keep track of the running count "smallerCount" of nums[i] < nums[j].
  // If nums[i] > nums[j], then we take j as k in the triplet. This means we found "smallerCount" triplets since we found a new k.
  // If nums[i] < nums[j], then we take j as l in the quadruplet. This means we found dp[i] quadruplets since we found a new l.

// Time Complexity: O(n^2) 129ms
// Space Complexity: O(n) 48MB
var countQuadruplets = function(nums) {
  let n = nums.length, dp = Array(n).fill(0), ans = 0;
  for (let j = 1; j < n; j++) {
    let smallerCount = 0;
    for (let i = 0; i < j; i++) {
      if (nums[i] < nums[j]) { // found a new quadruplet (l)
        ans += dp[i]; // there are dp[i] triplets
        smallerCount++; // update the smaller count to use for counting triplets later
      } else { // found a new triplet (k)
        dp[i] += smallerCount;
      }
    }
  }
  return ans;
};

// Two test cases
console.log(countQuadruplets([1,3,2,4,5])) // 2
console.log(countQuadruplets([1,2,3,4])) // 0