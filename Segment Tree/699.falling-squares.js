// 699. Falling Squares
// There are several squares being dropped onto the X-axis of a 2D plane.
// You are given a 2D integer array positions where positions[i] = [lefti, sideLengthi] represents the ith square with a side length of sideLengthi that is dropped with its left edge aligned with X-coordinate lefti.
// Each square is dropped one at a time from a height above any landed squares. It then falls downward (negative Y direction) until it either lands on the top side of another square or on the X-axis. A square brushing the left/right side of another square does not count as landing on it. Once it lands, it freezes in place and cannot be moved.
// After each square is dropped, you must record the height of the current tallest stack of squares.
// Return an integer array ans where ans[i] represents the height described above after dropping the ith square.


// Solution 1: Brute Force

// For each square, 
  // Get the maximum height out of previous squares that have overlap with the current square.
  // The height for the current square = maxPrevHeight + size of current square.
  // Record the maximum height of each square in an array maxHeight, where maxHeight[i] = the maximum height for square i.

// Time Complexity: O(n^2) 159ms
// Space Complexity: O(n) 44.5MB
var fallingSquares = function(positions) {
  let n = positions.length, maxHeight = Array(n);
  let res = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let start = positions[i][0], end = start + positions[i][1] - 1;
    let maxPrevHeight = 0;
    for (let j = 0; j < i; j++) {
      let prevStart = positions[j][0], prevEnd = prevStart + positions[j][1] - 1;
      if (prevEnd >= start && prevStart <= end) {
        maxPrevHeight = Math.max(maxPrevHeight, maxHeight[j]);
      }
    }
    let currMaxHeight = maxPrevHeight + positions[i][1];
    maxHeight[i] = currMaxHeight;
    res[i] = i === 0 ? currMaxHeight : Math.max(currMaxHeight, res[i - 1]);
  }
  return res;
};


// Solution 2: Brute Force w/ Coordinate Compression

// Because the positions can be as large as 10^8, perform coordinate compression for each coordinate.
// Record the maximum height at each position in an array maxHeight, 
// where maxHeight[pos] = the maximum height so far for a square that covers position pos.

// For each square, loop through all the positions within the current square's range and find the maximum height in the range.

// n = length of positions, m = number of unique positions
// Time Complexity: O(n + m^2) 219ms
// Space Complexity: O(n + m) 50.1MB
var fallingSquares = function(positions) {
  let [compressedPositions, maxPosition] = compressCoordinates(positions.map(([start, size]) => [start, start + size - 1, size]));
  let n = compressedPositions.length, maxHeight = Array(maxPosition).fill(0);
  let res = Array(n).fill(0);
  for (let i = 0; i < n; i++) {
    let [start, end, size] = compressedPositions[i];
    let maxPrevHeight = 0;
    for (let pos = start; pos <= end; pos++) {
      maxPrevHeight = Math.max(maxPrevHeight, maxHeight[pos]);
    }
    let currMaxHeight = maxPrevHeight + size;
    for (let pos = start; pos <= end; pos++) {
      maxHeight[pos] = currMaxHeight;
    }
    res[i] = i === 0 ? currMaxHeight : Math.max(currMaxHeight, res[i - 1]);
  }
  return res;
};

function compressCoordinates(coordinates) {
  let positionsSet = new Set();
  for (let [start, end] of coordinates) {
    positionsSet.add(start);
    positionsSet.add(end);
  }
  
  let sortedPositions = [...positionsSet].sort((a, b) => a - b);
  let compressedMap = {};
  for (let i = 0; i < sortedPositions.length; i++) {
    compressedMap[sortedPositions[i]] = i;
  }
  
  return [coordinates.map((coordinate) => {
    let [start, end, ...other] = coordinate;
    let compressedStart = compressedMap[start];
    let compressedEnd = compressedMap[end];
    return [compressedStart, compressedEnd, ...other];
  }), sortedPositions.length];
}


// Solution 3: Segment Tree with Lazy Propagation

// Perform coordinate compression for each coordinate.
// Use a segment tree to keep track of the maximum height within a range.
// Use lazy propagation to update a range in O(log(n)).

// Note: This solution runs slower than the brute force solution due to the small test cases. 
// When test cases are much larger, this solution will become much faster than the brute force solution.

// n = length of positions, m = number of unique positions
// Time Complexity: O(n + m log(m)) 229ms
// Space Complexity: O(n + 4m) 52.1MB
var fallingSquares = function(positions) {
  let [compressedPositions, maxPosition] = compressCoordinates(positions.map(([start, size]) => [start, start + size - 1, size]));
  let n = compressedPositions.length, res = Array(n).fill(0);
  let segmentTree = new SegmentTree(maxPosition);
  for (let i = 0; i < n; i++) {
    let [start, end, size] = compressedPositions[i];
    let maxPrevHeight = segmentTree.maxRange(1, 0, maxPosition - 1, start, end);
    let currMaxHeight = maxPrevHeight + size;
    segmentTree.updateRange(1, 0, maxPosition - 1, currMaxHeight, start, end);
    res[i] = i === 0 ? currMaxHeight : Math.max(currMaxHeight, res[i - 1]);
  }
  return res;
};

class SegmentTree {
  constructor(size) {
    this.size = size;
    this.tree = Array(size * 4).fill(0);
    this.lazy = Array(size * 4).fill(0);
  }
  updateRange(node, start, end, val, left, right) { // start and end is range tree[node] represents, left and right is update range
    if (this.lazy[node] !== 0) {
      this.tree[node] = Math.max(this.tree[node], this.lazy[node]);
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = Math.max(this.lazy[node * 2], this.lazy[node]);
        this.lazy[node * 2 + 1] = Math.max(this.lazy[node * 2 + 1], this.lazy[node]);
      }
      this.lazy[node] = 0; // reset since we updated the tree
    }
    if (start > end || start > right || end < left) return; // out of range
    if (start >= left && end <= right) { // completely within range
      this.tree[node] = Math.max(this.tree[node], val);
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = Math.max(this.lazy[node * 2], val);
        this.lazy[node * 2 + 1] = Math.max(this.lazy[node * 2 + 1], val);
      }
      return;
    }
    let mid = Math.floor((start + end) / 2);
    this.updateRange(node * 2, start, mid, val, left, right);
    this.updateRange(node * 2 + 1, mid + 1, end, val, left, right);
    this.tree[node] = Math.max(this.tree[node * 2], this.tree[node * 2 + 1]);
  }
  maxRange(node, start, end, left, right) { // start and end is range tree[node] represents, left and right is query range
    if (start > end || start > right || end < left) return 0; // out of range
    if (this.lazy[node] !== 0) { // needs to be updated
      this.tree[node] = Math.max(this.tree[node], this.lazy[node]);
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = Math.max(this.lazy[node * 2], this.lazy[node]);
        this.lazy[node * 2 + 1] = Math.max(this.lazy[node * 2 + 1], this.lazy[node]);
      }
      this.lazy[node] = 0; // reset since we updated the tree
    }
    if (start >= left && end <= right) return this.tree[node]; // completely within range
    let mid = Math.floor((start + end) / 2);
    let leftMax = this.maxRange(node * 2, start, mid, left, right);
    let rightMax = this.maxRange(node * 2 + 1, mid + 1, end, left, right);
    return Math.max(leftMax, rightMax);
  }
}

// Two test cases
console.log(fallingSquares([[1,2],[2,3],[6,1]])) // [2,5,5]
console.log(fallingSquares([[100,100],[200,100]])) // [100,100]