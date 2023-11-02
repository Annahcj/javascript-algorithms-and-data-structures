// 1519. Number of Nodes in the Sub-Tree With the Same Label
// You are given a tree (i.e. a connected, undirected graph that has no cycles) consisting of n nodes numbered from 0 to n - 1 and exactly n - 1 edges. The root of the tree is the node 0, and each node of the tree has a label which is a lower-case character given in the string labels (i.e. The node with the number i has the label labels[i]).
// The edges array is given on the form edges[i] = [ai, bi], which means there is an edge between nodes ai and bi in the tree.
// Return an array of size n where ans[i] is the number of nodes in the subtree of the ith node which have the same label as node i.
// A subtree of a tree T is the tree consisting of a node in T and all of its descendant nodes.


// Solution: DFS w/ Counting

// For every subtree, keep track of the occurance counts of each label.
// To get the label counts for a subtree, use an array of size 26 (there are 26 lowercase letters).
  // Combine the children subtrees' label counts with the current label counts 
  // Add 1 to the count for the current node label

// Time Complexity: O(26n) = O(n) 710ms
// Space Complexity: O(n) 130.5MB
var countSubTrees = function(n, edges, labels) {
  let graph = Array(n).fill(0).map(() => []);
  for (let [a, b] of edges) {
    graph[a].push(b);
    graph[b].push(a);
  }
  let ans = Array(n).fill(0);
  getCounts(0, -1);
  return ans;
  
  function getCounts(node, parent) { // returns label counts for subtree with root of node
    let labelCounts = Array(26).fill(0);
    let charcode = labels.charCodeAt(node) - 97;
    for (let child of graph[node]) {
      if (child === parent) continue; // don't revisit parent
      let childLabelCounts = getCounts(child, node);
      for (let i = 0; i < 26; i++) {
        labelCounts[i] += childLabelCounts[i]; // combine counts from children subtree
      }
    }
    labelCounts[charcode]++;
    ans[node] = labelCounts[charcode];
    return labelCounts;
  }  
};

// Two test cases
console.log(countSubTrees(7, [[0,1],[0,2],[1,4],[1,5],[2,3],[2,6]], "abaedcd")) // [2,1,1,1,1,1,1]
console.log(countSubTrees(4, [[0,1],[1,2],[0,3]], "bbbb")) // [4,2,1,1]