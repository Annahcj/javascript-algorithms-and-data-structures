// 331. Verify Preorder Serialization of a Binary Tree
// Given a string of comma-separated values preorder, return true if it is a correct preorder traversal serialization of a binary tree.


// Solution: Split by Commas, Calculate Balance

// First, split preorder by commas.
// Set balance to 1 (for the root node)
// Loop through each node in preorder
  // (every valid (not '#') node should have two children. we count the number of spots/slots for the tree)
  // if balance is 0, return false (the balance should never be 0, that means we have no available spots anymore)
  // decrement balance by one (whether the node is null or valid, it occupies a spot)
  // if node is valid, increment balance by two (every non-valid node should have two children)
// return true if balance is 0, otherwise return false.

// Time Complexity: O(n) 120ms
// Space Complexity: O(1) 40.2MB
var isValidSerialization = function(preorder) {
  let balance = 1;
  preorder = preorder.split(",");
  for (var n of preorder) {
    if (balance === 0) return false;
    balance--;
    if (n !== '#') balance += 2;
  }  
  return balance === 0;
};

// Three test cases to run function on
console.log(isValidSerialization("9,3,4,#,#,1,#,#,2,#,6,#,#")) // true
console.log(isValidSerialization("1,#")) // false
console.log(isValidSerialization("9,#,#,1")) // false