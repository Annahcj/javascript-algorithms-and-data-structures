// 2049. Count Nodes With the Highest Score
// There is a binary tree rooted at 0 consisting of n nodes. The nodes are labeled from 0 to n - 1. You are given a 0-indexed integer array parents representing the tree, where parents[i] is the parent of node i. Since node 0 is the root, parents[0] == -1.
// Each node has a score. To find the score of a node, consider if the node and the edges connected to it were removed. The tree would become one or more non-empty subtrees. The size of a subtree is the number of the nodes in it. The score of the node is the product of the sizes of all those subtrees.
// Return the number of nodes that have the highest score.


// Solution: DFS

// 1. Turn parents into a graph 
// 2. Create a map for scores, and keep track of the max score
// 3. dfs starting from 0
  // keep track of: score for current node, node count for this subtree
  // loop through the children of node
    // let childNodes be dfs(child)
    // add childNodes count to nodeCount
    // multiply score with childNodes
  // multiply score with n - nodeCount, or 1 if it's equal to 0.
  // increment the count of occurances of current score
  // return nodeCount
// 4. return the number of nodes with a score equal to maxScore

// n = number of nodes in parents
// Time Complexity: O(n) 530ms
// Space Complexity: O(n) 99.3MB
var countHighestScoreNodes = function(parents) {
  let n = parents.length;
  let graph = {};
  for (var i = 1; i < parents.length; i++) {
    if (!graph[parents[i]]) graph[parents[i]] = [];
    graph[parents[i]].push(i);
  }
  let scores = new Map(), maxScore = 0;
  dfs(0);
  return scores.get(maxScore);

  function dfs(node) {
    let score = 1, nodeCount = 1;
    for (var child of (graph[node] || [])) {
      let childNodes = dfs(child);
      nodeCount += childNodes;
      score *= childNodes;
    }
    score *= Math.max(n - nodeCount, 1);
    scores.set(score, (scores.get(score) || 0) + 1);
    maxScore = Math.max(maxScore, score);
    return nodeCount;
  }
};

// Two test cases to run function on
console.log(countHighestScoreNodes([-1,3,3,5,7,6,0,0])) // 2
console.log(countHighestScoreNodes([-1,2,0,2,0])) // 3
console.log(countHighestScoreNodes([-1,2,0])) // 2