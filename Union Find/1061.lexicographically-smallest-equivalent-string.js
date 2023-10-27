// 1061. Lexicographically Smallest Equivalent String
// You are given two strings of the same length s1 and s2 and a string baseStr.
// We say s1[i] and s2[i] are equivalent characters.
  // For example, if s1 = "abc" and s2 = "cde", then we have 'a' == 'c', 'b' == 'd', and 'c' == 'e'.
// Equivalent characters follow the usual rules of any equivalence relation:
  // Reflexivity: 'a' == 'a'.
  // Symmetry: 'a' == 'b' implies 'b' == 'a'.
  // Transitivity: 'a' == 'b' and 'b' == 'c' implies 'a' == 'c'.
// For example, given the equivalency information from s1 = "abc" and s2 = "cde", "acd" and "aab" are equivalent strings of baseStr = "eed", and "aab" is the lexicographically smallest equivalent string of baseStr.
// Return the lexicographically smallest equivalent string of baseStr by using the equivalency information from s1 and s2.


// Solution: Union Find

// For each s1[i] and s2[i], connect s1[i] and s2[i] together using union find.
// Then, we get the lexicographically smallest character for each connected group of characters.
// Convert each baseStr[i] to the lexographically smallest character in its connected group of characters.

// n = length of s1, m = length of baseStr
// Time Complexity: O(n + m) 101ms
// Space Complexity: O(m) 47.8MB
var smallestEquivalentString = function(s1, s2, baseStr) {
  let uf = new UnionFind(26), n = s1.length;
  for (let i = 0; i < n; i++) {
    let charcode1 = s1.charCodeAt(i) - 97;
    let charcode2 = s2.charCodeAt(i) - 97;
    uf.union(charcode1, charcode2);
  }
  let smallestCharcode = Array(26).fill(0).map((_, index) => index);
  for (let i = 0; i < 26; i++) {
    let parent = uf.find(i);
    smallestCharcode[parent] = Math.min(smallestCharcode[parent], i);
  }
  
  let res = "";
  for (let char of baseStr) {
    let charcode = char.charCodeAt() - 97;
    let parentCharcode = uf.find(charcode);
    let smallestChar = String.fromCharCode(smallestCharcode[parentCharcode] + 97);
    res += smallestChar;
  }
  return res;
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
console.log(smallestEquivalentString("parker", "morris", "parser")) // "makkek"
console.log(smallestEquivalentString("hello", "world", "hold")) // "hdld"