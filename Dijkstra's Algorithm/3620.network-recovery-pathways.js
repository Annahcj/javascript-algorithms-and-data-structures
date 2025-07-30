// 3620. Network Recovery Pathways
// You are given a directed acyclic graph of n nodes numbered from 0 to n − 1. This is represented by a 2D array edges of length m, where edges[i] = [ui, vi, costi] indicates a one‑way communication from node ui to node vi with a recovery cost of costi.
// Some nodes may be offline. You are given a boolean array online where online[i] = true means node i is online. Nodes 0 and n − 1 are always online.
// A path from 0 to n − 1 is valid if:
  // All intermediate nodes on the path are online.
  // The total recovery cost of all edges on the path does not exceed k.
// For each valid path, define its score as the minimum edge‑cost along that path.
// Return the maximum path score (i.e., the largest minimum-edge cost) among all valid paths. If no valid path exists, return -1.


// Solution: Binary Search & Dijkstra's Algorithm

// Binary search for the maximum minimum edge cost.
// For an edge cost x, 
  // Use Dijkstra's algorithm to find the minimum total cost to reach each node, 
  // only using edges with cost >= x.
// If we can reach node n-1 with the total cost <= k, then that minCost is achieveable.

// Note: This solution is TLE, passes 631/636 test cases.
// V = number of nodes, E = number of edges
// Time Complexity: O((V + E) * log(V) * log(max edge cost))
// Space Complexity: O(V + E)
function findMaxPathScore(edges, online, k) {
  const n = online.length, graph = Array(n).fill(0).map(() => []);
  let maxCost = 0;
  for (let [u, v, cost] of edges) {
    if (online[u] && online[v]) {
      graph[u].push([v, cost]);
      maxCost = Math.max(maxCost, cost);
    }
  }
  let low = 0, high = maxCost, res = -1;
  while (low < high) {
    const mid = Math.ceil((low + high) / 2);
    if (canReachTarget(mid)) {
      low = mid;
      res = mid;
    } else {
      high = mid - 1;
    }
  }
  return res;

  function canReachTarget(x) {
    const heap = new Heap((a, b) => a[1] - b[1]);
    heap.add([0, 0]);
    const minCost = Array(n).fill(Infinity);
    minCost[0] = 0;
    while (!heap.isEmpty()) {
      const [node, cost] = heap.remove();
      if (minCost[node] > cost) continue;
      if (node === n - 1) return true;
      for (let [nei, neiCost] of graph[node]) {
        const newCost = cost + neiCost;
        if (neiCost < x || !online[nei] || minCost[nei] <= newCost || newCost > k) continue;
        minCost[nei] = newCost;
        heap.add([nei, newCost]);
      }
    }
    return false;
  }
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
console.log(findMaxPathScore([[0,1,5],[1,3,10],[0,2,3],[2,3,4]], [true,true,true,true], 10)) // 3
console.log(findMaxPathScore([[0,1,7],[1,4,5],[0,2,6],[2,3,6],[3,4,2],[2,4,6]], [true,true,true,false,true], 12)) // 6