// 566. Reshape the Matrix
// In MATLAB, there is a handy function called reshape which can reshape an m x n matrix into a new one with a different size r x c keeping its original data.
// You are given an m x n matrix mat and two integers r and c representing the row number and column number of the wanted reshaped matrix.
// The reshaped matrix should be filled with all the elements of the original matrix in the same row-traversing order as they were.
// If the reshape operation with given parameters is possible and legal, output the new reshaped matrix; Otherwise, output the original matrix.


// Solution 1: Store Values in Array

// If r * c isn't equal to width * height of the matrix given, we return matrix as it is (reshaping isn't possible)
// Loop through matrix row by row column by column and push them into an array.
// Push stored values back into new matrix with new sizes.

// Time Complexity: O(mn) 92ms
// Space Complexity: O(mn) 42.6MB

var matrixReshape = function(mat, r, c) {
    let width = mat[0].length, height = mat.length;
    let values = [];
    let newMat = [], p = 0;
    if (r * c !== width * height) return mat;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        values.push(mat[i][j]);
      }
    }
    for (var h = 0; h < r; h++) {
      newMat[h] = [];
      for (var k = 0; k < c; k++) {
        newMat[h].push(values[p]);
        p++;
      }
    }
    return newMat;
  };


// Solution 2: Replacing Without Storing

// Loop through matrix row by row column by column and put them into new matrix with new sizes.

// Time Complexity: O(mn) 100ms
// Space Complexity: O(mn) 42.3MB

  var matrixReshape = function(mat, r, c) {
    let width = mat[0].length, height = mat.length;
    let currR = 0, currC = 0;
    let newMat = [[]];
    if (r * c !== width * height) return mat;
    for (var i = 0; i < height; i++) {
      for (var j = 0; j < width; j++) {
        if (currC === c) currR++, newMat[currR] = [], currC = 0;
        newMat[currR][currC] = mat[i][j];
        currC++;
      }
    }
    return newMat;
  };
  // Two test cases to run function on
  console.log(matrixReshape([[1,2],[3,4]], 1, 4)) // [[1,2,3,4]]
  console.log(matrixReshape([[1,2],[3,4]], 2, 4)) // [[1,2],[3,4]]