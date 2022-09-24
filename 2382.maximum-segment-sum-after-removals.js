// 2382. Maximum Segment Sum After Removals
// You are given two 0-indexed integer arrays nums and removeQueries, both of length n. For the ith query, the element in nums at the index removeQueries[i] is removed, splitting nums into different segments.
// A segment is a contiguous sequence of positive integers in nums. A segment sum is the sum of every element in a segment.
// Return an integer array answer, of length n, where answer[i] is the maximum segment sum after applying the ith removal.
// Note: The same index will not be removed more than once.


// Solution: Union Find

// Instead of removing numbers, add numbers in by processing the queries in reverse order.
// We start from all 0's and slowly fill up nums.
// Adjacent numbers are part of the same group.
// As we add in a number, use union find to connect adjacent groups and keep track of the sum of each adjacently connected group.
// Keep track of the largest sum of a group at each query.

// Note: This version of union find is using path compression and union by size, which speeds up the runtime of find/union to O(⍺(N)), basically O(1).

// Time Complexity: O(n) 258ms
// Space Complexity: O(n) 86MB
var maximumSegmentSum = function(nums, removeQueries) {
  let n = nums.length, res = Array(n);
  let uf = new UnionFind(n);
  for (let i = n - 1; i >= 0; i--) {
    let index = removeQueries[i];
    res[i] = uf.maxSum;
    uf.updateVal(index, nums[index]);
    if (index > 0 && uf.sum[index - 1] > 0) {
      uf.union(index, index - 1);
    }
    if (index < n - 1 && uf.sum[index + 1] > 0) {
      uf.union(index, index + 1);
    }
  }
  return res;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    this.sum = Array(size);
    this.maxSum = 0;
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
      this.sum[i] = 0;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
      this.sum[rootY] += this.sum[rootX];
      this.maxSum = Math.max(this.maxSum, this.sum[rootY]);
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
      this.sum[rootX] += this.sum[rootY];
      this.maxSum = Math.max(this.maxSum, this.sum[rootX]);
    } else {
      this.root[rootY] = rootX;
      this.sum[rootX] += this.sum[rootY];
      this.maxSum = Math.max(this.maxSum, this.sum[rootX]);
      this.rank[rootX]++;
    }
    return true;
  }
  updateVal(x, val) {
    this.sum[x] = val; 
    this.maxSum = Math.max(this.maxSum, val);
  }
}

// Two test cases to run function on
console.log(maximumSegmentSum([1,2,5,6,1], [0,3,2,4,1])) // [14,7,2,2,0]
console.log(maximumSegmentSum([3,2,11,1], [3,2,1,0])) // [16,5,3,0]