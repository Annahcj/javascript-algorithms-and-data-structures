// 2607. Make K-Subarray Sums Equal
// You are given a 0-indexed integer array arr and an integer k. The array arr is circular. In other words, the first element of the array is the next element of the last element, and the last element of the array is the previous element of the first element.
// You can do the following operation any number of times:
  // Pick any element from arr and increase or decrease it by 1.
// Return the minimum number of operations such that the sum of each subarray of length k is equal.
// A subarray is a contiguous part of the array.


// Solution: Union Find

// Each arr[i] must be the same with arr[i + k].
// We also need to take into account indices that wrap around the array arr[(i + k) % n].
// Use union find to connect each arr[i] with arr[(i + k) % n].
// Then, get each connected group:
  // Sort each group in asc order
  // Find the median of the group and count the difference for turning each number in the group to be the median

// Time Complexity: O(n log(n)) 384ms
// Space Complexity: O(n) 74.4MB
var makeSubKSumEqual = function(arr, k) {
  let n = arr.length, uf = new UnionFind(n);
  for (let i = 0; i < n; i++) {
    uf.union(i, (i + k) % n);
  }
  let groups = {};
  for (let i = 0; i < n; i++) {
    let parent = uf.find(i);
    if (!groups[parent]) groups[parent] = [];
    groups[parent].push(arr[i]);
  }
  
  let ans = 0;
  for (let parent in groups) {
    let group = groups[parent];
    group.sort((a, b) => a - b);
    let median = group[Math.floor(group.length / 2)];
    let diff = 0;
    for (let num of group) {
      diff += Math.abs(num - median);
    }
    ans += diff;
  }
  return ans;
};

class UnionFind {
  constructor(n) {
    this.root = Array(n);
    this.rank = Array(n);
    for (let i = 0; i < n; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
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
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// Two test cases
console.log(makeSubKSumEqual([1,4,1,3], 2)) // 1
console.log(makeSubKSumEqual([2,5,5,7], 3)) // 5