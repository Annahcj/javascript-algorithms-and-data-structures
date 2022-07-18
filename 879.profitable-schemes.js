// 879. Profitable Schemes
// There is a group of n members, and a list of various crimes they could commit. The ith crime generates a profit[i] and requires group[i] members to participate in it. If a member participates in one crime, that member can't participate in another crime.
// Let's call a profitable scheme any subset of these crimes that generates at least minProfit profit, and the total number of members participating in that subset of crimes is at most n.
// Return the number of schemes that can be chosen. Since the answer may be very large, return it modulo 10^9 + 7.


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(i, members, profit)
  // i = profit[i] 
  // members = number of members used 
  // profit = profit <= minProfit
    // there is no point going over minProfit because the results of dp(i, members, minProfit) === dp(i, members, profit >= minProfit)
    // the result is the same because the same result will be returned at the base case (totalProfit >= minProfit)

// For each profit[i], get the total number of ways from taking it and not taking it.

// m = profit.length, k = minProfit
// Time Complexity: O(mnk) 409ms
// Space Complexity: O(mnk) 68.9MB
var profitableSchemes = function(n, minProfit, group, profit) {
  let mod = 10 ** 9 + 7;
  let memo = Array(profit.length).fill(0).map(() => Array(n + 1).fill(0).map(() => Array(minProfit + 1).fill(-1)));
  return dp(0, 0, 0);
  
  function dp(i, members, totalProfit) {
    totalProfit = Math.min(totalProfit, minProfit);
    if (members > n) return 0;
    if (i === profit.length) return totalProfit === minProfit ? 1 : 0;
    if (memo[i][members][totalProfit] !== -1) return memo[i][members][totalProfit];
    
    let take = dp(i + 1, members + group[i], totalProfit + profit[i]);
    let notTake = dp(i + 1, members, totalProfit);
    return memo[i][members][totalProfit] = (take + notTake) % mod;
  }
};

// Two test cases to run function on
console.log(profitableSchemes(5, 3, [2,2], [2,3])) // 2
console.log(profitableSchemes(10, 5, [2,3,5], [6,7,8])) // 7