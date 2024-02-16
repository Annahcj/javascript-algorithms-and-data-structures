// 2412. Minimum Money Required Before Transactions
// You are given a 0-indexed 2D integer array transactions, where transactions[i] = [cost[i], cashback[i]].
// The array describes transactions, where each transaction must be completed exactly once in some order. At any given moment, you have a certain amount of money. In order to complete transaction i, money >= cost[i] must hold true. After performing a transaction, money becomes money - cost[i] + cashback[i].
// Return the minimum amount of money required before any transaction so that all of the transactions can be completed regardless of the order of the transactions.


// Solution 1: Greedy w/ Sorting

// Split transactions into those that result in a loss after completing, and those that result in a gain after completing.

// To get the worst case scenario, all the losses should be put before the gains.
  // The losses should be ordered in asc order by smallest transactions[i][0] (cost) first.
  // If the costs are equal, sort by cashback in asc order.
  // Putting the largest costs last will require the most initial amount of money, because we will have accumulated all the previous losses.
  // Edge case: It's possible that the last loss transaction has a very high loss, and could be better off at the front. To solve for this case, try taking each loss transaction last.

// The gains should be ordered in desc order by largest transactions[i][0] (cost) first. 
  // We don't care about costs being equal here, because it makes no difference to the end result since we will only gain more money.
  // Putting the largest costs first will require the most initial amount of money, because we will only gain more money from now on.

// Time Complexity: O(n) 263ms
// Space Complexity: O(n) 85.3MB
var minimumMoney = function(transactions) {
  let losses = [], gains = [];
  for (let [cost, cashback] of transactions) {
    if (cost > cashback) {
      losses.push([cost, cashback]);
    } else {
      gains.push([cost, cashback]);
    }
  }
  losses.sort((a, b) => a[0] !== b[0] ? a[0] - b[0] : a[1] - b[1]);
  gains.sort((a, b) => b[0] - a[0]);
  
  let balance = 0, ans = 0;
  for (let [cost, cashback] of losses) {
    ans = Math.min(ans, balance - cost);
    balance -= cost;
    balance += cashback;
  }
  
  // try taking each loss transaction as the last one
  for (let [cost, cashback] of losses) {
    let newBalance = balance - cashback + cost;
    ans = Math.min(ans, newBalance - cost);
  }
  for (let [cost, cashback] of gains) {
    ans = Math.min(ans, balance - cost);
    balance -= cost;
    balance += cashback;
  }
  return -ans;
};


// Solution 2: Greedy w/ Sorting - Optimized Space

// We can observe that for gains, we only need to know the gain transaction with the largest cost (because we will only gain more money from then onwards).
// For losses, take a similar approach as the last solution:
  // One pass to get the total negative balance.
  // One pass to try each loss transaction as the last and record the smallest balance.

// At the end, we take the total negative balance and subtract the maximum gain transaction cost to get the smallest possible balance. 

// Time Complexity: O(n) 161ms
// Space Complexity: O(1) 82.8MB
var minimumMoney = function(transactions) {
  let negativeBalance = 0, maxGainCost = 0;
  for (let [cost, cashback] of transactions) {
    if (cost > cashback) {
      negativeBalance = negativeBalance - cost + cashback;
    } else {
      maxGainCost = Math.max(maxGainCost, cost);
    }
  }
  let ans = Infinity;
  // try taking each loss transaction 
  for (let [cost, cashback] of transactions) {
    if (cost > cashback) {
      let newBalance = negativeBalance - cashback + cost;
      ans = Math.min(ans, newBalance - cost); 
    }
  }
  ans = Math.min(ans, negativeBalance - maxGainCost);
  return -ans;
};

// Two test cases
console.log(minimumMoney([[2,1],[5,0],[4,2]])) // 10
console.log(minimumMoney([[3,0],[0,3]])) // 3