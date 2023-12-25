// 2976. Minimum Cost to Convert String I
// You are given two 0-indexed strings source and target, both of length n and consisting of lowercase English letters. You are also given two 0-indexed character arrays original and changed, and an integer array cost, where cost[i] represents the cost of changing the character original[i] to the character changed[i].
// You start with the string source. In one operation, you can pick a character x from the string and change it to the character y at a cost of z if there exists any index j such that cost[j] == z, original[j] == x, and changed[j] == y.
// Return the minimum cost to convert the string source to the string target using any number of operations. If it is impossible to convert source to target, return -1.
// Note that there may exist indices i, j such that original[j] == original[i] and changed[j] == changed[i].


// Solution 1: Dijkstra's Algorithm

// Since each original[i] and changed[i] will be a lowercase letter, there are only 26 characters.
// Find the minimum cost between each pair of characters (26 * 26).
// For each character i, use Dijkstra's algorithm to find the minimum cost from i to each other character.
// Go through each source[i] and check if it's possible to turn source[i] into target[i] and use the precomputed minimum cost.

// n = length of source, m = length of original, k = number of characters
// Time Complexity: O(m + n + k * (k + m log(m))) 215ms
// Space Complexity: O(m + k^2) 56.9MB
var minimumCost = function(source, target, original, changed, cost) {
  let graph = Array(26).fill(0).map(() => []);
  for (let i = 0; i < original.length; i++) {
    graph[original[i].charCodeAt() - 97].push([changed[i].charCodeAt() - 97, cost[i]]);
  }
  let minCost = Array(26); // minCost[i][j] = minimum cost from character i to character j
  for (let i = 0; i < 26; i++) {
    minCost[i] = getDist(graph, i);
  }
  let totalCost = 0;
  for (let i = 0; i < source.length; i++) {
    let sourceCharcode = source.charCodeAt(i) - 97;
    let targetCharcode = target.charCodeAt(i) - 97;
    if (minCost[sourceCharcode][targetCharcode] === Infinity) return -1;
    totalCost += minCost[sourceCharcode][targetCharcode];
  }
  return totalCost;
};

function getDist(graph, src) {
  let dist = Array(graph.length).fill(Infinity);
  let heap = new Heap((a, b) => a[1] - b[1]);
  heap.add([src, 0]);
  dist[src] = 0;

  while (!heap.isEmpty()) {
    let [node, cost] = heap.remove();
    if (dist[node] < cost) continue;
    for (let [nei, weight] of graph[node]) {
      if (dist[nei] > cost + weight) {
        dist[nei] = Math.min(dist[nei], cost + weight);
        heap.add([nei, cost + weight]);
      }
    }
  }
  return dist;
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


// Solution 2: Floyd–Warshall

// The same approach as solution 1, but we use the Floyd-Warshall algorithm to find the minimum costs instead of Dijkstra's algorithm.
// It will be slower, O(k^3), but simpler.

// n = length of source, m = length of original, k = number of characters
// Time Complexity: O(m + n + k^3) 153ms
// Space Complexity: O(k^2) 53.8MB
var minimumCost = function(source, target, original, changed, cost) {
  let m = original.length, minCost = Array(26).fill(0).map(() => Array(26).fill(Infinity));
  for (let i = 0; i < m; i++) {
    let originalCharcode = original[i].charCodeAt() - 97;
    let changedCharcode = changed[i].charCodeAt() - 97;
    minCost[originalCharcode][changedCharcode] = Math.min(minCost[originalCharcode][changedCharcode], cost[i]);
  }
  for (let i = 0; i < 26; i++) minCost[i][i] = 0;
  // floyd warshall to find minimum cost between each pair of nodes
  for (let k = 0; k < 26; k++) { // use all paths with node k
    for (let i = 0; i < 26; i++) {
      for (let j = 0; j < 26; j++) {
        minCost[i][j] = Math.min(minCost[i][j], minCost[i][k] + minCost[k][j]);
      }
    }
  }
  
  let totalCost = 0;
  for (let i = 0; i < source.length; i++) {
    let sourceCharcode = source.charCodeAt(i) - 97;
    let targetCharcode = target.charCodeAt(i) - 97;
    if (minCost[sourceCharcode][targetCharcode] === Infinity) return -1;
    totalCost += minCost[sourceCharcode][targetCharcode];
  }
  return totalCost;
};

// Three test cases
console.log(minimumCost("abcd", "acbe", ["a","b","c","c","e","d"], ["b","c","b","e","b","e"], [2,5,5,1,2,20])) // 28
console.log(minimumCost("aaaa", "bbbb", ["a","c"], ["c","b"], [1,2])) // 12
console.log(minimumCost("abcd", "abce", ["a"], ["e"], [10000])) // -1