// 48. Rotate Image
// You are given an n x n 2D matrix representing an image, rotate the image by 90 degrees (clockwise).
// You have to rotate the image in-place, which means you have to modify the input 2D matrix directly. DO NOT allocate another 2D matrix and do the rotation.


// Solution 1: Transpose & Reverse w/ Two Pointer Reverse Function
// Logic: 
// transpose = 

// turn this
//[[1,2,3],
// [4,5,6],
// [7,8,9]]

// into this
//[[1,4,7],
// [2,5,8],
// [3,6,9]]

// from here, we can simply flip each row within itself and we have our answer
//[[7,4,1],
// [8,5,2],
// [9,6,3]]

// the relationship between these indexes are:
// 00 -> 00
// 01 -> 10
// 02 -> 20
// 11 -> 11
// 12 -> 21
// 22 -> 22
// the pattern is that they are the exact flip of the positions -> i, j = j, i

// Algorithm:
// n = matrix.length 
// Loop through from 0 to n - 1 (pointer = i)
  // loop through from i to n - 1 (pointer = j) (we start from i to avoid swapping cells twice)
    // Swap matrix[i][j] with matrix[j][i]
  // reverse matrix[i] (with two pointer reverse function)

// reverseRow: (row)
  // Set two pointers to the mid point/points of the row
  // Loop while i is bigger than or equal to 0
    // Swap row[i] with row[j]
    // Decrement i and increment j

// n = number of cells in matrix
// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 38.9MB
  var rotate = function(matrix) {
    let n = matrix.length;
    for (var i = 0; i < n; i++) {
      for (var j = i; j < n; j++) {
        let temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
      reverseRow(matrix[i]);
    }  
    // for testing purposes only 
    console.log(matrix)
  
    // Two pointer algorithm to reverse a row
    function reverseRow(row) {
      let len = row.length;
      let idx = Math.floor(len / 2);
      let i = idx, j = i;
      if (len % 2 === 0) i--;
      while (i >= 0) {
        let temp = row[i];
        row[i] = row[j];
        row[j] = temp;
        i--, j++;
      }
    }
  };
  
  // Solution 2: Solution 1 w/ Built-In Reverse Function
  var rotate = function(matrix) {
    let n = matrix.length;
    for (var i = 0; i < n; i++) {
      for (var j = i; j < n; j++) {
        let temp = matrix[i][j];
        matrix[i][j] = matrix[j][i];
        matrix[j][i] = temp;
      }
      matrix[i] = matrix[i].reverse();
    }  
    // for testing purposes only 
    console.log(matrix)
  };
  
  // <- This function is a follow-up, the answers are different from what the question requires ->
  // Follow-up: Rotate 90 deg Anti-Clockwise 
  
  // Instead of swapping i,j with j,i, we swap i,j with n-j,n-i,  
  // and instead of looping from i to n - 1, loop from n - i to 0.
  var rotate = function(matrix) {
    let n = matrix.length;
    for (var i = 0; i < matrix.length; i++) {
      for (var j = n - i - 1; j >= 0; j--) {
        let temp = matrix[i][j];
        matrix[i][j] = matrix[n - j - 1][n - i - 1];
        matrix[n - j - 1][n - i - 1] = temp;
      }
      reverseRow(matrix[i]);
    }
    // for testing purposes only 
    console.log(matrix)
  
    function reverseRow(row) {
      let len = row.length;
      let idx = Math.floor(len / 2);
      let i = idx, j = i;
      if (len % 2 === 0) i--;
      while (i >= 0) {
        let temp = row[i];
        row[i] = row[j];
        row[j] = temp;
        i--, j++;
      }
    }
  };
  
  // Four test cases to run function on
  console.log(rotate([[1,2,3],[4,5,6],[7,8,9]])) // [[7,4,1],[8,5,2],[9,6,3]]
  console.log(rotate([[5,1,9,11],[2,4,8,10],[13,3,6,7],[15,14,12,16]])) // [[15,13,2,5],[14,3,4,1],[12,6,8,9],[16,7,10,11]]
  console.log(rotate([[1]])) // [[1]]
  console.log(rotate([[1,2],[3,4]])) // [[3,1],[4,2]]