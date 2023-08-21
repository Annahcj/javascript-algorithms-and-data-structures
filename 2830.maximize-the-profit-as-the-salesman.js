// 2830. Maximize the Profit as the Salesman
// You are given an integer n representing the number of houses on a number line, numbered from 0 to n - 1.
// Additionally, you are given a 2D integer array offers where offers[i] = [start[i], end[i], gold[i]], indicating that ith buyer wants to buy all the houses from start[i] to end[i] for gold[i] amount of gold.
// As a salesman, your goal is to maximize your earnings by strategically selecting and selling houses to buyers.
// Return the maximum amount of gold you can earn.
// Note that different buyers can't buy the same house, and some houses may remain unsold.


// Solution 1: DP & Binary Search

// Sort offers in asc order based on end time.
// Populate dp, where dp[i] = maximum profit up the offers[i] (maximum profit selling houses using a combination of offers from index 0 to i)
// For each dp[i], binary search to find the rightmost non-overlapping offer on the left.
  // dp[i] = Math.max(dp[i - 1], dp[rightmost non-overlapping index] + curr gold)

// n = number of houses, m = number of offers
// Time Complexity: O(m log(m)) 291ms
// Space Complexity: O(m) 79.7MB
var maximizeTheProfit = function(_n, offers) {
  let m = offers.length, dp = Array(m).fill(0);
  offers.sort((a, b) => a[1] - b[1]);
  for (let i = 0; i < m; i++) {
    let [start, _end, gold] = offers[i];
    let lastNonOverlapping = getLastNonOverlappingIndex(offers, start);
    let lastNonOverlappingProfit = gold + (lastNonOverlapping === -1 ? 0 : dp[lastNonOverlapping]);
    dp[i] = i === 0 ? lastNonOverlappingProfit : Math.max(dp[i - 1], lastNonOverlappingProfit);
  }
  return dp[m - 1];
};

// binary search for rightmost offer with end < the current offer's start 
function getLastNonOverlappingIndex(offers, start) {
  let low = 0, high = offers.length - 1;
  while (low < high) {
    let mid = Math.ceil((low + high) / 2);
    if (offers[mid][1] < start) low = mid;
    else high = mid - 1;
  }
  return offers[low][1] < start ? low : -1;
}


// Solution 2: DP

// Group the offers by end time.
// Populate dp, where dp[i] = the maximum profit for houses from 0 to i
// For each house index from 0 to n - 1, go through the offers ending at this house index.
  // dp[i] = Math.max(dp[i], dp[start - 1] + gold)

// n = number of houses, m = number of offers
// Time Complexity: O(n + m) 215ms
// Space Complexity: O(n + m) 113.7MB
var maximizeTheProfit = function(n, offers) {
  let m = offers.length, offersByEnd = Array(n).fill(0).map(() => []);
  for (let i = 0; i < m; i++) {
    offersByEnd[offers[i][1]].push(offers[i]);
  }
  let dp = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    dp[i] = i === 0 ? 0 : dp[i - 1];
    for (let [start, _end, gold] of offersByEnd[i]) {
      dp[i] = Math.max(dp[i], gold + (start === 0 ? 0 : dp[start - 1]));
    }
  }
  return dp[n - 1];
};

// Two test cases
console.log(maximizeTheProfit(5, [[0,0,1],[0,2,2],[1,3,2]])) // 3
console.log(maximizeTheProfit(5, [[0,0,1],[0,2,10],[1,3,2]])) // 10