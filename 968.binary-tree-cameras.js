// 968. Binary Tree Cameras
// You are given the root of a binary tree. We install cameras on the tree nodes where each camera at a node can monitor its parent, itself, and its immediate children.
// Return the minimum number of cameras needed to monitor all nodes of the tree.


// Solution: Recursive DFS

// There are three situations to take into account:
  // 1. Node is null, return CAMERA_NOT_NEEDED (we don't need a camera for the parent node)
  // 2. The left or right child does not have a camera: add a camera to the current node and increase the count.
  // 3. If the left or right child has a camera, then we don't need a camera. Otherwise we return NOT_COVERED for the parent nodes.

// Time Complexity: O(n) 103ms
// Space Complexity: O(h) 45.9MB
var minCameraCover = function(root) {
  let NO_CAMERA = 0, HAS_CAMERA = 1, CAMERA_NOT_NEEDED = -1, res = 0;
  return dfs(root) === 0 ? res + 1 : res;
  
  function dfs(node) {
    if (!node) return CAMERA_NOT_NEEDED;
    let left = dfs(node.left), right = dfs(node.right);
    if (left === NO_CAMERA || right === NO_CAMERA) {
      res++;
      return HAS_CAMERA;
    }
    return left === HAS_CAMERA || right === HAS_CAMERA ? CAMERA_NOT_NEEDED : NO_CAMERA;
  }  
};