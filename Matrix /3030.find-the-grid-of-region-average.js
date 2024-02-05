// 3030. Find the Grid of Region Average
// You are given a 0-indexed m x n grid image which represents a grayscale image, where image[i][j] represents a pixel with intensity in the range[0..255]. You are also given a non-negative integer threshold.
// Two pixels image[a][b] and image[c][d] are said to be adjacent if |a - c| + |b - d| == 1.
// A region is a 3 x 3 subgrid where the absolute difference in intensity between any two adjacent pixels is less than or equal to threshold.
// All pixels in a region belong to that region, note that a pixel can belong to multiple regions.
// You need to calculate a 0-indexed m x n grid result, where result[i][j] is the average intensity of the region to which image[i][j] belongs, rounded down to the nearest integer. If image[i][j] belongs to multiple regions, result[i][j] is the average of the rounded down average intensities of these regions, rounded down to the nearest integer. If image[i][j] does not belong to any region, result[i][j] is equal to image[i][j].
// Return the grid result.


// Solution: Brute Force

// For each cell, 
  // Check whether the 3x3 subgrid is a region by comparing adjacent cells.
  // Keep track of the [sum of averages, count of regions] for each cell.
  // When finding a region, update the sum of averages and count of regions for every cell in the subgrid.
// At the end, get the averages of averages: result[i][j] = Math.floor(result[i][j][0] / result[i][j][1]).

// Time Complexity: O(9mn) 629ms
// Space Complexity: O(mn) 99.5MB
var resultGrid = function(image, threshold) {
  let m = image.length, n = image[0].length;
  let result = Array(m).fill(0).map(() => Array(n).fill(0).map(() => [0, 0])); // [sum, count]
  for (let i = 0; i < m - 2; i++) {
    for (let j = 0; j < n - 2; j++) {
      let avg = getAverage(image, i, j, threshold);
      if (avg !== -1) {
        for (let row = i; row < i + 3; row++) {
          for (let col = j; col < j + 3; col++) {
            result[row][col][0] += avg;
            result[row][col][1]++;
          }
        }
      }
    }
  }
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (result[i][j][1] === 0) {
        result[i][j] = image[i][j];
      } else {
        result[i][j] = Math.floor(result[i][j][0] / result[i][j][1]);
      }
    }
  }
  return result;
};

function getAverage(image, topLeftRow, topLeftCol, threshold) {
  let sum = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      sum += image[i + topLeftRow][j + topLeftCol];
      if (i > 0) { // compare with top cell
        if (Math.abs(image[i + topLeftRow][j + topLeftCol] - image[i - 1 + topLeftRow][j + topLeftCol]) > threshold) return -1;
      }
      if (j > 0) { // compare with left cell
        if (Math.abs(image[i + topLeftRow][j + topLeftCol] - image[i + topLeftRow][j - 1 + topLeftCol]) > threshold) return -1;
      }
    }
  }
  return Math.floor(sum / 9);
}

// Three test cases
console.log(resultGrid([[5,6,7,10],[8,9,10,10],[11,12,13,10]], 3)) // [[9,9,9,9],[9,9,9,9],[9,9,9,9]]
console.log(resultGrid([[10,20,30],[15,25,35],[20,30,40],[25,35,45]], 12)) // [[25,25,25],[27,27,27],[27,27,27],[30,30,30]]
console.log(resultGrid([[5,6,7],[8,9,10],[11,12,13]], 1)) // [[5,6,7],[8,9,10],[11,12,13]]