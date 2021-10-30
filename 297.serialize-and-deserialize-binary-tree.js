// 297. Serialize and Deserialize Binary Tree


// Solution 1: BFS

// Runtime on LeetCode: 128ms
// Memory Usage on LeetCode: 50.5MB

// Include null as part of the string, represented by '#'.
// BFS through the tree, left to right.
var serialize = function(root) {
  let res = "";
  if (!root) return res;
  let queue = [root];
  while (queue.length) {
    let node = queue.shift();
    if (!node) {
      res += "#,";
      continue;
    }
    res += node.val + ',';
    queue.push(node.left);
    queue.push(node.right);
  }
  return res;
};

var deserialize = function(data) {
  // split and pop out last space
  if (!data.length) return null;
  data = data.split(",");
  data.pop();
  let tree = new TreeNode(+data[0]);
  let idx = 1;
  // bfs to get next node each time
  let queue = [tree];
  while (queue.length) {
    let curr = queue.shift();
    curr.left = createNode(idx);
    curr.right = createNode(idx + 1);
    idx += 2;
    if (curr.left) queue.push(curr.left);
    if (curr.right) queue.push(curr.right);
  }
  return tree;
  
  // creates a node with value at the given index, or returns null if value is null or out of bounds.
  function createNode(idx) {
    if (idx >= data.length || data[idx] === '#') {
      return null;
    }
    return new TreeNode(+data[idx]);
  }
};

// Solution 2: Preorder Recursive DFS

// Runtime on LeetCode: 116ms
// Memory Usage on LeetCode: 49.7MB

var serialize = function(root) {
  let res = "";
  if (!root) return res;
  dfs(root);
  return res;

  // recursive preorder dfs -> as left and deep as possible, then right.
  // if node is null, append # and return.
  function dfs(node) {
    if (!node) {
      res += '#,';
      return;
    }
    res += node.val + ',';
    dfs(node.left);
    dfs(node.right);
  }
};

var deserialize = function(data) {
  // split by commas, pop out space at the back, and reverse so that taking out each value will be O(1) time.
  data = data.split(",");
  data.pop();
  data.reverse();
  return buildTree();

  // building tree by preorder dfs, going as left and deep as possible, then going right.
  function buildTree() {
    if (!data.length) return null;
    let val = data.pop();
    if (val === '#') return null;
    let node = new TreeNode(+val);
    node.left = buildTree();
    node.right = buildTree();
    return node;
  }
};