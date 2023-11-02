// 1367. Linked List in Binary Tree
// Given a binary tree root and a linked list with head as the first node. 
// Return True if all the elements in the linked list starting from the head correspond to some downward path connected in the binary tree otherwise return False.
// In this context downward path means a path that starts at some node and goes downwards.


// Solution 1: Brute Force w/ DFS

// For every node in the tree, try to match a downward path with the same values as the linked list.
// To be a matching downward path, the values in tree path must match the values in the linked list.
// If either the left subtree path or the right subtree path returns a match and the current node value is a match, we have found a matching path.

// n = number of nodes in the tree, h = height of tree, m = length of the linked list
// Time Complexity: O(n * min(h, m)) 120ms
// Space Complexity: O(h) 49.1MB
var isSubPath = function(head, root) {
  if (!root) return false;
  return hasMatch(head, root) || isSubPath(head, root.left) || isSubPath(head, root.right);
};

function hasMatch(head, node) {
  if (!head) return true;
  if (!node) return false;
  if (head.val !== node.val) return false;
  return hasMatch(head.next, node.left) || hasMatch(head.next, node.right);
}


// Solution 2: KMP

// 1. Convert the linked list into an array.
// 2. Get the LPS (longest prefix suffix) for the array of values.
// 3. Perform KMP algorithm on the tree and array (the array is the "substring" we are looking for).
  // a. If node value matches the list value, move both forward (hasMatch(node.left, idx + 1) || hasMatch(node.right, idx + 1))
  // b. If we can rollback (idx > 0), roll idx back to lps[idx - 1] and call hasMatch(node, idx).
  // c. If we can't rollback, move forward in the tree only (hasMatch(node.left, idx) || hasMatch(node.right, idx))

// Time Complexity: O(m + n) 103ms
// Space Complexity: O(m + h) 49.4MB
var isSubPath = function(head, root) {
  let values = getArray(head), n = values.length;
  let lps = getLPS(values);
  return hasMatch(root, 0);
  
  function hasMatch(node, idx) {
    if (idx === n) return true;
    if (!node) return false;
    if (node.val === values[idx]) {
      return hasMatch(node.left, idx + 1) || hasMatch(node.right, idx + 1);
    } else if (idx > 0) {
      idx = lps[idx - 1];
      return hasMatch(node, idx);
    } else {
      return hasMatch(node.left, idx) || hasMatch(node.right, idx); 
    }
  }
  
  function getArray(list) {
    let values = [];
    while (list) {
      values.push(list.val);
      list = list.next;
    }
    return values;
  }

  function getLPS(arr) {
    let n = arr.length, lps = Array(n).fill(0);
    let i = 0, j = 1;
    while (j < n) {
      if (arr[i] === arr[j]) {
        lps[j++] = ++i;
      } else if (i > 0) {
        i = lps[i - 1];
      } else {
        j++;
      }
    }
    return lps;
  }
};