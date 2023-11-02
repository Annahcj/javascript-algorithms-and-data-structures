// 2158. Amount of New Area Painted Each Day
// There is a long and thin painting that can be represented by a number line. You are given a 0-indexed 2D integer array paint of length n, where paint[i] = [starti, endi]. This means that on the ith day you need to paint the area between starti and endi.
// Painting the same area multiple times will create an uneven painting so you only want to paint each area of the painting at most once.
// Return an integer array worklog of length n, where worklog[i] is the amount of new area that you painted on the ith day.


// Solution: Segment Tree w/ Lazy Propagation

// Use a segment tree to keep track of ranges that we have painted. This can be represented by 1's.
// We can query a range to check how much of it has been painted already.
// To update a range, we need lazy propagation to maintain O(log(n)) for update and query operations.

// Segment tree arguments:
// (current node in tree (the root starts from 1), start index, end index, left query index, right query index).

// n = paint.length, m = max number in paint
// Time Complexity: O(n log(n)) 662ms
// Space Complexity: O(4 * m) 80.1MB
var amountPainted = function(paint) {
  let res = Array(paint.length), max = 0;
  for (let [_, end] of paint) max = Math.max(max, end);
  let n = max + 1, segmentTree = new SegmentTree(n);
  for (let i = 0; i < paint.length; i++) {
    let [left, right] = paint[i];
    res[i] = right - left - segmentTree.sumRange(1, 0, n - 1, left, right - 1);
    segmentTree.updateRange(1, 0, n - 1, 1, left, right - 1);
  }
  return res;
};

class SegmentTree {
  constructor(size) {
    this.size = size;
    this.tree = Array(size * 4).fill(0);
    this.lazy = Array(size * 4).fill(0);
  }
  updateRange(node, start, end, val, left, right) { // start and end is range that tree[node] represents, left and right is update range.
    if (this.lazy[node] !== 0) {
      this.tree[node] = (end - start + 1) * this.lazy[node];
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = this.lazy[node];
        this.lazy[node * 2 + 1] = this.lazy[node];
      }
      this.lazy[node] = 0;
    }
    if (start > end || start > right || end < left) return; // out of range
    if (start >= left && end <= right) { // completely within range
      this.tree[node] = (end - start + 1) * val;
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = val;
        this.lazy[node * 2 + 1] = val;
      }
      return;
    }
    let mid = Math.floor((start + end) / 2);
    this.updateRange(node * 2, start, mid, val, left, right);
    this.updateRange(node * 2 + 1, mid + 1, end, val, left, right);
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }
  sumRange(node, start, end, left, right) { // start and end is range tree[node] represents, left and right is query range.
    if (start > end || start > right || end < left) return 0; // out of range
    if (this.lazy[node] !== 0) { // needs to be updated
      this.tree[node] = (end - start + 1) * this.lazy[node];
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = this.lazy[node];
        this.lazy[node * 2 + 1] = this.lazy[node];
      }
      this.lazy[node] = 0;
    }
    if (start >= left && end <= right) return this.tree[node]; // completely within range
    let mid = Math.floor((start + end) / 2);
    let leftSum = this.sumRange(node * 2, start, mid, left, right);
    let rightSum = this.sumRange(node * 2 + 1, mid + 1, end, left, right);
    return leftSum + rightSum;
  }
}

// Two test cases
console.log(amountPainted([[1,4],[4,7],[5,8]])) // [3,3,1]
console.log(amountPainted([[1,4],[5,8],[4,7]])) // [3,3,1]