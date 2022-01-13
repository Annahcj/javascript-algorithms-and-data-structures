// 2003. Smallest Missing Genetic Value in Each Subtree
// There is a family tree rooted at 0 consisting of n nodes numbered 0 to n - 1. You are given a 0-indexed integer array parents, where parents[i] is the parent for node i. Since node 0 is the root, parents[0] == -1.
// There are 105 genetic values, each represented by an integer in the inclusive range [1, 105]. You are given a 0-indexed integer array nums, where nums[i] is a distinct genetic value for node i.
// Return an array ans of length n where ans[i] is the smallest genetic value that is missing from the subtree rooted at node i.
// The subtree rooted at a node x contains node x and all of its descendant nodes.


// Solution: DFS

// Logic: Any node that doesn't have 1 in the subtree will have a smallest missing number of 1.

// Starting from the node with value 1, 
  // traverse the subtree (to mark subtree values as visited)
  // find the current smallest missing number according to the 'seen' array.
  // set the answer for the current node
  // go up to the parent node
// Repeat the above steps until we can't go up any further.

// Time Complexity: O(n) 464ms
// Space Complexity: O(n) 85.4MB
var smallestMissingValueSubtree = function(parents, nums) {
  let n = parents.length, seen = Array(n + 1).fill(0);
  let nodes = Array(n), start;
  for (var i = 0; i < n; i++) nodes[i] = [];

  // create nodes graph
  for (i = 0; i < n; i++) {
    if (nums[i] === 1) start = i; // find the node with value of 1
    if (i === 0) continue;
    nodes[parents[i]].push(i);
  }
  
  let res = Array(n).fill(1);
  if (start === undefined) return res;
  
  let min = 1, node = start;
  while (node > -1) {
    dfs(node); // dfs to visit all nodes in the subtree
    while (min <= n && seen[min]) { // find the smallest missing number
      min++; 
    }
    res[node] = min;
    node = parents[node]; // go up to parent
  }
  return res;
  
  function dfs(node) {
    if (seen[nums[node]]) return;
    seen[nums[node]] = 1;
    for (var child of nodes[node]) dfs(child);
  }
};

// Three test cases to run function on
console.log(smallestMissingValueSubtree([-1,0,0,2], [1,2,3,4])) // [5,1,1,1]
console.log(smallestMissingValueSubtree([-1,0,1,0,3,3], [5,4,6,2,1,3])) // [7,1,1,4,2,1]
console.log(smallestMissingValueSubtree([-1,2,3,0,2,4,1], [2,3,4,5,6,7,8])) // [1,1,1,1,1,1,1]