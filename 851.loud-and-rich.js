// 851. Loud and Rich
// There is a group of n people labeled from 0 to n - 1 where each person has a different amount of money and a different level of quietness.
// You are given an array richer where richer[i] = [ai, bi] indicates that ai has more money than bi and an integer array quiet where quiet[i] is the quietness of the ith person. All the given data in richer are logically correct (i.e., the data will not lead you to a situation where x is richer than y and y is richer than x at the same time).
// Return an integer array answer where answer[x] = y if y is the least quiet person (that is, the person y with the smallest value of quiet[y]) among all people who definitely have equal to or more money than the person x.


// Solution: Topological Sort

// Use topological sort to process the nodes.
  // Populate quietest, where quietest[i] = index of quietest person richer or equal richness to person i.
  // Exhaust all paths to a node before populating the quiestest person's index to the next nodes.

// V = number of people, E = number of edges 
// Time Complexity: O(V + E) 136ms
// Space Complexity: O(V) 53.1MB
var loudAndRich = function(richer, quiet) {
  let n = quiet.length, quietest = Array(n);
  for (let i = 0; i < n; i++) {
    quietest[i] = i;
  }
  let graph = Array(n).fill(0).map(() => []);
  let indegrees = Array(n).fill(0);
  let queue = [];
  for (let [x, y] of richer) {
    graph[x].push(y);
    indegrees[y]++;
  }
  for (let i = 0; i < n; i++) {
    if (indegrees[i] === 0) queue.push(i);
  }
  
  while (queue.length) {
    let node = queue.shift();
    for (let nei of graph[node]) {
      if (quiet[quietest[node]] < quiet[quietest[nei]]) {
        quietest[nei] = quietest[node];
      }
      indegrees[nei]--;
      if (indegrees[nei] === 0) queue.push(nei);
    }
  }
  return quietest;
};

// Two test cases to run function on
console.log(loudAndRich([[1,0],[2,1],[3,1],[3,7],[4,3],[5,3],[6,3]], [3,2,5,4,6,1,7,0])) // [5,5,2,5,4,5,6,7]
console.log(loudAndRich([], [0])) // [0]