// 223. Rectangle Area
// Given the coordinates of two rectilinear rectangles in a 2D plane, return the total area covered by the two rectangles.
// The first rectangle is defined by its bottom-left corner (ax1, ay1) and its top-right corner (ax2, ay2).
// The second rectangle is defined by its bottom-left corner (bx1, by1) and its top-right corner (bx2, by2).


// Solution: 

// 1. Check if the rectangles overlap 
// 2. Calculate the overlap area

// Checking if the rectangles DON'T overlap: 
  // If rec1's right side is smaller than or equal to rec2's left side
  // If rec1's left side is bigger than or equal to rec2's right side
  // If rec1's bottom line is bigger than or equal to rec2's top line
  // If rec1's top line is smaller than or equal to rec2's bottom line

// If they don't overlap, return the area of the two rectangles.
// Otherwise, calculate the overlap area:
  // overlap width: Math.min(ax2, bx2) - Math.max(ax1, bx1)
  // overlap height: Math.min(ay2, by2) - Math.max(ay1, by1)
// Return area1 - width * height + area2.

// Time Complexity: O(1) 125ms
// Space Complexity: O(1) 47.4MB
var computeArea = function(ax1, ay1, ax2, ay2, bx1, by1, bx2, by2) {
  let area1 = (ax2 - ax1) * (ay2 - ay1);
  let area2 = (bx2 - bx1) * (by2 - by1);
  if (ax2 <= bx1 || ax1 >= bx2 || ay1 >= by2 || ay2 <= by1) {
    return area1 + area2;
  }
  let width = Math.min(ax2, bx2) - Math.max(ax1, bx1);
  let height = Math.min(ay2, by2) - Math.max(ay1, by1);
  return area1 - width * height + area2;
};

// A test case to run function on
console.log(computeArea(-3, 0, 3, 4, 0, -1, 9, 2)) // 45