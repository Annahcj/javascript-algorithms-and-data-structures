// 2070. Most Beautiful Item for Each Query
// You are given a 2D integer array items where items[i] = [pricei, beautyi] denotes the price and beauty of an item respectively.
// You are also given a 0-indexed integer array queries. For each queries[j], you want to determine the maximum beauty of an item whose price is less than or equal to queries[j]. If no such item exists, then the answer to this query is 0.
// Return an array answer of the same length as queries where answer[j] is the answer to the jth query.


// Solution: Sorting & Two Pointers

// 1. Sort items in asc order.
// 2. Sort queries in asc order (and add the index to each query).
// 3. Two pointers for items and queries:
  // For each query, move up the items pointer while items[i][0] <= query[0].
  // Record the maximum beauty.

// n = number of items, m = number of queries
// Time Complexity: O(n log(n) + m log(m)) 336ms
// Space Complexity: O(m) 77.3MB
var maximumBeauty = function(items, queries) {
  items.sort((a, b) => a[0] - b[0]);
  queries = queries.map((query, idx) => [query, idx]).sort((a, b) => a[0] - b[0]);
  
  let n = items.length, res = Array(queries.length);
  let maxBeauty = 0, i = 0;
  for (let [maxPrice, idx] of queries) {
    while (i < n && items[i][0] <= maxPrice) {
      maxBeauty = Math.max(maxBeauty, items[i++][1]);
    }
    res[idx] = maxBeauty;
  }
  return res;
};

// Two test cases
console.log(maximumBeauty([[1,2],[3,2],[2,4],[5,6],[3,5]], [1,2,3,4,5,6])) // [2,4,5,5,6,6]
console.log(maximumBeauty([[1,2],[1,2],[1,3],[1,4]], [1])) // [4]