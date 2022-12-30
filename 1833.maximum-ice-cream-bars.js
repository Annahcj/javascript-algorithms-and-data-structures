// 1833. Maximum Ice Cream Bars
// It is a sweltering summer day, and a boy wants to buy some ice cream bars.
// At the store, there are n ice cream bars. You are given an array costs of length n, where costs[i] is the price of the ith ice cream bar in coins. The boy initially has coins coins to spend, and he wants to buy as many ice cream bars as possible. 
// Return the maximum number of ice cream bars the boy can buy with coins coins.
// Note: The boy can buy the ice cream bars in any order.


// Solution: Greedy & Sorting

// It is optimal to buy the cheapest ice cream bars.
// Sort costs in asc order and take as many ice cream bars as possible with the coins we have.

// Time Complexity: O(n log(n)) 268ms
// Space Complexity: O(log(n)) (space from sorting) 55.8MB
var maxIceCream = function(costs, coins) {
  costs.sort((a, b) => a - b);
  let n = costs.length;
  for (let i = 0; i < n; i++) {
    if (coins < costs[i]) return i;
    coins -= costs[i];
  }
  return n;
};

// Three test cases
console.log(maxIceCream([1,3,2,4,1], 7)) // 4
console.log(maxIceCream([10,6,8,7,7,8], 5)) // 0
console.log(maxIceCream([1,6,3,1,2,5], 20)) // 6