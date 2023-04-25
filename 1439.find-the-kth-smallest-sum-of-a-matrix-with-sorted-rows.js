// 1439. Find the Kth Smallest Sum of a Matrix With Sorted Rows
// You are given an m x n matrix mat that has its rows sorted in non-decreasing order and an integer k.
// You are allowed to choose exactly one element from each row to form an array.
// Return the kth smallest array sum among all possible arrays.


// Solution: Binary Search & DFS

// Binary search for the minimum sum where there are more than or equal to k arrays with a smaller or equal sum.
  // Lower bound is the minimum sum (sum of all mat[i][0])
  // Upper bound is the maximum sum (sum of all mat[i][n - 1])

// For each sum "maxSum", use recursive DFS to count the number of arrays with a sum <= maxSum.
// Note: Since k <= 200, we stop the DFS when:
  // 1. the total count exceeds k
  // 2. the current sum exceeds the maximum sum
  // 3. the returned count of arrays is 0 - this indicates the final sum in this path will always exceed the maximum sum, so there is no point in proceeding further since the sum will only increase

// m = number of rows
// Time Complexity: O(k log(max sum)) 60ms
// Space Complexity: O(m) 42.1MB
var kthSmallest = function(mat, k) {
  let low = 0, high = 0;
  let m = mat.length, n = mat[0].length;
  for (let i = 0; i < m; i++) {
    low += mat[i][0];
    high += mat[i][n - 1];
  }
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (countArrays(mat, k, 0, 0, mid) >= k) high = mid;
    else low = mid + 1;
  }
  return low;
};

function countArrays(mat, k, row, currSum, maxSum) { // count number of combinations of arrays with sum <= maxSum
  if (currSum > maxSum) return 0;
  if (row === mat.length) return 1;
  
  let totalCount = 0;
  for (let col = 0; col < mat[row].length; col++) {
    let newSum = currSum + mat[row][col];
    let count = countArrays(mat, k, row + 1, newSum, maxSum); 
    if (count === 0) return totalCount; // the final sum exceeds maxSum, proceeding further will only result in larger sums 
    totalCount += count;
    if (totalCount >= k) return totalCount; // we already have k so we can stop searching
  }
  return totalCount;
}

// Three test cases
console.log(kthSmallest([[1,3,11],[2,4,6]], 5)) // 7
console.log(kthSmallest([[1,3,11],[2,4,6]], 9)) // 17
console.log(kthSmallest([[1,10,10],[1,4,5],[2,3,6]], 7)) // 9