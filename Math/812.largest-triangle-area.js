// 812. Largest Triangle Area
// Given an array of points on the X-Y plane points where points[i] = [xi, yi], return the area of the largest triangle that can be formed by any three different points. Answers within 10^-5 of the actual answer will be accepted.


// Solution: Shoelace Formula

// Time Complexity: O(n^3) 7ms
// Space Complexity: O(1) 57MB
function largestTriangleArea(points) {
  const n = points.length;
  let maxArea = 0;
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      for (let k = j + 1; k < n; k++) {
        maxArea = Math.max(maxArea, getArea(points[i], points[j], points[k]));
      }
    }
  }  
  return maxArea;
};

function getArea([x1, y1], [x2, y2], [x3, y3]) {
  return Math.abs(((x1 * y2) + (x2 * y3) + (x3 * y1)) - ((x2 * y1) + (x3 * y2) + (x1 * y3))) / 2;
}

// Two test cases
console.log(largestTriangleArea([[0,0],[0,1],[1,0],[0,2],[2,0]])) // 2
console.log(largestTriangleArea([[1,0],[0,0],[0,1]])) // 0.5