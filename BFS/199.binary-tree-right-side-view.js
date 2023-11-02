// 199. Binary Tree Right Side View
// Given the root of a binary tree, imagine yourself standing on the right side of it, return the values of the nodes you can see ordered from top to bottom.

// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// Solution 1: BFS with Two Queues

// Loop while queue is not empty *
  // set next to an empty array (next level)
  // take val of last node of queue, push into res
  // loop while queue is not empty **
    // let curr (current node) be queue.shift (has to be in order left to right)
    // if curr has left child, push it into next
    // if curr has right child, push it into next
  // **
  // update queue to next
// *
// return res

// Time Complexity: O(n) 80ms
// Space Complexity: O(n) 40.4MB
var rightSideView = function(root) {
  let queue = [root], res = [];
  if (!root) return [];
  while (queue.length) {
    let next = [];
    res.push(queue[queue.length - 1].val);
    while (queue.length) {
      let curr = queue.shift();
      if (curr.left) next.push(curr.left);
      if (curr.right) next.push(curr.right);
    }
    queue = next;
  }
  return res;
};

// Solution 2: DFS Recursive

// res (result) = []
// call dfs(root, 0) 
// dfs: (node, lvl (level))
  // base case: if node is undefined, return.
  // update res[lvl] to node.val 
  // recursively call dfs(node.left, lvl + 1)
  // recursively call dfs(node.right, lvl + 1)
// return res

// Time Complexity: O(n) 76ms
// Space Complexity: O(n) 40.3MB
var rightSideView = function(root) {
  let res = [];
  dfs(root, 0);
  function dfs(node, lvl) {
    if (!node) return;
    res[lvl] = node.val;
    dfs(node.left, lvl + 1);
    dfs(node.right, lvl + 1);
  }
  return res;
};

// Three test cases to run function on
console.log(rightSideView(new TreeNode(1, new TreeNode(2, null, new TreeNode(5)), new TreeNode(3, null, new TreeNode(4))))) // [1,3,4]
console.log(rightSideView(new TreeNode(1, null, new TreeNode(3)))) // [1,3]
console.log(rightSideView()) // []