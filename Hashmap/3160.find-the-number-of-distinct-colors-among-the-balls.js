// 3160. Find the Number of Distinct Colors Among the Balls
// You are given an integer limit and a 2D array queries of size n x 2.
// There are limit + 1 balls with distinct labels in the range [0, limit]. Initially, all balls are uncolored. For every query in queries that is of the form [x, y], you mark ball x with the color y. After each query, you need to find the number of distinct colors among the balls.
// Return an array result of length n, where result[i] denotes the number of distinct colors after ith query.
// Note that when answering a query, lack of a color will not be considered as a color.


// Solution: Counting & Hashmap

// Use a hashmap to store the running counts of each value from the query.
// Use another hashmap to store the previous value at each index.

// For a query [index, value], 
  // Subtract from the old value's count and decrease the distinct count if the count becomes 0.
  // Add to the new value's count and increase the distinct count if the count becomes 1.

// n = number of queries
// Time Complexity: O(n) 364ms
// Space Complexity: O(n) 96.4MB
var queryResults = function(limit, queries) {
  let count = {}, prevValue = {};
  let result = Array(queries.length), distinct = 0;
  for (let i = 0; i < queries.length; i++) {
    let [index, value] = queries[i];
    if (prevValue[index] !== undefined) {
      count[prevValue[index]]--;
      if (count[prevValue[index]] === 0) distinct--;
    } 
    count[value] = (count[value] || 0) + 1;
    if (count[value] === 1) distinct++;
    prevValue[index] = value;
    result[i] = distinct;
  }
  return result;
};

// Two test cases
console.log(queryResults(4, [[1,4],[2,5],[1,3],[3,4]])) // [1,2,2,3]
console.log(queryResults(4, [[0,1],[1,2],[2,2],[3,4],[4,5]])) // [1,2,2,3,4]