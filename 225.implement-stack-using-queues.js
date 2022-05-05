// 225. Implement Stack using Queues
// Implement a last-in-first-out (LIFO) stack using only two queues. The implemented stack should support all the functions of a normal stack (push, top, pop, and empty).


// Solution: Two Queues

// Create a linked list and use it as a queue.
// For pop and top functions,
  // 1. Move all the nodes from queue1 to queue2 until there is 1 node left.
  // 2. Save the value of the node.
  // 3. For top, add the last node to queue2.
  // 4. Set queue1 equal to queue2 and clear queue2.

// Time Complexity: 96ms
  // pop, top: O(n)
  // push, empty: O(1)
// Space Complexity: O(n) 41.9MB
var MyStack = function() {
  this.queue1 = new LinkedList();
  this.queue2 = new LinkedList();
};

MyStack.prototype.push = function(x) {
  // same push  
  this.queue1.push(new Node(x));
};

MyStack.prototype.pop = function() {
  while (this.queue1.size > 1) {
    this.queue2.push(this.queue1.shift());
  }
  let front = this.queue1.front();
  this.queue1 = this.queue2;
  this.queue2 = new LinkedList();
  return front.val;
};

MyStack.prototype.top = function() {
  while (this.queue1.size > 1) {
    this.queue2.push(this.queue1.shift());
  }
  let front = this.queue1.front();
  this.queue2.push(this.queue1.shift());
  this.queue1 = this.queue2;
  this.queue2 = new LinkedList();
  return front.val;
};

MyStack.prototype.empty = function() {
  return this.queue1.size === 0;
};


class LinkedList {
  constructor() {
    this.head = new Node(null);
    this.tail = this.head;
    this.size = 0;
  }
  push(node) { // push back
    this.tail.next = node;
    this.tail = node;
    this.size++;
  }
  shift() { // pop from front
    if (this.size === 0) return -1;
    let head = this.head.next;
    this.head.next = this.head.next.next;
    if (head === this.tail) {
      this.tail = this.head;
    }
    this.size--;
    return head;
  }
  front() {
    return this.head.next;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// A few test cases
let myStack = new MyStack();
myStack.push(1);
myStack.push(2);
console.log(myStack.top()); // return 2
console.log(myStack.pop()); // return 2
console.log(myStack.empty()); // return False