// 341. Flatten Nested List Iterator
// You are given a nested list of integers nestedList. Each element is either an integer or a list whose elements may also be integers or other lists. Implement an iterator to flatten it.
// Implement the NestedIterator class:
// NestedIterator(List<NestedInteger> nestedList) Initializes the iterator with the nested list nestedList.
// int next() Returns the next integer in the nested list.
// boolean hasNext() Returns true if there are still some integers in the nested list and false otherwise.


// Solution: Recursion

// NestedIterator:
  // initiate a new queue
  // flatten the nestedList

// hasNext: 
  // if the queue is empty, return false, otherwise return true.

// next:
  // shift integer out from the start of queue, return it.

// flatten: (list, queue)
  // loop through each element in list (el)
    // if el is an integer,
      // push el.getInteger() into the queue
    // else 
      // recursively call flatten for el.getList, queue

// Runtime on LeetCode: 96ms
// Memory Usage on LeetCode: 50.1MB

var NestedIterator = function(nestedList) {
    this.queue = [];
    flatten(nestedList, this.queue);
};

NestedIterator.prototype.hasNext = function() {
  return this.queue.length;
};

NestedIterator.prototype.next = function() {
  return this.queue.shift();
};
function flatten(list, queue) {
  for (var el of list) {
    if (el.isInteger()) {
      queue.push(el.getInteger());
    } else {
      flatten(el.getList(), queue);
    }
  }
}