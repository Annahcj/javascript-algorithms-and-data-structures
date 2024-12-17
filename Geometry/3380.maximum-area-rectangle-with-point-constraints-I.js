// 3380. Maximum Area Rectangle With Point Constraints I
// You are given an array points where points[i] = [x[i], y[i]] represents the coordinates of a point on an infinite plane.
// Your task is to find the maximum area of a rectangle that:
  // Can be formed using four of these points as its corners.
  // Does not contain any other point inside or on its border.
  // Has its edges parallel to the axes.
// Return the maximum area that you can obtain or -1 if no such rectangle is possible.


// Solution: Brute Force

// Enumerate every combination of four points.
// Check the following:
  // 1. The four sides are aligned to the axis (adjacent pairs of points must share the same x or y coordinate depending on the side).
  // 2. There are no points within the rectangle.

// Time Complexity: O(n^5) 54ms
// Space Complexity: O(1) 57.2MB
function maxRectangleArea(points) {
  let n = points.length, maxArea = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      for (let k = 0; k < n; k++) {
        if (i === k || j === k) continue;
        for (let l = 0; l < n; l++) {
          if ([i, j, k].includes(l)) continue;
          // i = top left
          // j = top right
          // k = bottom left
          // l = bottom right
          // check whether we have a valid rectangle
          const isAlignedToAxis = 
            points[i][1] === points[j][1] &&
            points[j][0] === points[l][0] && 
            points[l][1] === points[k][1] && 
            points[k][0] === points[i][0];
          // the edges may be aligned to the axis but the order of points may be incorrect
          const pointsHasCorrectOrder = 
            points[i][0] < points[j][0] &&
            points[j][1] > points[l][1] &&
            points[l][0] > points[k][0] &&
            points[k][1] < points[i][1];
          if (!isAlignedToAxis || !pointsHasCorrectOrder) continue;
          
          const leftEdge = points[i][0];
          const rightEdge = points[j][0];
          const topEdge = points[i][1];
          const bottomEdge = points[k][1];
          // check if any other points exist within the rectangle or on an edge
          let hasOverlapping = false;
          for (let m = 0; m < n; m++) {
            if ([i, j, k, l].includes(m)) continue;
            if (points[m][0] >= leftEdge && points[m][0] <= rightEdge && points[m][1] >= bottomEdge && points[m][1] <= topEdge) {
              hasOverlapping = true;
              break;
            }
          }
          if (!hasOverlapping) {
            maxArea = Math.max(maxArea, (rightEdge - leftEdge) * (topEdge - bottomEdge));
          }
        }
      }
    }
  }
  return maxArea === 0 ? -1 : maxArea;
};

// Three test cases
console.log(maxRectangleArea([[1,1],[1,3],[3,1],[3,3]])) // 4
console.log(maxRectangleArea([[1,1],[1,3],[3,1],[3,3],[2,2]])) // -1
console.log(maxRectangleArea([[1,1],[1,3],[3,1],[3,3],[1,2],[3,2]])) // 2