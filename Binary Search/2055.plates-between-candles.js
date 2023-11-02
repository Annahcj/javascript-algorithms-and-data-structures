// 2055. Plates Between Candles
// There is a long table with a line of plates and candles arranged on top of it. You are given a 0-indexed string s consisting of characters '*' and '|' only, where a '*' represents a plate and a '|' represents a candle.
// You are also given a 0-indexed 2D integer array queries where queries[i] = [lefti, righti] denotes the substring s[lefti...righti] (inclusive). For each query, you need to find the number of plates between candles that are in the substring. A plate is considered between candles if there is at least one candle to its left and at least one candle to its right in the substring.
  // For example, s = "||**||**|*", and a query [3, 8] denotes the substring "*||**|". The number of plates between candles in this substring is 2, as each of the two plates has at least one candle in the substring to its left and right.
// Return an integer array answer where answer[i] is the answer to the ith query.


// Solution: Binary Search

// 1. Get the indices of each candle in an array
// 2. Process each query:
  // a. Binary search for the smallest index in candles >= start
  // b. Binary search for the biggest index in candles <= end
  // Based on the two indices 'left' and 'right', we can calculate the number of plates between them.
    // number of candles = right - left + 1
    // number of plates & candles combined = candles[right] - candles[left] + 1
    // number of plates only: total plates & candles - number of candles

// n = length of s, m = length of queries
// Time Complexity: O(m log(n)) 459ms
// Space Complexity: O(n) 82.7MB
var platesBetweenCandles = function(s, queries) {
  let n = s.length, m = queries.length;
  let res = Array(m);
  
  let candles = [];
  for (let i = 0; i < n; i++) {
    if (s[i] === '|') candles.push(i);
  }
  for (let i = 0; i < m; i++) {
    let [start, end] = queries[i];
    let left = getLeft(start), right = getRight(end);
    let candlesCount = right - left + 1;
    let plates = (candles[right] || 0) - (candles[left] || 0) + 1 - candlesCount;
    res[i] = Math.max(0, plates);
  }
  return res;
  
  // gets the smallest index >= start
  function getLeft(start) {
    let low = 0, high = candles.length - 1;
    while (low < high) {
      let mid = Math.floor((low + high) / 2);
      if (candles[mid] >= start) high = mid;
      else low = mid + 1;
    }
    return low;
  }
  
  // gets the biggest index <= end
  function getRight(end) {
    let low = 0, high = candles.length - 1;
    while (low < high) {
      let mid = Math.ceil((low + high) / 2);
      if (candles[mid] <= end) low = mid;
      else high = mid - 1;
    }
    return low;
  }
};

// Two test cases
console.log(platesBetweenCandles("**|**|***|", [[2,5],[5,9]])) // [2,3]
console.log(platesBetweenCandles("***|**|*****|**||**|*", [[1,17],[4,5],[14,17],[5,11],[15,16]])) // [9,0,0,0,0]