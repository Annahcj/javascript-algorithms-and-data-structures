// 1628. Design an Expression Tree With Evaluate Function
// Given the postfix tokens of an arithmetic expression, build and return the binary expression tree that represents this expression.


// Solution: DFS & Stack

// evaluate: 
  // Note: The leaf nodes are the number nodes
  // When we find a leaf node, return the value.
  // When it is an operator, return dfs(left subtree) (operate) dfs(right subtree).

// buildTree:
  // Use a stack to keep track of the nodes.
  // When we find a number, create a new node and push it into the stack.
  // When we find an operator, 
    // 1. create a new node
    // 2. set the last two nodes of the stack (after popping them out) as the left and right children.
    // 3. push the operator node into the stack

// Time Complexity: 81ms
  // evaluate: O(n)
  // buildTree: O(n)
// Space Complexity: 41.9MB
  // evaluate: O(n)
  // buildTree: O(n)
var Node = function (val) {
  this.val = val;
  this.left = this.right = null;
};

Node.prototype.evaluate = function () {
  return dfs(this);
  
  function dfs(node) {
    if (!node.left && !node.right) return node.val; // leaf node = number node
    let operator = node.val;
    let left = dfs(node.left), right = dfs(node.right);

    switch (operator) {
      case '+':
        return left + right;
      case '-':
        return left - right;
      case '*':
        return left * right;
      case '/':
        return left / right;
    }
  }
};

class TreeBuilder{
	buildTree(postfix) {
    let stack = [];
    for (let char of postfix) {
      if (isNaN(char)) {
        // operator
        stack.push(this.getOperatorNode(char, stack));
      } else {
        // number
        stack.push(new Node(+char));
      }
    }
    return stack[0];
	}
  getOperatorNode(operator, stack) {
    let node = new Node(operator);
    node.right = stack.pop();
    node.left = stack.pop();
    return node;
  }
}