// 113. Path Sum II
// Given the root of a binary tree and an integer targetSum, return all root-to-leaf paths where each path's sum equals targetSum.
// A leaf is a node with no children.


// LeetCode provided TreeNode
  function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
  }
  
  // Solution 1: DFS Iteratively (Using Stack)
  
  // If root is undefined, return [].
  // Set paths (the result) to [].
  //                                                 path       sum
  // Initialize a stack, start it off with [root, [root.val], root.val]
  // Loop while stack is not empty
    // Pop item off stack, save it in variables curr, path, currSum.
    // If node is a leaf (node with no children) AND currSum is equal to targetSum, push path into paths.
    // If curr has right child, push [right child, path.concat(curr.right.val), currSum + right child sum]
    // If curr has left child, push [left child, path.concat(curr.left.val), currSum + left child sum]
  // When stack becomes empty, return paths.
  
  // Time Complexity: O(n^2) (we search through each node in the tree and concat the path with new value each time) 104ms
  // Space Complexity: O(n) (size of stack) 46MB
  var pathSum = function(root, targetSum) {
    if (!root) return [];
    let paths = [];
    let stack = [[root, [root.val], root.val]];
    while (stack.length) {
      let [curr, path, currSum] = stack.pop();
      if (currSum === targetSum && !curr.left && !curr.right) paths.push([...path]);
      if (curr.right) stack.push([curr.right, path.concat(curr.right.val), currSum + curr.right.val]);
      if (curr.left) stack.push([curr.left, path.concat(curr.left.val), currSum + curr.left.val]);
    }
    return paths;
  };
  
  // Solution 2: DFS Recursively
  
  // Keep an array paths which we will return in the end.
  // Create a helper function 'dfs'
  // dfs: (keeps track of current node, path, sum)
    // If node is not valid, return.
    // Add node.val to sum
    // If node has no children and sum is equal to targetSum
      // Push node.val into current path
      // Push path into 'paths'
      // Pop node.val off paths
      // Return.
    // Otherwise, push node.val into current path
    // Recursively call dfs on node.left, path, sum
    // Recursively call dfs on node.right, path, sum
    // Pop node.val off path
  // When all paths are searched, return paths.
  
  // Time Complexity: O(n) 92ms
  // Space Complexity: O(n) (call stack) 41.8MB
  var pathSum = function(root, targetSum) {
    if (!root) return [];
    let paths = [];
    dfs(root, [], 0);
    function dfs(node, path, sum) {
      if (!node) return;
      sum += node.val;
      if (!node.left && !node.right && sum === targetSum) {
        path.push(node.val);
        paths.push([...path]);
        path.pop();
        return;
      }
      path.push(node.val);
      dfs(node.left, path, sum);
      dfs(node.right, path, sum);
      path.pop();
    }
    return paths;
  };
  
  // Two test cases to run function on
  console.log(pathSum(new TreeNode(5, new TreeNode(4, new TreeNode(11, new TreeNode(7), new TreeNode(2))), new TreeNode(8, new TreeNode(13), new TreeNode(4, new TreeNode(5), new TreeNode(1)))), 22)) // [[5,4,11,2],[5,8,4,5]]
  console.log(pathSum(new TreeNode(1, new TreeNode(2), new TreeNode(3)), 5)) // []