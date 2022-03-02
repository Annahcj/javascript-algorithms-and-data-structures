// 638. Shopping Offers
// In LeetCode Store, there are n items to sell. Each item has a price. However, there are some special offers, and a special offer consists of one or more different kinds of items with a sale price.
// You are given an integer array price where price[i] is the price of the ith item, and an integer array needs where needs[i] is the number of pieces of the ith item you want to buy.
// You are also given an array special where special[i] is of size n + 1 where special[i][j] is the number of pieces of the jth item in the ith offer and special[i][n] (i.e., the last integer in the array) is the price of the ith offer.
// Return the lowest price you have to pay for exactly certain items as given, where you could make optimal use of the special offers. You are not allowed to buy more items than you want, even if that would lower the overall price. You could use any of the special offers as many times as you want.


// Solution: Recursion w/ Memoization

// Find the best combination of using special offers and buying at the full price.
// We can only use a special offer if the items we need exceeds or is equal to the items in the special offer, so we need to check that.
// As the base case, we can pay the full price for each item remaining.
// Memoize the results in a hashmap: join the items into a string as the key.

// n = price.length, m = special.length
// Time Complexity: O(n^n * n * m) 84ms
// Space Complexity: O(n^n) 45MB
var shoppingOffers = function(price, special, needs) {
  let memo = new Map(), n = price.length;
  return dp(needs);
  
  function dp(items) {
    let key = items.join(",");
    if (memo.has(key)) return memo.get(key);
    
    let ans = buyAtFullPrice(items);
    for (let offer of special) {
      if (isValid(offer, items)) {
        let newState = fulfillOrder(offer, items);
        ans = Math.min(ans, dp(newState) + offer[n]);
      }
    }
    memo.set(key, ans);
    return ans;
  }
  
  function isValid(offer, items) {
    for (let i = 0; i < n; i++) {
      if (offer[i] > items[i]) return false;
    }
    return true;
  }
  
  function fulfillOrder(offer, items) {
    let newState = [...items];
    for (let i = 0; i < n; i++) {
      newState[i] -= offer[i];
    }
    return newState;
  }
  
  function buyAtFullPrice(items) {
    let ans = 0;
    for (let i = 0; i < n; i++) {
      ans += items[i] * price[i];
    }
    return ans;
  }
};

// Two test cases to run function on
console.log(shoppingOffers([2,5], [[3,0,5],[1,2,10]], [3,2])) // 14
console.log(shoppingOffers([2,3,4], [[1,1,0,4],[2,2,1,9]], [1,2,1])) // 11