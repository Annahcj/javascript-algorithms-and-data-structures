// 382. Linked List Random Node
// Given a singly linked list, return a random node's value from the linked list. Each node must have the same probability of being chosen.


// Solution 1: Precomputation Using Array

// Initialization: Get the size of the list and store the values of the nodes in an array.

// Time Complexity: O(n)
// Space Complexity: O(n)
var Solution = function(head) {
  this.size = 0;
  this.head = head;
  this.nodes = [];
  let node = head;
  while (node) {
    this.nodes.push(node.val);
    this.size++;
    node = node.next;
  }
};

// getRandom: Get a random index between 0 and the size. Return the node value at the random index of the array.

// Time Complexity: O(1)
// Space Complexity: O(1)
Solution.prototype.getRandom = function() {
  let randomIdx = Math.floor(Math.random() * this.size);
  return this.nodes[randomIdx];
};


// Solution 2: Reservoir Sampling

// Algorithm R of Reservoir Sampling.

// Initialization: Just save the reference to the head

// Time Complexity: O(1)
// Space Complexity: O(1)
var Solution = function(head) {
  this.head = head;
};

// getRandom: Use Reservoir Sampling to get a random node.

// e.g: [1,2,3]
// 1: idx = 0, random number will always be 0. Set our answer to node 0.
// 2: idx = 1, random number will be 0 or 1. If it is 1, we change our answer to node 1.
// 3: idx = 2, random number will be 0, 1, or 2. If it is 2, we change our answer to node 2.

// Time Complexity: O(n)
// Space Complexity: O(1)
Solution.prototype.getRandom = function() {
  let res = this.head.val, node = this.head;
  let idx = 0;
  while (node) {
    let randomVal = Math.floor(Math.random() * (idx + 1)); // random whole number between 0 and idx
    if (randomVal === idx) {
      res = node.val;
    }
    idx++;
    node = node.next;
  }
  return res;
};