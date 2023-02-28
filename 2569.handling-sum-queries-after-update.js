// 2569. Handling Sum Queries After Update
// You are given two 0-indexed arrays nums1 and nums2 and a 2D array queries of queries. There are three types of queries:
  // For a query of type 1, queries[i] = [1, l, r]. Flip the values from 0 to 1 and from 1 to 0 in nums1 from index l to index r. Both l and r are 0-indexed.
  // For a query of type 2, queries[i] = [2, p, 0]. For every index 0 <= i < n, set nums2[i] = nums2[i] + nums1[i] * p.
  // For a query of type 3, queries[i] = [3, 0, 0]. Find the sum of the elements in nums2.
// Return an array containing all the answers to the third type queries.


// Solution: Segment Tree w/ Lazy Propagation

// Segment tree with lazy propagation.
// For nums2, we only need to know the total sum. The individual counts do not matter.

// For each query of type1, flip the range [l, r] of nums1.
// For each query of type 2, 
  // 1. Count the total number of nums1[i] = 1 in the segment tree.
  // 2. Add count * p to the total sum of nums2.
// For each query of type 3, use the total sum of nums2.

// n = length of nums1, m = number of queries
// Time Complexity: O(n log(n) + m log(n)) 213ms
// Space Complexity: O(n) 82.7MB
var handleQuery = function(nums1, nums2, queries) {
  let n = nums1.length, segmentTree = new SegmentTree(n);
  segmentTree.build(1, 0, n - 1, nums1);
  let nums2Sum = nums2.reduce((sum, num) => sum + num), ans = [];
  for (let i = 0; i < queries.length; i++) {
    if (queries[i][0] === 1) {
      segmentTree.updateRange(1, 0, n - 1, queries[i][1], queries[i][2]);
    } else if (queries[i][0] === 2) {
      nums2Sum += segmentTree.sumRange(1, 0, n - 1, 0, n - 1) * queries[i][1];
    } else {
      ans.push(nums2Sum);
    }
  }
  return ans;
};

class SegmentTree {
  constructor(size) {
    this.size = size;
    this.tree = Array(size * 4).fill(0);
    this.lazy = Array(size * 4).fill(0);
  }
  build(node, start, end, arr) { // start and end is range tree[node] represents
    if (start === end) return this.tree[node] = arr[start];
    let mid = Math.floor((start + end) / 2);
    return this.tree[node] = this.build(node * 2, start, mid, arr) + this.build(node * 2 + 1, mid + 1, end, arr);
  }
  updateRange(node, start, end, left, right) { // start and end is range tree[node] represents, left and right is update range
    if (this.lazy[node] !== 0) {
      this.tree[node] = (end - start + 1) - this.tree[node]; // invert the sum
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = 1 ^ this.lazy[node * 2];
        this.lazy[node * 2 + 1] = 1 ^ this.lazy[node * 2 + 1];
      }
      this.lazy[node] = 0; // reset since we updated the tree
    }
    if (start > end || start > right || end < left) return; // out of range
    if (start >= left && end <= right) { // completely within range
      this.tree[node] = (end - start + 1) - this.tree[node]; // invert the sum
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = 1 ^ this.lazy[node * 2];
        this.lazy[node * 2 + 1] = 1 ^ this.lazy[node * 2 + 1];
      }
      return;
    }
    let mid = Math.floor((start + end) / 2);
    this.updateRange(node * 2, start, mid, left, right);
    this.updateRange(node * 2 + 1, mid + 1, end, left, right);
    this.tree[node] = this.tree[node * 2] + this.tree[node * 2 + 1];
  }
  sumRange(node, start, end, left, right) { // start and end is range tree[node] represents, left and right is query range
    if (start > end || start > right || end < left) return 0; // out of range
    if (this.lazy[node] !== 0) {
      this.tree[node] = (end - start + 1) - this.tree[node]; // invert the sum
      if (start < end) { // not a leaf node, propagate children
        this.lazy[node * 2] = 1 ^ this.lazy[node * 2];
        this.lazy[node * 2 + 1] = 1 ^ this.lazy[node * 2 + 1];
      }
      this.lazy[node] = 0; // reset since we updated the tree
    }
    if (start >= left && end <= right) return this.tree[node]; // completely within range
    let mid = Math.floor((start + end) / 2);
    let leftSum = this.sumRange(node * 2, start, mid, left, right);
    let rightSum = this.sumRange(node * 2 + 1, mid + 1, end, left, right);
    return leftSum + rightSum;
  }
}

// Two test cases
console.log(handleQuery([1,0,1], [0,0,0], [[1,1,1],[2,1,0],[3,0,0]])) // [3]
console.log(handleQuery([1], [5], [[2,0,0],[3,0,0]])) // [5]