// 1976. Number of Ways to Arrive at Destination
// You are in a city that consists of n intersections numbered from 0 to n - 1 with bi-directional roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.
// You are given an integer n and a 2D integer array roads where roads[i] = [ui, vi, timei] means that there is a road between intersections ui and vi that takes timei minutes to travel. You want to know in how many ways you can travel from intersection 0 to intersection n - 1 in the shortest amount of time.
// Return the number of ways you can arrive at your destination in the shortest amount of time. Since the answer may be large, return it modulo 109 + 7.


// Solution: Dijkstra's Algorithm

// Perform dijkstra's algorithm as usual, except account for the case where the minimum time to get to a neighbor node is equal.
// Keep track of the number of ways to reach each node in the minimum time for that node.
// In the case where the minimum time is equal, add the number of ways onto that neighbor node, but don't pursue that path.

// This works because the first time we reach a node (meaning extract from the heap), it is guaranteed to be the minimum possible time to reach it.

// V = number of nodes, E = number of edges
// Time Complexity: O(V + E log(V)) 282ms
// Space Complexity: O(V + E) 57MB
var countPaths = function(n, roads) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [x, y, time] of roads) {
    graph[x].push([y, time]);
    graph[y].push([x, time]);
  }
  let heap = new Heap((a, b) => a[1] - b[1]), mod = 10 ** 9 + 7;
  let minTime = Array(n).fill(Infinity), ways = Array(n).fill(0);
  minTime[0] = 0, ways[0] = 1;
  heap.add([0, 0]);
  
  while (!heap.isEmpty()) {
    let [node, time] = heap.remove();
    if (time > minTime[node]) continue;
    for (let [nei, neiTime] of graph[node]) {
      let newTime = time + neiTime;
      if (newTime < minTime[nei]) {
        minTime[nei] = newTime;
        ways[nei] = ways[node];
        heap.add([nei, newTime]);
      } else if (newTime === minTime[nei]) {
        ways[nei] = (ways[nei] + ways[node]) % mod;
      }
    }
  }
  return ways[n - 1];
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
console.log(countPaths(7, [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]])) // 4
console.log(countPaths(2, [[1,0,10]])) // 1