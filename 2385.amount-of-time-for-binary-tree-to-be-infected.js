// 2385. Amount of Time for Binary Tree to Be Infected
// You are given the root of a binary tree with unique values, and an integer start. At minute 0, an infection starts from the node with value start.
// Each minute, a node becomes infected if:
  // The node is currently uninfected.
  // The node is adjacent to an infected node.
// Return the number of minutes needed for the entire tree to be infected.


// Solution: Parent Hashmap & BFS

// 1. DFS through the tree to record the parent node of each node in a hashmap and get the start node.
// 2. Level-by-level BFS from the start node to get the total time to reach every node.
  // Keep track of nodes we have visited to avoid revisiting.
  // From every node, visit the parent, left child, and right child if they haven't been visited.

// Time Complexity: O(n) 415ms
// Space Complexity: O(n) 90.1MB
var amountOfTime = function(root, start) {
  let parent = new Map(), startNode = null;
  getParent(root);
  let seen = new Set([startNode.val]), queue = [startNode], time = 0;
  while (queue.length) {
    for (let i = queue.length - 1; i >= 0; i--) {
      let node = queue.shift();
      
      if (parent.has(node.val)) {
        let nodeParent = parent.get(node.val);
        if (!seen.has(nodeParent.val)) {
          queue.push(nodeParent);
          seen.add(nodeParent.val);
        }
      }
      if (node.left && !seen.has(node.left.val)) {
        queue.push(node.left);
        seen.add(node.left.val);
      }
      if (node.right && !seen.has(node.right.val)) {
        queue.push(node.right);
        seen.add(node.right.val);
      }
    }
    time++;
  }
  return time - 1;
  
  function getParent(node) {
    if (node.val === start) startNode = node;
    if (node.left) { // record the parent of the left child
      parent.set(node.left.val, node);
      getParent(node.left);
    }
    if (node.right) { // record the parent of the right child
      parent.set(node.right.val, node);
      getParent(node.right);
    } 
  }  
};