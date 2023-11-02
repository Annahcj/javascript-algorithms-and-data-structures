// 990. Satisfiability of Equality Equations
// You are given an array of strings equations that represent relationships between variables where each string equations[i] is of length 4 and takes one of two different forms: "xi==yi" or "xi!=yi".Here, xi and yi are lowercase letters (not necessarily different) that represent one-letter variable names.
// Return true if it is possible to assign integers to variable names so as to satisfy all the given equations, or false otherwise.


// Solution: Two Passes w/ Union Find

// There are a maximum of 26 characters since they are lowercase letters.
// 1. First connect/union each (x, y) for all equal equations.
// 2. Go through each non-equal equation, if (x, y) are connected, return false.

// Time Complexity: O(n) 76ms
// Space Complexity: O(1) 47MB
var equationsPossible = function(equations) {
  let uf = new UnionFind(26);
  for (let equation of equations) {
    let a = equation[0], b = equation[3];
    if (equation[1] === '=') {
      let charcodeA = a.charCodeAt() - 97, charcodeB = b.charCodeAt() - 97;
      uf.union(charcodeA, charcodeB);
    } 
  }
  for (let equation of equations) {
    let a = equation[0], b = equation[3];
    if (equation[1] === '!') {
      let charcodeA = a.charCodeAt() - 97, charcodeB = b.charCodeAt() - 97;
      if (uf.isConnected(charcodeA, charcodeB)) return false;
    } 
  }
  return true;
};

class UnionFind {
  constructor(size) {
    this.size = size;
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
    if (this.rank[rootX] > this.rank[rootY]) this.root[rootY] = rootX;
    else if (this.rank[rootX] < this.rank[rootY]) this.root[rootX] = rootY;
    else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
    return true;
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

// Three test cases
console.log(equationsPossible(["a==b","b!=a"])) // false
console.log(equationsPossible(["b==a","a==b"])) // true
console.log(equationsPossible(["b==a","b!=c","a==c"])) // false