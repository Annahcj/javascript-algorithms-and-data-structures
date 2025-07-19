// 3604. Minimum Time to Reach Destination in Directed Graph
// You are given an integer n and a directed graph with n nodes labeled from 0 to n - 1. This is represented by a 2D array edges, where edges[i] = [ui, vi, starti, endi] indicates an edge from node ui to vi that can only be used at any integer time t such that starti <= t <= endi.
// You start at node 0 at time 0.
// In one unit of time, you can either:
  // Wait at your current node without moving, or
  // Travel along an outgoing edge from your current node if the current time t satisfies starti <= t <= endi.
// Return the minimum time required to reach node n - 1. If it is impossible, return -1.


// Solution: Dijkstra's Algorithm

// Dijkstra's algorithm to find the minimum time to reach a node.
// There is no point visiting the same node with a higher time.

// Return the minimum time to reach n-1.

// Time Complexity: O((V + E) log(V)) 234ms
// Space Complexity: O(V + E) 110MB
function minTime(n, edges) {
  const minTimeToReach = Array(n).fill(Infinity);
  minTimeToReach[0] = 0;
  const graph = Array(n).fill(0).map(() => []);
  for (let [u, v, start, end] of edges) {
    graph[u].push([v, start, end]);
  }
  const heap = new Heap((a, b) => a[1] - b[1]); // [node, time to reach]
  heap.add([0, 0]);
  while (!heap.isEmpty()) {
    const [node, timeToReach] = heap.remove();
    if (timeToReach > minTimeToReach[node]) continue; // found a shorter path
    if (node === n - 1) return timeToReach;
    for (let [nei, start, end] of graph[node]) {
      if (timeToReach > end) continue;
      const newTimeToReach = Math.max(timeToReach + 1, start + 1);
      if (newTimeToReach < minTimeToReach[nei]) {
        heap.add([nei, newTimeToReach]);
        minTimeToReach[nei] = newTimeToReach;
      }
    }
  }
  return -1;
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

// Three test cases
console.log(minTime(3, [[0,1,0,1],[1,2,2,5]])) // 3
console.log(minTime(4, [[0,1,0,3],[1,3,7,8],[0,2,1,5],[2,3,4,7]])) // 5
console.log(minTime(3, [[1,0,1,3],[1,2,3,5]])) // -1