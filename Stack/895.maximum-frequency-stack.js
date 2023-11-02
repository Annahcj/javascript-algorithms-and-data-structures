// 895. Maximum Frequency Stack
// Design a stack-like data structure to push elements to the stack and pop the most frequent element from the stack.
// Implement the FreqStack class:
// FreqStack() constructs an empty frequency stack.
// void push(int val) pushes an integer val onto the top of the stack.
// int pop() removes and returns the most frequent element in the stack.
// If there is a tie for the most frequent element, the element closest to the stack's top is removed and returned.


// Solution: Stack & Hashmap

// Runtime on LeetCode: 368ms
// Memory Usage on LeetCode: 59.3MB

// freq map -> records frequencies/number of occurances of each number
// groups -> a map of stacks
// maxFreq -> the latest maximum frequency


// Illustration:

// groups:
// for example [5,7,5,7,4,5]
  // 1: [5,7,4]
  // 2: [5,7]
  // 3: [5]
// when popping off, we pop off the stack of the maxFreq -> 3: []
// returns 5
// since that stack is now empty, we decrease maxFreq by one.
// maxFreq is now 2, and groups is
  // 1: [5,7,4]
  // 2: [5,7]
  // 3: []
// the next time we pop off, we now pop off the stack of frequency 2 -> 2: [5]
// returns 7
// since that stack still contains a value, we leave maxFreq as it is.
// maxFreq is 2, and groups is 
  // 1: [5,7,4]
  // 2: [5]
  // 3: []

// Time Complexity for push & pop: O(1)
var FreqStack = function() {
  this.freq = {};
  this.groups = {};
  this.maxFreq = 0;  
};

FreqStack.prototype.push = function(val) {
  this.freq[val] = (this.freq[val] || 0) + 1;
  let freq = this.freq[val];
  this.maxFreq = Math.max(this.maxFreq, freq);
  if (!this.groups[freq]) this.groups[freq] = [];
  this.groups[freq].push(val);
};

FreqStack.prototype.pop = function() {
  let length = this.groups[this.maxFreq].length - 1;
  let last = this.groups[this.maxFreq][length];
  this.groups[this.maxFreq].pop();
  this.freq[last]--;
  if (length === 0) this.maxFreq--;
  return last;
};

// A few test cases to run functions on
let freqStack = new FreqStack();
freqStack.push(5); // The stack is [5]
freqStack.push(7); // The stack is [5,7]
freqStack.push(5); // The stack is [5,7,5]
freqStack.push(7); // The stack is [5,7,5,7]
freqStack.push(4); // The stack is [5,7,5,7,4]
freqStack.push(5); // The stack is [5,7,5,7,4,5]
console.log(freqStack.pop());   // return 5, as 5 is the most frequent. The stack becomes [5,7,5,7,4].
console.log(freqStack.pop());   // return 7, as 5 and 7 is the most frequent, but 7 is closest to the top. The stack becomes [5,7,5,4].
console.log(freqStack.pop());   // return 5, as 5 is the most frequent. The stack becomes [5,7,4].
console.log(freqStack.pop());   // return 4, as 4, 5 and 7 is the most frequent, but 4 is closest to the top. The stack becomes [5,7].