// 1928. Minimum Cost to Reach Destination in Time
// There is a country of n cities numbered from 0 to n - 1 where all the cities are connected by bi-directional roads. The roads are represented as a 2D integer array edges where edges[i] = [xi, yi, timei] denotes a road between cities xi and yi that takes timei minutes to travel. There may be multiple roads of differing travel times connecting the same two cities, but no road connects a city to itself.
// Each time you pass through a city, you must pay a passing fee. This is represented as a 0-indexed integer array passingFees of length n where passingFees[j] is the amount of dollars you must pay when you pass through city j.
// In the beginning, you are at city 0 and want to reach city n - 1 in maxTime minutes or less. The cost of your journey is the summation of passing fees for each city that you passed through at some moment of your journey (including the source and destination cities).
// Given maxTime, edges, and passingFees, return the minimum cost to complete your journey, or -1 if you cannot complete it within maxTime minutes.


// Solution: Dijkstra's Algorithm

// Do dijkstra's algorithm, taking into account that time must not exceed maxTime.
// Keep track of the minimum time to get to each node.
// This is so that we can account for cases where the time is smaller, but the cost may not be smaller than the current minimum.
// This is because although the heap takes care of the minimum cost, we may still exceed maxTime for that route.

// Keep [node, cost, time] values in a min heap, ordered by minimum cost, then minimum time.

// Proof: let's say there are three different states in the heap which point to the same neighbor node 4:
  // 1 -> 4, cost = 5, time = 1
  // 2 -> 4, cost = 1, time = 5
  // 3 -> 4, cost = 3, time = 3
// This solution handles the case of nodes with small enough time and cost, but not the smallest cost: the minimum time would get overwritten three times because the heap is ordered by minimum cost.
// In the case where the time is greater than the minimum time, the cost is guaranteed to be bigger or equal than the minimum recorded cost, because the heap is ordered by minimum cost.

// Time Complexity: O(E log(E)) 264ms
// Space Complexity: O(V + E) 62.3MB
var minCost = function(maxTime, edges, passingFees) {
  let n = passingFees.length, minTime = Array(n).fill(Infinity);
  let graph = Array(n).fill(0).map(() => []);
  for (let [x, y, time] of edges) {
    graph[x].push([y, time]);
    graph[y].push([x, time]);
  }
  
  let heap = new PriorityQueue((a, b) => {
    return a[1] === b[1] ? a[2] - b[2] : a[1] - b[1];
  });
  heap.add([0, passingFees[0], 0]);
  minTime[0] = 0;
  
  while (!heap.isEmpty()) {
    let [node, currCost, currTime] = heap.remove();
    if (node === n - 1) return currCost;
    
    for (let [nei, time] of graph[node]) {
      let newCost = currCost + passingFees[nei], newTime = currTime + time;
      if (newTime > maxTime || newTime >= minTime[nei]) continue; // exceeds maxTime or current minimum time
      minTime[nei] = newTime;
      heap.add([nei, newCost, newTime]);
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

// Two test cases to run function on
console.log(minCost(30, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], [5,1,2,20,20,3])) // 11
console.log(minCost(29, [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], [5,1,2,20,20,3])) // 48