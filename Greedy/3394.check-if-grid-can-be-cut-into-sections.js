// 3394.check-if-grid-can-be-cut-into-sections.js
// 3394. Check if Grid can be Cut into Sections
// You are given an integer n representing the dimensions of an n x n grid, with the origin at the bottom-left corner of the grid. You are also given a 2D array of coordinates rectangles, where rectangles[i] is in the form [start[x], start[y], end[x], end[y]], representing a rectangle on the grid. Each rectangle is defined as follows:
  // (start[x], start[y]): The bottom-left corner of the rectangle.
  // (end[x], end[y]): The top-right corner of the rectangle.
// Note that the rectangles do not overlap. Your task is to determine if it is possible to make either two horizontal or two vertical cuts on the grid such that:
  // Each of the three resulting sections formed by the cuts contains at least one rectangle.
  // Every rectangle belongs to exactly one section.
// Return true if such cuts can be made; otherwise, return false.


// Solution: Merge Intervals

// The goal is to find horizontal/vertical lines that are not within a rectangle (can be on the edge, just not within).
// Define horizontal and vertical intervals for every rectangle:
  // horizontal (left-to-right): [rectangles[0], rectangles[2]].
  // vertical (top-to-bottom): [rectangles[1], rectangles[3]].
// Merge the intervals if they are overlapping (strictly overlapping, on the edge doesn't count).
// If the number of horizontal or vertical intervals >= 3, then we can make at least two cuts.

// Merging intervals:
  // Sort intervals by start.
  // Keep track of the maximum end.
  // When we come across intervals[i][0] >= maxEnd, we can make a cut because there is no overlap and it's guaranteed all upcoming intervals' start will be larger than or equal to maxEnd since we sorted by start.

// m = length of rectangles
// Time Complexity: O(m log(m)) 360ms
// Space Complexity: O(m) 109.2MB
function checkValidCuts(n, rectangles) {
  const horiIntervals = [], vertIntervals = [];
  for (let [startX, startY, endX, endY] of rectangles) {
    horiIntervals.push([startX, endX]);
    vertIntervals.push([startY, endY]);
  }
  return Math.max(countMergedIntervals(horiIntervals), countMergedIntervals(vertIntervals)) >= 3;
};

function countMergedIntervals(intervals) {
  intervals.sort((a, b) => a[0] - b[0]);
  let maxEnd = intervals[0][1], mergedCount = 1;
  for (let i = 1; i < intervals.length; i++) {
    if (intervals[i][0] >= maxEnd) {
      mergedCount++;
      maxEnd = intervals[i][1];
    } else {
      maxEnd = Math.max(maxEnd, intervals[i][1]);
    }
  }
  return mergedCount;
}

// Three test cases
console.log(checkValidCuts(5, [[1,0,5,2],[0,2,2,4],[3,2,5,3],[0,4,4,5]])) // true
console.log(checkValidCuts(4, [[0,0,1,1],[2,0,3,4],[0,2,2,3],[3,0,4,3]])) // true
console.log(checkValidCuts(4, [[0,2,2,4],[1,0,3,2],[2,2,3,4],[3,0,4,2],[3,2,4,4]])) // false