// 1381. Design a Stack With Increment Operation

// 1381.design-a-stack-with-increment-operation.js
// 1381. Design a Stack With Increment Operation
// Design a stack which supports the following operations.
// Implement the CustomStack class:
  // CustomStack(int maxSize) Initializes the object with maxSize which is the maximum number of elements in the stack or do nothing if the stack reached the maxSize.
  // void push(int x) Adds x to the top of the stack if the stack hasn't reached the maxSize.
  // int pop() Pops and returns the top of stack or -1 if the stack is empty.
  // void inc(int k, int val) Increments the bottom k elements of the stack by val. If there are less than k elements in the stack, just increment all the elements in the stack.


// Solution 1: Simple Stack

// Use an array as a stack.
// Keep track of the max size and current size.

// Runtime on LeetCode: 144ms
// Memory Usage on LeetCode: 46.9MB

// Time Complexity
// initialization: O(1)
// increment: O(k)
// push & pop: O(1)

var CustomStack = function(maxSize) {
  this.stack = [];
  this.maxSize = maxSize;
  this.size = 0;  
};

CustomStack.prototype.push = function(x) {
  if (this.size < this.maxSize) {
    this.stack.push(x);
    this.size++;
  }
};

CustomStack.prototype.pop = function() {
  if (!this.size) return -1;
  this.size--;
  return this.stack.pop();  
};

CustomStack.prototype.increment = function(k, val) {
  k = Math.min(k, this.size);
  for (var i = 0; i < k; i++) {
    this.stack[i] += val;
  } 
};

// Solution 2: Store incremented values

// Keep the increment values in an array.
// inc[i] = increment value for all numbers between indices 0 and i (inclusive)
// when a number is popped off, we pass the last inc value to the previous inc value. (this works because all previous numbers were all incremented too)

// e.g: inc = [0,10,200]
// when the last item in the stack is popped off, inc will look like
// inc = [0,210,0]

// The steps are:
// 1. Save the original inc value (200) so that we can return it along with the popped value.
// 2. If there is a previous index, add the original inc value to the previous one.
// 3. Reset the original inc value to 0.

// Runtime on LeetCode: 124ms
// Memory Usage on LeetCode: 45.7MB

// Time Complexity
// initialization: O(n)
// push, pop, increment: O(1)
var CustomStack = function(maxSize) {
  this.stack = [];
  this.inc = Array(maxSize).fill(0);
  this.maxSize = maxSize;
  this.size = 0;  
};

CustomStack.prototype.push = function(x) {
  if (this.size < this.maxSize) {
    this.stack.push(x);
    this.size++;
  }
};

CustomStack.prototype.pop = function() {
  if (!this.size) return -1;
  this.size--;
  let incValue = this.inc[this.size];
  if (this.size > 0) this.inc[this.size - 1] += incValue;
  this.inc[this.size] = 0;
  return this.stack.pop() + incValue;  
};

CustomStack.prototype.increment = function(k, val) {
  k = Math.min(k, this.size);
  if (k > 0) {
    this.inc[k - 1] += val;
  }
};

// A few test cases 
let customStack = new CustomStack(3);         // Stack is Empty []
customStack.push(1);                          // stack becomes [1]
customStack.push(2);                          // stack becomes [1, 2]
console.log(customStack.pop());               // return 2 --> Return top of the stack 2, stack becomes [1]
customStack.push(2);                          // stack becomes [1, 2]
customStack.push(3);                          // stack becomes [1, 2, 3]
customStack.push(4);                          // stack still [1, 2, 3], Don't add another elements as size is 4
customStack.increment(5, 100);                // stack becomes [101, 102, 103]
customStack.increment(2, 100);                // stack becomes [201, 202, 103]
console.log(customStack.pop());               // return 103 --> Return top of the stack 103, stack becomes [201, 202]
console.log(customStack.pop());               // return 202 --> Return top of the stack 102, stack becomes [201]
console.log(customStack.pop());               // return 201 --> Return top of the stack 101, stack becomes []