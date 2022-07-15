// 1105. Filling Bookcase Shelves
// You are given an array books where books[i] = [thicknessi, heighti] indicates the thickness and height of the ith book. You are also given an integer shelfWidth.
// We want to place these books in order onto bookcase shelves that have a total width shelfWidth.
// We choose some of the books to place on this shelf such that the sum of their thickness is less than or equal to shelfWidth, then build another level of the shelf of the bookcase so that the total height of the bookcase has increased by the maximum height of the books we just put down. We repeat this process until there are no more books to place.
// Note that at each step of the above process, the order of the books we place is the same order as the given sequence of books.
  // For example, if we have an ordered list of 5 books, we might place the first and second book onto the first shelf, the third book on the second shelf, and the fourth and fifth book on the last shelf.
// Return the minimum possible height that the total bookshelf can be after placing shelves in this manner.


// Solution 1: Top-down DP - Recursion w/ Memoization

// Memoize the result for each dp(i), where dp(i) = the minimum height of shelves for books from index i to n - 1.
// Try each different situation of adding books to one shelf while the shelf width is smaller than or equal to the maximum shelf width.

// Time Complexity: O(n^2) 94ms
// Space Complexity: O(n) 42.4MB
var minHeightShelves = function(books, shelfWidth) {
  let n = books.length, memo = Array(n).fill(-1);
  return dp(0);
  
  function dp(i) { // ith book
    if (i === n) return 0;
    if (memo[i] !== -1) return memo[i];
    
    let ans = Infinity, width = 0, maxHeight = 0;
    for (let j = i; j < n; j++) {
      width += books[j][0];
      maxHeight = Math.max(maxHeight, books[j][1]);
      if (width > shelfWidth) break;
      ans = Math.min(ans, dp(j + 1) + maxHeight);
    }
    return memo[i] = ans;
  }  
};


// Solution 2: Bottom-Up DP

// Populate dp, where dp[i] = minimum height of shelves for books from index 0 to i
// For each book i, loop backwards and try each situation of taking books on one row.
// Note that we need to offset dp by +1 because of the base case dp[0] = 0.

// Time Complexity: O(n^2) 110ms
// Space Complexity: O(n) 43.3MB
var minHeightShelves = function(books, shelfWidth) {
  let n = books.length, dp = Array(n + 1).fill(Infinity);
  dp[0] = 0;
  
  for (let i = 0; i < n; i++) {
    let maxHeight = 0, width = 0;
    for (let j = i; j >= 0; j--) {
      width += books[j][0];
      maxHeight = Math.max(maxHeight, books[j][1]);
      if (width > shelfWidth) break;
      dp[i + 1] = Math.min(dp[i + 1], dp[j] + maxHeight);
    }
  }
  return dp[n];
};

// Two test cases to run function on
console.log(minHeightShelves([[1,1],[2,3],[2,3],[1,1],[1,1],[1,1],[1,2]], 4)) // 6
console.log(minHeightShelves([[1,3],[2,4],[3,2]], 6)) // 4