// 109. Convert Sorted List to Binary Search Tree
// Given the head of a singly linked list where elements are sorted in ascending order, convert it to a height balanced BST.
// For this problem, a height-balanced binary tree is defined as a binary tree in which the depth of the two subtrees of every node never differ by more than 1.


// Solution 1: Convert to Array and Divide & Conquer

// 1. Collect all the values of the list into an array.
// 2. Divide & Conquer with recursion to get the binary search tree.
  // Given left and right indexes, pick the middle index for the node.
  // For the left subtree, recurse(left, mid - 1)
  // For the right subtree, recurse(mid + 1, right)

// Time Complexity: O(n) 141ms
// Space Complexity: O(n) 48.2MB
var sortedListToBST = function(head) {
  let values = [], node = head;
  while (node) {
    values.push(node.val);
    node = node.next;
  }
  return dfs(0, values.length - 1);
  
  function dfs(left, right) {
    if (left > right) return null;
    let mid = Math.floor((left + right) / 2);
    let node = new TreeNode(values[mid]);
    node.left = dfs(left, mid - 1);
    node.right = dfs(mid + 1, right);
    return node;
  }
};

// Solution 2: Slow & Fast Pointers

// Use slow and fast pointers to get the middle of a linked list.
  // After getting the mid point, cut off the right half.
// Divide and conquer using recursion to get the binary search tree.

// Time Complexity: O(n log(n)) 106ms
// Space Complexity: O(log(n)) 47.3MB
var sortedListToBST = function(head) {
  return dfs(head);
  
  function dfs(node) {
    let mid = getMidNode(node);
    if (!mid) return null;
    let newNode = new TreeNode(mid.val);
    if (node === mid) return newNode; // only one node in the list
    newNode.left = dfs(node);
    newNode.right = dfs(mid.next);
    return newNode;
  }
  
  function getMidNode(node) {
    if (!node) return null;
    let slow = node, fast = node, prev = null;
    while (fast && fast.next) {
      prev = slow;
      slow = slow.next;
      fast = fast.next.next;
    }
    if (prev) prev.next = null; // cut off right half
    return slow;
  }
};