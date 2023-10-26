// 779. K-th Symbol in Grammar
// We build a table of n rows (1-indexed). We start by writing 0 in the 1st row. Now in every subsequent row, we look at the previous row and replace each occurrence of 0 with 01, and each occurrence of 1 with 10.
  // For example, for n = 3, the 1st row is 0, the 2nd row is 01, and the 3rd row is 0110.
// Given two integer n and k, return the kth (1-indexed) symbol in the nth row of a table of n rows.


// Solution: Post-order DFS

// Think of it as a complete binary tree.
//     0
//    /  \
//   0     1
//  / \   / \
// 0   1 1   0

// Observe the following:
  // 1. We can find the index of the parent node using Math.ceil(k / 2), starting from the bottom row until we reach the top row.
  // 2. Based on the value of the parent node, we can find the value of the child node.
    // If the node is a left child of the parent node (k % 2 === 1), it will always take the same value as the parent.
    // If the node is a right child of the parent node (k % 2 === 0), it will always take the opposite value than the parent.

// Use post-order DFS to find the value of the parent nodes, with the base case as row 1, returning the root value 0.

// Time Complexity: O(n) 42ms
// Space Complexity: O(n) 41.6MB
var kthGrammar = function(n, k) {
  if (n === 1) return 0;

  let parentValue = kthGrammar(n - 1, Math.ceil(k / 2));
  if (k % 2 === 1) {
    return parentValue;
  } else {
    return 1 ^ parentValue;
  }
};

// Three test cases
console.log(kthGrammar(1, 1)) // 0
console.log(kthGrammar(2, 1)) // 0
console.log(kthGrammar(2, 2)) // 1