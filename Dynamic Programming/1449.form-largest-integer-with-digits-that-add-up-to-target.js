// 1449. Form Largest Integer With Digits That Add up to Target
// Given an array of integers cost and an integer target, return the maximum integer you can paint under the following rules:
  // The cost of painting a digit (i + 1) is given by cost[i] (0-indexed).
  // The total cost used must be equal to target.
  // The integer does not have 0 digits.
// Since the answer may be very large, return it as a string. If there is no way to paint any integer given the condition, return "0".


// Solution: DP - Recursion w/ Memoization

// Memoize each dp(remain), where dp(remain) = the maximum integer string with "remain" remaining cost left.
// When taking a new integer, loop from 1 to 9 and add it to the start of the integer string.
  // We add to the start instead of the end so that we know if the current number is bigger than the recorded maximum.

// Time Complexity: O(target^2) 74ms
// Space Complexity: O(target^2) 44.2MB
var largestNumber = function(cost, target) {
  let memo = Array(target + 1).fill(null);
  return dp(target);
  
  function dp(remain) {
    if (remain < 0) return '0';
    if (remain === 0) return '';
    if (memo[remain] !== null) return memo[remain];
    
    let ans = "0";
    for (let i = 0; i < 9; i++) {
      let res = dp(remain - cost[i]);
      if (res === '0') continue;
      if (ans === '0' || res.length + 1 >= ans.length) {
        ans = (i + 1) + res;
      }
    }
    return memo[remain] = ans;
  }
};

// Two test cases 
console.log(largestNumber([4,3,2,5,6,7,2,5,5], 9)) // "7772"
console.log(largestNumber([7,6,5,5,5,6,8,7,8], 12)) // "85"