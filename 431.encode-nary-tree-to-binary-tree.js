// 431. Encode N-ary Tree to Binary Tree
// Design an algorithm to encode an N-ary tree into a binary tree and decode the binary tree to get the original N-ary tree. An N-ary tree is a rooted tree in which each node has no more than N children. Similarly, a binary tree is a rooted tree in which each node has no more than 2 children. There is no restriction on how your encode/decode algorithm should work. You just need to ensure that an N-ary tree can be encoded to a binary tree and this binary tree can be decoded to the original N-nary tree structure.
// Nary-Tree input serialization is represented in their level order traversal, each group of children is separated by the null value


// Solution: Recursive DFS

// Children of a node can be the left child of a binary tree node.
// Chain the same level children nodes as the right child, making it like a linked list: 1 -> 2 -> 3 (all as right children)

// An example from the discuss forum:
//    1
//  / | \
// 2  3  4

// to:

//  1
// /
// 2
//  \
//   3
//    \
//     4

// Time Complexity: O(n) 99ms
// Space Complexity: O(n) 47.4MB
class Codec {
  constructor() {
  }
  // Encodes an n-ary tree to a binary tree.
  encode = function(root) {
    if (!root) return null;
    let newNode = new TreeNode(root.val);
    if (root.children.length) newNode.left = this.encode(root.children[0]);
    let sameLevel = newNode.left;
    
    for (let i = 1; i < root.children.length; i++) {
      sameLevel.right = this.encode(root.children[i]);
      sameLevel = sameLevel.right;
    }
    return newNode;
  };
  // Decodes your binary tree to an n-ary tree.
  decode = function(root) {
    if (!root) return null;
    let newNode = new Node(root.val, []);
    let childNode = root.left;
    while (childNode) {
      newNode.children.push(this.decode(childNode));
      childNode = childNode.right;
    }
    return newNode;
  };
}