// 449. Serialize and Deserialize BST
// Serialization is converting a data structure or object into a sequence of bits so that it can be stored in a file or memory buffer, or transmitted across a network connection link to be reconstructed later in the same or another computer environment.
// Design an algorithm to serialize and deserialize a binary search tree. There is no restriction on how your serialization/deserialization algorithm should work. You need to ensure that a binary search tree can be serialized to a string, and this string can be deserialized to the original tree structure.
// The encoded string should be as compact as possible.


// Solution: Preorder DFS

// Runtime on LeetCode: 100ms
// Memory Usage on LeetCode: 46.6MB


// preorder dfs, add values of nodes to a string with commas.
// T.C: O(n)
var serialize = function(root) {
  let res = "";
  dfs(root);
  return res;
  function dfs(node) {
    if (!node) return null;
    res += node.val + ',';
    dfs(node.left);
    dfs(node.right);
  }
};

// 1. split the string by commas, 
// 2. pop out the last item (since we put an extra comma, it will be an empty string).
// 3. reverse data so that we can pop from the back in O(1) time, instead of shifting (O(n)).

// 4. create the tree, keep lower and upper bounds.
  // createNode: (lower bound, upper bound)
    // base case: if data has no more items, return null.
    // if last item is not within the bounds, return null.
    // pop out the last item.
    // create a new node with the value of the last item.
    // set new node's left child to createNode(lower bound, value of last item)
    // set new node's right child to createNode(value of last item, upper bound)
    // return new node for earlier calls

// T.C: O(n)
var deserialize = function(data) {
  data = data.split(",");
  data.pop();
  data.reverse();
  return createTree(-Infinity, Infinity);

  function createTree(lower, upper) {
    if (!data.length) return null;
    let val = +data[data.length - 1];
    if (val < lower || val > upper) return null;
    data.pop();
    let node = new TreeNode(val);
    node.left = createTree(lower, val);
    node.right = createTree(val, upper);
    return node;
  }
};