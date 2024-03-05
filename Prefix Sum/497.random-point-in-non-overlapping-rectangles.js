// 497. Random Point in Non-overlapping Rectangles
// You are given an array of non-overlapping axis-aligned rectangles rects where rects[i] = [a[i], b[i], x[i], y[i]] indicates that (a[i], b[i]) is the bottom-left corner point of the ith rectangle and (x[i], y[i]) is the top-right corner point of the ith rectangle. Design an algorithm to pick a random integer point inside the space covered by one of the given rectangles. A point on the perimeter of a rectangle is included in the space covered by the rectangle.
// Any integer point inside the space covered by one of the given rectangles should be equally likely to be returned.
// Note that an integer point is a point that has integer coordinates.
// Implement the Solution class:
  // Solution(int[][] rects) Initializes the object with the given rectangles rects.
  // int[] pick() Returns a random integer point [u, v] inside the space covered by one of the given rectangles.
 

// Solution: Prefix Sum

// Choose a random rectangle, then choose a random point within that rectangle.
// However, rectangles with more points should have greater chance of being chosen.

// Prefix sum over the points in each rectangle, then pick a random point index in the range of (1, total sum of points).

// pick:
  // 1. Pick a random point index from (0, this.pointsSum) 
  // 2. Binary search for the leftmost index in this.rects where this.rects[index].pointsSum >= random point index
  // 3. Pick a random point within that rectangle

// Time Complexity: 160ms
  // constructor: O(n)
  // pick: O(log(n))
// Space Complexity: O(n) 65.4MB
var Solution = function(rects) {
  this.rects = [];
  for (let [a, b, x, y] of rects) {
    let points = (x - a + 1) * (y - b + 1);
    let prefixSum = this.rects.length ? this.rects[this.rects.length - 1].pointsSum : 0;
    this.rects.push({pointsSum: prefixSum + points, coords: [a, b, x, y]});
  }
  this.pointsSum = this.rects[this.rects.length - 1].pointsSum;
};

function lowerBound(rects, pointIndex) {
  let low = 0, high = rects.length;
  while (low < high) {
    let mid = Math.floor((low + high) / 2);
    if (rects[mid].pointsSum >= pointIndex) high = mid;
    else low = mid + 1;
  }
  return low;
}

function getRandom(min, max) { // random number between min and max, both inclusive.
  return min + Math.floor(Math.random() * (max - min + 1));
}

Solution.prototype.pick = function() {
  let randomPointIndex = getRandom(1, this.pointsSum);
  let rectIndex = lowerBound(this.rects, randomPointIndex);
  let [a, b, x, y] = this.rects[rectIndex].coords;
  return [getRandom(a, x), getRandom(b, y)];
};

let solution = new Solution([[-2, -2, 1, 1], [2, 2, 4, 6]]);
solution.pick();
solution.pick();
solution.pick();
solution.pick();
solution.pick();