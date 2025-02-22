// 391. Perfect Rectangle
// Given an array rectangles where rectangles[i] = [x[i], y[i], a[i], b[i]] represents an axis-aligned rectangle. The bottom-left point of the rectangle is (x[i], y[i]) and the top-right point of it is (a[i], b[i]).
// Return true if all the rectangles together form an exact cover of a rectangular region.


// Solution: Line Sweep & Segment Tree

// Collect the start and end events for every rectangle, then sort by y:
  // Start event: [left x, right x, y, is start]
  // End event: [left x, right x, y + height, is end]

// Line sweep over the events in sorted order.
// Use a segment tree to store the intervals for the width of each rectangle.
// We need to handle two cases:
  // 1. No overlapping rectangles:
    // Before adding a width to the segment tree, check if any of the points are already covered - if so, return false as they overlap.
    // Hence, the segment tree will never contain overlapping intervals.
  // 2. Whole width of rectangle is covered:
    // The expected width of the rectangle is the maxmimum x coordinate - minimum x coordinate across all rectangles.
    // At any horizontal point, the whole range should be covered, otherwise it is not a perfect rectangular region.

// n = number of rectangles, m = max(x) - min(x)
// Time Complexity: O(n log(m)) 130ms
// Space Complexity: O(m) 86.86MB
function isRectangleCover(rectangles) {
  const events = [];
  let minX = Infinity, maxX = -Infinity;
  for (let [x, y, a, b] of rectangles) {
    events.push([x, a, y, true]);
    events.push([x, a, b, false]);
    minX = Math.min(minX, x);
    maxX = Math.max(maxX, a);
  }
  // sort by y, then isStart (need to process removal events first)
  events.sort((a, b) => a[2] === b[2] ? Number(a[3]) - Number(b[3]) : a[2] - b[2]);
  const offset = minX < 0 ? -minX : 0;
  const segmentTree = new SegmentTree(maxX + offset);
  let prevY = events[0][2];
  for (let [startX, endX, y, isStart] of events) {
    // need to process all events in the same y before checking the width is fully covered
    if (y !== prevY) {
      // whole rectangle width not covered
      if (segmentTree.sumRange(minX + offset, maxX + offset - 1) !== maxX - minX) {
        return false;
      }
      prevY = y;
    }

    if (isStart) {
      if (segmentTree.sumRange(startX + offset, endX + offset - 1) > 0) {
        // overlapping
        return false;
      } else {
        segmentTree.updateRange(1, startX + offset, endX + offset - 1);
      }
    } else {
      segmentTree.updateRange(-1, startX + offset, endX + offset - 1);
    }
  }
  return true;
};

class SegmentTree {
  constructor(size) {
    this.size = size;
    this.tree = Array(size * 4).fill(0);
    this.lazy = Array(size * 4).fill(0);
  }
  updateRange(val, left, right, node = 1, start = 0, end = this.size - 1) { // start and end is range tree[node] represents, left and right is update range
    if (this.lazy[node] !== 0) {
      this.tree[node] += (end - start + 1) * this.lazy[node];
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] += this.lazy[node];
        this.lazy[node * 2 + 1] += this.lazy[node];
      }
      this.lazy[node] = 0; // reset since we updated the tree
    }
    if (start > end || start > right || end < left) return; // out of range
    if (start >= left && end <= right) { // completely within range
      this.tree[node] += (end - start + 1) * val;
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] += val;
        this.lazy[node * 2 + 1] += val;
      }
      return;
    }
    let mid = Math.floor((start + end) / 2);
    this.updateRange(val, left, right, node * 2, start, mid);
    this.updateRange(val, left, right, node * 2 + 1, mid + 1, end);
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }
  sumRange(left, right, node = 1, start = 0, end = this.size - 1) { // start and end is range tree[node] represents, left and right is query range
    if (start > end || start > right || end < left) return 0; // out of range
    if (this.lazy[node] !== 0) { // needs to be updated
      this.tree[node] += (end - start + 1) * this.lazy[node];
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] += this.lazy[node];
        this.lazy[node * 2 + 1] += this.lazy[node];
      }
      this.lazy[node] = 0; // reset since we updated the tree
    }
    if (start >= left && end <= right) return this.tree[node]; // completely within range
    let mid = Math.floor((start + end) / 2);
    let leftSum = this.sumRange(left, right, node * 2, start, mid);
    let rightSum = this.sumRange(left, right, node * 2 + 1, mid + 1, end);
    return leftSum + rightSum;
  }
}

// Three test cases
console.log(isRectangleCover([[1,1,3,3],[3,1,4,2],[3,2,4,4],[1,3,2,4],[2,3,3,4]])) // true
console.log(isRectangleCover([[1,1,2,3],[1,3,2,4],[3,1,4,2],[3,2,4,4]])) // false
console.log(isRectangleCover([[1,1,3,3],[3,1,4,2],[1,3,2,4],[2,2,4,4]])) // false