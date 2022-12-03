// 1145. Binary Tree Coloring Game
// Two players play a turn based game on a binary tree. We are given the root of this binary tree, and the number of nodes n in the tree. n is odd, and each node has a distinct value from 1 to n.
// Initially, the first player names a value x with 1 <= x <= n, and the second player names a value y with 1 <= y <= n and y != x. The first player colors the node with value x red, and the second player colors the node with value y blue.
// Then, the players take turns starting with the first player. In each turn, that player chooses a node of their color (red if player 1, blue if player 2) and colors an uncolored neighbor of the chosen node (either the left child, right child, or parent of the chosen node.)
// If (and only if) a player cannot choose such a node in this way, they must pass their turn. If both players pass their turn, the game ends, and the winner is the player that colored more nodes.
// You are the second player. If it is possible to choose such a y to ensure you win the game, return true. If it is not possible, return false.


// Solution: DFS

// There are two situations when the second player can win:
  // 1. Number of nodes in subtree of x < n / 2.
    // y can be the parent node, so x will take the entire subtree under it, and y can take the rest of the nodes.
  // 2. max(nodes in left subtree of x, nodes in right subtree of x) > n / 2
    // y can take the subtree with more nodes, and x can take the rest of the nodes.

// 1. Recursively DFS to find the node with value x.
// 2. Recursively DFS to find the number of nodes in the left subtree of node x.
// 3. Recursively DFS to find the number of nodes in the right subtree of node x.
// 4. If any of the two conditions above are met, return true.

// Time Complexity: O(n) 70ms
// Space Complexity: O(n) 43.9MB
var btreeGameWinningMove = function(root, n, x) {
  let nodeX = findX(root, x);
  let leftSubtreeCount = countNodes(nodeX.left);
  let rightSubtreeCount = countNodes(nodeX.right);
  let subtreeCount = leftSubtreeCount + rightSubtreeCount + 1;
  if (subtreeCount < n / 2) return true;
  if (Math.max(leftSubtreeCount, rightSubtreeCount) > n / 2) return true;
  return false;
};

function findX(node, x) {
  if (!node) return null;
  if (node.val === x) return node;
  return findX(node.left, x) || findX(node.right, x);
}

function countNodes(node) {
  if (!node) return 0;
  return 1 + countNodes(node.left) + countNodes(node.right);
}  