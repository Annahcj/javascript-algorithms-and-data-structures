// 716. Max Stack
// Design a max stack data structure that supports the stack operations and supports finding the stack's maximum element.


// Time Complexity: O(n) 152ms
  // popMax: O(n)
  // all other methods: O(1)

// Space Complexity: O(n) 46.4MB
  // popMax: potentially O(n)
  // all other methods: O(1)

// MaxStack: 
  // keep a stack for the order
  // keep a max stack for the maximum element at each position
var MaxStack = function() {
  this.stack = [];  
  this.max = [];
};

// push:
  // push into stack
  // push Math.max(x, previous max) into max
MaxStack.prototype.push = function(x) {
  this.stack.push(x);
  let prevMax = this.max.length ? this.peekMax() : -Infinity;
  this.max.push(Math.max(x, prevMax));
};

// pop:
  // pop off max and return stack.pop()
MaxStack.prototype.pop = function() {
  this.max.pop();
  return this.stack.pop();
};

// top:
  // return last element of stack
MaxStack.prototype.top = function() {
  return this.stack[this.stack.length - 1]; 
};

// peekMax:
  // return last element of max stack
MaxStack.prototype.peekMax = function() {
  return this.max[this.max.length - 1];  
};

// popMax:
  // 1. take peekMax -> max
  // 2. while top of the stack is not equal to max
    // push stack.pop() into a temporary array
    // pop off max stack
  // 3. pop the max element from stack and max stack
  // 4. use the push method to add each element from the temporary array back into the stack and max stack.
  // 5. return the max which we initially saved
MaxStack.prototype.popMax = function() {
  let temp = [];
  let max = this.peekMax();
  while (this.top() !== max) { // pop out elements until the max is reached
    temp.push(this.stack.pop());
    this.max.pop();
  }  
  this.stack.pop(); // pop out max element from stack
  this.max.pop(); 
  while (temp.length) {
    this.push(temp.pop()); // add other elements back to the stack using the push method
  }
  return max;
};

let stk = new MaxStack();
stk.push(5);   // [5] the top of the stack and the maximum number is 5.
stk.push(1);   // [5, 1] the top of the stack is 1, but the maximum is 5.
stk.push(5);   // [5, 1, 5] the top of the stack is 5, which is also the maximum, because it is the top most one.
console.log(stk.top());     // return 5, [5, 1, 5] the stack did not change.
console.log(stk.popMax());  // return 5, [5, 1] the stack is changed now, and the top is different from the max.
console.log(stk.top());     // return 1, [5, 1] the stack did not change.
console.log(stk.peekMax()); // return 5, [5, 1] the stack did not change.
console.log(stk.pop());     // return 1, [5] the top of the stack and the max element is now 5.
console.log(stk.top());     // return 5, [5] the stack did not change.