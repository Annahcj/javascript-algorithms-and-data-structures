// 1722. Minimize Hamming Distance After Swap Operations
// You are given two integer arrays, source and target, both of length n. You are also given an array allowedSwaps where each allowedSwaps[i] = [ai, bi] indicates that you are allowed to swap the elements at index ai and index bi (0-indexed) of array source. Note that you can swap elements at a specific pair of indices multiple times and in any order.
// The Hamming distance of two arrays of the same length, source and target, is the number of positions where the elements are different. Formally, it is the number of indices i for 0 <= i <= n-1 where source[i] != target[i] (0-indexed).
// Return the minimum Hamming distance of source and target after performing any amount of swap operations on array source.


// Solution: Union Find & Hashmap

// Connect indexes by allowedSwaps using union find.
// Connected indexes can be arranged into any possible order.
// For each connected group, use a hashmap for the numbers in target to find the number of non-matching numbers.

// n = length of source and target, m = length of allowedSwaps
// Time Complexity: O(n + m) 604ms
// Space Complexity: O(n) 114.6MB
var minimumHammingDistance = function(source, target, allowedSwaps) {
  let n = source.length, uf = new UnionFind(n); 
  for (let [x, y] of allowedSwaps) {
    uf.union(x, y);
  }
  
  let groups = new Map();
  for (let i = 0; i < n; i++) {
    let parent = uf.find(i);
    if (!groups.has(parent)) groups.set(parent, []);
    groups.get(parent).push(i);
  }

  let count = 0;
  for (let [_parent, indices] of groups) {
    let src = [], targ = [];
    for (let index of indices) {
      src.push(source[index]);
      targ.push(target[index]);
    }
    count += getDiffCount(src, targ);
  }
  return count;
};

function getDiffCount(src, targ) {
  let targMap = new Map();
  for (let num of targ) {
    targMap.set(num, (targMap.get(num) || 0) + 1);
  }
  for (let num of src) {
    if (targMap.has(num) && targMap.get(num) > 0) {
      targMap.set(num, targMap.get(num) - 1);
    } 
  }
  let diffCount = 0;
  for (let [_num, count] of targMap) {
    diffCount += count;
  }
  return diffCount;
}

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
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
    let rootX = this.find(x), rootY = this.find(y);
    if (rootX === rootY) return false;
    if (this.rank[rootX] < this.rank[rootY]) this.root[rootX] = rootY;
    else if (this.rank[rootX] > this.rank[rootY]) this.root[rootY] = rootX;
    else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// Three test cases
console.log(minimumHammingDistance([1,2,3,4], [2,1,4,5], [[0,1],[2,3]])) // 1
console.log(minimumHammingDistance([1,2,3,4], [1,3,2,4], [])) // 2
console.log(minimumHammingDistance([5,1,2,4,3], [1,5,4,2,3], [[0,4],[4,2],[1,3],[1,4]])) // 0