// 1600. Throne Inheritance
// A kingdom consists of a king, his children, his grandchildren, and so on. Every once in a while, someone in the family dies or a child is born.
// The kingdom has a well-defined order of inheritance that consists of the king as the first member. Let's define the recursive function Successor(x, curOrder), which given a person x and the inheritance order so far, returns who should be the next person after x in the order of inheritance.
// Successor(x, curOrder):
//     if x has no children or all of x's children are in curOrder:
//         if x is the king return null
//         else return Successor(x's parent, curOrder)
//     else return x's oldest child who's not in curOrder
// For example, assume we have a kingdom that consists of the king, his children Alice and Bob (Alice is older than Bob), and finally Alice's son Jack.
  // In the beginning, curOrder will be ["king"].
  // Calling Successor(king, curOrder) will return Alice, so we append to curOrder to get ["king", "Alice"].
  // Calling Successor(Alice, curOrder) will return Jack, so we append to curOrder to get ["king", "Alice", "Jack"].
  // Calling Successor(Jack, curOrder) will return Bob, so we append to curOrder to get ["king", "Alice", "Jack", "Bob"].
  // Calling Successor(Bob, curOrder) will return null. Thus the order of inheritance will be ["king", "Alice", "Jack", "Bob"].
// Using the above function, we can always obtain a unique order of inheritance.
// Implement the ThroneInheritance class:
  // ThroneInheritance(string kingName) Initializes an object of the ThroneInheritance class. The name of the king is given as part of the constructor.
  // void birth(string parentName, string childName) Indicates that parentName gave birth to childName.
  // void death(string name) Indicates the death of name. The death of the person doesn't affect the Successor function nor the current inheritance order. You can treat it as just marking the person as dead.
  // string[] getInheritanceOrder() Returns a list representing the current order of inheritance excluding dead people.


// Solution: Pre-order DFS

// Since there are at most 10 calls to getInheritanceOrder, the order can be generated when requested.
// Maintain a tree, where each node has an array of child nodes.
// Use a hashmap to store references to every node with the name as the key.
// Use pre-order DFS to find the inheritance order, excluding deceased people in the order.

// n = number of nodes in the tree
// Time Complexity: 127ms
  // birth: O(1)
  // death: O(1)
  // getInheritanceOrder: O(n)
// Space Complexity: O(n) 113.1MB
var ThroneInheritance = function(kingName) {
  this.root = new Node(kingName);
  this.map = {[kingName]: this.root}; 
};

ThroneInheritance.prototype.birth = function(parentName, childName) {
  const node = this.map[parentName];
  const childNode = new Node(childName);
  node.children.push(childNode);
  this.map[childName] = childNode;
};

ThroneInheritance.prototype.death = function(name) {
  const node = this.map[name];
  node.deceased = true;
};

ThroneInheritance.prototype.getInheritanceOrder = function() {
  const order = [];
  dfs(this.root, order);
  return order;
};

function dfs(node, order) {
  if (!node.deceased) {
    order.push(node.name);
  }
  for (let child of node.children) {
    dfs(child, order);
  }
}    

class Node {
  constructor(name) {
    this.name = name;
    this.children = [];
    this.deceased = false;
  }
}

// Test case
const obj = new ThroneInheritance("king"); // order: king
obj.birth("king", "andy"); // order: king > andy
obj.birth("king", "bob"); // order: king > andy > bob
obj.birth("king", "catherine"); // order: king > andy > bob > catherine
obj.birth("andy", "matthew"); // order: king > andy > matthew > bob > catherine
obj.birth("bob", "alex"); // order: king > andy > matthew > bob > alex > catherine
obj.birth("bob", "asha"); // order: king > andy > matthew > bob > alex > asha > catherine
console.log(obj.getInheritanceOrder()); // ["king", "andy", "matthew", "bob", "alex", "asha", "catherine"]
obj.death("bob"); // order: king > andy > matthew > bob > alex > asha > catherine
console.log(obj.getInheritanceOrder()); // ["king", "andy", "matthew", "alex", "asha", "catherine"]
