// 155. Min Stack
// Design a stack that supports push, pop, top, and retrieving the minimum element in constant time.
// Implement the MinStack class:
// MinStack() initializes the stack object.
// void push(val) pushes the element val onto the stack.
// void pop() removes the element on the top of the stack.
// int top() gets the top element of the stack.
// int getMin() retrieves the minimum element in the stack.


// Solution: Stack 

// Since we are strictly pushing and popping from the end of the stack, 
// we can keep a running minimum for every node.
// for e.g: [2,5,1]
// for 2: we set min to be itself (2) OR min of last item in stack, which is current empty.
// stack = [{val: 2, min: 2}]
// for 5: we set min to be itself (5) OR min of last item in stack (2)
// stack = [{val: 2, min: 2}, {val: 5, min: 2}] 
// for 1: we set min to be itself (1) OR min of last item in stack (2)
// stack = [{val: 2, min: 2}, {val: 5, min: 2}, {val: 1, min: 1}] 
// if we get the current minimum, we can return the min of the last item in the stack (1)
// now, if we pop the last item off [{val: 2, min: 2}, {val: 5, min: 2}]
// and get the minimum, we return the min of the last item in the stack (2)


// RunTime on LeetCode: 124ms
// Memory Usage on LeetCode: 46.3MB

// Time Complexity for all functions: O(1)
// Space Complexity: O(n) 
var MinStack = function () {
    this.stack = [];
};

MinStack.prototype.push = function (val) {
    let min = this.stack.length ? Math.min(this.stack[this.stack.length - 1].min, val) : val;
    this.stack.push({ val, min });
};

MinStack.prototype.pop = function () {
    this.stack.pop();
};

MinStack.prototype.top = function () {
    return this.stack[this.stack.length - 1].val;
};

MinStack.prototype.getMin = function () {
    return this.stack[this.stack.length - 1].min;
};

// A few test cases
let minStack = new MinStack();
minStack.push(2);
minStack.push(5);
console.log(minStack.getMin()) // 2
minStack.push(1);
console.log(minStack.getMin()) // 1
minStack.pop();
console.log(minStack.getMin()) //2
console.log(minStack)