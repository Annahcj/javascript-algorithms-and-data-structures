// 2157. Groups of Strings


// Solution: Union Find & Bitmasks

// Note: If we remove a character from s1 and s2, it is equivalent to replacing a character. This saves us from looping through 26*26 times to replace each character with every character.

// 1. Go through each word and get the bitmask representation.
  // Map each bitmask to one word (we keep one as the root and connect words on the fly, so we just need one word as the connection point).
  // Keep a separate map replacedMap where we keep all combinations of words after removing one character.
  // Connecting words on the fly: If two words contain the same characters, we know they are connected. For replacing, if two words contain the same characters after deleting one character from both words, they are connected.

// 2. Go through each word again and try to add/remove any of the letters from the bitmask.
  // Add: Try to add any non-existing character and union the current word with the word stored in the map.
  // Remove: Try to remove any character and union the current word with the word stored in the map.

// 3. Group the words by parent and count the number of groups and the maximum group size.

// n = number of words
// Time Complexity: O(n * 26) 564ms
// Space Complexity: O(n * 26) 100.5MB
var groupStrings = function(words) {
  let map = new Map(), replacedMap = new Map();
  let n = words.length, bitmasks = Array(n), uf = new UnionFind(n);
  for (let i = 0; i < n; i++) {
    let bitmask = getBitmask(words[i]);
    bitmasks[i] = bitmask; // save it so we can re-use later
    if (!map.has(bitmask)) map.set(bitmask, i);
    else uf.union(i, map.get(bitmask)); // union on the fly
    
    for (let j = 0; j < 26; j++) {
      if (!((bitmask >> j) & 1)) continue; // word doesn't contain jth character
      let newBitmask = bitmask ^ (1 << j); // new bitmask after removing jth character
      if (!replacedMap.has(newBitmask)) replacedMap.set(newBitmask, i);
      else uf.union(i, replacedMap.get(newBitmask)); // union on the fly
    }
  }
  
  for (let i = 0; i < n; i++) {
    let bitmask = bitmasks[i];
    for (let j = 0; j < 26; j++) {
      if (!((bitmask >> j) & 1)) { 
        let added = bitmask | (1 << j); // add character j to this word
        if (map.has(added)) uf.union(i, map.get(added));
      } else {
        let removed = bitmask ^ (1 << j); // remove character j from this word
        if (map.has(removed)) uf.union(i, map.get(removed));
      }
    }
  }
  
  let groupSize = {}, numGroups = 0, maxGroupSize = 0;
  for (let i = 0; i < n; i++) {
    let parent = uf.find(i);
    if (!groupSize[parent]) groupSize[parent] = 1, numGroups++;
    else groupSize[parent]++;
    maxGroupSize = Math.max(maxGroupSize, groupSize[parent]);
  }
  return [numGroups, maxGroupSize];
};

function getBitmask(word) {
  let bitmask = 0;
  for (let char of word) {
    let charcode = char.charCodeAt() - 97;
    bitmask |= (1 << charcode);
  }
  return bitmask;
}

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size)
    for (var i = 0; i < size; i++) {
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

// Three test cases to run function on
console.log(groupStrings(["a","b","ab","cde"])) // [2,3]
console.log(groupStrings(["a","ab","abc"])) // [1,3]
console.log(groupStrings(["ab","ac"])) // [1,2]