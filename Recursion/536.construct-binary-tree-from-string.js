// 536. Construct Binary Tree from String
// You need to construct a binary tree from a string consisting of parenthesis and integers.
// The whole input represents a binary tree. It contains an integer followed by zero, one or two pairs of parenthesis. The integer represents the root's value and a pair of parenthesis contains a child binary tree with the same structure.
// You always start to construct the left child node of the parent first if it exists.


// Solution: Recursion

// e.g "4(2(3)(1))(6(5))"
  // Base case: If the length of the string is 0, return null.
  // 1. Get the number/value of the node (in this case, 4) and create a new node with the value.
  // 2. Move index forward past the entire number (in this case to index 1)
  // 3. Keep track of the balance of parentheses, ( -> +1, ) -> -1.
  // 4. When the balance becomes 0, we have found the left child node:
    // Set the node's left child to be the result of calling the function recursively with s.slice(start + 1, current index)
    // Set the node's right child to be the result of calling the function recursively with s.slice(i + 2, s.length - 1)
    // Return the node.

// Note: Once we get to the end of the left child, we don't traverse any further and will deal with the right child recursively.

// Time Complexity: O(n^2) 92ms
  // worst case is O(n^2) when the tree is skewed to the left
  // average: O(n log(n))
// Space Complexity: O(n) 48MB
var str2tree = function(s) {
  return recurse(s);
  
  function recurse(s) {
    if (!s.length) return null;
    let [val, nextIdx] = getVal(s);
    let root = new TreeNode(val), bal = 0;
    let start = nextIdx;
    
    for (let i = nextIdx; i < s.length; i++) {
      if (s[i] === '(') bal++;
      else if (s[i] === ')') bal--;
      
      if (bal === 0) {
        root.left = recurse(s.slice(start + 1, i));
        root.right = recurse(s.slice(i + 2, s.length - 1));
        return root;
      }
    }
    return root;
  }
  
  function getVal(s) {
    let neg = false, num = 0;
    let idx = 0;
    if (s[idx] === '-') {
      neg = true;
      idx++;
    }
    
    while (idx < s.length && s[idx] !== '(' && s[idx] !== ')') {
      num = num * 10 + +s[idx++];
    }
    if (neg) num = -num;
    return [num, idx];
  }
};