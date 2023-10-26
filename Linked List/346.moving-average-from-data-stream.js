// 346. Moving Average from Data Stream
// Given a stream of integers and a window size, calculate the moving average of all integers in the sliding window.
// Implement the MovingAverage class:
  // MovingAverage(int size) Initializes the object with the size of the window size.
  // double next(int val) Returns the moving average of the last size values of the stream.


// Solution: Singly Linked List

// Since an array's .shift() operation costs O(n) where n is the size of the array, we can speed it up to O(1) by using a linked list.

// Keep a running sum of the current items in the queue.
  // Each time a new value is added, we add the value to the total sum.
  // When the size of the 'queue' is bigger than size, remove the head and subtract the amount from the total sum.
  // We return the total sum divided by the number of items in the queue.

// n = size
// Time Complexity: O(1) 182ms
// Space Complexity: O(n) 44.3MB

var MovingAverage = function(size) {
  this.queue = new LinkedList();
  this.sum = 0;
  this.size = size;
};

MovingAverage.prototype.next = function(val) {
  this.sum += val;
  this.queue.addTail(val);
  
  if (this.queue.size > this.size) {
    this.sum -= this.queue.removeHead();
  }
  return this.sum / this.queue.size;
};

class LinkedList {
  constructor() {
    this.head = new Node(null);
    this.tail = this.head;
    this.size = 0;
  }
  addTail(val) {
    let newNode = new Node(val);
    this.tail.next = newNode;
    this.tail = newNode;
    this.size++;
  }
  removeHead() {
    if (this.size === 0) return -1;
    let head = this.head.next;
    this.head.next = this.head.next.next;
    if (head === this.tail) {
      this.tail = this.head;
    }
    this.size--;
    return head.val;
  }
}

class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

// A few test cases 
let movingAverage = new MovingAverage(3);
console.log(movingAverage.next(1)); // return 1.0 = 1 / 1
console.log(movingAverage.next(10)); // return 5.5 = (1 + 10) / 2
console.log(movingAverage.next(3)); // return 4.66667 = (1 + 10 + 3) / 3
console.log(movingAverage.next(5)); // return 6.0 = (10 + 3 + 5) / 3