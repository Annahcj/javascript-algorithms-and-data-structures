// 1202. Smallest String With Swaps
// You are given a string s, and an array of pairs of indices in the string pairs where pairs[i] = [a, b] indicates 2 indices(0-indexed) of the string.
// You can swap the characters at any pair of indices in the given pairs any number of times.
// Return the lexicographically smallest string that s can be changed to after using the swaps.


// Solution: Union Find & Char/String Grouping + Sorting

// Logic:
// Any group of connected indexes can be sorted in any way.
// (0, 1) and (1, 2) means that (0, 1, 2) can be ordered in any way.

// Steps:
// 1. Union all pairs
// 2. Group strings of each component
// 3. Sort each string group in reverse order (z -> a)
// 4. Build up the final string, pop from each index's parent's string group

// Algorithm:
// First, initiate a new unionfind -> uf
// Loop through each [x, y] in pairs
  // union x and y

// Then, initiate a new hashmap 'group'
// Loop through each index in s (index -> i)
  // Let parent be find(i) (the root of i)
  // if group doesn't contain parent yet, set group[parent] to an empty array
  // then, push s[i] into group[parent]

// Now, sort each string group in reverse order.
// (based on charCodeAt)

// Let newStr be our final string
// Loop through each index in s (index -> i)
  // pop from group[uf.find(i)], append to newStr.

// Return newStr


// Time Complexity: O(n log(n)) 228ms
  // Union of all indexes takes O(n * α(n)) -> O(n)
  // Adding string groups to hashmap takes O(n)
  // Sorting each individual string group takes O(n log(n)) in total
  // Building up final string takes O(n)

// Space Complexity: O(n) 67ms

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
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX] += this.rank[rootY];
      }
    }
  }
}
var smallestStringWithSwaps = function(s, pairs) {
  let uf = new UnionFind(s.length);
  for (let [x, y] of pairs) {
    uf.union(x, y);
  }
  let group = {};
  for (let i = 0; i < s.length; i++) {
    let parent = uf.find(i);
    if (!group[parent]) group[parent] = [];
    group[parent].push(s[i]);
  }
  for (let idx in group) {
    group[idx] = group[idx].sort((a, b) => b.charCodeAt() - a.charCodeAt());
  }
  let newStr = '';
  for (let i = 0; i < s.length; i++) {
    newStr += group[uf.find(i)].pop();
  }
  return newStr;
};

// Three test cases
console.log(smallestStringWithSwaps("dcab", [[0,3],[1,2]])) // "bacd"
console.log(smallestStringWithSwaps("dcab", [[0,3],[1,2],[0,2]])) // "abcd"
console.log(smallestStringWithSwaps("cba", [[0,1],[1,2]])) // "abc"