// 641. Design Circular Deque
// Design your implementation of the circular double-ended queue (deque).
// Implement the MyCircularDeque class:
  // MyCircularDeque(int k) Initializes the deque with a maximum size of k.
  // boolean insertFront() Adds an item at the front of Deque. Returns true if the operation is successful, or false otherwise.
  // boolean insertLast() Adds an item at the rear of Deque. Returns true if the operation is successful, or false otherwise.
  // boolean deleteFront() Deletes an item from the front of Deque. Returns true if the operation is successful, or false otherwise.
  // boolean deleteLast() Deletes an item from the rear of Deque. Returns true if the operation is successful, or false otherwise.
  // int getFront() Returns the front item from the Deque. Returns -1 if the deque is empty.
  // int getRear() Returns the last item from Deque. Returns -1 if the deque is empty.
  // boolean isEmpty() Returns true if the deque is empty, or false otherwise.
  // boolean isFull() Returns true if the deque is full, or false otherwise.


// Solution: Linked List

// Use a doubly linked list to support O(1) insertions and deletions at the head and tail.

// Time Complexity: (118ms)
  // insertFront: O(1)
  // insertLast: O(1)
  // deleteFront: O(1)
  // deleteLast: O(1)
// Space Complexity: O(k) 58.7MB
class ListNode {
  constructor(val) {
    this.val = val;
    this.prev = null;
    this.next = null;
  }
}

var MyCircularDeque = function(k) {
  this.size = 0;
  this.maxSize = k;
  this.head = new ListNode(0);
  this.tail = new ListNode(0);
  this.head.next = this.tail;
  this.tail.prev = this.head;
};

MyCircularDeque.prototype.insertFront = function(value) {
  if (this.isFull()) {
    return false;
  }
  const newNode = new ListNode(value);
  const next = this.head.next;
  this.head.next = newNode;
  newNode.prev = this.head;
  newNode.next = next;
  next.prev = newNode;
  this.size++;
  return true;
};

MyCircularDeque.prototype.insertLast = function(value) {
  if (this.isFull()) {
    return false;
  }
  const newNode = new ListNode(value);
  const prev = this.tail.prev;
  this.tail.prev = newNode;
  newNode.prev = prev;
  newNode.next = this.tail;
  prev.next = newNode;
  this.size++;
  return true;
};

MyCircularDeque.prototype.deleteFront = function() {
  if (this.size === 0) {
    return false;
  }
  this.head.next = this.head.next.next;
  this.head.next.prev = this.head;
  this.size--;
  return true;
};

MyCircularDeque.prototype.deleteLast = function() {
  if (this.size === 0) {
    return false;
  }
  this.tail.prev = this.tail.prev.prev;
  this.tail.prev.next = this.tail;
  this.size--;
  return true;
};

MyCircularDeque.prototype.getFront = function() {
  if (this.size === 0) {
    return -1;
  }
  return this.head.next.val;
};

MyCircularDeque.prototype.getRear = function() {
  if (this.size === 0) {
    return -1;
  }  
  return this.tail.prev.val;
};

MyCircularDeque.prototype.isEmpty = function() {
  return this.size === 0;  
};

MyCircularDeque.prototype.isFull = function() {
  return this.size === this.maxSize;  
};