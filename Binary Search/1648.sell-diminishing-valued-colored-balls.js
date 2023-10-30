// 1648. Sell Diminishing-Valued Colored Balls
// You have an inventory of different colored balls, and there is a customer that wants orders balls of any color.
// The customer weirdly values the colored balls. Each colored ball's value is the number of balls of that color you currently have in your inventory. For example, if you own 6 yellow balls, the customer would pay 6 for the first yellow ball. After the transaction, there are only 5 yellow balls left, so the next yellow ball is then valued at 5 (i.e., the value of the balls decreases as you sell more to the customer).
// You are given an integer array, inventory, where inventory[i] represents the number of balls of the ith color that you initially own. You are also given an integer orders, which represents the total number of balls that the customer wants. You can sell the balls in any order.
// Return the maximum total value that you can attain after selling orders colored balls. As the answer may be too large, return it modulo 10^9 + 7.


// Solution: Binary Search  

// Binary search for x, where we take all inventory[i] - x balls from each inventory[i].
// We search for the largest amount x where we can take at least `orders` balls in this way.
// With this amount x, take all balls with value greater than x + 1, then take value x + 1 for the remaining balls (orders - ordersTaken) * (x + 1).

// m = max(inventory[i]), n = length of inventory
// Time Complexity: O(m log(n)) 147ms
// Space Complexity: O(1) 55.5MB
var maxProfit = function(inventory, orders) {
  let low = 0, high = Math.max(...inventory);
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isEnough(inventory, orders, mid)) low = mid;
    else high = mid - 1;
  }
  return getTotalValue(inventory, orders, low);
};

function getTotalValue(inventory, orders, x) {
  let value = 0n, ordersTaken = 0, MOD = 1000000007n;
  for (let i = 0; i < inventory.length; i++) {
    if (inventory[i] > x + 1) {
      value += sumOfNToOne(inventory[i]) - sumOfNToOne(x + 1);
      ordersTaken += inventory[i] - x - 1;
    }
  }
  // take value x + 1 for the remaining (orders - ordersTaken) balls. there is guaranteed to be at least that many with value x + 1 due to the check in isEnough
  return (value + BigInt((orders - ordersTaken) * (x + 1))) % MOD;
}

function isEnough(inventory, orders, x) {
  let balls = 0;
  for (let i = 0; i < inventory.length; i++) {
    balls += Math.max(0, inventory[i] - x);
  }
  return balls >= orders;
}

function sumOfNToOne(n) {
  return BigInt(n) * BigInt(n + 1) / 2n;
}

// Two test cases
console.log(maxProfit([2,5], 4)) // 14
console.log(maxProfit([3,5], 6)) // 19