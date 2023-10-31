// 1798. Maximum Number of Consecutive Values You Can Make
// You are given an integer array coins of length n which represents the n coins that you own. The value of the ith coin is coins[i]. You can make some value x if you can choose some of your n coins such that their values sum up to x.
// Return the maximum number of consecutive integer values that you can make with your coins starting from and including 0.
// Note that you may have multiple coins of the same value.


// Solution: Greedy & Sorting

// Sort coins in asc order.
// We can add a coin to our sum if the coin >= sum + 1.
  // Let's imagine we know we can make consecutive values 1,2,3.
  // We can add a new number 4 to the sum because this will cover the extra range 4 to sum+4
  // This is true because if we can make values 1,2,3, we can add them onto the new number (4) and get the new range (4-7).

// Time Complexity: O(n log(n)) 235ms
// Space Complexity: O(log(n)) (space for sorting) 53MB
var getMaximumConsecutive = function(coins) {
  coins.sort((a, b) => a - b);
  let sum = 0;
  for (let coin of coins) {
    if (coin > sum + 1) return sum + 1;
    sum += coin;
  }
  return sum + 1;
};

// Three test cases
console.log(getMaximumConsecutive([1,3])) // 2
console.log(getMaximumConsecutive([1,1,1,4])) // 8
console.log(getMaximumConsecutive([1,4,10,3,1])) // 20