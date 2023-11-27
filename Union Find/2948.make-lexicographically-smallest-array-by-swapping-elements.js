// 2948. Make Lexicographically Smallest Array by Swapping Elements
// You are given a 0-indexed array of positive integers nums and a positive integer limit.
// In one operation, you can choose any two indices i and j and swap nums[i] and nums[j] if |nums[i] - nums[j]| <= limit.
// Return the lexicographically smallest array that can be obtained by performing the operation any number of times.
// An array a is lexicographically smaller than an array b if in the first position where a and b differ, array a has an element that is less than the corresponding element in b. For example, the array [2,10,3] is lexicographically smaller than the array [10,2,3] because they differ at index 0 and 2 < 10.


// Solution 1: Group Connected Indices

// Think of indices (i, j) where Math.abs(nums[i] - nums[j]) <= limit, as an edge in a graph.
// A group of indices that are connected to each other by these edges can be sorted in any way.

// 1. Group indices into connected groups.
  // a. Sort nums in asc order, split nums into groups where each adjacent pair has a difference <= limit. 
// 2. For each group, sort both indices and values in asc order.
  // Assign the new value in sorted order to each index.

// n = length of nums
// Time Complexity: O(n log(n)) 447ms
// Space Complexity: O(n) 156.6MB
var lexicographicallySmallestArray = function(nums, limit) {
  let n = nums.length, sorted = nums.map((num, idx) => [num, idx]).sort((a, b) => a[0] - b[0]);
  let groups = [], indices = [];
  for (let i = 0; i <= n; i++) {
    if (i === 0 || i === n || sorted[i][0] - sorted[i - 1][0] > limit) {
      groups.push(indices);
      if (i < n) indices = [sorted[i][1]];
    } else {
      indices.push(sorted[i][1]);
    }
  }
  let res = Array(n);
  for (let indices of groups) {
    let values = [];
    for (let index of indices) {
      values.push(nums[index]);
    }
    values.sort((a, b) => a - b);
    indices.sort((a, b) => a - b);
    for (let i = 0; i < indices.length; i++) {
      res[indices[i]] = values[i];
    }
  }
  return res;
};


// Solution 2: Union Find

// Use union find to get the connected groups.

// 1. Sort the values of nums in asc order and use union find to connect adjacent pairs where the difference <= limit.
// 2. Group each index by the union find parent: {parent: [index, index, ...], parent: [index, ...], ...}
// 3. For each group of indices, sort the values in asc order and assign the sorted values to the group's indices.

// Time Complexity: O(n log(n)) 576ms
// Space Complexity: O(n) 183.7MB
var lexicographicallySmallestArray = function(nums, limit) {
  let n = nums.length, uf = new UnionFind(n);
  let sorted = nums.map((num, idx) => [num, idx]).sort((a, b) => a[0] - b[0]);
  for (let i = 1; i < n; i++) {
    if (sorted[i][0] - sorted[i - 1][0] <= limit) {
      uf.union(sorted[i][1], sorted[i - 1][1]);
    }
  }
  let groups = {};
  for (let i = 0; i < n; i++) {
    let parent = uf.find(i);
    if (!groups[parent]) groups[parent] = [];
    groups[parent].push(i);
  }
  let res = Array(n);
  for (let parent in groups) {
    let indices = groups[parent];
    let sortedValues = indices.map((index) => nums[index]).sort((a, b) => a - b);
    for (let i = 0; i < indices.length; i++) {
      res[indices[i]] = sortedValues[i];
    }
  }
  return res;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    this.size = size;
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) return x;
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    this.size--;
    return true;
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Three test cases
console.log(lexicographicallySmallestArray([1,5,3,9,8], 2)) // [1,3,5,8,9]
console.log(lexicographicallySmallestArray([1,7,6,18,2,1], 3)) // [1,6,7,18,1,2]
console.log(lexicographicallySmallestArray([1,7,28,19,10], 3)) // [1,7,28,19,10]