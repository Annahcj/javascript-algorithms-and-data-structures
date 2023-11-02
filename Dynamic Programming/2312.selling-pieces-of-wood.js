// 2312. Selling Pieces of Wood
// You are given two integers m and n that represent the height and width of a rectangular piece of wood. You are also given a 2D integer array prices, where prices[i] = [hi, wi, pricei] indicates you can sell a rectangular piece of wood of height hi and width wi for pricei dollars.
// To cut a piece of wood, you must make a vertical or horizontal cut across the entire height or width of the piece to split it into two smaller pieces. After cutting a piece of wood into some number of smaller pieces, you can sell pieces according to prices. You may sell multiple pieces of the same shape, and you do not have to sell all the shapes. The grain of the wood makes a difference, so you cannot rotate a piece to swap its height and width.
// Return the maximum money you can earn after cutting an m x n piece of wood.
// Note that you can cut the piece of wood as many times as you want.


// Solution: DP - Recursion w/ Memoization

// First, change prices so that we can look up the price in O(1) time.
// Memoize the result of each (width, height), take the maximum earnings from a piece of wood with those measurements.
// Given the width and height of a piece of wood, we can make horizontal or vetical cuts.
  // Try each of the different sized horizontal and vertical cuts.
    // Note: The loop can go up to half the width/height since going past that will just be repeating the same calculations twice.
  // Take the maximum price out of all the different ways of cutting.

// Time Complexity: O(m * n * (m + n)) 810ms
// Space Complexity: O(mn) 63.6MB
var sellingWood = function(m, n, prices) {
  let price = Array(n + 1).fill(0).map(() => Array(m + 1).fill(0));
  for (let [height, width, woodPrice] of prices) {
    price[width][height] = woodPrice;
  }
  let memo = Array(n + 1).fill(0).map(() => Array(m + 1).fill(-1));
  return dfs(n, m);

  function dfs(width, height) {
    if (width === 0 || height === 0) return 0;
    if (memo[width][height] !== -1) return memo[width][height];

    let ans = price[width][height];
    for (let h = 1; h <= Math.floor(height / 2); h++) {
      ans = Math.max(ans, dfs(width, h) + dfs(width, height - h));
    }
    for (let w = 1; w <= Math.floor(width / 2); w++) {
      ans = Math.max(ans, dfs(w, height) + dfs(width - w, height));
    }
    return memo[width][height] = ans;
  }
};

// Two test cases
console.log(sellingWood(3, 5, [[1,4,2],[2,2,7],[2,1,3]])) // 19
console.log(sellingWood(4, 6, [[3,2,10],[1,4,2],[4,1,3]])) // 32