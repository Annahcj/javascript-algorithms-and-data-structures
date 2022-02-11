// 622. Design Circular Queue
// Design your implementation of the circular queue. The circular queue is a linear data structure in which the operations are performed based on FIFO (First In First Out) principle and the last position is connected back to the first position to make a circle. It is also called "Ring Buffer".


// Solution: Array, Head & Tail Pointers

// arr: An array of size k
// size: The number of values in the queue
// head: The index of the head of the queue. When this goes out of bounds, set head to head % k.
// tail: The index of the tail of the queue. When this goes out of bounds, set tail to tail % k.

// Time Complexity: 
  // All methods: O(1)
// Space Complexity:
  // All methods: O(1)

var MyCircularQueue = function(k) {
  this.arr = Array(k);
  this.capacity = k;
  this.size = 0;
  this.head = -1;
  this.tail = -1;
};

MyCircularQueue.prototype.enQueue = function(value) {
  if (this.size === this.capacity) return false;
  if (this.tail === -1) { // nothing in the queue, this is the first element.
    this.head = 0;
    this.tail = 0;
  } else {
    this.tail = (this.tail + 1) % this.capacity;
  }
  this.arr[this.tail] = value;
  this.size++;
  return true;
};

MyCircularQueue.prototype.deQueue = function() {
  if (this.size === 0) return false;
  if (this.head === this.tail) { // if there is only 1 element left in the queue, set both pointers to -1.
    this.head = -1;
    this.tail = -1;
  } else {
    this.head = (this.head + 1) % this.capacity;
  }
  this.size--;
  return true;
};

MyCircularQueue.prototype.Front = function() {
  if (this.size === 0) return -1;
  return this.arr[this.head];
};

MyCircularQueue.prototype.Rear = function() {
  if (this.size === 0) return -1;
  return this.arr[this.tail];
};

MyCircularQueue.prototype.isEmpty = function() {
  return this.size === 0; 
};

MyCircularQueue.prototype.isFull = function() {
  return this.size === this.capacity;   
};

// A few test cases
let myCircularQueue = new MyCircularQueue(3);
console.log(myCircularQueue.enQueue(1)); // return True
console.log(myCircularQueue.enQueue(2)); // return True
console.log(myCircularQueue.enQueue(3)); // return True
console.log(myCircularQueue.enQueue(4)); // return False
console.log(myCircularQueue.Rear());     // return 3
console.log(myCircularQueue.isFull());   // return True
console.log(myCircularQueue.deQueue());  // return True
console.log(myCircularQueue.enQueue(4)); // return True
console.log(myCircularQueue.Rear());     // return 4