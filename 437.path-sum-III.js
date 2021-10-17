// 437. Path Sum III
// Given the root of a binary tree and an integer targetSum, return the number of paths where the sum of the values along the path equals targetSum.
// The path does not need to start or end at the root or a leaf, but it must go downwards (i.e., traveling only from parent nodes to child nodes).


// Solution: Cumulative/Prefix Sum

// use a hashmap to store the cumulative sums, set sum of 0 to 1 (for paths that start from the root node)
// call dfs(root, 0)
// return ans

// dfs: node, current sum
  // base case: if node is invalid (null), return null
  // add node's value to currSum
  // if map contains (currSum - targetSum), increment the count to ans (counting any sub-paths which sum up to targetSum)
  // increment frequency of currSum by 1

  // traverse left child
  // traverse right child

  // remove this occurance of currSum from map, this is because we only want the path (from node to parent nodes)

// Time Complexity: O(n) 84ms
// Space Complexity: O(n) (call stack) 43.8MB
var pathSum = function(root, targetSum) {
  let map = new Map(), ans = 0;
  map.set(0, 1);
  dfs(root, 0);
  return ans;

  function dfs(node, currSum) {
    if (!node) return null;
    currSum += node.val;
    ans += map.get(currSum - targetSum) || 0;

    map.set(currSum, (map.get(currSum) || 0) + 1);

    dfs(node.left, currSum);
    dfs(node.right, currSum);

    map.set(currSum, map.get(currSum) - 1);
  }  
};