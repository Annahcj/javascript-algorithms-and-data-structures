// 3112. Minimum Time to Visit Disappearing Nodes
// There is an undirected graph of n nodes. You are given a 2D array edges, where edges[i] = [u[i], v[i], length[i]] describes an edge between node u[i] and node v[i] with a traversal time of lengthi units.
// Additionally, you are given an array disappear, where disappear[i] denotes the time when the node i disappears from the graph and you won't be able to visit it.
// Notice that the graph might be disconnected and might contain multiple edges.
// Return the array answer, with answer[i] denoting the minimum units of time required to reach node i from node 0. If node i is unreachable from node 0 then answer[i] is -1.


// Solution: Dijkstra's Algorithm

// Use Dijkstra's algorithm to efficiently find the shortest path (path taking minimum time) to each node from node 0.
// The variation is that we shouldn't visit a neighbor node if it will disappear from the graph when we visit it.

// V = number of nodes, E = number of edges
// Time Complexity: O(V + E log(V + E)) 460ms
// Space Complexity: O(V + E) 104.5MB
var minimumTime = function(n, edges, disappear) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [u, v, length] of edges) {
    graph[u].push([v, length]);
    graph[v].push([u, length]);
  }
  let heap = new Heap((a, b) => a[1] - b[1]); // [node, time]
  let minTime = Array(n).fill(Infinity);
  heap.add([0, 0]), minTime[0] = 0;
  while (!heap.isEmpty()) {
    let [node, time] = heap.remove();
    if (time !== minTime[node]) continue;
    for (let [nei, length] of graph[node]) {
      let newTime = time + length;
      if (disappear[nei] <= newTime) continue; // the node disappears from the graph
      if (newTime < minTime[nei]) {
        minTime[nei] = newTime;
        heap.add([nei, newTime]);
      }
    }
  }
  return minTime.map((time) => time === Infinity ? -1 : time);
};

class Heap {
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
console.log(minimumTime(3, [[0,1,2],[1,2,1],[0,2,4]], [1,1,5])) // [0,-1,4]
console.log(minimumTime(3, [[0,1,2],[1,2,1],[0,2,4]], [1,3,5])) // [0,2,3]