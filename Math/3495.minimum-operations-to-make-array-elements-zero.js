// 3495. Minimum Operations to Make Array Elements Zero
// You are given a 2D array queries, where queries[i] is of the form [l, r]. Each queries[i] defines an array of integers nums consisting of elements ranging from l to r, both inclusive.
// In one operation, you can:
  // Select two integers a and b from the array.
  // Replace them with floor(a / 4) and floor(b / 4).
// Your task is to determine the minimum number of operations required to reduce all elements of the array to zero for each query. Return the sum of the results for all queries.


// Solution: Math

// To find the number of operations to turn a number into 0, use log in base4: floor(getBaseLog(4, num)) + 1.

// On the flip side, using the powers of 4, we can find the boundaries for each number of operations.
  // 1-3 = 1 operation
  // 4-15 = 2 operations
  // 16-63 = 3 operations
  // 64-255 = 4 operations
  // 256+ = 5 operations
  // ...

// For each query, find the occurrances of the number of operations based on the powers of 4.
// e.g. query (2,17)
  // 2-3 = 1 operation
  // 4-15 = 2 operations
  // 16-17 = 3 operations
// Because the number of powers of 4 is small, we can iterate over each power of 4 for each query.

// Once we have the sum of operations in a query,
// calculate the minimum operations to reduce them all to 0.
// We can count the total number of operations and divide by 2.

// Proof:
  // This works because the numbers in the range are continuous, 
  // so it's always possible to distribute the operations into groups of 2, 
  // because l < r, so the query has at least 2 elements.
  // In the case where the operations are odd, it costs one more operation: ceil(operations / 2).

// n = number of queries, m = max(queries[i][1])
// Time Complexity: O(n log4(m)) 57ms
// Space Complexity: O(1) 90MB
function minOperations(queries) {
  let ans = 0;
  for (let [l, r] of queries) {
    let rangeStart = 1, operations = 0;
    for (let pow = 1; rangeStart <= r; pow++) {
      const rangeEnd = rangeStart * 4 - 1;
      // calculate overlap between current pow range and query range
      const maxStart = Math.max(l, rangeStart), minEnd = Math.min(r, rangeEnd);
      if (maxStart <= minEnd) {
        operations += (minEnd - maxStart + 1) * pow;
      }
      rangeStart *= 4;
    }
    ans += Math.ceil(operations / 2);
  }
  return ans;
};

// Two test cases
console.log(minOperations([[1,2],[2,4]])) // 3
console.log(minOperations([[2,6]])) // 4