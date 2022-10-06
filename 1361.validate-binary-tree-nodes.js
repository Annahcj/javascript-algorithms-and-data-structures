// 1361. Validate Binary Tree Nodes
// You have n binary tree nodes numbered from 0 to n - 1 where node i has two children leftChild[i] and rightChild[i], return true if and only if all the given nodes form exactly one valid binary tree.
// If node i has no left child then leftChild[i] will equal -1, similarly for the right child.
// Note that the nodes have no values and that we only use the node numbers in this problem.


// Solution: DFS

// Properties of a valid binary tree:
  // Each node has no more than 2 children.
  // Each node has only 1 parent (except the root which has no parent).
  // There are no cycles.

// 1. Find the root. This is the node with no parent.
  // If there is no such nodes, or there are multiple nodes with no parents, it will not be a valid binary tree. 
  
// 2. Recursively DFS from the root. If we ever visit a node more than once, it is an invalid binary tree. 

// 3. Additionally, we need to check that each node can be visited from the root node.

// Time Complexity: O(n) 146ms
// Space Complexity: O(n) 46.8MB
var validateBinaryTreeNodes = function(n, leftChild, rightChild) {
  let seen = Array(n).fill(0), root = getRoot();
  return dfs(root) && allSeen(seen);
  
  function getRoot() {
    let hasParent = Array(n).fill(0);
    for (let i = 0; i < n; i++) {
      hasParent[leftChild[i]] = 1;
      hasParent[rightChild[i]] = 1;
    }
    return hasParent.indexOf(0);
  }
  
  function dfs(node) {
    if (node === -1) return true;
    if (seen[node]) return false;
    seen[node] = 1;
    return dfs(leftChild[node]) && dfs(rightChild[node]);
  }
  
  function allSeen(seen) {
    for (let i = 0; i < n; i++) {
      if (!seen[i]) return false;
    }
    return true;
  }
};

// Three test cases
console.log(validateBinaryTreeNodes(4, [1,-1,3,-1], [2,-1,-1,-1])) // true
console.log(validateBinaryTreeNodes(4, [1,-1,3,-1], [2,3,-1,-1])) // false
console.log(validateBinaryTreeNodes(2, [1,0], [-1,-1])) // false