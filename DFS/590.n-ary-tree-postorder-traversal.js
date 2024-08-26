// 590. N-ary Tree Postorder Traversal
// Given the root of an n-ary tree, return the postorder traversal of its nodes' values.
// Nary-Tree input serialization is represented in their level order traversal. Each group of children is separated by the null value (See examples)


// Solution 1: Recursive DFS

// Time Complexity: O(n) 78ms
// Space Complexity: O(n) 53.2MB
var postorder = function(root) {
  let values = [];
  dfs(root);
  return values;
  
  function dfs(node) {
    if (!node) return;
    for (let child of node.children) {
      dfs(child);
    }
    values.push(node.val);
  }  
};


// Solution 2: Iterative DFS w/ Stack

// Simulate the recursive call stack.
// We visit each node twice - first to visit the left and right subtrees, and the second time to collect the node value.

// Time Complexity: O(n) 78ms
// Space Complexity: O(n) 55MB
var postorder = function(root) {
  if (!root) return [];
  let stack = [{visitedChildren: false, node: root}];
  let values = [];
  while (stack.length) {
    let {visitedChildren, node} = stack.pop();
    if (!visitedChildren) {
      stack.push({visitedChildren: true, node});
      // in reverse because we need to visit the leftmost children first
      for (let i = node.children.length - 1; i >= 0; i--) {
        stack.push({visitedChildren: false, node: node.children[i]});
      }
    } else {
      values.push(node.val);
    }
  }
  return values;
};