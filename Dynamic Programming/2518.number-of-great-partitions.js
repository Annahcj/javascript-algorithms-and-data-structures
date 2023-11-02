// 2518. Number of Great Partitions
// You are given an array nums consisting of positive integers and an integer k.
// Partition the array into two ordered groups such that each element is in exactly one group. A partition is called great if the sum of elements of each group is greater than or equal to k.
// Return the number of distinct great partitions. Since the answer may be too large, return it modulo 10^9 + 7.
// Two partitions are considered distinct if some element nums[i] is in different groups in the two partitions.


// Solution: DP - Recursion w/ Memoization 

// Think of the problem in reverse: find the number of subsets where the sum is less than k.
  // Since we are only considering one group where the other group always has a larger sum, if we flip the order of the two groups we will get another partition, so we multiply the ways by 2.
  // Note: When sums from both groups are less than k, then there will not be any great partitions and we can return 0.

// The total number of subsets = 2^n.
// The number of great partitions = 2^n - (not great partitions).

// Time Complexity: O(nk) 382ms
// Space Complexity: O(nk) 73.2MB
var countPartitions = function(nums, k) {
  let n = nums.length, MOD = 10 ** 9 + 7;
  let sum = nums.reduce((total, num) => total + num);
  if (sum < k * 2) return 0;
  let memo = Array(n).fill(0).map(() => Array(k + 1).fill(-1));
  let totalWays = BigInt(2 ** n);
  let notGreatWays = dp(0, 0) * 2n;
  return (totalWays - notGreatWays) % BigInt(MOD);
  
  function dp(i, sum) {
    if (sum >= k) return 0n;
    if (i === n) return 1n;
    if (memo[i][sum] !== -1) return memo[i][sum];
    
    let ways = dp(i + 1, sum);
    ways = ways + dp(i + 1, sum + nums[i]);
    return memo[i][sum] = ways;
  }
};

// Three test cases
console.log(countPartitions([1,2,3,4], 4)) // 6
console.log(countPartitions([3,3,3], 4)) // 0
console.log(countPartitions([6,6], 2)) // 2