// 1490. Clone N-ary Tree
// Given a root of an N-ary tree, return a deep copy (clone) of the tree.

// LeetCode provided Node
function Node(val, children) {
  this.val = val === undefined ? 0 : val;
  this.children = children === undefined ? [] : children;
};

// Solution: Recursive DFS

// dfs:
// create a copy of the node -> copyNode
// loop through children of the node
  // push dfs(child) to copyNode.children
// return copyNode

// Time Complexity: O(n) 129ms
// Space Complexity: O(n) 45.8MB
var cloneTree = function(root) {
  if (!root) return null;
  return dfs(root);
  
  function dfs(node) {
    let copyNode = new Node(node.val);
    for (let child of node.children) {
      copyNode.children.push(dfs(child));
    }
    return copyNode;
  }  
};

// A test case
console.log(cloneTree(new Node(1, [new Node(3, [new Node(5), new Node(6)]), new Node(2), new Node(4)])))