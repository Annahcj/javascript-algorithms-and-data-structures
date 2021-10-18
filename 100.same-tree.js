// 100. Same Tree
// Given the roots of two binary trees p and q, write a function to check if they are the same or not.
// Two binary trees are considered the same if they are structurally identical, and the nodes have the same value.

// Solution 1: Recursive DFS

// base case 1: if p is null AND q is null, return true (they are equal)
// base case 2: if either p or q is null, return false (they are not equal)
// base case 3: if the values of p and q are not equal, return false.
// return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)

// Time Complexity: O(n) 72ms
// Space Complexity: O(n) (call stack) 39.9MB
var isSameTree = function(p, q) {
  if (!p && !q) return true;
  if (!p || !q) return false;
  if (p.val !== q.val) return false;
  return isSameTree(p.left, q.left) && isSameTree(p.right, q.right);
};


// Solution 2: Iterative DFS

// we could also use a stack instead of recursion.
// base case 1: if both node1 and node2 are null, continue.
// base case 2: if either one of the nodes are null, return false (since they are not equal)
// base case 3: if the values of the nodes are not equal, return false.
// push [node1.left, node2.left]
// push [node1.right, node2.right]

// if we reach the end, return true

// Time Complexity: O(n) 68ms
// Space Complexity: O(n) (stack) 40.1MB
var isSameTree = function(p, q) {
  let stack = [[p, q]];
  while (stack.length) {
    let [node1, node2] = stack.pop();
    if (!node1 && !node2) continue;
    if (!node1 || !node2) return false;
    if (node1.val !== node2.val) return false;
    stack.push([node1.left, node2.left]);
    stack.push([node1.right, node2.right]);
  }
  return true;
};