// 2096. Step-By-Step Directions From a Binary Tree Node to Another
// You are given the root of a binary tree with n nodes. Each node is uniquely assigned a value from 1 to n. You are also given an integer startValue representing the value of the start node s, and a different integer destValue representing the value of the destination node t.
// Find the shortest path starting from node s and ending at node t. Generate step-by-step directions of such path as a string consisting of only the uppercase letters 'L', 'R', and 'U'. Each letter indicates a specific direction:
  // 'L' means to go from a node to its left child node.
  // 'R' means to go from a node to its right child node.
  // 'U' means to go from a node to its parent node.
// Return the step-by-step directions of the shortest path from node s to node t.


// Solution: LCA

// Find the LCA of the start node and destination node.
// From there, we can use DFS to find the directions from the start node to the LCA, and from the destination node to the LCA.

// 1. Use DFS to find each parent node and store in a hashmap (we need this for finding the LCA).
// 2. Traverse from the start node to the root and populate the depths of each node (this is to know the number of 'U' steps it takes to get from start node to LCA).
// 3. Find the LCA of start and dest node by traversing up from the destination node until finding a node already visited from the start node's path.
// 4. Build up the final path: 
  // The path from start node to the LCA is 'U' directions repeated by the length of the path.
  // The path from LCA to the destination node.

// Time Complexity: O(n) 277ms
// Space Complexity: O(n) 95.6MB
function getDirections(root, startValue, destValue) {
  let depth = {}, startNode = getNode(root, startValue);
  let currDepth = 0, parentMap = getParentMap(root);
  while (true) {
    depth[startNode.val] = currDepth;
    currDepth++;
    if (startNode === root) break;
    startNode = parentMap[startNode.val];
  }
  let destNode = getNode(root, destValue);
  let destPath = [], lcaDepth = -1;
  while (true) {
    if (depth[destNode.val] !== undefined) {
      lcaDepth = depth[destNode.val];
      break;
    }
    let parent = parentMap[destNode.val];
    let isLeft = parent.left === destNode;
    destPath.push(isLeft ? 'L' : 'R');
    destNode = parent;
  }
  return 'U'.repeat(lcaDepth) + destPath.reverse().join("");
};

function getNode(node, val) {
  if (!node) return null;
  if (node.val === val) return node;
  return getNode(node.left, val) || getNode(node.right, val);
}

function getParentMap(root) {
  let parentMap = {};
  dfs(root);
  return parentMap;
  
  function dfs(node) {
    if (!node) return;
    if (node.left) {
      parentMap[node.left.val] = node;
      dfs(node.left);
    }
    if (node.right) {
      parentMap[node.right.val] = node;
      dfs(node.right);
    }
  }
}

// Two test cases
console.log(getDirections(makeTree([5,1,2,3,null,6,4]), 3, 6)) // "UURL"
console.log(getDirections(makeTree([2,1]), 2, 1)) // "L"