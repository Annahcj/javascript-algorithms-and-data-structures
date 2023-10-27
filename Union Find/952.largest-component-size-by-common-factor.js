// 952. Largest Component Size by Common Factor
// You are given an integer array of unique positive integers nums. Consider the following graph:
    // There are nums.length nodes, labeled nums[0] to nums[nums.length - 1],
    // There is an undirected edge between nums[i] and nums[j] if nums[i] and nums[j] share a common factor greater than 1.
// Return the size of the largest connected component in the graph.


// Solution: Union Find & Get Factors

// For each number, find all of its factors.
  // union num with its factors, and num with num / each factor.

// Loop through each number again,
  // store the count of elements with the same representative, find the maximum count.

// n = nums.length, m = max in nums
// Time Complexity: O(n * sqrt(m)) 671ms
// Space Complexity: O(m + n) 60.6MB
var largestComponentSize = function(nums) {
  let n = nums.length;
  let max = Math.max(...nums);
  let uf = new UnionFind(max + 1);
  for (let num of nums) {
    for (let i = 2; i <= Math.sqrt(num); i++) {
      if (num % i === 0) {
        uf.union(num, i);
        uf.union(num, num / i);
      }
    }
  }
  let map = new Map(), ans = 0;
  for (let i = 0; i < n; i++) {
    let rep = uf.find(nums[i]);
    map.set(rep, (map.get(rep) || 0) + 1);
    ans = Math.max(ans, map.get(rep));
  }
  return ans;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size)
    for (let i = 0; i < size; i++) {
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  find(x) {
    if (this.root[x] === x) {
      return x;
    }
    return this.root[x] = this.find(this.root[x]);
  }
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX === rootY) return false;
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
      }
    }
  }
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Three test cases
console.log(largestComponentSize([4,6,15,35])) // 4
console.log(largestComponentSize([20,50,9,63])) // 2
console.log(largestComponentSize([2,3,6,7,4,12,21,39])) // 8