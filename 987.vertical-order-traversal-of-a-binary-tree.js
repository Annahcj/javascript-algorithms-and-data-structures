// 987. Vertical Order Traversal of a Binary Tree
// Given the root of a binary tree, calculate the vertical order traversal of the binary tree.
// For each node at position (row, col), its left and right children will be at positions (row + 1, col - 1) and (row + 1, col + 1) respectively. The root of the tree is at (0, 0).
// The vertical order traversal of a binary tree is a list of top-to-bottom orderings for each column index starting from the leftmost column and ending on the rightmost column. There may be multiple nodes in the same row and same column. In such a case, sort these nodes by their values.
// Return the vertical order traversal of the binary tree.


// LeetCode provided TreeNode
function TreeNode(val, left, right) {
  this.val = (val===undefined ? 0 : val)
  this.left = (left===undefined ? null : left)
  this.right = (right===undefined ? null : right)
}

// generates a binary tree from an array (TESTING PURPOSES ONLY!)
function makeTree(arr) {
  if (!arr.length) return null;
  let root = new TreeNode(arr.shift());
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    let left = arr.shift();
    let right = arr.shift();
    if (left) {
      node.left = new TreeNode(left);
      queue.push(node.left);
    }
    if (right) {
      node.right = new TreeNode(right);
      queue.push(node.right);
    }
  }
  return root;
}

// Solution 1: Two Pass Recursive DFS w/ Sorting

// 1. DFS to get the minimum and maximum column of the tree. With this information we can create the result array and also obtain the offset.
// 2. DFS to populate result with each node as [row, node value].
// 3. Sort each result[i] by row, otherwise by node value if they are on the same row. Filter out result[i] to only contain node values. 

// Time Complexity: O(n log(n)) 125ms
// Space Complexity: O(n) 40.7MB
var verticalTraversal = function(root) {
  let minCol = 0, maxCol = 0;
  getMinCol(root, 0);
  let offset = Math.abs(minCol);
  let n = maxCol + offset + 1;
  let res = Array(n);
  for (var i = 0; i < n; i++) res[i] = [];

  dfs(root, 0, 0);
  for (i = 0; i < n; i++) {
    res[i].sort((a, b) => {
      if (a[0] === b[0]) return a[1] - b[1];
      return a[0] - b[0];
    })
    for (var j = 0; j < res[i].length; j++) res[i][j] = res[i][j][1];
  }
  return res;

  function getMinCol(node, col) {
    if (!node) return;
    minCol = Math.min(minCol, col);
    maxCol = Math.max(maxCol, col);
    getMinCol(node.left, col - 1);
    getMinCol(node.right, col + 1);
  }
  function dfs(node, row, col) {
    if (!node) return;
    res[col + offset].push([row, node.val]);
    dfs(node.left, row + 1, col - 1);
    dfs(node.right, row + 1, col + 1);
  }
};

// Solution 2: More Concise Recursive DFS

// 1. DFS to get { node value, row, column } for each node. Store them in an array 'nodes'.
// 2. Sort nodes by column, then by row, then by node value.
// 3. Group together nodes that share the same column.

// Time Complexity: O(n log(n)) 80ms
// Space Complexity: O(n) 41MB
var verticalTraversal = function(root) {
  let nodes = [];
  dfs(root, 0, 0);

  nodes.sort((a, b) => { // sort by column, then row, then node value.
    if (a.col === b.col) {
      if (a.row === b.row) return a.val - b.val;
      return a.row - b.row;
    }
    return a.col - b.col;
  })

  let res = [];
  for (var i = 0; i < nodes.length; i++) { // group together nodes that share the same column, and filter to only keep the node value.
    if (i === 0 || nodes[i].col !== nodes[i - 1].col) res.push([]); 
    res[res.length - 1].push(nodes[i].val);
  }
  return res;

  function dfs(node, row, col) { // get information from each node and store in 'nodes'
    if (!node) return;
    nodes.push({val: node.val, row, col});
    dfs(node.left, row + 1, col - 1);
    dfs(node.right, row + 1, col + 1);
  }
};

// Three test cases to run function on
console.log(verticalTraversal(makeTree([3,9,20,null,null,15,7]))) // [[9],[3,15],[20],[7]]
console.log(verticalTraversal(makeTree([1,2,3,4,5,6,7]))) // [[4],[2],[1,5,6],[3],[7]]
console.log(verticalTraversal(makeTree([1,2,3,4,6,5,7]))) // [[4],[2],[1,5,6],[3],[7]]