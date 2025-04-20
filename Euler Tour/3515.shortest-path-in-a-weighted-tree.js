// 3515. Shortest Path in a Weighted Tree
// You are given an integer n and an undirected, weighted tree rooted at node 1 with n nodes numbered from 1 to n. This is represented by a 2D array edges of length n - 1, where edges[i] = [u[i], v[i], w[i]] indicates an undirected edge from node u[i] to v[i] with weight w[i].
// You are also given a 2D integer array queries of length q, where each queries[i] is either:
  // [1, u, v, w'] – Update the weight of the edge between nodes u and v to w', where (u, v) is guaranteed to be an edge present in edges.
  // [2, x] – Compute the shortest path distance from the root node 1 to node x.
// Return an integer array answer, where answer[i] is the shortest path distance from node 1 to x for the ith query of [2, x].


// Solution: Euler Tour

// Euler tour to flatten the tree into an array, then use a segment tree to have efficient path queries.
  // 1. DFS through the tree from the root and record the entry and exit times for every node.
  // 2. For the entry time, store the positive value. For the exit time, store the negative value.
  // 3. Add these values to a segment tree.
  // To get the sum of values on a path from the root to a particular node i, 
    // Query the range sum from time 0 to node i's entry time.
    // The positive and negative values will cancel each other out in the range sum.
    // Hence, only nodes that we have not yet left, will have their value counted in the sum.

// To update a node value, simply update the values for the entry and exit times for that node, in the segment tree.

// n = number of nodes / number of edges, m = number of queries
// Time Complexity: O(n + m log(n)) 916ms
// Space Complexity: O(n) 195MB
function treeQueries(n, edges, queries) {
  const graph = Array(n).fill(0).map(() => []);
  for (let [u, v, w] of edges) {
    graph[u - 1].push([v - 1, w]);
    graph[v - 1].push([u - 1, w]);
  }
  const visitTime = Array(n).fill(0).map(() => []);
  const weights = [], parentMap = new Map();
  let time = 0;
  dfs(0, -1, 0); 
  const segTree = new SegmentTree(weights);
  const answer = [];
  for (let query of queries) {
    const type = query[0];
    if (type === 1) {
      const [u, v, w] = [query[1] - 1, query[2] - 1, query[3]];
      const child = parentMap.get(u) === v ? u : v;
      const [entryTime, exitTime] = visitTime[child];
      segTree.update(entryTime, w);
      segTree.update(exitTime, -w);
    } else {
      const x = query[1] - 1;
      answer.push(segTree.sumRange(0, visitTime[x][0]));
    }
  }
  return answer;

  function dfs(node, parent, weight) {
    visitTime[node][0] = time++;
    weights.push(weight);
    parentMap.set(node, parent);
    for (let [nei, neiWeight] of graph[node]) {
      if (nei === parent) continue;
      dfs(nei, node, neiWeight);
    }
    visitTime[node][1] = time++;
    weights.push(-weight);
  }
};

class SegmentTree {
  constructor(arr) {
    let n = arr.length;
    this.size = n;
    this.segTree = Array(n * 2).fill(0);
    this.build(arr);
  }
  build(arr) {
    let n = this.size;
    for (let i = n; i < n * 2; i++) {
      this.segTree[i] = arr[i - n];
    }
    for (let i = n - 1; i > 0; i--) {
      this.segTree[i] = this.segTree[i * 2] + this.segTree[i * 2 + 1];
    }
  }
  update(index, val) {
    let n = this.size, idx = index + n;
    this.segTree[idx] = val;
    idx = Math.floor(idx / 2);

    while (idx > 0) {
      this.segTree[idx] = this.segTree[idx * 2] + this.segTree[idx * 2 + 1];
      idx = Math.floor(idx / 2);
    }
  }
  sumRange(left, right) {
    let n = this.size, sum = 0;
    let left_idx = left + n, right_idx = right + n;
    while (left_idx <= right_idx) {
      if (left_idx % 2 === 1) sum += this.segTree[left_idx++];
      if (right_idx % 2 === 0) sum += this.segTree[right_idx--];
      left_idx = Math.floor(left_idx / 2);
      right_idx = Math.floor(right_idx / 2);
    }
    return sum;
  }
}

// Three test cases
console.log(treeQueries(2, [[1,2,7]], [[2,2],[1,1,2,4],[2,2]])) // [7,4]
console.log(treeQueries(3, [[1,2,2],[1,3,4]], [[2,1],[2,3],[1,1,3,7],[2,2],[2,3]])) // [0,4,2,7]
console.log(treeQueries(4, [[1,2,2],[2,3,1],[3,4,5]], [[2,4],[2,3],[1,2,3,3],[2,2],[2,3]])) // [8,3,2,5]