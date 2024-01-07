// 10035. Maximum Area of Longest Diagonal Rectangle
// You are given a 2D 0-indexed integer array dimensions.
// For all indices i, 0 <= i < dimensions.length, dimensions[i][0] represents the length and dimensions[i][1] represents the width of the rectangle i.
// Return the area of the rectangle having the longest diagonal. If there are multiple rectangles with the longest diagonal, return the area of the rectangle having the maximum area.


// Solution: 

// Go through each dimension and record:
  // The maximum diagonal
  // The area from the maximum diagonal

// Time Complexity: O(n) 66ms
// Space Complexity: O(1) 44.5MB
var areaOfMaxDiagonal = function(dimensions) {
  let maxDiagonal = 0, ans = 0;
  for (let [length, width] of dimensions) {
    let diagonal = Math.sqrt((length * length) + (width * width));
    if (diagonal > maxDiagonal) {
      maxDiagonal = diagonal;
      ans = length * width;
    } else if (diagonal === maxDiagonal) {
      ans = Math.max(ans, length * width);
    }
  }
  return ans;
};

// Two test cases
console.log(areaOfMaxDiagonal([[9,3],[8,6]])) // 48
console.log(areaOfMaxDiagonal([[3,4],[4,3]])) // 12