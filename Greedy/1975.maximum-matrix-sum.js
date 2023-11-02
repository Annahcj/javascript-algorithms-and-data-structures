// 1975. Maximum Matrix Sum
// You are given an n x n integer matrix. You can do the following operation any number of times:
  // Choose any two adjacent elements of matrix and multiply each of them by -1.
// Two elements are considered adjacent if and only if they share a border.
// Your goal is to maximize the summation of the matrix's elements. Return the maximum sum of the matrix's elements using the operation mentioned above.


// Solution: Greedy Logic 

// Since matrix cells are all connected, we can turn all negative into positive.
// This is because multiplying adjacent cells by -1 is equivalent to flipping their negativity (positive -> negative, negative -> positive).
// We essentially can move negative numbers around anywhere we want, so it is optimal to move them next to other negative numbers so that they can both be turned into positives.
// If there is an odd amount of negative numbers, there will always be one left that we can't turn into positive.
  // Take the minimum number as negative.

// If amount of negative numbers are even, take the absolute sum of all matrix values.
// If amount of negative numbers are odd, take the absolute sum of all matrix values - (minimum number * 2).

// Time Complexity: O(mn) 166ms
// Space Complexity: O(1) 50.7MB
var maxMatrixSum = function(matrix) {
  let m = matrix.length, n = matrix[0].length;
  let absoluteSum = 0, negatives = 0, minNum = Infinity;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] < 0) negatives++;
      let absoluteVal = Math.abs(matrix[i][j]);
      minNum = Math.min(minNum, absoluteVal);
      absoluteSum += absoluteVal;
    }
  }
  return negatives % 2 === 0 ? absoluteSum : absoluteSum - (minNum * 2);
};

// Two test cases
console.log(maxMatrixSum([[1,-1],[-1,1]])) // 4
console.log(maxMatrixSum([[1,2,3],[-1,-2,-3],[1,2,3]])) // 16