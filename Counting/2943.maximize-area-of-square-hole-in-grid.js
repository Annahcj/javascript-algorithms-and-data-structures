// 2943. Maximize Area of Square Hole in Grid
// There is a grid with n + 2 horizontal bars and m + 2 vertical bars, and initially containing 1 x 1 unit cells.
// The bars are 1-indexed.
// You are given the two integers, n and m.
// You are also given two integer arrays: hBars and vBars.
  // hBars contains distinct horizontal bars in the range [2, n + 1].
  // vBars contains distinct vertical bars in the range [2, m + 1].
// You are allowed to remove bars that satisfy any of the following conditions:
  // If it is a horizontal bar, it must correspond to a value in hBars.
  // If it is a vertical bar, it must correspond to a value in vBars.
// Return an integer denoting the maximum area of a square-shaped hole in the grid after removing some bars (possibly none).

 
// Solution: Sorting & Counting

// Sort hBars and vBars in asc order.
// Find the longest consecutive bars in hBars and vBars, and return the square of the minimum consecutive bars.

// h = length of hBars, v = length of vBars
// Time Complexity: O(h log(h) + v log(v)) 159ms
// Space Complexity: O(log(h) + log(v)) (space for sorting) 44.2MB
var maximizeSquareHoleArea = function(n, m, hBars, vBars) {
  hBars.sort((a, b) => a - b);
  vBars.sort((a, b) => a - b);
  let maxHoriCount = 1, horiCount = 1;
  for (let i = 1; i < hBars.length; i++) {
    if (hBars[i - 1] + 1 === hBars[i]) horiCount++;
    else horiCount = 1;
    maxHoriCount = Math.max(maxHoriCount, horiCount);
  }
  let maxVertCount = 1, vertCount = 1;
  for (let i = 1; i < vBars.length; i++) {
    if (vBars[i - 1] + 1 === vBars[i]) vertCount++;
    else vertCount = 1;
    maxVertCount = Math.max(maxVertCount, vertCount);
  }
  return (Math.min(maxHoriCount, maxVertCount) + 1) ** 2;
};

// Three test cases
console.log(maximizeSquareHoleArea(2, 1, [2,3], [2])) // 4
console.log(maximizeSquareHoleArea(1, 1, [2], [2])) // 4
console.log(maximizeSquareHoleArea(2, 3, [2,3], [2,3,4])) // 9