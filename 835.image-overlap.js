// 835. Image Overlap
// You are given two images, img1 and img2, represented as binary, square matrices of size n x n. A binary matrix has only 0s and 1s as values.
// We translate one image however we choose by sliding all the 1 bits left, right, up, and/or down any number of units. We then place it on top of the other image. We can then calculate the overlap by counting the number of positions that have a 1 in both images.
// Note also that a translation does not include any kind of rotation. Any 1 bits that are translated outside of the matrix borders are erased.
// Return the largest possible overlap.


// Solution: Brute Force

// Try all different combinations of offset:
  // (up, left), (up, right)
  // (down, left), (down, right)

// For each offset combination, calculate the overlap and record the maximum result.

// Time Complexity: O(n^4) 210ms
// Space Complexity O(1) 43.6MB
var largestOverlap = function(img1, img2) {
  let n = img1.length, ans = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      ans = Math.max(
        ans,
        getOverlap(-i, -j),
        getOverlap(-i, j),
        getOverlap(i, -j),
        getOverlap(i, j)
      )
    }
  }
  return ans;
  
  function getOverlap(rowOffset, colOffset) {
    let overlap = 0;
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        let newRow = i + rowOffset, newCol = j + colOffset;
        if (newRow < 0 || newRow >= n || newCol < 0 || newCol >= n) continue;
        if (img1[newRow][newCol] === 1 && img2[i][j] === 1) overlap++;
      }
    }
    return overlap;
  }  
};

// Three test cases to run function on
console.log(largestOverlap([[1,1,0],[0,1,0],[0,1,0]], [[0,0,0],[0,1,1],[0,0,1]])) // 3
console.log(largestOverlap([[1]], [[1]])) // 1
console.log(largestOverlap([[0]], [[0]])) // 0