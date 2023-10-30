// 2517. Maximum Tastiness of Candy Basket
// You are given an array of positive integers price where price[i] denotes the price of the ith candy and a positive integer k.
// The store sells baskets of k distinct candies. The tastiness of a candy basket is the smallest absolute difference of the prices of any two candies in the basket.
// Return the maximum tastiness of a candy basket.

 
// Solution: Binary Search & Greedy 

// Binary search the maximum tastiness.
// To find whether we can take k candies with minimum absolute difference of x, we can use a greedy strategy:
  // Sort price in asc order.
  // Start by taking price[0].
  // Greedily take the earliest next candy where the difference is >= x.
  // If we can get at least k candies using this greedy strategy, then return true (it is possible).

// m = max difference between two candies
// Time Complexity: O(n log(m) + n log(n)) 242ms
// Space Complexity: O(log(n)) (space for sorting) 52.6MB
var maximumTastiness = function(price, k) {
  let n = price.length;
  if (n === 1) return 0;
  price.sort((a, b) => a - b);
  let maxDiff = price[n - 1] - price[0];
  let low = 0, high = maxDiff;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (isPossible(mid)) low = mid;
    else high = mid - 1;
  }
  return low;
  
  function isPossible(diff) {
    let prevPrice = price[0], size = 1;
    for (let i = 1; i < n; i++) {
      if (price[i] - prevPrice >= diff) {
        prevPrice = price[i];
        size++;
      }
      if (size === k) return true;
    }
    return false;
  }
};

// Three test cases
console.log(maximumTastiness([13,5,1,8,21,2], 3)) // 8
console.log(maximumTastiness([1,3,1], 2)) // 2
console.log(maximumTastiness([7,7,7,7], 2)) // 0