// 3480. Maximize Subarrays After Removing One Conflicting Pair
// You are given an integer n which represents an array nums containing the numbers from 1 to n in order. Additionally, you are given a 2D array conflictingPairs, where conflictingPairs[i] = [a, b] indicates that a and b form a conflicting pair.
// Remove exactly one element from conflictingPairs. Afterward, count the number of non-empty subarrays of nums which do not contain both a and b for any remaining conflicting pair [a, b].
// Return the maximum number of subarrays possible after removing exactly one conflicting pair.


// Solution: Trie & AVL Tree

// Add every word to a trie, and on every trie node store the number of words that share that prefix.

// We know that every prefix with more than k words is guaranteed to be still there even if one word is removed.
// However, prefixes with exactly k words cannot be used if one word is removed.
// We need some sort of data structure that can:
  // 1. Store the lengths of the words, and efficiently get the maximum word length.
  // 2. Remove a word length if there were exactly k words that share that prefix.
// An AVL tree meets these criterias.

// Try to remove every words[i], by going through every trie node for that word and removing the word length from the AVL tree if there were exactly k words previously.
// After removing the word lengths, get the maximum word length remaining in the AVL tree.

// m = sum(words[i].length)
// Time Complexity: O(m log(m)) 1313ms
// Space Complexity: O(m) 95.4MB
function longestCommonPrefix(words, k) {
  const trie = new TrieNode();
  const avlTree = new AVLTree((a, b) => a - b);
  for (let word of words) {
    addWord(trie, avlTree, word, k);
  }
  const answer = [];
  for (let word of words) {
    let node = trie;
    for (let char of word) {
      node = node.children;
      node = node[char];
      if (node.count === k) {
        avlTree.remove(node.length);
      }
    }
    answer.push(avlTree.getKthLargest(1) ?? 0);
    node = trie;
    for (let char of word) {
      node = node.children;
      node = node[char];
      if (node.count === k) {
        avlTree.insert(node.length);
      }
    }
  }
  return answer;
};

class TrieNode {
  constructor() {
    this.children = {};
    this.count = 0; 
    this.length = 0;
  }
}

function addWord(trie, avlTree, word, k) {
  let node = trie;
  for (let i = 0; i < word.length; i++) {
    node = node.children;
    let char = word[i];
    if (!node[char]) node[char] = new TrieNode();
    node = node[char];
    node.count++;
    node.length = i + 1;
    if (node.count === k) {
      avlTree.insert(node.length);
    }
  }
}

class AVLTreeNode {
  constructor(val) {
    this.val = val;
    this.left = null;
    this.right = null;
    this.height = 1;
    this.size = 1; // number of nodes in tree rooted at this node
  }
}

class AVLTree {
  constructor() {
    this.root = null;
  }
  search(val, node = this.root) {
    if (!node) return null;
    if (node.val === val) return node;
    if (val < node.val) {
      return this.search(val, node.left);
    } else {
      return this.search(val, node.right);
    }
  }
  insert(val) {
    return this.root = this._insert(val, this.root);
  }
  _insert(val, node) {
    if (!node) return new AVLTreeNode(val);
    if (val < node.val) {
      node.left = this._insert(val, node.left);
    } else {
      node.right = this._insert(val, node.right);
    }
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);

    return this._rebalance(node);
  }
  remove(val, node = this.root) {
    // To ensure we don't delete all occurances of `val`, pass in the reference of one occurance.
    // To delete all nodes with value `val`, remove the check for `nodeToRemove` in _remove.
    const nodeToRemove = this.search(val, node);
    return this.root = this._remove(val, nodeToRemove, node);
  }
  // Four scenarios for deletion:
    // 1. node to delete has no children - just delete it
    // 2. node to delete only has a left child - replace it with the left child
    // 3. node to delete only has a right child - replace it with the right child
    // 4. node to delete has both left and right children - replace it with the next smallest node that is larger (use in order traversal to find the leftmost node in the right child)
  _remove(val, nodeToRemove, node) {
    if (!node) return null;
    if (val < node.val) {
      node.left = this._remove(val, nodeToRemove, node.left);
    } else if (val > node.val) {
      node.right = this._remove(val, nodeToRemove, node.right);
    } else if (val === node.val && node === nodeToRemove) {
      if (!node.left && !node.right) return null;
      if (!node.right) return node.left;
      if (!node.left) return node.right;

      // has both left and right children
      // inorder traversal on the right child to get the leftmost node
      // replace the node value with the leftmost node value and remove the leftmost node from the right subtree
      const leftmostNode = this._getLeftmost(node.right);
      node.val = leftmostNode.val;

      node.right = this._remove(leftmostNode.val, this.search(leftmostNode.val, node.right), node.right);
    } else {
      return node;
    }
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);

    return this._rebalance(node);
  }
  getKthLargestNode(k) {
    let node = this.root;
    if (!node || node.size <= 0 || node.size < k) return null; // there is no kth element

    while (node) {
      let rightSize = node.right?.size ?? 0;
      if (k === rightSize + 1) return node;
      if (rightSize >= k) {
        node = node.right;
      } else {
        k -= rightSize + 1;
        node = node.left;
      }
    }
    return null;
  }
  getKthLargest(k) {
    const kthLargest = this.getKthLargestNode(k);
    return kthLargest?.val ?? null;
  }
  _getLeftmost(node) {
    while (node.left) {
      node = node.left;
    }
    return node;
  }
  _getHeight(node = this.root) {
    return node ? node.height : 0;
  }
  getSize(node = this.root) {
    return node ? node.size : 0;
  }
  _getBalance(node = this.root) {
    return node ? this._getHeight(node.left) - this._getHeight(node.right) : 0;
  }
  _leftRotation(node) { 
    let rightNode = node.right;
    let rightNodeLeftChild = rightNode.left;
    rightNode.left = node;
    node.right = rightNodeLeftChild;

    // node is now below rightNode and needs to be updated first
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    rightNode.height = 1 + Math.max(this._getHeight(rightNode.left), this._getHeight(rightNode.right));

    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);
    rightNode.size = 1 + this.getSize(rightNode.left) + this.getSize(rightNode.right);

    return rightNode; // right node is the new root
  }
  _rightRotation(node) {
    let leftNode = node.left;
    let leftNodeRightChild = leftNode.right;
    leftNode.right = node;
    node.left = leftNodeRightChild;

    // node is now below leftNode and needs to be updated first
    node.height = 1 + Math.max(this._getHeight(node.left), this._getHeight(node.right));
    leftNode.height = 1 + Math.max(this._getHeight(leftNode.left), this._getHeight(leftNode.right));

    node.size = 1 + this.getSize(node.left) + this.getSize(node.right);
    leftNode.size = 1 + this.getSize(leftNode.left) + this.getSize(leftNode.right);

    return leftNode; // left node is the new root
  }
  _rebalance(node) {
    const balance = this._getBalance(node);
    if (balance > 1 && this._getBalance(node.left) >= 0) { // left left
      return this._rightRotation(node);
    } else if (balance > 1 && this._getBalance(node.left) < 0) { // left right
      node.left = this._leftRotation(node.left);
      return this._rightRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) <= 0) { // right right
      return this._leftRotation(node);
    } else if (balance < -1 && this._getBalance(node.right) > 0) { // right left
      node.right = this._rightRotation(node.right);
      return this._leftRotation(node);
    }
    return node;
  }
}

// Two test cases
console.log(longestCommonPrefix(["jump","run","run","jump","run"], 2)) // [3,4,4,3,4]
console.log(longestCommonPrefix(["dog","racer","car"], 2)) // [0,0,0]