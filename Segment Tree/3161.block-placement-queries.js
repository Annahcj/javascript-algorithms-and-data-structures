// 3161. Block Placement Queries
// There exists an infinite number line, with its origin at 0 and extending towards the positive x-axis.
// You are given a 2D array queries, which contains two types of queries:
  // 1. For a query of type 1, queries[i] = [1, x]. Build an obstacle at distance x from the origin. It is guaranteed that there is no obstacle at distance x when the query is asked.
  // 2. For a query of type 2, queries[i] = [2, x, sz]. Check if it is possible to place a block of size sz anywhere in the range [0, x] on the line, such that the block entirely lies in the range [0, x]. A block cannot be placed if it intersects with any obstacle, but it may touch it. Note that you do not actually place the block. Queries are separate.
// Return a boolean array results, where results[i] is true if you can place the block specified in the ith query of type 2, and false otherwise.


// Solution: Segment Tree

// Use a segment tree to find the maximum contiguous block of 0s.
// For every node in the segment tree, store the following:
  // 1. Leftmost index of an obstacle
  // 2. Rightmost index of an obstacle
  // 3. Maximum range of contiguous 0s.
// The segment tree must be constructed top-down to preserve the ordering of indices. i.e. smaller indices are in the left subtree, larger indices are in the right subtree.
// When merging the results of the left and right subtree, the max range is calculated by taking the maximum out of:
  // 1. The maximum range in the left subtree.
  // 2. The maximum range in the right subtree.
  // 3. Creating a block that extends both left and right segments: leftmost index of an obstacle on the right subtree - rightmost index of an obstacle on the left subtree.

// n = number of queries
// Time Complexity: O(n log(n)) 741ms
// Space Complexity: O(n) 128.4MB
function getResults(queries) {
  const n = queries.length;
  const segTree = new SegmentTree(Math.min(50000, n * 3) + 1);
  const results = [];
  for (let i = 0; i < n; i++) {
    const type = queries[i][0];
    if (type === 1) {
      segTree.update(queries[i][1]);
    } else {
      const [_, x, sz] = queries[i];
      results.push(segTree.rangeQuery(0, x).maxRange >= sz);
    }
  }
  return results;
};

class SegmentTree {
  constructor(n) {
    this.n = n;
    // leftmost = leftmost index of a 1
    // rightmost = rightmost index of a 1
    // max range = maximum contiguous 0s
    this.segTree = Array(n * 4).fill(0).map(() => ({rightmost: -1, leftmost: -1, maxRange: 0}));
    this.build();
  }
  build(node = 1, left = 0, right = this.n - 1) {
    if (left === right) {
      return;
    }
    const mid = Math.floor((left + right) / 2);
    this.build(node * 2, left, mid);
    this.build(node * 2 + 1, mid + 1, right);
    this.segTree[node].maxRange = right - left;
  }
  update(index, node = 1, left = 0, right = this.n - 1) {
    if (left === right) {
      this.segTree[node].rightmost = index;
      this.segTree[node].leftmost = index;
      this.segTree[node].maxRange = 0;
      return;
    }
    const mid = Math.floor((left + right) / 2);
    if (index <= mid) {
      this.update(index, node * 2, left, mid);
    } else {
      this.update(index, node * 2 + 1, mid + 1, right);
    }
    const leftmostIndex = this.segTree[node * 2 + 1].leftmost === -1 ? right : this.segTree[node * 2 + 1].leftmost;
    const rightmostIndex = this.segTree[node * 2].rightmost === -1 ? left : this.segTree[node * 2].rightmost;
    const combinedBlock = leftmostIndex - rightmostIndex;
    this.segTree[node].maxRange = Math.max(
      combinedBlock, 
      this.segTree[node * 2].maxRange, 
      this.segTree[node * 2 + 1].maxRange
    );
    this.segTree[node].leftmost = this.segTree[node * 2].leftmost === -1 ? this.segTree[node * 2 + 1].leftmost : this.segTree[node * 2].leftmost;
    this.segTree[node].rightmost = Math.max(this.segTree[node * 2 + 1].rightmost, this.segTree[node * 2].rightmost);
  }
  rangeQuery(ql, qr, node = 1, l = 0, r = this.n - 1) { // ql = query left, qr = query right, (l, r) = boundaries that the current node covers
    if (ql > qr) {
      return {leftmost: -1, rightmost: -1, maxRange: 0};
    }
    if (ql === l && qr === r) {
      return this.segTree[node];
    }
    const mid = Math.floor((l + r) / 2);
    const left = this.rangeQuery(ql, Math.min(mid, qr), node * 2, l, mid);
    const right = this.rangeQuery(Math.max(mid + 1, ql), qr, node * 2 + 1, mid + 1, r);
    const leftmostIndex = right.leftmost === -1 ? qr : Math.min(qr, right.leftmost);
    const rightmostIndex = left.rightmost === -1 ? ql : Math.max(ql, left.rightmost);
    const combinedBlock = leftmostIndex - rightmostIndex;
    const maxRange = Math.max(
      combinedBlock, 
      left.maxRange, 
      right.maxRange
    );
    return {
      maxRange, 
      leftmost: left.leftmost === -1 ? right.leftmost : left.leftmost, 
      rightmost: Math.max(right.rightmost, left.rightmost)
    };
  }
}

// Two test cases
console.log(getResults([[1,2],[2,3,3],[2,3,1],[2,2,2]])) // [false,true,true]
console.log(getResults([[1,7],[2,7,6],[1,2],[2,7,5],[2,7,6]])) // [true,true,false]