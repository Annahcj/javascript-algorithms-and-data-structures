// 232. Implement Queue using Stacks
// Implement a first in first out (FIFO) queue using only two stacks. The implemented queue should support all the functions of a normal queue (push, peek, pop, and empty).
// Implement the MyQueue class:
  // void push(int x) Pushes element x to the back of the queue.
  // int pop() Removes the element from the front of the queue and returns it.
  // int peek() Returns the element at the front of the queue.
  // boolean empty() Returns true if the queue is empty, false otherwise.
// Notes:
  // You must use only standard operations of a stack, which means only push to top, peek/pop from top, size, and is empty operations are valid.
  // Depending on your language, the stack may not be supported natively. You may simulate a stack using a list or deque (double-ended queue) as long as you use only a stack's standard operations.


// Solution 1: Two Stacks - Brute force

// Two stacks: stack1 and stack2.
// Note: Popping and pushing all elements of one stack to another will reverse the order of elements.

// push(x): push x onto stack1
// pop: 
  // pop and push every element in stack1 to stack2 (the last element in stack2 is now the first element that was in stack1)
  // pop off the last element of stack2 and save it in a variable (to return at the end).
  // pop and push every element in stack2 to stack1 (revert the order back to the original order).
  // return the saved first element

// Time Complexity: 69ms
  // push: O(1)
  // pop: O(n) (for each call)
  // peek: O(1)
  // empty: O(1)
// Space Complexity: O(n) 42.4MB
var MyQueue = function() {
  this.stack1 = [];
  this.stack2 = [];
};

MyQueue.prototype.push = function(x) {
  this.stack1.push(x);  
};

MyQueue.prototype.pop = function() {
  while (this.stack1.length) {
    this.stack2.push(this.stack1.pop());
  }  
  let firstElement = this.stack2.pop();
  while (this.stack2.length) {
    this.stack1.push(this.stack2.pop());
  }
  return firstElement;
};

MyQueue.prototype.peek = function() {
  return this.stack1[0]; 
};

MyQueue.prototype.empty = function() {
  return this.stack1.length === 0;  
};


// Solution 2: Two Stacks - amortized O(1) complexity for each function

// Since popping and pushing every element from one stack to another will reverse the order, we can use the same idea in a more efficient way.

// stack1 keeps items in the normal order.
// stack2 keeps items in reversed order.
// To maintain the reversed order of stack2, we only add new elements to stack2 if stack2 is empty.
// We only need stack2 to be populated if we are popping.
// So when we pop, we can use existing elements in stack2 if it's not empty, otherwise we bring over all elements from stack1 at that time.

// push(x): push x to stack1
// pop:
  // if stack2 is empty, pop and push all items in stack1 to stack2.
  // pop the last item from stack2 and return it.

// Time Complexity: 70ms
  // push: O(1)
  // pop: O(n) (across all calls)
  // peek: O(1)
  // empty: O(1)
// Space Complexity: O(n) 41.8MB
var MyQueue = function() {
  this.stack1 = [];
  this.stack2 = [];
};

MyQueue.prototype.push = function(x) {
  this.stack1.push(x);  
};

MyQueue.prototype.pop = function() {
  if (this.stack2.length === 0) {
    while (this.stack1.length) {
      this.stack2.push(this.stack1.pop());
    }
  }
  return this.stack2.pop();
};

MyQueue.prototype.peek = function() {
  return this.stack2.length > 0 ? this.stack2[this.stack2.length - 1] : this.stack1[0];
};

MyQueue.prototype.empty = function() {
  return this.stack1.length + this.stack2.length === 0;  
};

// A few test cases
let myQueue = new MyQueue();
myQueue.push(1); // queue is: [1]
myQueue.push(2); // queue is: [1, 2] (leftmost is front of the queue)
console.log(myQueue.peek()); // return 1
console.log(myQueue.pop()); // return 1, queue is [2]
console.log(myQueue.empty()); // return false