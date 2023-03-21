// 2597. The Number of Beautiful Subsets
// You are given an array nums of positive integers and a positive integer k.
// A subset of nums is beautiful if it does not contain two integers with an absolute difference equal to k.
// Return the number of non-empty beautiful subsets of the array nums.
// A subset of nums is an array that can be obtained by deleting some (possibly none) elements from nums. Two subsets are different if and only if the chosen indices to delete are different.


// Solution 1: Brute Force w/ Backtracking

// Use backtracking to count the number of valid subsets.
// Use a set to keep track of the numbers used in our current subset.

// Time Complexity: O(2^n) 747ms
// Space Complexity: O(n) 48.9MB
var beautifulSubsets = function(nums, k) {
  nums.sort((a, b) => a - b);
  let n = nums.length, ans = 0;
  backtrack(new Set(), 0);
  return ans;

  function backtrack(used, i) {
    if (i === n) {
      ans += used.size > 0 ? 1 : 0;
      return;
    } 
    backtrack(used, i + 1);
    if (!used.has(nums[i] - k)) {
      used.add(nums[i]);
      backtrack(used, i + 1);
      used.delete(nums[i]);
    }
  }
};

// Solution 2: Group by Mod Value & DP

// Group each nums[i] by nums[i % k].
// Within each group, 
  // 1. Count the frequencies of each number and sort the unique values.
  // 2. Go through each number in sorted order and calculate the number of subsets.
    // If the difference between the current element and the previous element is k, then they cannot be in the same subset.
    // Count the number of subsets in each group using DP.
    // Populate each dp[i][taken], where 
      // dp[i][0] = the number of subsets up to index i where we don't take the ith number, and 
      // dp[i][1] = the number of subsets up to index i where we take the ith number
    // Note: Equal numbers can always be together, so we can have (2^n)-1 subsets for the equal values. 
// Then, get the product of subsets of each group.

// Summary: 
  // We group numbers by mod value because numbers with different mod values can always be in the same subset together.
  // Therefore we count the number of subsets we can make with numbers within each group, then multiply those subset counts across all groups. 

// Time Complexity: O(n log(n)) 184ms
// Space Complexity: O(n) 54.9MB
var beautifulSubsets = function(nums, k) {
  let groups = new Map();
  for (let num of nums) {
    let modValue = num % k;
    if (!groups.has(modValue)) groups.set(modValue, []);
    groups.get(modValue).push(num);
  }
  
  let ans = 1;
  for (let [_, arr] of groups) {
    let countMap = {};
    for (let num of arr) {
      countMap[num] = (countMap[num] || 0) + 1;
    }
    let counts = Object.entries(countMap).map(([num, count]) => [Number(num), count]).sort((a, b) => a[0] - b[0]);
    let m = counts.length, dp = Array(m).fill(0).map(() => Array(2).fill(0)); 
    for (let i = 0; i < m; i++) {
      let [num, count] = counts[i];
      let subsets = (2 ** count) - 1;
      if (i > 0 && num - counts[i - 1][0] === k) { // if the difference with the previous number is k, they cannot be in the same subset
        dp[i][0] = dp[i - 1][0] + dp[i - 1][1]; // don't take ith number
        dp[i][1] = dp[i - 1][0] * subsets; // take ith number 
      } else { // can put any numbers together in the same subset
        dp[i][0] = i === 0 ? 1 : dp[i - 1][0] + dp[i - 1][1]; // don't take ith number
        dp[i][1] = i === 0 ? subsets : (dp[i - 1][0] + dp[i - 1][1]) * subsets; // take ith number
      }
    } 
    let totalSubsets = dp[m - 1][0] + dp[m - 1][1] - 1; // don't count the empty array
    ans += ans * totalSubsets;
  }
  return ans - 1; // don't count the empty array
};

// Two test cases
console.log(beautifulSubsets([1], 1)) // 1
console.log(beautifulSubsets([2,4,6], 2)) // 4