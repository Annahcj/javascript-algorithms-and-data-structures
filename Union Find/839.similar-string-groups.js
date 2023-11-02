// 839. Similar String Groups
// Two strings X and Y are similar if we can swap two letters (in different positions) of X, so that it equals Y. Also two strings X and Y are similar if they are equal.
// For example, "tars" and "rats" are similar (swapping at positions 0 and 2), and "rats" and "arts" are similar, but "star" is not similar to "tars", "rats", or "arts".
// Together, these form two connected groups by similarity: {"tars", "rats", "arts"} and {"star"}.  Notice that "tars" and "arts" are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.
// We are given a list strs of strings where every string in strs is an anagram of every other string in strs. How many groups are there?


// Solution: Union Find

// Use union find to keep track of groups of words.
// Go through each pair of words and connect them if they are similar.
// Two words are similar if at most 2 characters are not equal.
// Find the number of unique groups the words belong to.

// n = number of words, m = words[i].length
// Time Complexity: O(n^2 * m) 199ms
// Space Complexity: O(n) 45.5MB
var numSimilarGroups = function(strs) {
  let n = strs.length, uf = new UnionFind(n);
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      if (isSimilar(strs[i], strs[j])) {
        uf.union(i, j);
      }
    }
  }
  let groups = new Set();
  for (let i = 0; i < n; i++) {
    groups.add(uf.find(i));
  }
  return groups.size;
};

function isSimilar(str1, str2) {
  let m = str1.length, diffCount = 0;
  for (let i = 0; i < m; i++) {
    if (str1[i] !== str2[i]) diffCount++;
  }
  return diffCount <= 2;
}

class UnionFind {
  constructor(size) {
    this.rank = Array(size);
    this.root = Array(size);
    for (let i = 0; i < size; i++) {
      this.rank[i] = 1;
      this.root[i] = i;
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
    } else if (this.rank[rootY] < this.rank[rootX]) {
      this.root[rootY] = rootX;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
}

// Two test cases
console.log(numSimilarGroups(["tars","rats","arts","star"])) // 2
console.log(numSimilarGroups(["omv","ovm"])) // 1