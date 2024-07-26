// 1334. Find the City With the Smallest Number of Neighbors at a Threshold Distance
// There are n cities numbered from 0 to n-1. Given the array edges where edges[i] = [fromi, toi, weighti] represents a bidirectional and weighted edge between cities fromi and toi, and given the integer distanceThreshold.
// Return the city with the smallest number of cities that are reachable through some path and whose distance is at most distanceThreshold, If there are multiple such cities, return the city with the greatest number.
// Notice that the distance of a path connecting cities i and j is equal to the sum of the edges' weights along that path.


// Solution: Floyd Warshall

// 1. Use the Floyd Warshall algorithm to find the shortest distance from each pair of nodes.
  // Populate dist with the edges we have. Each dist[i][j] = the current shortest distance from node i to node j.
  // Use up the edges involving each node k (i -> k -> j)

// 2. For each node i, count the number of cities j where dist[i][j] <= distanceThreshold.
  // Record the city with the smallest number of reachable cities.

// Time Complexity: O(n^3) 136ms
// Space Complexity: O(n^2) 60.2MB
var findTheCity = function(n, edges, distanceThreshold) {
  let dist = Array(n).fill(0).map(() => Array(n).fill(Infinity));
  for (let [from, to, weight] of edges) {
    dist[from][to] = weight;
    dist[to][from] = weight; 
  }
  for (let i = 0; i < n; i++) {
    dist[i][i] = 0;  
  }
  // Floyd Warshall to get min dist from every city to every city
  for (let k = 0; k < n; k++) {
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        if (j === i) continue;
        dist[i][j] = Math.min(dist[i][j], dist[i][k] + dist[k][j]);
      }
    }
  }
  let city = -1, minReachable = Infinity;
  for (let i = 0; i < n; i++) {
    let reachable = 0;
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      if (dist[i][j] <= distanceThreshold) {
        reachable++;
      }
    }
    if (reachable < minReachable) {
      city = i;
      minReachable = reachable;
    } else if (reachable === minReachable) {
      city = Math.max(city, i);
    }
  }
  return city;
};


// Solution 2: Dijkstra's Algorithm

// Dijkstra's algorithm from each city.
// For each city, count the number of cities reachable with a weight <= distanceThreshold.
// Return the city with the smallest count.

// n = number of nodes, m = number of edges
// Time Complexity: O(n * (n + m) log(m)) 128ms
// Space Complexity: O(n + m) 61.4MB
function findTheCity(n, edges, distanceThreshold) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [from, to, weight] of edges) {
    graph[from].push([to, weight]);
    graph[to].push([from, weight]);
  }
  let city = 0, count = Infinity;
  for (let i = 0; i < n; i++) {
    let reachableCount = getReachable(i, graph, distanceThreshold);
    if (reachableCount < count) {
      city = i;
      count = reachableCount;
    } else if (reachableCount === count) {
      city = Math.max(city, i);
    }
  }
  return city;
};

function getReachable(start, graph, distanceThreshold) {
  let heap = new Heap((a, b) => a[1] - b[1]); // [node, dist]
  let dist = Array(graph.length).fill(Infinity);
  dist[start] = 0;
  heap.add([start, 0]);
  
  let reachable = 0;
  while (!heap.isEmpty()) {
    let [node, currDist] = heap.remove();
    if (currDist > distanceThreshold) break;
    if (currDist > dist[node]) continue;
    reachable++;
    
    for (let [nei, weight] of graph[node]) {
      let newDist = currDist + weight;
      if (newDist < dist[nei]) {
        dist[nei] = newDist;
        heap.add([nei, newDist]);
      }
    }
  }
  return reachable - 1;
}

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
console.log(findTheCity(4, [[0,1,3],[1,2,1],[1,3,4],[2,3,1]], 4)) // 3
console.log(findTheCity(5,[[0,1,2],[0,4,8],[1,2,3],[1,4,2],[2,3,1],[3,4,1]], 2)) // 0