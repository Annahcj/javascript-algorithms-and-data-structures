// 2045. Second Minimum Time to Reach Destination
// A city is represented as a bi-directional connected graph with n vertices where each vertex is labeled from 1 to n (inclusive). The edges in the graph are represented as a 2D integer array edges, where each edges[i] = [ui, vi] denotes a bi-directional edge between vertex ui and vertex vi. Every vertex pair is connected by at most one edge, and no vertex has an edge to itself. The time taken to traverse any edge is time minutes.
// Each vertex has a traffic signal which changes its color from green to red and vice versa every change minutes. All signals change at the same time. You can enter a vertex at any time, but can leave a vertex only when the signal is green. You cannot wait at a vertex if the signal is green.
// The second minimum value is defined as the smallest value strictly larger than the minimum value.
  // For example the second minimum value of [2, 3, 4] is 3, and the second minimum value of [2, 2, 4] is 4.
// Given n, edges, time, and change, return the second minimum time it will take to go from vertex 1 to vertex n.
// Notes:
  // You can go through any vertex any number of times, including 1 and n.
  // You can assume that when the journey starts, all signals have just turned green.


// Solution: Dijkstra's Algorithm w/ Two Minimum Times

// Dijkstra's algorithm, except we store two minimum times for each node instead of just one.
// We only visit a neighbor node if:
  // 1. The neighbor has less than two minimum times stored so far and the new time is not equal to the minimum time (since the second minimum time must be strictly larger than the minimum value)
  // 2. The new time is not equal to the minimum time and the new time is smaller than the second minimum time.

// Calculate time to travel from one node to another:
  // Green light: Math.floor(curr time / change) % 2 === 0
    // time to travel: curr time + time 
  // Red light: Math.floor(curr time / change) % 2 === 1
    // time to travel: curr time + time + time until next green light
    // time to wait until next green light = change - (curr time % change)

// V = number of cities, E = number of edges
// Time Complexity: O((V + E) * log(V)) 1088ms
// Space Complexity: O(V + E) 115.2MB
var secondMinimum = function(n, edges, time, change) {
  let graph = Array(n + 1).fill(0).map(() => []);
  for (let [u, v] of edges) {
    graph[u].push(v);
    graph[v].push(u);
  }
  let heap = new PriorityQueue((a, b) => a[1] - b[1]); // [node, time]  
  let minTime = Array(n + 1).fill(0).map(() => []);
  minTime[1].push(0);
  heap.add([1, 0]);
  while (!heap.isEmpty()) {
    let [node, currTime] = heap.remove();
    if (node === n && minTime[node].length === 2) return Math.max(...minTime[node]);
    
    let isGreenLight = Math.floor(currTime / change) % 2 === 0;
    let timeUntilGreenLight = change - (currTime % change);
    let newTime = isGreenLight ? currTime + time : currTime + time + timeUntilGreenLight;
    for (let nei of graph[node]) {
      if ((minTime[nei].length <= 1 && minTime[nei][0] !== newTime) || (minTime[nei][0] !== newTime && minTime[nei][1] > newTime)) {
        minTime[nei].push(newTime);
        minTime[nei].sort((a, b) => a - b);
        if (minTime[nei].length > 2) minTime[nei].pop(); // pop out largest time if length exceeds 2
        heap.add([nei, newTime]);
      }
    }
  }
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

// Two test cases
console.log(secondMinimum(5, [[1,2],[1,3],[1,4],[3,4],[4,5]], 3, 5)) // 13
console.log(secondMinimum(2, [[1,2]], 3, 2)) // 11