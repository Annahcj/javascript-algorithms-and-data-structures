// 1522. Diameter of N-Ary Tree
// Given a root of an N-ary tree, you need to compute the length of the diameter of the tree.


// LeetCode provided Node
function Node(val, children) {
 this.val = val === undefined ? 0 : val;
 this.children = children === undefined ? [] : children;
};

// Solution: Recursive DFS

// recursively dfs from the root
// for every node, keep two children which have the largest depth.
// check the sum of these two children's depths with our answer 'maxLen'
// return the child with the largest depth.

// Time Complexity: O(n) 92ms
// Space Complexity: O(n) 41.9MB
var diameter = function(root) {
  let maxLen = 0;
  dfs(root);
  return maxLen;
    
  function dfs(node) {
    // if node has no children, max will be left as 0, and we will return 0 + 1 (1) as the node's depth
    let max = 0, secondMax = 0;
    for (var child of node.children) {
      let childDepth = dfs(child);
      if (childDepth > max) {
        secondMax = max;
        max = childDepth; 
      } else if (childDepth > secondMax) {
        secondMax = childDepth;
      }
    }
    // max + secondMax is the longest path between any two children of node
    maxLen = Math.max(maxLen, max + secondMax);
    // return the best path
    return max + 1;
  }  
};