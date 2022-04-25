// 284. Peeking Iterator
// Design an iterator that supports the peek operation on an existing iterator in addition to the hasNext and the next operations.
// Implement the PeekingIterator class:
  // PeekingIterator(Iterator<int> nums) Initializes the object with the given integer iterator iterator.
  // int next() Returns the next element in the array and moves the pointer to the next element.
  // boolean hasNext() Returns true if there are still elements in the array.
  // int peek() Returns the next element in the array without moving the pointer.


// Solution: Save Next Value

// Save the next value of the iterator.
// When peek is called, return the next value without using the iterator.
// When next is called, return the current next value and update the next value to iterator.next()

// Time Complexity for all methods: O(1) 71ms
// Space Complexity for all methods: O(1) 43.5MB
var PeekingIterator = function(iterator) {
  this.nextVal = iterator.next();
  this.iterator = iterator;
};

PeekingIterator.prototype.peek = function() {
  return this.nextVal;
};

PeekingIterator.prototype.next = function() {
  let val = this.nextVal;
  this.nextVal = this.iterator.hasNext() ? this.iterator.next() : null;
  return val;
};

PeekingIterator.prototype.hasNext = function() {
  return this.nextVal !== null;
};