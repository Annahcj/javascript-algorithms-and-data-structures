// 2709. Greatest Common Divisor Traversal
// You are given a 0-indexed integer array nums, and you are allowed to traverse between its indices. You can traverse between index i and index j, i != j, if and only if gcd(nums[i], nums[j]) > 1, where gcd is the greatest common divisor.
// Your task is to determine if for every pair of indices i and j in nums, where i < j, there exists a sequence of traversals that can take us from i to j.
// Return true if it is possible to traverse between all such pairs of indices, or false otherwise.


// Solution: Union Find

// Key point: For all pairs of indices to be traversable, all nodes must be connected.
// Find the prime factors of each number (there are about log(n) prime factors per number).
// Keep a map of factors to any number with that prime factor so far: {prime factor: index, prime factor: index, ...}
  // Note: We don't need to connect with every single number with that prime factor since connecting to just one number means we will also connect with all other numbers that are already connected.
// Use union find to connect numbers that share the same prime factors.

// Time Complexity: O(n log(n)) 701ms
// Space Complexity: O(n log(n)) 72.8MB
var canTraverseAllPairs = function(nums) {
  let n = nums.length, map = new Map(), uf = new UnionFind(n);
  for (let i = 0; i < n; i++) {
    let primeFactors = getPrimeFactors(nums[i]);
    for (let factor of primeFactors) {
      if (map.has(factor)) uf.union(i, map.get(factor));
      else map.set(factor, i);
    }
  }
  return uf.size === 1;
};

function getPrimeFactors(n) {
  let res = new Set();
  for (let x = 2; (x * x) <= n; x++) {
    // loop while n is divisible by x
    while (n % x === 0) {
      res.add(x);
      n /= x;
    }
  }
  if (n > 1) res.add(n);
  return res;
}

class UnionFind {
  constructor(size) {
    this.size = size;
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
    if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
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
console.log(canTraverseAllPairs([2,3,6])) // true
console.log(canTraverseAllPairs([3,9,5])) // false
console.log(canTraverseAllPairs([4,3,12,8])) // true