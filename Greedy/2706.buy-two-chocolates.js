// 2706. Buy Two Chocolates
// You are given an integer array prices representing the prices of various chocolates in a store. You are also given a single integer money, which represents your initial amount of money.
// You must buy exactly two chocolates in such a way that you still have some non-negative leftover money. You would like to minimize the sum of the prices of the two chocolates you buy.
// Return the amount of money you will have leftover after buying the two chocolates. If there is no way for you to buy two chocolates without ending up in debt, return money. Note that the leftover must be non-negative.


// Solution: One Pass

// Find the two minimum prices.
// We can do this in one pass, using two variables to keep track of the current two minimum prices.

// Time Complexity: O(n) 113ms
// Space Complexity: O(1) 46.2MB
var buyChoco = function(prices, money) {
  let min = Infinity, secondMin = Infinity; // min <= secondMin
  for (let price of prices) {
    if (price <= min) {
      secondMin = min;
      min = price;
    } else if (price < secondMin) {
      secondMin = price;
    }
  }
  return min + secondMin <= money ? money - (min + secondMin) : money;
};

// Two test cases
console.log(buyChoco([1,2,2], 3)) // 0
console.log(buyChoco([3,2,3], 3)) // 3