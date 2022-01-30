// 2157. Groups of Strings


// Solution: [TLE] Bitmasks & Union Find

// This solution passed 95/97 test cases.
// In the contest, I tried to optimize it by getting rid of the inner loop for the replacing.
// If we remove a character from s1 and s2, it is equivalent to replacing a character.
// However, the solution below runs faster on LeetCode than the 'optimized' one.

// 1. Generate the bitmasks representing each string. Add them to a map associated to their indices.
// 2. For each string, try the three operations:
  // Loop through 0 to 26, and flip the ith bit.
  // Replace: If the bit was removed, loop through 0 to 26 and add a bit back.
  // If any of these modified bitmasks are present in the map, get the indices and connect them to the current index using union find.
// 3. Using the information from the union find, find the parent of each index and keep track of the biggest group size and the number of groups.

// Time Complexity: O(n * 26 * 26)
// Space Complexity: O(n)
var groupStrings = function(words) {
  let n = words.length, masks = Array(n), map = new Map();
  for (var i = 0; i < n; i++) {
    let mask = 0;
    for (var char of words[i]) {
      let charCode = char.charCodeAt() - 97;
      mask |= (1 << charCode);
    }
    masks[i] = mask;
    if (!map.has(mask)) map.set(mask, []);
    map.get(mask).push(i);
  }  

  let uf = new UnionFind(n);

  for (i = 0; i < n; i++) {
    let mask = masks[i];
    for (var j = 0; j < 26; j++) {
      let bit = (mask >> j) & 1;
      let flipped = mask ^ (1 << j), connected = map.get(flipped);
      if (bit === 1) {
        // replace: remove a letter, then add a letter
        for (var k = 0; k < 26; k++) {
          let bitK = (flipped >> k) & 1;
          if (bitK === 1) continue;
          let replaced = flipped ^ (1 << k), connectedIdxs = map.get(replaced);
          if (!connectedIdxs) continue;
          for (var idx of connectedIdxs) {
            uf.union(i, idx);
          }
        }
      }

      if (!connected) continue;
      for (var s2 of connected) { // connect the two strings
        uf.union(i, s2);
      }
    }
  }
  let maxGroupSize = 0;
  for (var i = 0; i < n; i++) { // get the number of groups and the maximum group size
    let parent = uf.find(i);
    maxGroupSize = Math.max(maxGroupSize, uf.getSize(parent));
  } 
  return [uf.count, maxGroupSize];
}; 

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    this.size = Array(size); // size of each group
    this.count = size; // total count of groups
    for (var i = 0; i < size; i++) {
      this.size[i] = 1;
      this.root[i] = i;
      this.rank[i] = 1;
    }
  }
  // recursively finding the root of x, setting roots of all along the path to the root from bottom up.
  find(x) {
    if (this.root[x] === x) {
      return x;
    }
    return this.root[x] = this.find(this.root[x]);
  }
  // choose side whose rank (height) is smaller to set as root out of (x, y)
  // if the heights are equal, set it either way (set x as root for simplicity) and increase rank of x by one.
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX !== rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.root[rootY] = rootX;
        this.size[rootX] += this.size[rootY];
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.root[rootX] = rootY;
        this.size[rootY] += this.size[rootX];
      } else {
        this.root[rootY] = rootX;
        this.rank[rootX]++;
        this.size[rootX] += this.size[rootY];
      }
      this.count--;
    }
  }
  connected(x, y) {
    return this.find(x) === this.find(y);
  }
  getSize(x) {
    return this.size[x];
  }
}

// Three test cases to run function on
console.log(groupStrings(["a","b","ab","cde"])) // [2,3]
console.log(groupStrings(["a","ab","abc"])) // [1,3]
console.log(groupStrings(["ab","ac"])) // [1,2]