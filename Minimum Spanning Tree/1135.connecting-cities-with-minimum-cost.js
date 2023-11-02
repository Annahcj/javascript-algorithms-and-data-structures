// 1135. Connecting Cities With Minimum Cost


// Solution: Kruskal's Algorithm

// Initialize a new min heap -> heap
// Loop through each connection in connections
  // add connection to heap
// Initialize a new Union Find with size n
// Keep track of minCost (final answer), and count (number of edges should be n - 1 for a MST)
// Loop while heap is not empty AND count is less than n - 1
  // let [city1, city2, cost] be heap.remove
  // if city1 is not connected with city2 yet,
    // increment minCost by cost
    // increment count by one
    // connect (union) city1 and city2
// Return minCost

// Time Complexity: O(n log(n)) 156ms
// Space Complexity: O(n) 51.7MB
var minimumCost = function(n, connections) {
   let heap = new MinHeap();
   for (let connection of connections) {
     heap.add(connection);
   } 
   let uf = new UnionFind(n);
   let minCost = 0, count = 0;
   while (!heap.isEmpty() && count < n - 1) {
     let [city1, city2, cost] = heap.remove();
     if (!uf.isConnected(city1, city2)) {
       minCost += cost;
       count++;
       uf.union(city1, city2);
     }
   }
   if (count !== n - 1) minCost = -1;
   return minCost;
};

class UnionFind {
  constructor(size) {
    this.root = Array(size);
    this.rank = Array(size);
    for (var i = 0; i < size; i++) {
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
    if (this.rank[rootX] > this.rank[rootY]) {
      this.root[rootY] = rootX;
    } else if (this.rank[rootX] < this.rank[rootY]) {
      this.root[rootX] = rootY;
    } else {
      this.root[rootY] = rootX;
      this.rank[rootX]++;
    }
  }
  isConnected(x, y) {
    return this.find(x) === this.find(y);
  }
}

class MinHeap {
  constructor() {
    this.values = [];
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.values[idx][2] < this.values[parentIdx][2]) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
    return val;
  }
  remove() {
    if (!this.values.length) return -1;
    if (this.values.length === 1) return this.values.pop();
    let value = this.values[0];
    let popped = this.values.pop();
    this.values[0] = popped;
    let idx = 0;
    let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
    let childIdx = getChild(this.values, leftIdx, rightIdx);
    function getChild(vals, leftIdx, rightIdx) {
      let end = vals.length - 1;
      if (leftIdx > end && rightIdx > end) return -1;
      if (rightIdx > end) return leftIdx;
      if (vals[leftIdx][2] < vals[rightIdx][2]) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.values[idx][2] > this.values[childIdx][2]) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
  isEmpty() {
    return this.values.length === 0;
  }
}

// Two test cases
console.log(minimumCost(3, [[1,2,5],[1,3,6],[2,3,1]])) // 6
console.log(minimumCost(4, [[1,2,3],[3,4,4]])) // -1