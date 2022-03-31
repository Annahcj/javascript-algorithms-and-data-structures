// 2093. Minimum Cost to Reach City With Discounts
// A series of highways connect n cities numbered from 0 to n - 1. You are given a 2D integer array highways where highways[i] = [city1i, city2i, tolli] indicates that there is a highway that connects city1i and city2i, allowing a car to go from city1i to city2i and vice versa for a cost of tolli.
// You are also given an integer discounts which represents the number of discounts you have. You can use a discount to travel across the ith highway for a cost of tolli / 2 (integer division). Each discount may only be used once, and you can only use at most one discount per highway.
// Return the minimum total cost to go from city 0 to city n - 1, or -1 if it is not possible to go from city 0 to city n - 1.


// Solution: Dijkstra's Algorithm

// 1. Construct a graph based on highways
// 2. Use dijkstra's algorithm to find the best path from node 0 to n - 1.

// Use an n x k matrix 'costs' to record the cost of reaching each node. 
// costs[i][d] = minimum cost to reach node i from node 0 with d discounts left. 

// For each node, we have two choices when looking to go to the neighbors:
  // 1. If we have at least 1 discount left, use the discount
  // 2. Don't use the discount

// Note: When we reach node n - 1, we can return the cost because we know that the minimum cost path always reaches a node first.

// k = discounts
// Time Complexity: O(nk * log(n)) 570ms
// Space Complexity: O(nk) 85.7MB
var minimumCost = function(n, highways, discounts) {
  let costs = Array(n).fill(0).map(() => Array(discounts + 1).fill(Infinity));
  let graph = Array(n);
  for (let i = 0; i < n; i++) graph[i] = [];
  for (let [x, y, weight] of highways) {
    graph[x].push([y, weight]);
    graph[y].push([x, weight]);
  }
  
  let minHeap = new PriorityQueue((a, b) => a[0] - b[0]); 
  minHeap.add([0, discounts, 0]); // [cost, discounts left, node]
  costs[0][discounts] = 0;
  
  while (!minHeap.isEmpty()) {
    let [cost, d, node] = minHeap.remove();
    if (node === n - 1) return cost;
    
    if (cost > costs[node][d]) continue;
    for (let [nei, weight] of graph[node]) {
      let discountToll = Math.floor(weight / 2);
      if (d > 0 && costs[nei][d - 1] > costs[node][d] + discountToll) { // use discount
        minHeap.add([cost + discountToll, d - 1, nei]);
        costs[nei][d - 1] = Math.min(costs[nei][d - 1], discountToll + costs[node][d]);
      }
      if (costs[nei][d] > costs[node][d] + weight) {
        minHeap.add([cost + weight, d, nei]);
        costs[nei][d] = Math.min(costs[nei][d], weight + costs[node][d]);
      }
    }
  }
  return -1;
};

class PriorityQueue {
  constructor(comparator = ((a, b) => a - b)) {
    this.values = [];
    this.comparator = comparator;
    this.size = 0;
  }
  add(val) {
    this.size++;
    this.values.push(val);
    let idx = this.size - 1, parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.comparator(this.values[parentIdx], this.values[idx]) > 0) {
      [this.values[parentIdx], this.values[idx]] = [this.values[idx], this.values[parentIdx]];
      idx = parentIdx;
      parentIdx = Math.floor((idx - 1) / 2);
    }
  }
  remove() {
    if (this.size === 0) return -1;
    this.size--;
    if (this.size === 0) return this.values.pop();
    let removedVal = this.values[0];
    this.values[0] = this.values.pop();
    let idx = 0;
    while (idx < this.size && idx < Math.floor(this.size / 2)) {
      let leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      if (rightIdx === this.size) {
        if (this.comparator(this.values[leftIdx], this.values[idx]) > 0) break;
        [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
        idx = leftIdx;
      } else if (this.comparator(this.values[leftIdx], this.values[idx]) < 0 || this.comparator(this.values[rightIdx], this.values[idx]) < 0) {
        if (this.comparator(this.values[leftIdx], this.values[rightIdx]) <= 0) {
          [this.values[leftIdx], this.values[idx]] = [this.values[idx], this.values[leftIdx]];
          idx = leftIdx;
        } else {
          [this.values[rightIdx], this.values[idx]] = [this.values[idx], this.values[rightIdx]];
          idx = rightIdx;
        }
      } else {
        break;
      }
    }
    return removedVal;
  }
  top() {
    return this.values[0];
  }
  isEmpty() {
    return this.size === 0;
  }
}

// Three test cases to run function on
console.log(minimumCost(5, [[0,1,4],[2,1,3],[1,4,11],[3,2,3],[3,4,2]], 1)) // 9
console.log(minimumCost(4, [[1,3,17],[1,2,7],[3,2,5],[0,1,6],[3,0,20]], 20)) // 8
console.log(minimumCost(4, [[0,1,3],[2,3,2]], 0)) // -1