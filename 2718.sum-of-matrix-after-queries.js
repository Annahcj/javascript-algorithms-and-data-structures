// 2718. Sum of Matrix After Queries
// You are given an integer n and a 0-indexed 2D array queries where queries[i] = [typei, indexi, vali].
// Initially, there is a 0-indexed n x n matrix filled with 0's. For each query, you must apply one of the following changes:
  // if type[i] == 0, set the values in the row with index[i] to val[i], overwriting any previous values.
  // if type[i] == 1, set the values in the column with index[i] to val[i], overwriting any previous values.
// Return the sum of integers in the matrix after all queries are applied.


// Solution: Reverse Queries

// Go through the queries in reverse order.
// Keep track of the amount of rows and columns that don't have a value assigned.
  // rowsUsed = hashset of rows that have a value assigned 
  // colsUsed = hashset of columns that have a value assigned 

// For each query, the sum of values for the cells this query will affect is: 
  // If the query is type 0: number of unused columns * val
  // If the query is type 1: number of unused rows * val
// Note: Only process the query it's the first one for the row/column, since duplicates queries will be covered by any same query on its right.
// After each query, add the used row or column to the hashset.

// m = number of queries
// Time Complexity: O(m) 234ms
// Space Complexity: O(n) 74.8MB
var matrixSumQueries = function(n, queries) {
  let rowsUsed = new Set(), colsUsed = new Set(), sum = 0;
  for (let i = queries.length - 1; i >= 0; i--) {
    let [type, index, val] = queries[i];
    if (type === 0 && !rowsUsed.has(index)) {
      sum += (n - colsUsed.size) * val;
      rowsUsed.add(index);
    } else if (type === 1 && !colsUsed.has(index)) {
      sum += (n - rowsUsed.size) * val;
      colsUsed.add(index);
    }
  }
  return sum;
};

// Two test cases
console.log(matrixSumQueries(3, [[0,0,1],[1,2,2],[0,2,3],[1,0,4]])) // 23
console.log(matrixSumQueries(3, [[0,0,4],[0,1,2],[1,0,1],[0,2,3],[1,2,1]])) // 17