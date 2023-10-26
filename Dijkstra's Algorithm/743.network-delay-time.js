// 743. Network Delay Time
// You are given a network of n nodes, labeled from 1 to n. You are also given times, a list of travel times as directed edges times[i] = (ui, vi, wi), where ui is the source node, vi is the target node, and wi is the time it takes for a signal to travel from source to target.
// We will send a signal from a given node k. Return the time it takes for all the n nodes to receive the signal. If it is impossible for all the n nodes to receive the signal, return -1.


// Solution: Dijkstra's Algorithm

// Calculate shortest paths to all nodes from k
// Loop through calculated paths and find the maximum,
  // if the maximum is infinity, that means not all nodes are reachable, so return -1.
  // otherwise, return maximum.
  
// Time Complexity: O(N^2 + E) 136ms
// Space Complexity: O(N + E) 49.8MB
var networkDelayTime = function(times, n, k) {
  let network = {};
  for (var i = 0; i < n; i++) {
    network[i+1] = [];
  }
  for (var [source, target, weight] of times) {
    network[source].push([target, weight]);
  }
  let travelTime = {};
  for (i = 0; i < n; i++) travelTime[i+1] = Infinity; 
  travelTime[k] = 0;
  let heap = new MinHeap();
  heap.add([k, 0]);
  while (heap.values.length) {
    let [currNode, currWeight] = heap.remove();
    for (var [neighbor, weight] of network[currNode]) {
      let newWeight = currWeight + weight;
      if (travelTime[neighbor] > newWeight) {
        travelTime[neighbor] = newWeight;
        heap.add([neighbor, newWeight]);
      }
    }
  }
  let ans = 0;
  for (i = 0; i < n; i++) {
    ans = Math.max(ans, travelTime[i+1]);
  }
  return ans === Infinity ? -1 : ans;
};

class MinHeap {
  constructor() {
    this.values = [];
  }
  add(val) {
    this.values.push(val);
    let idx = this.values.length - 1;
    let parentIdx = Math.floor((idx - 1) / 2);
    while (parentIdx >= 0 && this.values[idx][1] < this.values[parentIdx][1]) {
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
      if (vals[leftIdx][1] < vals[rightIdx][1]) return leftIdx;
      return rightIdx;
    }
    while (childIdx > -1 && this.values[idx][1] > this.values[childIdx][1]) {
      [this.values[idx], this.values[childIdx]] = [this.values[childIdx], this.values[idx]];
      idx = childIdx;
      leftIdx = idx * 2 + 1, rightIdx = idx * 2 + 2;
      childIdx = getChild(this.values, leftIdx, rightIdx);
    }
    return value;
  }
}

// Three test cases to run function on
console.log(networkDelayTime([[2,1,1],[2,3,1],[3,4,1]], 4, 2)) // 2
console.log(networkDelayTime([[1,2,1]], 2, 1)) // 1
console.log(networkDelayTime([[1,2,1]], 2, 2)) // -1