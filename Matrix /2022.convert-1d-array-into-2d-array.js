// 2022. Convert 1D Array Into 2D Array
// You are given a 0-indexed 1-dimensional (1D) integer array original, and two integers, m and n. You are tasked with creating a 2-dimensional (2D) array with m rows and n columns using all the elements from original.
// The elements from indices 0 to n - 1 (inclusive) of original should form the first row of the constructed 2D array, the elements from indices n to 2 * n - 1 (inclusive) should form the second row of the constructed 2D array, and so on.
// Return an m x n 2D array constructed according to the above procedure, or an empty 2D array if it is impossible.


// Solution: Simulation

// If the length of original is not equal to m * n, it's impossible.
// Otherwise, fill up the matrix according to the instructions.

// Time Complexity: O(mn) 183ms
// Space Complexity: O(1) (excluding output) 69.3MB
function construct2DArray(original, m, n) {
  if (original.length !== m * n) return [];
  let matrix = Array(m).fill(0).map(() => Array(n));
  for (let i = 0; i < original.length; i++) {
    matrix[Math.floor(i / n)][i % n] = original[i];
  }
  return matrix;
};

// Two test cases
console.log(construct2DArray([1,2,3,4], 2, 2)) // [[1,2],[3,4]]
console.log(construct2DArray([1,2], 1, 1)) // []