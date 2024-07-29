// 1395. Count Number of Teams
// There are n soldiers standing in a line. Each soldier is assigned a unique rating value.
// You have to form a team of 3 soldiers amongst them under the following rules:
  // Choose 3 soldiers with index (i, j, k) with rating (rating[i], rating[j], rating[k]).
  // A team is valid if: (rating[i] < rating[j] < rating[k]) or (rating[i] > rating[j] > rating[k]) where (0 <= i < j < k < n).
// Return the number of teams you can form given the conditions. (soldiers can be part of multiple teams).


// Solution 1: Count in Left & Right

// Calculate combinations with j as middle element, find:
  // smaller on the left, bigger on the right
  // bigger on the left, smaller on the right

// The number of teams the middle soldier can be in is: 
  // 1. Increasing: smaller left * bigger right
  // 2. Decreasing: bigger left * smaller right

// Time Complexity: O(n^2) 100ms
// Space Complexity: O(1) 39.5MB
var numTeams = function(rating) {
  let n = rating.length, res = 0;
  for (let j = 1; j < n - 1; j++) {
    let smallerLeft = 0, biggerRight = 0;
    let biggerLeft = 0, smallerRight = 0;
    for (let i = 0; i < n; i++) {
      if (rating[i] < rating[j]) {
        if (i < j) smallerLeft++;
        else smallerRight++;
      } else if (rating[i] > rating[j]) {
        if (i < j) biggerLeft++;
        else biggerRight++;
      }
    }
    res += smallerLeft * biggerRight + biggerLeft * smallerRight;
  }
  return res;
};


// Solution 2: Segment Tree

// Anchor at the middle index j.
// The number of teams = 
  // smallerLeft[j] * greaterRight[j]
  // greaterLeft[j] * smallerRight[j]

// For each index j, calculate the smaller and greater ratings on the left and right of j.
// We can find the number of greater or smaller elements using a segment tree.

// n = length of rating, m = max(rating[i])
// Time Complexity: O(m + n log(m)) 76ms
// Space Complexity: O(m) 57.8MB
var numTeams = function(rating) {
  let n = rating.length, max = Math.max(...rating);
  let smallerRight = Array(n).fill(0);
  let greaterRight = Array(n).fill(0);
  let segTree = new SegmentTree(max + 1);
  for (let j = n - 1; j >= 0; j--) {
    smallerRight[j] = segTree.sumRange(0, rating[j] - 1);
    greaterRight[j] = segTree.sumRange(rating[j] + 1, max);
    segTree.update(rating[j], 1);
  }
  segTree = new SegmentTree(max + 1);
  let teams = 0;
  for (let j = 0; j < n; j++) {
    let smallerLeft = segTree.sumRange(0, rating[j] - 1);
    let greaterLeft = segTree.sumRange(rating[j] + 1, max);
    teams += smallerLeft * greaterRight[j] + greaterLeft * smallerRight[j];
    segTree.update(rating[j], 1);
  }
  return teams;
};

class SegmentTree {
  constructor(n) {
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = val;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = this.segTree[idx * 2] + this.segTree[idx * 2 + 1];
      idx = Math.floor(idx / 2);
    }
  }
  sumRange(left, right) {
    let n = this.size, sum = 0;
    let left_idx = left + n, right_idx = right + n;
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) sum += this.segTree[left_idx++];
      if (right_idx % 2 === 0) sum += this.segTree[right_idx--];
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return sum;
  }
}


// Solution 3: Segment Tree w/ Coordinate Compression

// For each index j, calculate the smaller and greater ratings on the left and right of j.
// We can find the number of greater or smaller elements using a segment tree.
// Since the maximum rating can be as much as 10^5, we can use coordinate compression to keep the size of the tree down to n.

// n = length of rating, m = max(rating[i])
// Time Complexity: O(n log(n)) 81ms
// Space Complexity: O(n) 54.4MB
var numTeams = function(rating) {
  let n = rating.length;
  // coordinate compression
  let sorted = [...rating].sort((a, b) => a - b);
  let compressed = {};
  for (let i = 0; i < n; i++) {
    compressed[sorted[i]] = i;
  }
  let smallerRight = Array(n).fill(0);
  let greaterRight = Array(n).fill(0);
  let segTree = new SegmentTree(n);
  for (let j = n - 1; j >= 0; j--) {
    smallerRight[j] = segTree.sumRange(0, compressed[rating[j]] - 1);
    greaterRight[j] = segTree.sumRange(compressed[rating[j]] + 1, n - 1);
    segTree.update(compressed[rating[j]], 1);
  }
  segTree = new SegmentTree(n);
  let teams = 0;
  for (let j = 0; j < n; j++) {
    let smallerLeft = segTree.sumRange(0, compressed[rating[j]] - 1);
    let greaterLeft = segTree.sumRange(compressed[rating[j]] + 1, n - 1);
    teams += smallerLeft * greaterRight[j] + greaterLeft * smallerRight[j];
    segTree.update(compressed[rating[j]], 1);
  }
  return teams;
};

// Three test cases
console.log(numTeams([2,5,3,4,1])) // 3
console.log(numTeams([2,1,3])) // 0
console.log(numTeams([1,2,3,4])) // 4